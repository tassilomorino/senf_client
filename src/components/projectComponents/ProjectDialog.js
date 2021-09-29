/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { isMobileCustom } from "../../util/customDeviceDetect";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";

// Images
import lamploader from "../../images/lamp.png";

//MAPSTUFF
import "mapbox-gl/dist/mapbox-gl.css";

// Redux stuff
import { connect } from "react-redux";
import { closeScream } from "../../redux/actions/screamActions";
import { closeProject } from "../../redux/actions/projectActions";
import { clearErrors } from "../../redux/actions/errorsActions";
import { setMapViewport, setMapBounds } from "../../redux/actions/mapActions";
import Slide from "@material-ui/core/Slide";

//Components
import ScreamShare from "../modals/ScreamShare";
import CalendarComponent from "../module/calendar/CalendarComponent";

import IdeaList from "../templates/IdeaList";
import ProjectHeader from "./ProjectHeader";
import ProjectInfo from "./ProjectInfo";
import styled from "styled-components";

const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  root: {
    backgroundColor: "transparent",
    padding: "0",
  },

  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    // overflow: "hidden",
    padding: "0",
  },

  engagement: {
    paddingRight: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    color: "black",
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
    paddingRight: "2%",
    width: "100%",
  },
  locationIcon: {
    marginTop: "-3px",
    paddingRight: "2px",
    float: "left",
    color: "rgb(255, 205, 6)",
  },

  commentHeader: {
    fontFamily: "Futura PT W01-Bold",
    marginLeft: "5vw",
    paddingTop: "1em",
    paddingBottom: "1em",
    color: "#414345",
  },
  KontaktButton: {
    position: "absolute",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    top: "265vh",
    borderRadius: "100px",
    color: "#414345",
    backgroundColor: "white",
    textTransform: "none",
    fontSize: "14pt",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
  },

  mapPlaceholder: {
    position: "relative",
    width: "100vw",
    zIndex: 0,
    height: "52vh",
    backgroundColor: "lightgrey",
    overflow: "hidden",
  },

  card2: {
    zIndex: "99",
    position: "relative",
    display: "flex",
    marginTop: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
    borderRadius: 20,
    minHeight: "auto",

    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
  },
  vertline: {
    width: "4px",
    position: "relative",
    backgroundColor: "#414345",
    height: "10px",
    marginLeft: "-2px",
    left: "50vw",
    zIndex: "0",
  },
};

class ProjectDialog extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    open: false,
    clicked: false,
    oldPath: "",
    newPath: "",
    path: "",
    order: 1,

    latitude1: 51.08,
    latitude2: 50.79,
    longitude2: 6.712,
    longitude3: 7.17,

    screamIdParam: null,
    dropdown: "newest",
    selectedId: "",

    dialogStyle: {},
    viewport: {
      zIndex: 9999,
      position: "fixed",
      top: "0vh",
      left: "0vw",
      width: "100vw",
      height: "100vh",
      latitude: 50.93,
      longitude: 6.9503,
      zoom: 9.2,
      maxZoom: 18,
      minZoom: 8,
    },
  };

  componentDidMount() {
    if (this.props.openProject) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    this.props.handleTopicSelector("all");

    let oldPath = window.location.pathname;
    this.setState({
      oldPath,
    });
    setTimeout(() => {
      const { project } = this.props.project;
      const newPath = `/${project}`;

      if (project !== undefined) {
        window.history.pushState(null, null, newPath);
      }

      setTimeout(() => {
        this.setState({
          path: "https://senf.koeln" + newPath,
        });
      }, 10);

      if (this.props.project.centerLong !== undefined) {
        setTimeout(() => {
          const centerLat = this.props.project.centerLat;
          const centerLong = this.props.project.centerLong;
          const zoom = this.props.project.zoom;

          this.zoomToBounds(centerLat, centerLong, zoom);
        }, 600);
      }

      setTimeout(() => {
        this.setState({
          dialogStyle: { position: "initial" },
        });
      }, 2000);
    }, 10);
  };

  handleClose = () => {
    this.props.closeProject();
    this.props.clearErrors();

    setTimeout(() => {
      this.setState({
        dialogStyle: {},
      });
    }, 1000);
  };

  // onSwipeMove(position) {
  //   if (`${position.x}` > 150) {
  //     this.handleClose();
  //   }
  //   var el = document.querySelector(".wrapperScreamDialog");
  //   if (el.scrollTop < 5) {
  //     if (`${position.y}` > 250) {
  //       this.handleClose();
  //     }
  //   }
  //   this.props.clearErrors();
  // }

  handleClick = (order) => {
    this.setState({
      order,
    });
    this.props.clearErrors();
  };

  handleDropdown = (value) => {
    this.setState({
      dropdown: value,
    });
  };

  zoomToBounds = (centerLat, centerLong, zoom) => {
    const viewport = {
      latitude: centerLat,
      longitude: centerLong,
      zoom: zoom,
      transitionDuration: 1000,
      pitch: 30,
      bearing: 0,
    };
    this.props.setMapViewport(viewport);
  };

  render() {
    const {
      classes,

      UI: { loading },
      project: {
        title,
        owner,
        imgUrl,
        description,
        startDate,
        endDate,
        geoData,
        weblink,
        contact,
        calendar,
      },
      screamIdParam,

      viewport,
      handleTopicSelector,
      topicsSelected,
      projectsData,
      loadingProjects,
    } = this.props;

    const dataRar = this.props.project.screams;

    const dataFinal = dataRar.filter(
      ({ Thema, status, lat, long }) =>
        topicsSelected.includes(Thema) &&
        lat <= this.props.data.mapBounds.latitude1 &&
        lat >= this.props.data.mapBounds.latitude2 &&
        long >= this.props.data.mapBounds.longitude2 &&
        long <= this.props.data.mapBounds.longitude3 &&
        status === "None"
    );

    const dialogMarkup = loading ? (
      <div className="wrapperScreamDialog">
        <div className="spinnerDiv">
          <img src={lamploader} className="lamploader" alt="LikeIcon" />
        </div>
      </div>
    ) : (
      <div className="wrapperScreamDialog">
        <ProjectHeader
          imgUrl={imgUrl}
          title={title}
          loading={loading}
          calendar={calendar}
          order={this.state.order}
          path={this.state.path}
          project={this.props.project}
          handleClose={this.handleClose}
          handleClick={this.handleClick}
        />

        {!loading && this.state.order === 1 && (
          <div className="MainAnimationChannels">
            <IdeaList
              loading={loading}
              order={this.state.order}
              classes={classes}
              dataFinal={dataFinal}
              geoData={geoData}
              viewport={viewport}
              handleDropdown={this.handleDropdown}
              projectsData={projectsData}
              loadingProjects={loadingProjects}
              project={this.props.project}
              dropdown={this.state.dropdown}
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
            ></IdeaList>
          </div>
        )}
        {this.state.order === 2 && (
          <React.Fragment>
            {isMobileCustom && <Break />}

            <div className="MainAnimationChannels">
              <ProjectInfo
                description={description}
                weblink={weblink}
                contact={contact}
                startDate={startDate}
                endDate={endDate}
                owner={owner}
              />
              <br />
            </div>
          </React.Fragment>
        )}
        {this.state.order === 3 && (
          <React.Fragment>
            {isMobileCustom && <Break />}
            <div className="MainAnimationChannels">
              <CalendarComponent
                projectScreams={this.props.project.screams}
              ></CalendarComponent>
            </div>
          </React.Fragment>
        )}
      </div>
    );

    return isMobileCustom ? (
      <Dialog
        open={this.props.openProject}
        onClose={this.handleClose}
        TransitionComponent={Transition}
        fullScreen
      >
        {dialogMarkup}
      </Dialog>
    ) : (
      <Dialog
        open={this.props.openProject}
        onClose={this.handleClose}
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
        TransitionComponent={Transition}
        fullScreen
        hideBackdrop // Disable the backdrop color/image
        disableEnforceFocus // Let the user focus on elements outside the dialog
        style={this.state.dialogStyle} // This was the key point, reset the position of the dialog, so the user can interact with other elements
        disableBackdropClick // Remove the backdrop click (just to be sure)
      >
        <div className="contentWrapper_dialog">{dialogMarkup}</div>
      </Dialog>
    );
  }
}

ProjectDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  closeScream: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
  closeProject: PropTypes.func.isRequired,
  setMapViewport: PropTypes.func.isRequired,
  setMapBounds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  project: state.data.project,
  data: state.data,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  clearErrors,
  closeScream,
  closeProject,
  setMapViewport,
  setMapBounds,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProjectDialog));
