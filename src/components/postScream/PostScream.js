/** @format */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { isMobileOnly } from "react-device-detect";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";

//HANDLER
import SignNote from "../profile/SignNote";

//ICONS
import AddIcon from "../../images/icons/plus_white.png";
import Arrow from "../../images/icons/arrow.png";

// REDUX STUFF
import { connect } from "react-redux";
import { postScream } from "../../redux/actions/screamActions";
import { clearErrors } from "../../redux/actions/errorsActions";

import { withRouter } from "react-router-dom";

//Components
import PostScreamFormContent from "./PostScreamFormContent";
import PostScreamMap from "./PostScreamMap";
import PostScreamSelectContainter from "./PostScreamSelectContainter";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  root: {
    padding: "0",
    overflow: "hidden",
    backgroundColor: isMobileOnly ? "white" : "rgb(0,0,0,0.8)",
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

  mapwrapper: {
    position: "absolute",
    top: "0",
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

class PostScream extends Component {
  state = {
    open: false,
    Out: false,
    // load: false,
    loading: false,
    body: "",
    title: "",
    project: "",
    topic: "",
    neighborhood: "Ohne Ortsangabe",

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
    address_long: "Wähle einen Ort",
    address_short: "gesplitted",
    address: "Ohne Ortsangabe",
    district: "",

    MapHeight: "100vh",
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

  handleOpen = (event) => {
    event.preventDefault();
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

  _onMarkerDragEnd = (newViewport) => {
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

  onSelected = (viewport, item) => {
    this.setState({ viewport });

    setTimeout(() => {
      this._onMarkerDragEnd(viewport);
      this.geocode();
    }, 2000);
  };

  addressBarClicked = () => {
    this.setState({ clicked: true });
  };

  handleLocationDecided() {
    if (this.state.locationDecided === false) {
      this.setState({
        locationDecided: true,
        MapHeight: "30vh",
      });
    }

    if (this.state.locationDecided === true) {
      this.setState({
        locationDecided: false,
        MapHeight: "100vh",
      });
    }
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
        MapHeight: "30vh",
      });
    }

    if (this.state.locationDecided === true) {
      this.setState({
        locationDecided: false,
        MapHeight: "100vh",
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
    const {
      classes,
      openInfoPageDesktop,
      loadingProjects,
      projectsData,
      UI: { loading },
    } = this.props;
    const { authenticated } = this.props.user;

    return (
      <Fragment>
        <button
          onClick={this.handleOpen}
          className={openInfoPageDesktop ? "add add_hide" : "add"}
        >
          <img src={AddIcon} width="25" alt="AddIcon" />
          <span className="addText">Neue Idee</span>
        </button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          fullScreen
          BackdropProps={{ classes: { root: classes.root } }}
          PaperProps={{ classes: { root: classes.paper } }}
        >
          {!authenticated && (
            <div
              className={
                isMobileOnly ? classes.Authlink : classes.AuthlinkDesktop
              }
              style={
                isMobileOnly && this.state.locationDecided
                  ? { top: "27vh", transition: "0.5s" }
                  : isMobileOnly && !this.state.locationDecided
                  ? { top: "100vh", transition: "0.5s" }
                  : null
              }
            >
              <SignNote />
            </div>
          )}

          <button
            tip="Close"
            onClick={this.handleClose}
            className="buttonRound buttonClose"
          >
            <img
              src={Arrow}
              width="20"
              alt="backArrow"
              style={{ transform: "rotate(90deg)" }}
            />
          </button>

          {isMobileOnly && (
            <div
              style={
                this.state.locationDecided
                  ? { marginTop: 0, transition: "0.5s" }
                  : { marginTop: "100vh", transition: "0.5s" }
              }
            >
              <div
                className="backContainer"
                onClick={() => this.handleLocationDecided()}
              ></div>

              <div className="PostBackground"></div>
            </div>
          )}

          <div className={classes.mapwrapper}>
            <PostScreamMap
              MapHeight={this.state.MapHeight}
              geocode={this.geocode}
              _onMarkerDragEnd={this._onMarkerDragEnd}
              geoData={this.state.geoData}
              viewport={this.state.viewport}
              clicked={this.state.clicked}
              addressBarClicked={this.addressBarClicked}
              locationDecided={this.state.locationDecided}
              onSelected={this.onSelected}
              address={this.state.address}
              loadingProjects={loadingProjects}
            />

            <PostScreamSelectContainter
              classes={classes}
              locationDecided={this.state.locationDecided}
              handleLocationDecided={() => this.handleLocationDecided()}
              handleLocationDecidedNoLocation={() =>
                this.handleLocationDecidedNoLocation()
              }
              project={this.state.project}
              address={this.state.address}
              handleDropdownProject={this.handleDropdownProject}
              open={this.state.open}
              loadingProjects={loadingProjects}
              projectsData={projectsData}
            />

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
              loading={this.state.loading}
              Out={this.state.Out}
              locationDecided={this.state.locationDecided}
              handleSubmit={this.handleSubmit}
            />
          </div>
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
