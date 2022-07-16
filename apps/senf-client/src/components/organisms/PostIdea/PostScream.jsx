/** @format */

import React, { useState, Fragment, memo, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import Dialog from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Plus, Box, RoundedButton } from "senf-atomic-design-system";
import { useFormik } from "formik";
import { isMobileCustom } from "../../../util/customDeviceDetect";
// MUI Stuff

// HANDLER
// ICONS

// REDUX STUFF
import { postScream } from "../../../redux/actions/screamActions";
import { clearErrors } from "../../../redux/actions/errorsActions";

// Components
import PostScreamFormContent from "./PostScreamFormContent";
import PostScreamMap from "./PostScreamMap";
import PostScreamSelectContainter from "./PostScreamSelectContainter";
import Weblink from "../../molecules/Modals/Post_Edit_ModalComponents/Weblink";
import Contact from "../../molecules/Modals/Post_Edit_ModalComponents/Contact";
import InlineDatePickerModal from "../../molecules/Modals/InlineDatePickerModal";
import PostScreamRules from "./PostScreamRules";

const styles = {
  root: {
    padding: "0",
    overflow: "hidden",
    backgroundColor: isMobileCustom ? "white" : "rgb(0,0,0,0.8)",
    backdropFilter: "blur(5px)",
  },

  paper: {
    boxShadow: "none",
    padding: "0",
    top: "0",
    overflow: "hidden",
    borderRadius: "0px",
    backgroundColor: "transparent",
  },

  progress: {
    position: "absolute",
    left: "50%",
    marginLeft: "-15px",
    bottom: "10px",
    zIndex: "9999",
  },

  textField: {
    marginTop: "0px",
    width: "100%",
  },

  Authlink: {
    position: "fixed",
    top: "25vh",
    height: "80vh",
    zIndex: "99999",
    width: "100%",
  },

  AuthlinkDesktop: {
    zIndex: 992,
    position: "fixed",
    top: "40px",

    left: 0,
    marginLeft: "210px",
    marginRight: "auto",
    height: "600px",
    width: "380px",
    borderRadius: "20px",
    boxShadow: "0 0px 40px -12px rgba(0,0,0,0)",
  },
};

const PostScream = ({
  classes,
  loadingProjects,
  projectsData,
  mapViewportRef,
  setPostIdeaOpen,
  postIdeaOpen,
  setAuthOpen,
}) => {
  const dispatch = useDispatch();

  const openScream = useSelector((state) => state.UI.openScream);
  const loading = useSelector((state) => state.data.loading);
  const swipePosition = useSelector((state) => state.UI.swipePosition);

  const project = useSelector((state) => state.data.project);

  const user = useSelector((state) => state.user);
  const history = useHistory();
  const { t } = useTranslation();

  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );

  const [viewport, setViewport] = useState(null);

  const [addressBarClickedState, setAddressBarClickedState] = useState(false);

  const [openRules, setOpenRules] = useState(false);
  const [out, setOut] = useState(false);
  const [projectSelected, setProjectSeleted] = useState("");
  const [geoData, setGeoData] = useState("");
  const [checkIfCalendar, setCheckIfCalendar] = useState(false);

  const [address, setAddress] = useState(null);
  const [neighborhood, setNeighborhood] = useState("Ohne Ortsangabe");
  const [fulladdress, setFulladdress] = useState("Ohne Ortsangabe");

  const [allMainStates, setAllMainStates] = useState({
    errors: {},
    MapHeight: "100vh",
    locationDecided: false,
  });

  const { errors, MapHeight, locationDecided } = allMainStates;

  const formik = useFormik({
    initialValues: {
      contact: "",
      contactTitle: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");

  const [weblinkOpen, setWeblinkOpen] = useState(false);
  const [weblink, setWeblink] = useState(null);
  const [weblinkTitle, setWeblinkTitle] = useState(null);

  const [contactOpen, setContactOpen] = useState(false);
  const [contact, setContact] = useState(null);
  const [contactTitle, setContactTitle] = useState(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedUnix, setSelectedUnix] = useState([]);

  const postScreamMapViewportRef = useRef(null);

  useEffect(() => {
    if (postIdeaOpen) {
      const projectSelected = project?.projectRoomId
        ? project?.projectRoomId
        : "";

      setProjectSeleted(projectSelected);

      // setAllMainStates({ ...allMainStates, loading: false });

      projectsData?.forEach(
        ({ projectRoomId, zoom, centerLat, centerLong, geoData, calendar }) => {
          if (projectSelected === projectRoomId) {
            const viewport = {
              zoom,
              latitude: centerLat,
              longitude: centerLong,
              transitionDuration: 1000,
            };
            setViewport(viewport);
            setGeoData(geoData);
            setCheckIfCalendar(calendar);
          }
          if (projectSelected === "") {
            const viewport = {
              zoom: mapViewportRef.current.zoom,
              latitude: mapViewportRef.current.latitude,
              longitude: mapViewportRef.current.longitude,
              transitionDuration: 1000,
            };
            setViewport(viewport);
            setGeoData("");
          }
        }
      );
    } else {
      dispatch(clearErrors());
      setAllMainStates({ ...allMainStates, errors: {} });
    }
  }, [postIdeaOpen]);

  const handleDropdown = (value) => {
    setTopic(value);
  };

  const handleDropdownProject = (value) => {
    // event.preventDefault();
    setProjectSeleted(value);
    console.log(value);

    projectsData.forEach((element) => {
      if (value === element.projectRoomId) {
        const viewport = {
          zoom: element.zoom,
          latitude: element.centerLat,
          longitude: element.centerLong,
          transitionDuration: 1000,
        };
        setViewport(viewport);

        setGeoData(element.geoData);
        setCheckIfCalendar(element.calendar);
      }
      if (value === "") {
        if (initialMapViewport) {
          initialMapViewport.pitch = 0;
          setViewport(initialMapViewport);
        }

        setGeoData("");
        setCheckIfCalendar(false);
      }
    });
  };

  const handleCloseWeblink = () => {
    setWeblinkOpen(false);
    setWeblink(null);
    setWeblinkTitle(null);
  };
  const handleSaveWeblink = () => {
    setWeblinkOpen(false);
  };

  const handleCloseContact = () => {
    setContactOpen(false);
    setContact(null);
    setContactTitle(null);
  };
  const handleSaveContact = () => {
    setContactOpen(false);
  };

  const handleChangeCalendar = (selectedDays) => {
    const selectedUnix = [];
    let i;
    for (i = 0; i < selectedDays.length; i++) {
      selectedUnix[i] = selectedDays[i].unix;
    }

    setSelectedDays(selectedDays);
    setSelectedUnix(selectedUnix);
  };

  const handleCloseCalendar = () => {
    setCalendarOpen(false);

    setSelectedDays([]);
    setSelectedUnix([]);
  };
  const handleSaveCalendar = () => {
    setCalendarOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const newScream = {
      body,
      title,
      locationHeader: address,
      fulladdress,
      neighborhood,
      lat: postScreamMapViewportRef.current.latitude,
      long: postScreamMapViewportRef.current.longitude,
      projectRoomId: projectSelected,
      Thema: topic,
      weblinkTitle,
      weblink,
      contactTitle,
      contact,
    };

    if (selectedUnix.length > 0) {
      newScream.selectedUnix = selectedUnix;
    }
    dispatch(postScream(newScream, user, history)).then(() => {
      setPostIdeaOpen(false);
    });
  };

  const _onMarkerDragEnd = (newViewport) => {
    // setViewport(newViewport);
    // using ref is not causing constant rerendering on drag
    postScreamMapViewportRef.current = newViewport;

    setTimeout(() => {
      geocode(newViewport);
    }, 250);

    setAddressBarClickedState(false);
  };

  const geocode = (viewport) => {
    const geocodingClient = mbxGeocoding({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    });
    geocodingClient
      .reverseGeocode({
        query: [viewport.longitude, viewport.latitude],
        limit: 1,
      })
      .send()
      .then((response) => {
        const match = response.body;
        console.log("Gesamt", match.features[0]);
        console.log(
          "Adresse",
          match.features[0].text,
          match.features[0].address
        );
        console.log("Stadtteil", match.features[0].context[1].text);

        const houseNumber =
          match.features[0].address !== undefined
            ? match.features[0].address
            : "";

        setNeighborhood(match.features[0].context[1].text);
        setAddress(`${match.features[0].text} ${houseNumber}`);
        setFulladdress(match.features[0].place_name);
      });

    if (
      viewport.latitude > 51.08 ||
      viewport.latitude < 50.79 ||
      viewport.longitude < 6.712 ||
      viewport.longitude > 7.17
    ) {
      alert("Außerhalb von Köln kannst du leider noch keine Ideen teilen.");

      setOut(true);
    } else {
      setOut(false);
    }
  };

  const onSelected = (newViewport) => {
    setViewport(newViewport);

    setTimeout(() => {
      geocode(newViewport);
    }, 1000);
  };

  const addressBarClicked = () => {
    setAddressBarClickedState(true);
  };

  const handleLocationDecided = () => {
    if (address) {
      setAllMainStates({
        ...allMainStates,
        locationDecided: true,
        MapHeight: "30vh",
      });
    }
    if (locationDecided === true) {
      setAllMainStates({
        ...allMainStates,
        locationDecided: false,
        MapHeight: "100vh",
      });
    }
  };

  const handleLocationDecidedNoLocation = () => {
    if (locationDecided === false) {
      setNeighborhood("Ohne Ortsangabe");
      setAddress("Ohne Ortsangabe");
      setFulladdress("Ohne Ortsangabe");
      const viewport = {
        zoom: 12,
        latitude: 50.93864020643174,
        longitude: 6.958725744885521,
        transitionDuration: 1000,
      };
      setViewport(viewport);

      setAllMainStates({
        ...allMainStates,
        locationDecided: true,
        MapHeight: "30vh",
      });
    }

    if (locationDecided === true) {
      setAllMainStates({
        ...allMainStates,
        locationDecided: false,
        MapHeight: "100vh",
      });
    }
  };

  return (
    <React.Fragment>
      {openRules && (
        <PostScreamRules openRules={openRules} setOpenRules={setOpenRules} />
      )}
      <Dialog
        open={true}
        onClose={() => setPostIdeaOpen(false)}
        fullScreen
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
      >
        {/* <CustomIconButton
        name="Close"
        position="fixed"
        margin={document.body.clientWidth > 768 ? "40px" : "10px"}
        handleButtonClick={() => setPostIdeaOpen(false)}
        zIndex="1"
      /> */}

        <Box
          position="fixed"
          margin={document.body.clientWidth > 768 ? "20px" : "10px"}
          zIndex={2}
        >
          <RoundedButton
            icon={<Plus transform="rotate(45deg)" />}
            onClick={() => setPostIdeaOpen(false)}
          />
        </Box>

        {!user.authenticated && (
          <div
            className={
              isMobileCustom ? classes.Authlink : classes.AuthlinkDesktop
            }
            style={
              isMobileCustom && locationDecided
                ? { top: "27vh", transition: "0.5s" }
                : isMobileCustom && !locationDecided
                ? { top: "100vh", transition: "0.5s" }
                : null
            }
            onClick={setAuthOpen}
          />
        )}

        {isMobileCustom && (
          <div
            style={
              locationDecided
                ? { marginTop: 0, transition: "0.5s" }
                : { marginTop: "100vh", transition: "0.5s" }
            }
          >
            <div
              className="backContainer"
              onClick={() => handleLocationDecided()}
            ></div>

            <div className="PostBackground"></div>
          </div>
        )}

        {weblinkOpen && (
          <Weblink
            handleCloseWeblink={handleCloseWeblink}
            handleSaveWeblink={handleSaveWeblink}
            weblinkTitle={weblinkTitle}
            weblink={weblink}
            setWeblinkTitle={setWeblinkTitle}
            setWeblink={setWeblink}
            setWeblinkOpen={setWeblinkOpen}
          />
        )}
        {contactOpen && (
          <Contact
            handleCloseContact={handleCloseContact}
            handleSaveContact={handleSaveContact}
            formik={formik}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            contactTitle={formik?.values.contactTitle}
            contact={contact}
            setContactTitle={setContactTitle}
            setContact={setContact}
            contactOpen={contactOpen}
            setContactOpen={setContactOpen}
          />
        )}
        {calendarOpen && (
          <InlineDatePickerModal
            setCalendarOpen={setCalendarOpen}
            handleCloseCalendar={handleCloseCalendar}
            handleSaveCalendar={handleSaveCalendar}
            handleChangeCalendar={handleChangeCalendar}
            selectedDays={selectedDays}
          />
        )}
        {viewport && (
          <PostScreamMap
            MapHeight={MapHeight}
            geocode={geocode}
            _onMarkerDragEnd={_onMarkerDragEnd}
            geoData={geoData}
            viewport={viewport}
            clicked={addressBarClickedState}
            addressBarClicked={addressBarClicked}
            locationDecided={locationDecided}
            onSelected={onSelected}
            address={address}
            loadingProjects={loadingProjects}
          />
        )}

        <PostScreamSelectContainter
          classes={classes}
          locationDecided={locationDecided}
          handleLocationDecided={handleLocationDecided}
          handleLocationDecidedNoLocation={handleLocationDecidedNoLocation}
          projectSelected={projectSelected}
          address={address}
          handleDropdownProject={handleDropdownProject}
          open={open}
          loadingProjects={loadingProjects}
          projectsData={projectsData}
        />

        <PostScreamFormContent
          classes={classes}
          errors={errors}
          address={address}
          handleLocationDecided={handleLocationDecided}
          handleDropdown={handleDropdown}
          weblink={weblink}
          weblinkTitle={weblinkTitle}
          contactTitle={contactTitle}
          contact={contact}
          project={projectSelected}
          selectedDays={selectedDays}
          topic={topic}
          loading={loading}
          Out={out}
          locationDecided={locationDecided}
          handleSubmit={handleSubmit}
          body={body}
          title={title}
          setTitle={setTitle}
          setBody={setBody}
          setWeblinkOpen={setWeblinkOpen}
          setContactOpen={setContactOpen}
          setCalendarOpen={setCalendarOpen}
          checkIfCalendar={checkIfCalendar}
          setOpenRules={setOpenRules}
        />
      </Dialog>
    </React.Fragment>
  );
};

export default withStyles(styles)(withRouter(memo(PostScream)));
