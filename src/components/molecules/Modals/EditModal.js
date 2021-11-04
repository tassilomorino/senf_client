/** @format */

import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Button from "@material-ui/core/Button";

// REDUX Stuff
import { useSelector, useDispatch } from "react-redux";

import { TextField } from "@material-ui/core";

import { editScreamFunc } from "../../../redux/actions/screamActions";

import Geocoder from "react-mapbox-gl-geocoder";

import Weblink from "./PostEditModals/Weblink";
import Contact from "./PostEditModals/Contact";
import InlineDatePicker from "./PostEditModals/InlineDatePicker";

import MainModal from "./MainModal";
import { OptionsProjects } from "../../../data/OptionsProjects";
import { OptionsTopics } from "../../../data/OptionsTopics";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import CustomSelect from "../../atoms/Selects/CustomSelect";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";

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

const EditModal = ({ setEditOpen, setMenuOpen, editOpen, classes }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [address, setAddress] = useState("Ohne Ortsangabe");
  const [neighborhood, setNeighborhood] = useState("Ohne Ortsangabe");
  const [fulladdress, setFulladdress] = useState("Ohne Ortsangabe");

  const projects = useSelector((state) => state.data.projects);
  const scream = useSelector((state) => state.data.scream);
  const [checkIfCalendar, setCheckIfCalendar] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [project, setProject] = useState("");

  const [weblinkOpen, setWeblinkOpen] = useState(false);
  const [weblink, setWeblink] = useState(null);
  const [weblinkTitle, setWeblinkTitle] = useState(null);

  const [contactOpen, setContactOpen] = useState(false);
  const [contact, setContact] = useState(null);
  const [contactTitle, setContactTitle] = useState(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedUnix, setSelectedUnix] = useState([]);

  const [viewport, setViewport] = useState({
    latitude: 50.93864020643174,
    longitude: 6.958725744885521,
    zoom: 12,
    transitionDuration: 1000,
    pitch: 0,
  });

  useEffect(() => {
    setBody(scream.body);
    setTitle(scream.title);
    setTopic(scream.Thema);
    setProject(scream.project);
    setViewport({ latitude: scream.lat, longitude: scream.long });

    setNeighborhood(scream.Stadtteil);
    setAddress(scream.locationHeader);
    setFulladdress(scream.district);

    projects.forEach((element) => {
      if (scream.project === element.project) {
        setCheckIfCalendar(element.calendar);
      }
      if (scream.project === "") {
        setCheckIfCalendar(false);
      }
    });

    if (scream.weblink) {
      setWeblink(scream.weblink);
      setWeblinkTitle(scream.weblinkTitle);
    }
    if (scream.contact) {
      setContact(scream.contact);
      setContactTitle(scream.contactTitle);
    }

    if (scream.selectedUnix) {
      const selectedDays = [];
      const selectedUnix = scream.selectedUnix;
      var i;
      for (i = 0; i < selectedUnix.length; i++) {
        selectedDays[i] = new Date(selectedUnix[i] * 1000);
      }

      setSelectedDays(selectedDays);
      setSelectedUnix(scream.selectedUnix);
    }
  }, [editOpen, scream]);

  const handleDropdown = (value) => {
    setTopic(value);
  };

  const handleDropdownProject = (value) => {
    setProject(value);

    projects.forEach((element) => {
      if (value === element.project) {
        setCheckIfCalendar(element.calendar);
      }
      if (value === "") {
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
    var i;
    for (i = 0; i < selectedDays.length; i++) {
      selectedUnix[i] = selectedDays[i]["unix"];
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
    const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
    const geocodingClient = mbxGeocoding({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
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
        setAddress(match.features[0].text + " " + houseNumber);
        setFulladdress(match.features[0].place_name);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(address, neighborhood);
    const editScream = {
      screamId: scream.screamId,
      body,
      title,
      locationHeader: address,
      district: fulladdress,
      Stadtteil: neighborhood,
      lat: viewport.latitude,
      long: viewport.longitude,
      project,
      Thema: topic,
      weblinkTitle,
      weblink,
      contactTitle,
      contact,
    };

    if (selectedUnix[0] === undefined) {
      editScream.selectedUnix = null;
    } else {
      editScream.selectedUnix = selectedUnix;
    }

    dispatch(editScreamFunc(editScream, history)).then(() => {
      setEditOpen(false);
      setMenuOpen(false);
    });
  };

  const queryParams = {
    bbox: [6.7, 50.8, 7.2, 51],
  };

  const MyInput = (props) => (
    <input {...props} placeholder={scream.locationHeader} id="geocoder" />
  );

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
          setContactOpen={setContactOpen}
        />
      )}
      {calendarOpen && (
        <InlineDatePicker
          setCalendarOpen={setCalendarOpen}
          handleCloseCalendar={handleCloseCalendar}
          handleSaveCalendar={handleSaveCalendar}
          handleChangeCalendar={handleChangeCalendar}
          selectedDays={selectedDays}
        />
      )}

      <MainModal handleButtonClick={() => setEditOpen(false)}>
        <h3 className="modal_title">Idee bearbeiten</h3>
        <div className="textFields">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              fontFamily: "Futura PT W01-Bold",
            }}
          >
            <span> An: </span>
            <CustomSelect
              name={"project"}
              value={project}
              initialValue={"Allgemein (Alle Ideen)"}
              options={OptionsProjects()}
              handleDropdown={handleDropdownProject}
            />
          </div>

          <Geocoder
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            onSelected={onSelected}
            {...viewport}
            hideOnSelect={true}
            limit={3}
            queryParams={queryParams}
            id="geocoder-edit"
            className="geocoder-edit"
            inputComponent={MyInput}
            updateInputOnSelect
          ></Geocoder>

          <TextField
            id="title"
            name="title"
            type="text"
            label="Titel"
            margin="normal"
            color="transparent"
            variant="outlined"
            className="textField"
            multiline
            rowsMax="2"
            // error={errors.title ? true : false}
            // helperText={errors.title}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={{ marginTop: "5px", marginBottom: "5px" }}
          ></TextField>
          <TextField
            id="body"
            name="body"
            type="text"
            label="Beschreibung"
            margin="normal"
            color="transparent"
            variant="outlined"
            className="textField"
            multiline
            rowsMax="12"
            // error={errors.body ? true : false}
            // helperText={errors.body}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            style={{ marginTop: "5px", marginBottom: "5px" }}
          ></TextField>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span> Thema:</span>

            <CustomSelect
              name={"topic"}
              value={topic}
              initialValue={"Wähle das Thema aus"}
              options={OptionsTopics()}
              handleDropdown={handleDropdown}
            />
          </div>
          <div
            style={{
              bottom: " -70px",
              height: "50px",
              position: "relative",
              zIndex: 0,
            }}
          >
            <CustomIconButton
              name="Weblink"
              position="absolute"
              bottom="70px"
              iconWidth="80%"
              backgroundColor={
                weblink !== null && weblinkTitle !== null ? "#fed957" : "white"
              }
              handleButtonClick={() => setWeblinkOpen(true)}
            />
            <CustomIconButton
              name="Contact"
              position="absolute"
              bottom="70px"
              left="60px"
              iconWidth="80%"
              backgroundColor={
                contact !== null && contactTitle !== null ? "#fed957" : "white"
              }
              handleButtonClick={() => setContactOpen(true)}
            />
            <div style={checkIfCalendar ? {} : { display: "none" }}>
              <CustomIconButton
                name="DatePicker"
                position="absolute"
                bottom="70px"
                left="120px"
                iconWidth="80%"
                backgroundColor={
                  selectedDays.length === 0 ? "white" : "#fed957"
                }
                handleButtonClick={() => setCalendarOpen(true)}
              />
            </div>
          </div>
        </div>
        <div className="buttons">
          <Button className={classes.button} onClick={() => setEditOpen(false)}>
            Abbrechen
          </Button>
          <Button
            className={classes.button}
            onClick={handleSubmit}
            style={
              (weblink !== null || weblink !== " ") &&
              (weblinkTitle !== null || weblinkTitle !== " ")
                ? {}
                : { pointerEvents: "none", opacity: 0.6 }
            }
          >
            Speichern
          </Button>
        </div>
      </MainModal>
    </React.Fragment>
  );
};

export default withStyles(styles)(EditModal);
