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
import ProjectHeader from "../module/Navigation/ProjectHeader";
import ProjectInfo from "./ProjectInfo";
import styled from "styled-components";

const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;

  @media (min-width: 768px) {
    height: 30px;
  }
`;

const BackgroundMobile = styled.div`
  position: absolute;
  margin-top: -10px;
  height: 110%;
  width: 100vw;
  border-radius: 20px 20px 0 0;
  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 70%
  );
  z-index: 0;
  box-shadow: 0 8px 20px 12px rgba(0, 0, 0, 0.1);
`;

const BackgroundDesktop = styled.div`
  position: fixed;
  margin-top: 0px;
  top: 0;
  height: 100%;
  width: 400px;
  border-radius: 0px 0px 0 0;
  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 100%
  );
  z-index: 0;
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
};

class ProjectDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
    path: "",
    order: 1,
    screamIdParam: null,
    dropdown: "newest",
    dialogStyle: {},
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
          const zoom = isMobileCustom
            ? this.props.project.zoom - 2
            : this.props.project.zoom;

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

    const viewport = {
      latitude: 50.95,
      longitude: 6.9503,
      zoom: isMobileCustom ? 9.5 : 11.5,
      transitionDuration: 4000,
      pitch: 30,
      bearing: 0,
    };
    this.props.setMapViewport(viewport);

    setTimeout(() => {
      this.setState({
        dialogStyle: {},
      });
    }, 1000);
  };

  handleClick = (order) => {
    this.setState({
      order,
    });

    if (order === 2) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

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
      viewport,
      handleTopicSelector,
      topicsSelected,
      projectsData,
      loadingProjects,
      dataFinalMap,
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

    return (
      this.props.openProject && (
        <div className="projectDialog">
          {isMobileCustom ? <BackgroundMobile /> : <BackgroundDesktop />}
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

          {this.state.order === 1 && (
            <div className="MainAnimationChannels">
              <IdeaList
                type="projectIdeas"
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
                dataFinalMap={dataFinalMap}
              ></IdeaList>
            </div>
          )}
          {this.state.order === 2 && (
            <React.Fragment>
              <Break />

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
              <Break />
              <div className="MainAnimationChannels">
                <CalendarComponent
                  projectScreams={this.props.project.screams}
                ></CalendarComponent>
              </div>
            </React.Fragment>
          )}
        </div>
      )
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
