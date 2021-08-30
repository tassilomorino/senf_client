/** @format */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Translation } from "react-i18next";
import _ from "lodash";

//Components
import SignNote from "../profile/SignNote";

//ICONS
import AddIcon from "../../images/icons/plus_white.png";
import Arrow from "../../images/icons/arrow.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import Pin from "../../images/pin3.png";

// REDUX STUFF
import { connect } from "react-redux";
import { postScream } from "../../redux/actions/screamActions";
import { clearErrors } from "../../redux/actions/errorsActions";

//Map stuff
import ReactMapGL, { Marker, Source, Layer } from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import { MuiThemeProvider, NativeSelect } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

//COOKIES
import Cookies from "universal-cookie";
import PostScreamFormContent from "./PostScreamFormContent";
import PostScreamDesktopMap from "./PostScreamDesktopMap";
const cookies = new Cookies();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&&&&:before": {
          borderBottom: "1px solid rgba(0, 0, 0, 0)",
        },
        "&&&&:after": {
          borderBottom: "1px solid rgba(255, 255, 255, 0)",
        },
      },
    },
    MuiNativeSelect: {
      icon: {
        opacity: 0,
      },
    },
  },
});
const styles = {
  root: {
    padding: "0",
    overflow: "hidden",
    backgroundColor: "rgb(0,0,0,0.8)",
    backdropFilter: "blur(5px)",
  },

  paper: {
    boxShadow: "none",
    overflow: "hidden",
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

  content: {
    padding: 25,
    objectFit: "cover",
    overflow: "scroll",
    width: "100%",
  },

  textField: {
    marginTop: "0px",
    width: "100%",
  },

  locationOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    color: "rgb(255, 205, 6)",
    height: "3vh",
  },
  locationHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "1%",
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

  explain: {
    position: "fixed",
    textAlign: "left",
    top: "22px",
    left: "27vw",
    width: "80vw",
    color: "#414345",
    zIndex: 1999,
    fontFamily: "Futura PT W01-Bold",
    pointerEvents: "none",
  },
  smallText: {
    width: "100%",
    fontSize: "14pt",
    position: "fixed",
    bottom: "1em",
    zIndex: "999",
    textAlign: "center",
    textDecoration: "underline",
    textShadow: "0px 3px 9px rgba(255, 255, 255, 1)",
  },

  boldText: {
    fontFamily: "Futura PT W01-Bold",
  },
};

class PostScream extends Component {
  // const [open, setOpen] = useState(false);
  // const [Out, setOut] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [open, setOpen] = useState(false);
  // const { t } = useTranslation();

  constructor(props) {
    super(props);
    this.handleChangeCalendar = this.handleChangeCalendar.bind(this);
  }
  state = {
    open: false,
    Out: false,
    loading: false,

    body: "",
    title: "",
    project: "",
    topic: "",
    openWeblink: false,
    weblinkTitle: null,
    weblink: null,
    openContact: false,
    contactTitle: null,
    contact: null,
    openCalendar: false,
    selectedDays: [],
    selectedUnix: [],

    geoData: "",
    clicked: false,
    errors: {},
    viewport: {
      latitude: 50.93864020643174,
      longitude: 6.958725744885521,
      zoom: 12,
      transitionDuration: 1000,
      pitch: 0,
    },
    latitude: 50.93864020643174,
    longitude: 6.958725744885521,
    address: "Ohne Ortsangabe",
    district: "",
    neighborhood: "",
    locationDecided: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
      this.setState({ title: "", open: false, errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true, loading: false });

    const project =
      window.location.pathname.indexOf("_") > 0
        ? window.location.pathname.substring(1)
        : "";

    this.setState({
      project: project,
    });

    const dataArrayProjectSelector = this.props.projectsData;

    dataArrayProjectSelector.forEach((element) => {
      if (project === element.project) {
        this.setState({
          geoData: element.geoData,
          viewport: {
            zoom: element.zoom,
            latitude: element.centerLat,
            longitude: element.centerLong,
            transitionDuration: 1000,
          },
        });
      }
      if (project === "") {
        this.setState({
          geoData: "",
          viewport: {
            zoom: 12,
            latitude: 50.93864020643174,
            longitude: 6.958725744885521,
            transitionDuration: 1000,
          },
        });
      }
    });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value, loading: false });
  };

  handleChangeCalendar = (selectedDays) => {
    const selectedUnix = [];
    var i;
    for (i = 0; i < selectedDays.length; i++) {
      selectedUnix[i] = selectedDays[i]["unix"];
    }
    this.setState({ selectedDays: selectedDays, selectedUnix: selectedUnix });
  };

  handleDropdownProject = (event) => {
    event.preventDefault();
    this.setState({
      project: event.target.value,
    });

    const dataArrayProjectSelector = this.props.projectsData;

    dataArrayProjectSelector.forEach((element) => {
      if (event.target.value === element.project) {
        this.setState({
          geoData: element.geoData,
          viewport: {
            zoom: element.zoom,
            latitude: element.centerLat,
            longitude: element.centerLong,
            transitionDuration: 1000,
          },
        });
      }
      if (event.target.value === "") {
        this.setState({
          geoData: "",
          viewport: {
            zoom: 12,
            latitude: 50.93864020643174,
            longitude: 6.958725744885521,
            transitionDuration: 1000,
          },
        });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const newScream = {
      body: this.state.body,
      title: this.state.title,
      locationHeader: this.state.address,
      district: this.state.district,
      neighborhood: this.state.neighborhood,
      lat: this.state.latitude,
      long: this.state.longitude,
      project: this.state.project,
      Thema: this.state.topic,
      weblinkTitle: this.state.weblinkTitle,
      weblink: this.state.weblink,
      contactTitle: this.state.contactTitle,
      contact: this.state.contact,
    };

    if (this.state.selectedUnix.length > 0) {
      newScream.selectedUnix = this.state.selectedUnix;
    }

    this.props.postScream(newScream, this.props.user, this.props.history);
  };

  _onMarkerDragEndDesktop = (newViewport) => {
    this.setState({
      clicked: false,
      viewport: newViewport,
      longitude: this.state.viewport.longitude,
      latitude: this.state.viewport.latitude,
    });
  };

  geocode = () => {
    const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
    const geocodingClient = mbxGeocoding({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    });
    geocodingClient
      .reverseGeocode({
        query: [this.state.longitude, this.state.latitude],
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

        const address =
          match.features[0].address !== undefined
            ? match.features[0].address
            : "";
        this.setState({
          address: match.features[0].text + " " + address,
          neighborhood: match.features[0].context[1].text,
          district: match.features[0].place_name,
        });
      });

    if (
      this.state.latitude > 51.08 ||
      this.state.latitude < 50.79 ||
      this.state.longitude < 6.712 ||
      this.state.longitude > 7.17
    ) {
      alert("Außerhalb von Köln kannst du leider noch keine Ideen teilen.");
      this.setState({
        Out: true,
      });
    } else {
      this.setState({
        Out: false,
      });
    }
  };

  onSelected = (viewport) => {
    this.setState({ viewport });

    setTimeout(() => {
      this._onMarkerDragEndDesktop(viewport);
      this.geocode();
    }, 2000);
  };

  addressBarClicked = () => {
    this.setState({ clicked: true });
  };

  handleLocationDecided() {
    this.setState({
      locationDecided: !this.state.locationDecided,
    });
  }

  handleLocationDecidedNoLocation() {
    if (this.state.locationDecided === false) {
      this.setState({
        latitude: 50.93864020643174,
        longitude: 6.958725744885521,
        address: "Ohne Ortsangabe",
        district: "Ohne Ortsangabe",
        neighborhood: "Ohne Ortsangabe",
        locationDecided: true,
      });
    }

    if (this.state.locationDecided === true) {
      this.setState({
        locationDecided: false,
      });
    }
  }

  handleOpenWeblink = () => {
    this.setState({
      openWeblink: true,
    });
  };
  handleCloseWeblink = () => {
    this.setState({
      openWeblink: false,
      weblink: null,
      weblinkTitle: null,
    });
  };
  handleSaveWeblink = () => {
    this.setState({
      openWeblink: false,
    });
  };

  handleOpenContact = () => {
    this.setState({
      openContact: true,
    });
  };
  handleCloseContact = () => {
    this.setState({
      openContact: false,
      contact: null,
      contactTitle: null,
    });
  };
  handleSaveContact = () => {
    this.setState({
      openContact: false,
    });
  };

  handleOpenCalendar = () => {
    this.setState({
      openCalendar: true,
    });
    console.log(this.state.selectedDays);
  };
  handleCloseCalendar = () => {
    this.setState({
      openCalendar: false,
      selectedDays: [],
      selectedUnix: [],
    });
  };
  handleSaveCalendar = () => {
    this.setState({
      openCalendar: false,
    });
  };

  render() {
    const queryParams = {
      bbox: [6.7, 50.8, 7.2, 51],
    };
    const {
      classes,
      openInfoPageDesktop,
      loadingProjects,
      projectsData,

      UI: { loading },
    } = this.props;
    const { authenticated } = this.props.user;

    const projectsArray =
      this.state.open && !loadingProjects ? (
        <>
          {_.orderBy(projectsData, "createdAt", "desc").map((projects) => (
            <option value={projects.project} className={classes.formText}>
              +{projects.title}
            </option>
          ))}
        </>
      ) : null;

    const topicsArray = (
      <>
        <option value={"Inklusion / Soziales"} className={classes.formText}>
          Inklusion / Soziales
        </option>
        <option value={"Rad"} className={classes.formText}>
          Rad
        </option>
        <option value={"Sport / Freizeit"} className={classes.formText}>
          Sport / Freizeit
        </option>
        <option value={"Umwelt und Grün"} className={classes.formText}>
          Umwelt und Grün
        </option>
        <option value={"Verkehr"} className={classes.formText}>
          Verkehr
        </option>
        <option value={"Versorgung"} className={classes.formText}>
          Versorgung
        </option>
        <option value={"Sonstige"} className={classes.formText}>
          Sonstige
        </option>
      </>
    );

    return (
      <Fragment>
        <button
          onClick={this.handleOpen}
          className={openInfoPageDesktop ? "add add_hide" : "add"}
        >
          <img src={AddIcon} width="25" alt="AddIcon" />
          <span className="addText">
            <Translation>
              {(t, { i18n }) => <p>{t("postScream_newIdea")}</p>}
            </Translation>
          </span>
        </button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullScreen
          BackdropProps={{ classes: { root: classes.root } }}
          PaperProps={{ classes: { root: classes.paper } }}
        >
          {!authenticated && (
            <div className={classes.AuthlinkDesktop}>
              <SignNote />
            </div>
          )}
          <button
            tip="Close"
            onClick={this.handleClose}
            className="buttonRound buttonClose "
          >
            <img
              src={Arrow}
              width="20"
              alt="backArrow"
              style={{ transform: "rotate(90deg)" }}
            />
          </button>

          <PostScreamDesktopMap
            geocode={this.geocode}
            _onMarkerDragEndDesktop={this._onMarkerDragEndDesktop}
            geoData={this.state.geoData}
            viewport={this.state.viewport}
            clicked={this.state.clicked}
            addressBarClicked={this.addressBarClicked}
            locationDecided={this.state.locationDecided}
            onSelected={this.onSelected}
            address={this.state.address}
            loadingProjects={loadingProjects}
          />

          <div
            className="selectLocationContainer"
            style={this.state.locationDecided ? { zIndex: 1 } : { zIndex: 5 }}
          >
            <div
              onClick={() => this.handleLocationDecided()}
              style={
                this.state.locationDecided
                  ? {
                      display: "block",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#000000",
                      position: "absolute",
                      zIndex: 99999,
                      opacity: 0.6,
                      borderRadius: "19px",
                    }
                  : {
                      display: "none",
                    }
              }
            ></div>
            <div className="projectSelectContainer">
              <span className={classes.boldText}> An: </span>

              <MuiThemeProvider theme={theme}>
                <NativeSelect
                  value={this.state.project}
                  onChange={this.handleDropdownProject}
                  name="project"
                  className="projectFormControl"
                  inputProps={{ "aria-label": "project" }}
                  inputStyle={{
                    fontFamily: "Futura PT W01-Bold",
                  }}
                  id="project"
                  IconComponent={() => (
                    <img
                      src={Arrow}
                      width="20px"
                      style={{
                        marginTop: "0px",
                        marginLeft: "-24px",
                        pointerEvents: "none",
                      }}
                    ></img>
                  )}
                >
                  <option value="" className={classes.boldText}>
                    Allgemein (Alle Ideen)
                  </option>
                  {projectsArray}
                </NativeSelect>
              </MuiThemeProvider>
            </div>{" "}
            <br />
            <button
              className={
                this.state.project !== ""
                  ? "buttonWide buttonSelectLocationNo_hide"
                  : "buttonWide buttonSelectLocationNo"
              }
              onClick={() => this.handleLocationDecidedNoLocation()}
            >
              Ohne Ort
            </button>
            <button
              className={
                this.state.address === "Ohne Ortsangabe"
                  ? "buttonWide buttonSelectLocation_hide"
                  : "buttonWide buttonSelectLocation"
              }
              onClick={() => this.handleLocationDecided()}
            >
              Ort bestätigen
            </button>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div
              className="postCard"
              style={this.state.locationDecided ? { zIndex: 5 } : { zIndex: 1 }}
            >
              <div
                onClick={() => this.handleLocationDecided()}
                style={
                  this.state.locationDecided
                    ? {
                        display: "none",
                      }
                    : {
                        display: "block",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#000000",
                        position: "absolute",
                        zIndex: 99999,
                        opacity: 0.6,
                        borderRadius: "19px",
                      }
                }
              ></div>

              <PostScreamFormContent
                classes={classes}
                errors={this.state.errors}
                address={this.state.address}
                handleLocationDecided={() => this.handleLocationDecided()}
                handleChange={this.handleChange}
                openWeblink={this.state.openWeblink}
                weblink={this.state.weblink}
                weblinkTitle={this.state.weblinkTitle}
                handleOpenWeblink={this.handleOpenWeblink}
                handleCloseWeblink={this.handleCloseWeblink}
                handleSaveWeblink={this.handleSaveWeblink}
                openContact={this.state.openContact}
                contactTitle={this.state.contactTitle}
                contact={this.state.contact}
                handleOpenContact={this.handleOpenContact}
                handleCloseContact={this.handleCloseContact}
                handleSaveContact={this.handleSaveContact}
                project={this.state.project}
                openCalendar={this.state.openCalendar}
                selectedDays={this.state.selectedDays}
                handleOpenCalendar={this.handleOpenCalendar}
                handleCloseCalendar={this.handleCloseCalendar}
                handleSaveCalendar={this.handleSaveCalendar}
                handleChangeCalendar={this.handleChangeCalendar}
                topic={this.state.topic}
                topicsArray={topicsArray}
              />

              <button
                type="submit"
                className="submitPostButton buttonWide"
                disabled={this.state.loading || this.state.Out ? true : false}
                style={
                  this.state.locationDecided
                    ? {
                        display: "block",
                      }
                    : {
                        display: "none",
                      }
                }
              >
                Idee teilen
                {this.state.loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </button>
            </div>
          </form>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  user: PropTypes.object.isRequired,
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(withRouter(PostScream))
);
