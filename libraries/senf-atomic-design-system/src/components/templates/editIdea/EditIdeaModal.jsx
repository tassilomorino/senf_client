/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import withStyles from "@material-ui/core/styles/withStyles";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
// MUI Stuff
import Button from "@material-ui/core/Button";

import {
  editScreamFunc,
  getUserEmail,
} from "../../../redux/actions/screamActions";

import Weblink from "./Post_Edit_ModalComponents/Weblink";
import Contact from "./Post_Edit_ModalComponents/Contact";
import InlineDatePickerModal from "./InlineDatePickerModal";

import MainModal from "../../atoms/Layout/MainModal";

import EditModalMainFields from "./Post_Edit_ModalComponents/EditModalMainFields";
import Tabs from "../../atoms/Tabs/Tabs";
import {
  EditScreamTabData,
  EditScreamTabDataAsAdmin,
} from "../../../data/EditScreamTabData";
import AdminEditModalMainFields from "./Post_Edit_ModalComponents/AdminEditModalMainFields";
import { StyledH3, StyledText } from "../../../styles/GlobalStyle";

const styles = {
  root: {
    zIndex: 7,
  },
  paper: {
    borderRadius: "20px",
    zIndex: 7,
    // width: "95%",
    margin: "2.5%",
    maxWidth: "400px",
  },

  button: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70px",
  },

  confirmButton: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70%",
    clear: "both",
    color: "#353535",
  },
};

const AdminEditModal = ({
  isAdmin,
  isModerator,
  isUser,
  setEditOpen,
  setMenuOpen,
  editOpen,
  classes,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.data.projects);
  const scream = useSelector((state) => state.data.scream);

  const [order, setOrder] = useState(1);
  const [notes, setNotes] = useState(scream.notes ?? "");
  const [datePicker, setDatePicker] = useState(false);

  const [status, setStatus] = useState(scream.status ?? "");
  const [address, setAddress] = useState(
    scream.locationHeader ?? "Ohne Ortsangabe"
  );
  const [neighborhood, setNeighborhood] = useState(
    scream.Stadtteil ?? "Ohne Ortsangabe"
  );
  const [fulladdress, setFulladdress] = useState(
    scream.district ?? "Ohne Ortsangabe"
  );

  const [title, setTitle] = useState(scream.title ?? "");
  const [body, setBody] = useState(scream.body ?? "");
  const [topic, setTopic] = useState(scream.Thema ?? "");
  const [projectRoomId, setProjectRoomId] = useState(
    scream.projectRoomId ?? ""
  );

  const [weblinkOpen, setWeblinkOpen] = useState(false);
  const [weblink, setWeblink] = useState(scream.weblink ?? "");
  const [weblinkTitle, setWeblinkTitle] = useState(scream.weblinkTitle ?? "");

  const [contactOpen, setContactOpen] = useState(false);
  const [contact, setContact] = useState(scream.contact ?? "");
  const [contactTitle, setContactTitle] = useState(scream.contactTitle ?? "");

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedUnix, setSelectedUnix] = useState([]);

  const [viewport, setViewport] = useState({
    latitude: scream.lat ?? "",
    longitude: scream.long ?? "",
  });

  useEffect(() => {
    dispatch(getUserEmail(scream.userId));

    projects.forEach((project) => {
      if (scream.projectRoomId === project.projectRoomId) {
        setDatePicker(project.calendar ?? false);
      }
    });

    if (scream.selectedUnix) {
      const selectedDays = [];
      const { selectedUnix } = scream;
      let i;
      for (i = 0; i < selectedUnix.length; i++) {
        selectedDays[i] = new Date(selectedUnix[i] * 1000);
      }

      setSelectedDays(selectedDays);
      setSelectedUnix(scream.selectedUnix);
    }
  }, [dispatch, projects, editOpen, scream]);

  const handleDropdown = (value) => {
    setTopic(value);
  };

  const handleDropdownProject = (Id) => {
    setProjectRoomId(Id);

    projects.forEach((project) => {
      if (Id === project.projectRoomId) {
        setDatePicker(project.calendar ?? false);
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

  const onSelected = (newViewport) => {
    setTimeout(() => {
      geocode(newViewport);
      setViewport(newViewport);
    }, 1000);
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const editScream = {
      screamId: scream.screamId,
      body,
      title,
      locationHeader: address,
      district: fulladdress,
      Stadtteil: neighborhood,
      lat: viewport.latitude,
      long: viewport.longitude,
      projectRoomId,
      Thema: topic,
      weblinkTitle,
      weblink,
      contactTitle,
      contact,
      status,
      notes,
    };

    if (selectedUnix[0] === undefined) {
      editScream.selectedUnix = [];
    } else {
      editScream.selectedUnix = selectedUnix;
    }

    dispatch(editScreamFunc(editScream)).then(() => {
      setEditOpen(false);
      setMenuOpen(false);
    });
  };

  return (
    <React.Fragment>
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
          contactTitle={contactTitle}
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

      <MainModal handleButtonClick={() => setEditOpen(false)}>
        <div
          style={{
            width: "100%",
            height: "110px",
            backgroundColor: "#f8f8f8",
          }}
        >
          <StyledH3 textAlign="center" padding="15px 0px">
            {t("edit_idea")}
          </StyledH3>
          {isAdmin || isModerator ? (
            // show "Details and monitoring sections"
            <Tabs
              handleClick={setOrder}
              order={order}
              tabLabels={EditScreamTabDataAsAdmin.map((item) => item.text)}
              marginTop={"0"}
              marginBottom={"20px"}
              lineColor={"white"}
            ></Tabs>
          ) : (
            // show "Details section only"
            <Tabs
              handleClick={setOrder}
              order={order}
              tabLabels={EditScreamTabData.map((item) => item.text)}
              marginTop={"0"}
              marginBottom={"20px"}
              lineColor={"white"}
            ></Tabs>
          )}
        </div>
        {order === 1 ? (
          <EditModalMainFields
            projectRoomId={projectRoomId}
            handleDropdownProject={handleDropdownProject}
            onSelected={onSelected}
            viewport={viewport}
            scream={scream}
            title={title}
            body={body}
            topic={topic}
            setTitle={setTitle}
            setBody={setBody}
            handleDropdown={handleDropdown}
            weblink={weblink}
            weblinkTitle={weblinkTitle}
            setWeblinkOpen={setWeblinkOpen}
            contact={contact}
            contactTitle={contactTitle}
            setContactOpen={setContactOpen}
            datePicker={datePicker}
            selectedDays={selectedDays}
            setCalendarOpen={setCalendarOpen}
          />
        ) : isAdmin || isModerator ? (
          <AdminEditModalMainFields
            status={status}
            setStatus={setStatus}
            notes={notes}
            setNotes={setNotes}
          />
        ) : null}
        <div className="buttons">
          <Button className={classes.button} onClick={() => setEditOpen(false)}>
            {t("cancel")}
          </Button>
          <Button
            className={classes.button}
            onClick={handleSubmit}
            style={
              title === "" || body === ""
                ? { pointerEvents: "none", opacity: 0.4 }
                : {}
            }
          >
            {t("save")}
          </Button>
        </div>
      </MainModal>
    </React.Fragment>
  );
};

export default withStyles(styles)(AdminEditModal);
