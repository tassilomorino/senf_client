/** @format */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI Stuff
import Button from "@material-ui/core/Button";

import {
  editScreamFunc,
  getUserEmail,
} from "../../../redux/actions/screamActions";

import contactIcon from "../../../images/icons/mail.png";
import menuIcon from "../../../images/icons/menu.png";
import shareBorderIcon from "../../../images/icons/shareBorder.png";
import weblinkIcon from "../../../images/icons/weblink.png";

import downloadIcon from "../../../images/icons/file.png";

import ToggleDisplay from "react-toggle-display";
import Tabs from "../../atoms/Tabs/Tabs";
import { EditScreamTabData } from "../../../data/EditScreamTabData";
import setColorByTopic from "../../../data/setColorByTopic";
import EditModalMainFields from "../../molecules/Modals/Post_Edit_ModalComponents/EditModalMainFields";
import AdminEditModalMainFields from "../../molecules/Modals/Post_Edit_ModalComponents/AdminEditModalMainFields";

const styles = {
  root: {
    backgroundColor: "rgb(0,0,0,0.1)",
    padding: "0",
  },

  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    // overflow: "hidden",
    padding: "0",
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

const MonitoringEditScream = ({
  monitoringEditOpen,
  setMonitoringEditOpen,
  classes,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const loadingIdea = useSelector((state) => state.data.loadingIdea);
  const [order, setOrder] = useState(1);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

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
    console.log(scream);
    dispatch(getUserEmail(scream.userId));
    setBody(scream.body);
    setTitle(scream.title);
    setTopic(scream.Thema);
    setProject(scream.project);
    setViewport({ latitude: scream.lat, longitude: scream.long });

    setNeighborhood(scream.Stadtteil);
    setAddress(scream.locationHeader);
    setFulladdress(scream.district);
    setStatus(scream.status);

    projects.forEach((element) => {
      if (scream.project === element.project) {
        setCheckIfCalendar(element.calendar);
      }
      if (scream.project === "") {
        setCheckIfCalendar(false);
      }
    });

    if (scream.notes) {
      setNotes(scream.notes);
    }
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
  }, [monitoringEditOpen, scream]);

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
      status,
      notes,
    };

    if (selectedUnix[0] === undefined) {
      editScream.selectedUnix = null;
    } else {
      editScream.selectedUnix = selectedUnix;
    }

    dispatch(editScreamFunc(editScream, history)).then(() => {});
  };

  return !loadingIdea ? (
    <React.Fragment>
      <div className="wrapperMonitoringDialog">
        <div
          style={{
            width: "100%",
            height: "auto",
            backgroundColor: "#f8f8f8",
            paddingBottom: "5px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "15px",
                marginTop: "20px",
                marginLeft: "20px",
                marginRight: "10px",
              }}
            >
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "100%",
                  border: "0.5px white solid",
                  backgroundColor: setColorByTopic(scream.Thema),
                }}
              />
            </div>

            <div style={{ width: "110px", marginTop: "20px" }}>
              {scream.Stadtteil}
            </div>
          </div>
          <div
            style={{
              width: "300px",
              margin: "10px",
              marginLeft: "20px",
              fontFamily: "Futura PT W01-Bold",
              fontSize: "20px",
            }}
          >
            {title}{" "}
          </div>
          <div
            style={{
              width: "200px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderRadius: "20px",
            }}
          >
            <div style={{ width: "20px", margin: "10px" }}>
              {" "}
              <a href={"mailto:hi@gmail.com?subject=" + escape(title)}>
                <img
                  src={weblinkIcon}
                  style={{ paddingLeft: "15px" }}
                  width="18"
                  alt="WeblinkIcon"
                />
              </a>
            </div>
            <div style={{ width: "20px", margin: "10px" }}>
              {" "}
              <a href={"mailto:hi@gmail.com?subject=" + escape(title)}>
                <img
                  src={downloadIcon}
                  style={{ paddingLeft: "9px" }}
                  width="22"
                  alt="WeblinkIcon"
                />
              </a>
            </div>
            <div style={{ width: "20px", margin: "10px" }}>
              {" "}
              <a href={"mailto:hi@gmail.com?subject=" + escape(title)}>
                <img
                  src={contactIcon}
                  style={{ paddingLeft: "9px" }}
                  width="22"
                  alt="WeblinkIcon"
                />
              </a>
            </div>

            <div style={{ width: "30px", margin: "10px" }}>
              {" "}
              <a href={"mailto:hi@gmail.com?subject=" + escape(title)}>
                <img
                  src={shareBorderIcon}
                  style={{ paddingLeft: "9px" }}
                  width="22"
                  alt="WeblinkIcon"
                />
              </a>
            </div>

            <div style={{ width: "50px", margin: "10px" }}>
              {" "}
              <img
                src={menuIcon}
                style={{ paddingTop: "5px" }}
                width="30"
                alt="WeblinkIcon"
              />
            </div>
          </div>
          <Tabs
            loading={loadingIdea}
            handleClick={setOrder}
            order={order}
            tabLabels={EditScreamTabData.map((item) => item.text)}
            marginTop={"20px"}
            marginBottom={"20px"}
            lineColor={"white"}
          ></Tabs>
        </div>

        {order === 1 ? (
          <EditModalMainFields
            project={project}
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
            checkIfCalendar={checkIfCalendar}
            selectedDays={selectedDays}
            setCalendarOpen={setCalendarOpen}
          />
        ) : (
          <AdminEditModalMainFields
            status={status}
            setStatus={setStatus}
            notes={notes}
            setNotes={setNotes}
          />
        )}

        <div className="buttons">
          <Button
            className={classes.button}
            onClick={() => setMonitoringEditOpen(false)}
          >
            Abbrechen
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
            Speichern
          </Button>
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default withStyles(styles)(MonitoringEditScream);

// import React, { Component, Fragment } from "react";
// import PropTypes from "prop-types";
// import withStyles from "@material-ui/core/styles/withStyles";

// // MUI Stuff
// import Dialog from "@material-ui/core/Dialog";

// import "mapbox-gl/dist/mapbox-gl.css";

// // Redux stuff
// import { connect } from "react-redux";
// import {
//   clearErrors,
//   closeScream,
//   openProject,
// } from "../../../redux/actions/dataActions";

// //COMPONENTS

// //ANIMATION
// import Slide from "@material-ui/core/Slide";

// import lamploader from "../../../images/lamp.png";

// //COOKIES
// import Cookies from "universal-cookie";
// const cookies = new Cookies();

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const styles = {
//   root: {
//     backgroundColor: "rgb(0,0,0,0.1)",
//     padding: "0",
//   },

//   paper: {
//     backgroundColor: "transparent",
//     boxShadow: "none",
//     // overflow: "hidden",
//     padding: "0",
//   },

//   closeButton: {
//     position: "relative",
//     height: "35px",
//     width: "35px",

//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 22,
//     borderRadius: "100%",
//     backgroundColor: "white",
//     boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
//   },
//   header: {
//     paddingTop: "10px",
//     marginLeft: "0vw",
//     width: "90%",
//     objectFit: "cover",
//   },
//   user: {
//     position: "relative",
//     float: "left",
//     color: "#353535",
//     fontSize: "12pt",
//     height: "16px",
//   },
//   date: {
//     position: "relative",
//     color: "#353535",
//     fontSize: "12pt",
//   },

//   faceButton: {
//     zIndex: 9999,
//   },

//   expandButton: {
//     position: "absolute",
//     left: "0%",
//     top: "0%",
//     width: "110%",
//     height: "110%",
//     borderRadius: 0,
//     // marginTop: "-20px",
//     // marginLeft: "-10px",
//     zIndex: 9,
//     // backgroundColor: "rgb(0,0,0,0.5)",
//   },

//   content: {
//     width: "95%",
//     padding: 15,
//     objectFit: "cover",
//   },

//   line: {
//     position: "absolute",
//     left: "85%",
//     top: "0%",
//     width: "1px",
//     backgroundColor: "#d5dadd",
//     height: "100%",
//   },

//   horrizontalLine: {
//     position: "relative",
//     left: "-15px",

//     height: "1px",
//     backgroundColor: "#d5dadd",
//     width: "calc(85% + 25px)",
//     marginTop: "20px",
//     marginBottom: "10px",
//   },

//   likeButton: {
//     zIndex: 10,
//     position: "relative",
//     left: "0%",
//     // width: "15vw",
//     // height: "15vw",
//     top: "10%",
//   },
//   likeButtonWrapper: {
//     zIndex: 10,
//     position: "absolute",
//     left: "85%",
//     // width: "15vw",
//     top: "50px",
//     textAlign: "center",
//   },
//   commentButtonWrapper: {
//     top: "170px",
//     position: "absolute",
//     left: "85%",
//   },

//   title: {
//     position: "relative",
//     width: "83%",
//     color: "rgb(87, 87, 87)",
//     paddingTop: 5,
//     paddingBottom: 5,
//     fontSize: 20,
//     fontWeight: 500,
//     fontFamily: "Playfair Display",
//     clear: "both",
//   },
//   bodytext: {
//     width: "80%",
//     fontSize: "14pt",
//     whiteSpace: "pre-line",
//   },
//   engagement: {
//     paddingRight: 10,
//     width: "100%",
//     textAlign: "center",
//     fontSize: 14,
//     color: "black",
//   },

//   locationOuter: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "flex-start",

//     height: "25px",
//   },
//   selectedDatesOuter: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "flex-start",

//     height: "auto",
//     paddingBottom: "10px",
//   },

//   locationIcon: {
//     marginTop: "-3px",
//     paddingRight: "2px",
//     float: "left",
//     color: "#353535",
//   },
//   locationHeader: {
//     color: "##353535",
//     float: "left",
//     paddingRight: "2%",
//     width: "100%",
//     fontSize: "12pt",
//   },

//   district: {
//     float: "left",
//     marginLeft: "10px",
//     color: "rgb(255, 205, 6)",
//     height: "3vh",
//   },

//   districtHeader: {
//     color: "rgb(255, 205, 6)",
//     float: "left",
//     paddingRight: "2%",
//     width: "100%",
//   },

//   anmeldeText: {
//     fontFamily: "Futura PT W01-Bold",
//     fontSize: "14pt",
//     color: "#414345",
//     width: "95%",
//     marginTop: "15px",
//     textAlign: "center",
//     marginLeft: "2.5%",
//     paddingBottom: "15px",
//   },

//   commentHeader: {
//     fontFamily: "Futura PT W01-Bold",
//     marginLeft: "5vw",
//     paddingTop: "1em",
//     paddingBottom: "1em",
//     color: "#414345",
//   },
//   KontaktButton: {
//     position: "absolute",
//     zIndex: 99,
//     paddingTop: "10px",
//     paddingBottom: "10px",
//     textAlign: "center",
//     width: "50vw",
//     left: "25vw",
//     top: "265vh",
//     borderRadius: "100px",
//     color: "#414345",
//     backgroundColor: "white",
//     textTransform: "none",
//     fontSize: "14pt",
//     boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
//   },

//   mapPlaceholder: {
//     position: "relative",
//     width: "100vw",
//     zIndex: 0,
//     height: "52vh",
//     backgroundColor: "lightgrey",
//     overflow: "hidden",
//   },

//   card2: {
//     zIndex: "99",
//     position: "relative",
//     display: "flex",
//     marginTop: "10px",
//     marginLeft: "auto",
//     marginRight: "auto",
//     width: "95%",
//     borderRadius: 20,
//     minHeight: "auto",

//     boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
//   },
//   vertline: {
//     width: "4px",
//     position: "relative",
//     backgroundColor: "#414345",
//     height: "10px",
//     marginLeft: "-2px",
//     left: "50%",
//     zIndex: "0",
//   },
// };

// class MonitoringEditScream extends Component {
//   state = {
//     open: false,
//     clicked: false,
//     oldPath: "/",

//     path: "",
//     zoomdetail: false,
//     hi: 50.9,
//     ho: 6.9,
//     count: 1,
//     MapHeight: "50vh",
//     viewport: {
//       position: "fixed",
//       width: "100vw",
//       height: "52vh",
//       zoom: 12,
//       color: "lightgrey",
//     },
//     dialogStyle: {},
//     selectedUnixConverted: null,
//   };

//   render() {
//     const {
//       UI: { loading },
//     } = this.props;

//     const dialogMarkup = loading ? (
//       <div className="fullGradientWrapper">
//         <div className="spinnerDiv">
//           <img src={lamploader} className="lamploader" alt="LikeIcon" />
//         </div>
//       </div>
//     ) : (
//       <div className="fullGradientWrapper">hiiii</div>
//     );

//     const dialog = (
//       <Dialog
//         open={this.props.UI.openMonitoringScream}
//         TransitionComponent={Transition}
//         fullScreen
//       >
//         {dialogMarkup}
//       </Dialog>
//     );

//     return <Fragment>{dialog}</Fragment>;
//   }
// }

// MonitoringEditScream.propTypes = {
//   UI: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   monitoringScream: state.data.monitoringScream,
//   UI: state.UI,
// });

// const mapActionsToProps = {
//   clearErrors,
// };

// export default connect(
//   mapStateToProps,
//   mapActionsToProps
// )(withStyles(styles)(MonitoringEditScream));
