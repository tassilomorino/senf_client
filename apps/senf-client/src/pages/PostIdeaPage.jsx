/** @format */

import React, { useState, memo, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import {
  Plus,
  Box,
  Button,
  useModals,
  Geocoder,
  PostIdea as PostIdeaComponent,
} from "senf-atomic-design-system";
import { AuthModal } from "senf-shared";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { isMobileCustom } from "../util/customDeviceDetect";
import { postScream } from "../redux/actions/screamActions";
import { clearErrors } from "../redux/actions/errorsActions";

// Components
import PostScreamSelectContainter from "../components/PostIdea/PostScreamSelectContainter";
import Auth from "./Auth";

const AuthFirst = styled.div`
  position: fixed;
  top: ${({ isMobile, locationDecided }) =>
    isMobile && locationDecided
      ? "27vh"
      : isMobile && !locationDecided && "100vh"};
  height: 80vh;
  z-index: 99999;
  width: 100%;
  transition: 0.5;

  @media (min-width: 768px) {
    z-index: 992;
    position: fixed;
    top: 40px;
    left: 0;
    margin-left: 210px;
    margin-right: auto;
    height: 600px;
    width: 380px;
    border-radius: 20px;
    box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0);
  }
`;

const PostIdeaPage = ({
  classes,
  loadingProjects,
  projectsData,
  setPostIdeaOpen,
  postIdeaOpen,
  statefulMap,
}) => {
  const dispatch = useDispatch();
  const { openModal } = useModals();
  const loading = useSelector((state) => state.data.loading);

  const project = useSelector((state) => state.data.project);

  const user = useSelector((state) => state.user);
  const { t } = useTranslation();

  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );

  const [viewport, setViewport] = useState(null);
  const [openRules, setOpenRules] = useState(false);
  const [out, setOut] = useState(false);
  const [projectSelected, setProjectSeleted] = useState("");
  const [geoData, setGeoData] = useState("");
  const [checkIfCalendar, setCheckIfCalendar] = useState(false);

  const [neighborhood, setNeighborhood] = useState("Ohne Ortsangabe");
  const [fulladdress, setFulladdress] = useState("Ohne Ortsangabe");

  const [allMainStates, setAllMainStates] = useState({
    errors: {},
    MapHeight: "100vh",
    locationDecided: false,
  });

  const { errors, MapHeight, locationDecided } = allMainStates;

  const postIdeaValidationSchema = yup.object({
    title: yup
      .string()
      .required(t("enter_ideaTitle"))
      .min(10, t("ideaTitle_too_short"))
      .max(70, t("ideaTitle_too_long")),

    body: yup
      .string()
      .required(t("enter_ideaDescription"))
      .min(100, t("ideaDescription_too_short"))
      .max(800, t("ideaDescription_too_long")),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      topic: "",
      address: "",

      contact: null,
      contactTitle: null,
      weblink: null,
      weblinkTitle: null,
      selectedUnix: [],
    },
    validationSchema: postIdeaValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedUnix, setSelectedUnix] = useState([]);

  const handleChangeCalendar = (selectedDays) => {
    const selectedUnix = [];
    let i;
    for (i = 0; i < selectedDays.length; i++) {
      selectedUnix[i] = selectedDays[i].unix;
    }

    setSelectedDays(selectedDays);
    setSelectedUnix(selectedUnix);
  };

  useEffect(() => {
    if (postIdeaOpen) {
      const projectSelected = project?.projectRoomId
        ? project?.projectRoomId
        : "";

      setProjectSeleted(projectSelected);

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
          // if (projectSelected === "") {
          //   const viewport = {
          //     zoom: mapViewportRef.current.zoom,
          //     latitude: mapViewportRef.current.latitude,
          //     longitude: mapViewportRef.current.longitude,
          //     transitionDuration: 1000,
          //   };
          //   setViewport(viewport);
          //   setGeoData("");
          // }
        }
      );
    } else {
      dispatch(clearErrors());
      setAllMainStates({ ...allMainStates, errors: {} });
    }
  }, [postIdeaOpen]);

  const handleDropdownProject = (value) => {
    // event.preventDefault();
    setProjectSeleted(value);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const newScream = {
      body: formik.values.body,
      title: formik.values.title,
      locationHeader: formik.values.address,
      fulladdress,
      neighborhood,
      lat: statefulMap.getCenter().lat,
      long: statefulMap.getCenter().lng,
      projectRoomId: projectSelected,
      Thema: formik.values.topic,
    };

    if (formik.values.contact) {
      newScream.contact = formik.values.contact;
      newScream.contactTitle = formik.values.contactTitle || "Kontakt";
    }
    if (formik.values.weblink) {
      newScream.weblink = formik.values.weblink;
      newScream.weblinkTitle = formik.values.weblinkTitle || "Website";
    }

    if (selectedUnix.length > 0) {
      newScream.selectedUnix = selectedUnix;
    }
    dispatch(postScream(newScream, user)).then(() => {
      setPostIdeaOpen(false);
    });
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
        console.log(match);

        const houseNumber =
          match.features[0].address !== undefined
            ? match.features[0].address
            : "";

        setNeighborhood(match.features[0].context[1].text);

        formik.setFieldValue(
          "address",
          `${match.features[0].text} ${houseNumber}`
        );
        setFulladdress(match.features[0].place_name);
      });

    if (
      viewport.latitude > 51.08 ||
      viewport.latitude < 50.79 ||
      viewport.longitude < 6.712 ||
      viewport.longitude > 7.17
    ) {
      // alert("Außerhalb von Köln kannst du leider noch keine Ideen teilen.");

      setOut(true);
    } else {
      setOut(false);
    }
  };
  const newViewport = useRef();

  statefulMap.on("moveend", () => {
    newViewport.current = {
      latitude: statefulMap.getCenter().lat,
      longitude: statefulMap.getCenter().lng,
    };
    geocode(newViewport.current);
  });

  const handleLocationDecided = () => {
    if (formik.values.address) {
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
      {/* <Box
        position="fixed"
        margin={document.body.clientWidth > 768 ? "20px" : "10px"}
        zIndex={2}
      >
        <Button
          size="medium"
          variant="white"
          icon={<Plus transform="rotate(45)" />}
          onClick={() => setPostIdeaOpen(false)}
        />
      </Box> */}

      {!user.authenticated && (
        <AuthFirst
          isMobile={isMobileCustom}
          locationDecided={locationDecided}
          onClick={() =>
            openModal(<AuthModal />, { swipe: !!isMobileCustom, size: "md" })
          }
        />
      )}

      {/* {isMobileCustom && (
        <div
          style={
            locationDecided
              ? { marginTop: 0, transition: "0.5s" }
              : { marginTop: "100vh", transition: "0.5s" }
          }
        >
          <div
            onClick={() => handleLocationDecided()}
          ></div>

          <div ></div>
        </div>
      )} */}
      {/*   <Box position="fixed" top="0px" width={isMobileCustom ? "calc(100vw - 20px)" : "400px"} zIndex={99999999} left="0px" margin="10px">
        <Geocoder finalAddress={formik?.values.address} statefulMap={statefulMap} handleSetClose={() => setPostIdeaOpen(false)} />
      </Box> */}

      {/*     <PostScreamSelectContainter
        classes={classes}
        address={formik.values.address}
        locationDecided={locationDecided}
        handleLocationDecided={handleLocationDecided}
        projectSelected={projectSelected}
        handleDropdownProject={handleDropdownProject}
        open={open}
        loadingProjects={loadingProjects}
        projectsData={projectsData}
      /> */}
      <PostIdeaComponent
        statefulMap={statefulMap}
        formik={formik}
        checkIfCalendar={checkIfCalendar}
        selectedDays={selectedDays}
        handleChangeCalendar={handleChangeCalendar}
        handleSubmit={handleSubmit}
        setPostIdeaOpen={setPostIdeaOpen}
      />
    </React.Fragment>
  );
};

export default memo(PostIdeaPage);
