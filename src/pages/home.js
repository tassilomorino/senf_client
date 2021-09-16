/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getScreams,
  closeScream,
  openScream,
} from "../redux/actions/screamActions";
import {
  getProjects,
  openProject,
  closeProject,
} from "../redux/actions/projectActions";

import { isMobileCustom } from "../util/customDeviceDetect";

import { logoutUser } from "../redux/actions/userActions";
import { clearErrors } from "../redux/actions/errorsActions";

//ICONS
import lamploader from "../images/lamp.png";
import PostScream from "../components/postScream/PostScream";

import Appbar from "../components/layout/Appbar";

import InsightsPage from "../components/templates/InsightsPage";
import DesktopSidebar from "../components/layout/DesktopSidebar";

import Cookies from "universal-cookie";
import Topbar from "../components/layout/Topbar";
import MapDesktop from "../components/map/MapDesktop";
import AllIdeasPage from "../components/templates/AllIdeasPage";
import ProjectsPage from "../components/templates/ProjectsPage";
import ScreamDialog from "../components/scream/ScreamDialog";
import ProjectDialog from "../components/projectComponents/ProjectDialog";

const cookies = new Cookies();

const styles = {};

export class home extends Component {
  // TOGGLES
  constructor(props) {
    super(props);
    this.props.getScreams();
    this.props.getProjects();

    this.state = {
      order: 1,

      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
      screamIdParam: null,
      dropdown: "newest",
      selectedId: "",
      showTitles: false,
      cookiesSetDesktop: false,

      openGeofilter: false,
      showGeofilterResults: false,
      createGeofilterCircle: false,
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

      topicsSelected: [
        "Verkehr",
        "Versorgung",
        "Umwelt und Grün",
        "Rad",
        "Inklusion / Soziales",
        "Sport / Freizeit",
        "Sonstige",
      ],
    };

    if (
      cookies.get("Cookie_settings") !== "all" &&
      cookies.get("Cookie_settings") !== "minimum" &&
      isMobileCustom
    ) {
      this.props.history.push("/intro");
    }
  }

  componentDidMount() {
    this.props.clearErrors();
    window.scrollTo({
      top: 0,
      left: 0,
    });

    if (!this.props.UI.openInfoPage) {
      this.openDialogFromUrl();
    }

    setTimeout(() => {
      this.setState({
        viewport: {
          latitude: 50.95,
          longitude: 6.9503,
          zoom: 11.5,
          transitionDuration: 4000,
          pitch: 30,
          bearing: 0,
        },
      });
    }, 3000);
    if (!isMobileCustom) {
      window.addEventListener("popstate", this.handleOnUrlChange, false);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.UI.openInfoPage !== this.props.UI.openInfoPage) {
      this.openDialogFromUrl();
    }
  }

  openDialogFromUrl() {
    const screamId = this.props.match.params.screamId;

    if (screamId) {
      if (screamId.indexOf("_") > 0) {
        this.props.openProject(screamId);
      } else {
        this.props.openScream(screamId);
      }
      this.setState({ screamIdParam: screamId });
    }
    if (window.location.pathname === "/projects") {
      this.handleClick(2);
    }
  }

  componentWillUnmount() {
    if (!isMobileCustom) {
      window.removeEventListener("popstate", this.handleOnUrlChange, false);
    }
  }

  handleOnUrlChange = () => {
    let coordinates = window.location.hash;

    let lat = Number(coordinates.split("#")[1]);
    let long = Number(coordinates.split("#")[2]);

    console.log(lat);

    if (coordinates.includes("infoPage")) {
      //nothing
    } else {
      setTimeout(() => {
        if ((lat < 50.95) | (lat > 50.82)) {
          this.setState({
            viewport: {
              zoom: 16.5,
              pitch: 30,
              latitude: lat,
              longitude: long,
            },
          });
        } else {
          this.props.history.push("/");
          window.location.reload();
        }
      }, 400);

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  handleClick = (order) => {
    this.setState({
      order,
      screamIdParam: null,
    });

    this.props.closeScream();
    this.props.closeProject();

    this.handleTopicSelector("all");

    if (order === 2) {
      window.history.pushState(null, null, "/projects");
    }

    if (order === 3) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  handleDropdown = (value) => {
    this.setState({
      dropdown: value,
    });
  };

  handleTopicSelector = (topic) => {
    const index = this.state.topicsSelected.indexOf(topic);
    if (topic === "all") {
      this.setState({
        topicsSelected: [
          "Verkehr",
          "Versorgung",
          "Umwelt und Grün",
          "Rad",
          "Inklusion / Soziales",
          "Sport / Freizeit",
          "Sonstige",
        ],
      });
    } else if (this.state.topicsSelected.length === 7) {
      this.setState({
        topicsSelected: [topic],
      });
    } else if (index === -1) {
      this.setState({
        topicsSelected: this.state.topicsSelected.concat(topic),
      });
    } else {
      this.state.topicsSelected.splice(index, 1);
      if (this.state.topicsSelected.length === 0) {
        this.setState({
          topicsSelected: [
            "Verkehr",
            "Versorgung",
            "Umwelt und Grün",
            "Rad",
            "Inklusion / Soziales",
            "Sport / Freizeit",
            "Sonstige",
          ],
        });
      } else {
        this.setState({
          topicsSelected: this.state.topicsSelected,
        });
      }
    }
  };

  _onViewportChange = (viewport) => {
    this.setState({ viewport, selectedId: "" });

    var metersPerPx =
      (156543.03392 *
        Math.cos((this.state.viewport.latitude * Math.PI) / 180)) /
      Math.pow(2, this.state.viewport.zoom);

    var Addnew = metersPerPx / 500;
    var Addnewtop = metersPerPx / 1000;
    var AddnewRight = metersPerPx / 500;
    var AddnewBottom = metersPerPx / 1000;

    this.setState({
      latitude1: this.state.viewport.latitude + Addnewtop,
      longitude1: this.state.viewport.longitude - Addnew,
      latitude2: this.state.viewport.latitude - AddnewBottom,
      longitude2: this.state.viewport.longitude - Addnew,
      latitude3: this.state.viewport.latitude + Addnewtop,
      longitude3: this.state.viewport.longitude + AddnewRight,
      latitude4: this.state.viewport.latitude - AddnewBottom,
      longitude4: this.state.viewport.longitude + AddnewRight,
    });
  };

  _onViewportChangeDesktop = (viewport) => {
    this.setState({ viewport, selectedId: "" });
  };

  zoomToBounds = (centerLat, centerLong, zoom) => {
    this.setState({
      viewport: {
        latitude: centerLat,
        longitude: centerLong,
        zoom: zoom,
        transitionDuration: 1000,
        pitch: 30,
        bearing: 0,
      },
    });
  };

  mapDesktopShowResults = (viewport) => {
    if (this.state.order === 2) {
      this.setState({ order: 1 });
    }

    var metersPerPx =
      (156543.03392 *
        Math.cos((this.state.viewport.latitude * Math.PI) / 180)) /
      Math.pow(2, this.state.viewport.zoom);

    var Addnew = metersPerPx / 200;
    var Addnewtop = metersPerPx / 200;
    var AddnewRight = metersPerPx / 200;
    var AddnewBottom = metersPerPx / 300;

    this.setState({
      latitude1: this.state.viewport.latitude + Addnewtop,
      latitude2: this.state.viewport.latitude - AddnewBottom,
      longitude2: this.state.viewport.longitude - Addnew,
      longitude3: this.state.viewport.longitude + AddnewRight,
      viewport: { ...viewport, pitch: 31 },
    });

    this.props.closeScream();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  mapDesktopReset = () => {
    this.setState({
      viewport: {
        zoom: 11.5,
        pitch: 30,
        latitude: 50.95,
        longitude: 6.9503,
      },
    });
    this.setState({
      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
    });

    this.props.closeScream();
  };

  handleCookies = (cookie_settings) => {
    cookies.set("Cookie_settings", cookie_settings, {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      sameSite: "none",
      secure: true,
    });
    this.setState({ cookiesSetDesktop: true });
  };

  handleNoLocation = () => {
    this.setState({
      latitude1: 50.93892,
      latitude2: 50.93864,
      longitude2: 6.9586,
      longitude3: 6.9588,

      openGeofilter: false,
      open: false,
    });
  };

  alertClick = (event) => {
    setTimeout(() => {
      alert(
        "Die Keywords werden erst Aussagekräftig wenn mehr Ideen geteilt werden"
      );
    }, 2500);
  };

  dataNoLocationHandle = () => {
    this.setState({
      selectedId: "hi",
    });
  };

  handleLogout = () => {
    this.props.logoutUser();
    this.setState({
      order: 1,
    });
  };

  deleteAccount = () => {
    const userHandle = this.props.user.credentials.handle;

    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Bitte um Account-loeschung") +
      "&body=" +
      escape(
        "Bitte loeschen Sie meinen Account." +
          "\n" +
          "\n" +
          "Mein Nutzername lautet:" +
          "\n" +
          "\n" +
          userHandle
      );
    window.location.href = link;
  };

  handleOpenGeofilter = () => {
    this.setState({
      openGeofilter: true,
      showGeofilterResults: false,
      createGeofilterCircle: false,
    });
  };

  handleCloseGeofilter = () => {
    this.setState({
      showGeofilterResults: true,

      openGeofilter: false,
      createGeofilterCircle: true,
    });

    setTimeout(() => {
      this.setState({});
    }, 1000);
  };

  handleResetGeofilter = () => {
    this.setState({
      showGeofilterResults: true,

      openGeofilter: false,
      createGeofilterCircle: true,
      viewport: {
        zIndex: 9999,
        position: "fixed",
        top: "0vh",
        left: "0vw",
        width: "100vw",
        height: "100vh",
        latitude: 50.93,
        longitude: 6.9503,
        zoom: 9.2 + 1.6,
        maxZoom: 18,
        minZoom: 8,
      },
      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
    });
  };

  render() {
    const { screams, loading, projects, loadingProjects } = this.props.data;
    const { classes } = this.props;

    const dataFinal = screams.filter(
      ({ Thema, lat, long, status }) =>
        this.state.topicsSelected.includes(Thema) &&
        lat <= this.state.latitude1 &&
        lat >= this.state.latitude2 &&
        long >= this.state.longitude2 &&
        long <= this.state.longitude3 &&
        status === "None"
    );

    const dataFinalMap = screams.filter(
      ({ Thema, status }) =>
        this.state.topicsSelected.includes(Thema) && status === "None"
    );

    return (
      <div>
        {!loading && screams.length === 0 && (
          <div className="errorBackground">
                 <div className="homeHeader"> Ooops! </div>
            <br />
            <span className="oopsText">
              Etwas ist schiefgelaufen. Bitte lade die Seite neu!
            </span>
          </div>
        )}
        <div className="appbar">
          <Appbar
            loading={this.state.loading}
            handleClick={this.handleClick}
            order={this.state.order}
          ></Appbar>
          <PostScream
            loadingProjects={loadingProjects}
            projectsData={projects}
          />
        </div>

        <Topbar
          loading={loading}
          handleClick={this.handleClick}
          order={this.state.order}
          handleTopicSelector={this.handleTopicSelector}
          topicsSelected={this.state.topicsSelected}
          deleteAccount={this.deleteAccount}
          handleLogout={this.handleLogout}
        />
        <DesktopSidebar
          loading={this.state.loading}
          handleClick={this.handleClick}
          order={this.state.order}
          handleTopicSelector={this.handleTopicSelector}
          topicsSelected={this.state.topicsSelected}
          handleCloseInfoPageDesktop={this.handleCloseInfoPageDesktop}
          cookiesSetDesktop={this.state.cookiesSetDesktop}
          handleCookies={this.handleCookies}
          deleteAccount={this.deleteAccount}
          handleLogout={this.handleLogout}
          loadingProjects={loadingProjects}
          projectsData={projects}
        ></DesktopSidebar>

        <MapDesktop
          loading={loading}
          loadingProjects={loadingProjects}
          dataFinal={dataFinalMap}
          id="mapDesktop"
          style={{ zIndex: 9999 }}
          handleNoLocation={this.handleNoLocation}
          dataNoLocationHandle={this.dataNoLocationHandle}
          _onViewportChangeDesktop={this._onViewportChangeDesktop}
          mapDesktopShowResults={this.mapDesktopShowResults}
          viewport={this.state.viewport}
          selectedId={this.state.selectedId}
          showTitles={this.state.showTitles}
          mapDesktopShowResults={this.mapDesktopShowResults}
          mapDesktopReset={this.mapDesktopReset}
        ></MapDesktop>

        {!this.props.UI.openInfoPage && (
          <div className="contentWrapper">
            {loading && (
              <div className="spinnerDivBackground">
                <img src={lamploader} className="lamploader" alt="loader" />
              </div>
            )}
            <div className="MainBackgroundHome" />

            <AllIdeasPage
              loading={loading}
              order={this.state.order}
              classes={classes}
              dataFinal={dataFinal}
              viewport={this.state.viewport}
              latitude1={this.state.latitude1}
              latitude2={this.state.latitude2}
              latitude3={this.state.latitude3}
              latitude4={this.state.latitude4}
              longitude1={this.state.longitude1}
              longitude2={this.state.longitude2}
              longitude3={this.state.longitude3}
              longitude4={this.state.longitude4}
              dataNoLocationHandle={this.dataNoLocationHandle}
              handleNoLocation={this.handleNoLocation}
              showDemand={this.state.showDemand}
              handleClick={this.state.handleClick}
              handleDropdown={this.handleDropdown}
              handleOpenGeofilter={this.handleOpenGeofilter}
              handleCloseGeofilter={this.handleCloseGeofilter}
              handleResetGeofilter={this.handleResetGeofilter}
              openGeofilter={this.state.openGeofilter}
              showGeofilterResults={this.state.showGeofilterResults}
              createGeofilterCircle={this.state.createGeofilterCircle}
              selectedId={this.state.selectedId}
              projectsData={projects}
              _onViewportChange={this._onViewportChange}
              dropdown={this.state.dropdown}
              handleTopicSelector={this.handleTopicSelector}
              topicsSelected={this.state.topicsSelected}
            ></AllIdeasPage>

            <ProjectsPage
              loadingProjects={loadingProjects}
              order={this.state.order}
              projects={projects}
            ></ProjectsPage>

            <InsightsPage order={this.state.order}></InsightsPage>

            <ScreamDialog
              screamIdParam={this.state.screamIdParam}
              projectsData={projects}
            ></ScreamDialog>

            {this.props.UI.openProject === true && (
              <ProjectDialog
                loading={loading}
                openProject={this.props.UI.openProject}
                screamIdParam={this.state.screamIdParam}
                _onViewportChangeDesktop={this._onViewportChangeDesktop}
                zoomToBounds={this.zoomToBounds}
                showTitles={this.state.showTitles}
                handleClick={this.handleClick}
                latitude1={this.state.latitude1}
                latitude2={this.state.latitude2}
                latitude3={this.state.latitude3}
                latitude4={this.state.latitude4}
                longitude1={this.state.longitude1}
                longitude2={this.state.longitude2}
                longitude3={this.state.longitude3}
                longitude4={this.state.longitude4}
                loadingProjects={loadingProjects}
                projectsData={projects}
                viewport={this.state.viewport}
                mapDesktopShowResults={this.mapDesktopShowResults}
                handleTopicSelector={this.handleTopicSelector}
                topicsSelected={this.state.topicsSelected}
              ></ProjectDialog>
            )}
          </div>
        )}
      </div>
    );
  }
}

home.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,

  openDialog: PropTypes.bool,

  getProjects: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,

  closeScream: PropTypes.func.isRequired,
  openScream: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
  closeProject: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  logoutUser,
  getScreams,
  clearErrors,
  getProjects,
  closeScream,
  openScream,
  openProject,
  closeProject,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(home));
