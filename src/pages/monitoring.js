/** @format */

import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { isMobileCustom } from "../util/customDeviceDetect";

//Redux
import { connect } from "react-redux";
import { getAllFullScreams } from "../redux/actions/monitoringScreamActions";
import { getProjects, closeProject } from "../redux/actions/projectActions";

import { logoutUser } from "../redux/actions/userActions";
import { clearErrors } from "../redux/actions/errorsActions";

//ICONS
import Not_connected from "../images/Not_connected.png";

import { MonitoringDesktopSidebar } from "../components/module/Navigation/MonitoringDesktopSidebar";

import _ from "lodash";
import ToggleDisplay from "react-toggle-display";
import IdeaCardMonitoring from "../components/module/ListItems/IdeaCardMonitoring";

import { ExportToExcel } from "../components/module/CustomButtons/ExportToExcel";

import ChatBorder from "../images/icons/chat.png";
import LikeIcon from "../images/icons/handsnoclap.png";
import CreatedAtIcon from "../images/icons/calendar.png";
import MonitoringEditScream from "../components/monitoringScream/MonitoringEditScream";
import SortingSelect from "../components/module//Selects/SortingSelect";
import Select from "../components/module/Selects/Select";

const styles = {};

export class monitoring extends Component {
  // TOGGLES
  constructor(props) {
    super(props);
    this.props.getAllFullScreams();
    this.props.getProjects();

    this.state = {
      order: 1,
      project: "",

      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
      loadingPage: false,
      hasNextPage: true,
      userHandle: this.props.user.credentials.handle,
      screamIdParam: null,
      projectIdParam: null,
      count: 0,
      dropdown: "10",
      channelOrder: 1,

      openScream: false,
      openProject: false,

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
  }

  componentDidMount() {
    this.props.clearErrors();
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }

  componentWillUnmount() {
    if (!isMobileCustom) {
      window.removeEventListener("popstate", this.handleOnUrlChange, false);
    }
  }

  handleClick = (order) => {
    this.setState({
      order,
      screamIdParam: null,
    });

    this.props.closeScream();
    this.props.closeProject();

    if (order === 2) {
      window.history.pushState(null, null, "/projects");
    }
  };

  handleChannelClick = (channelOrder) => {
    this.setState({
      order: 1,
      channelOrder,
      screamIdParam: null,
    });
    this.props.closeScream();

    window.scrollTo({
      top: 0,
      left: 0,
    });
  };

  handleDropdown = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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

  render() {
    const { full_screams, loading, projects, loadingProjects } =
      this.props.data;

    console.log(this.props.data);
    const {
      latitude1,
      latitude2,
      longitude2,
      longitude3,

      dropdown,
    } = this.state;

    const {
      classes,
      user: { authenticated },
    } = this.props;

    const error =
      !loading && full_screams.length === 0 ? (
        <div className="errorBackground">
               <div className="homeHeader"> Ooops! </div>
          <br />
          <span className="oopsText">
            Etwas ist schiefgelaufen. Bitte lade die Seite neu!
          </span>
        </div>
      ) : null;

    const dataFinal = full_screams.filter(
      ({ Thema, lat, long, status }) =>
        this.state.topicsSelected.includes(Thema) &&
        lat <= this.state.latitude1 &&
        lat >= this.state.latitude2 &&
        long >= this.state.longitude2 &&
        long <= this.state.longitude3 &&
        status === "None"
    );

    let HotScreamsMarkup = _.orderBy(dataFinal, "likeCount", "desc").map(
      (scream) => (
        <IdeaCardMonitoring
          loading={loading}
          key={scream.screamId}
          scream={scream}
          projectsData={projects}
        />
      )
    );

    let recentScreamsMarkup = _.orderBy(dataFinal, "createdAt", "desc").map(
      (scream) => (
        <IdeaCardMonitoring
          loading={loading}
          key={scream.screamId}
          scream={scream}
          projectsData={projects}
        />
      )
    );

    let screamLength = dataFinal.length;

    let noMoreScreamsMarkup =
      !loading && screamLength > 0 ? (
        <div className="ende">
          ... <br /> Keine weiteren Ideen <br />
        </div>
      ) : (
        <span className={classes.inlineText}>
           Mit den ausgewählten Filtern findest du noch keine Ideen.
        </span>
      );

    const content = !loading ? (
      <React.Fragment>
        <ToggleDisplay show={dropdown === "10"}>
          <div>
            {recentScreamsMarkup}
            {noMoreScreamsMarkup}
          </div>
        </ToggleDisplay>
        <ToggleDisplay show={dropdown === "20"}>
          <div>
            {HotScreamsMarkup}
            {noMoreScreamsMarkup}
          </div>
        </ToggleDisplay>
      </React.Fragment>
    ) : (
      <div className="no-ideas-yet" style={{ marginTop: "100px" }}>
        {" "}
        Lade Daten...{" "}
      </div>
    );

    const projectsArray = projects ? (
      <Fragment>
        {_.orderBy(projects, "createdAt", "desc").map((projects) => (
          <option value={projects.project}> {projects.title}</option>
        ))}
      </Fragment>
    ) : null;

    const topicsArray = (
      <Fragment>
        <option value={"Inklusion / Soziales"} className={classes.formText}>
          Rodenkirchen
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
      </Fragment>
    );

    return (
      <div>
        {error}

        <MonitoringDesktopSidebar
          loading={this.state.loading}
          authenticated={authenticated}
          handleClick={this.handleClick}
          handleChannelClick={this.handleChannelClick}
          order={this.state.order}
          channelOrder={this.state.channelOrder}
          handleTopicSelector={this.handleTopicSelector}
          topicsSelected={this.state.topicsSelected}
          loadingProjects={loadingProjects}
          projectsData={projects}
        ></MonitoringDesktopSidebar>

        <div
          style={{
            marginLeft: "200px",
            width: "calc(100vw - 640px)",
            position: "fixed",
            top: "0",
            zIndex: "99",
            backgroundColor: "#ffd19b",
            height: "110px",
          }}
        >
          <div
            style={{
              position: "relative",
              marginLeft: "0px",

              marginTop: "20px",
              zIndex: 9,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginLeft: "10px",
                fontFamily: "Playfair Display",
                fontSize: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#414345",
              }}
            >
              <select
                name="project"
                id="project"
                value={this.state.project}
                onChange={this.handleDropdown}
                style={{
                  fontSize: 20,
                  height: "40px",
                  width: "250px",
                  border: 0,
                  backgroundColor: "transparent",
                  fontFamily: "PlayfairDisplay-Bold",
                  pointerEvents: "none",
                  color: "#353535",
                }}
              >
                <option value="">Allgemein (Alle Ideen)</option>
                {projectsArray}
              </select>
              <select
                name="project"
                id="project"
                value={this.state.project}
                onChange={this.handleDropdown}
                style={{
                  fontSize: 0,
                  height: "40px",
                  marginLeft: "-50px",
                  width: "40px",
                  border: 0,
                  background:
                    "linear-gradient(90deg, rgba(255,209,155,0) 0%, rgba(255,209,155,1) 59%, rgba(255,209,155,1) 100%)",
                  transform: "scale(1.5) ",
                }}
              >
                <option value="">Allgemein (Alle Ideen)</option>
                {projectsArray}
              </select>
            </div>
            <div
              style={{
                marginLeft: "auto",
              }}
            >
              <Select
                name={"topic"}
                value={this.state.topic}
                initialValue={"Alle Bezirke"}
                valuesArray={topicsArray}
                handleDropdown={this.handleDropdownTopic}
              />
            </div>
            <div
              style={{
                marginLeft: "10px",
              }}
            >
              <SortingSelect handleDropdown={this.handleDropdown} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "10px",

              position: "relative",
              marginTop: "15px",
              height: "35px",
              borderBottom: "1px solid #353535",

              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "300px",
                margin: "10px",

                marginLeft: "50px",
              }}
            >
              Titel{" "}
            </div>
            <div style={{ width: "110px", margin: "10px" }}> Ort </div>
            <div style={{ width: "110px", margin: "10px" }}> Nutzer:in </div>

            <div
              style={{
                width: "20px",
                margin: "10px",
                marginTop: "5px",
                marginLeft: "5px",
              }}
            >
              <img alt="like-icon" src={LikeIcon} width="20px"></img>{" "}
            </div>
            <div style={{ width: "20px", margin: "10px", marginTop: "8px" }}>
              <img alt="comments-icon" src={ChatBorder} width="20px"></img>{" "}
            </div>
            <div
              style={{
                width: "70px",
                margin: "10px",
                marginTop: "8px",
                textAlign: "center",
              }}
            >
              <img alt="calendar-icon" src={CreatedAtIcon} width="20px"></img>{" "}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "120px",
            marginLeft: "210px",
            width: "calc(100vw - 650px)",
          }}
        >
          {content}
        </div>

        <div className="monitoringBottombar">
          <ExportToExcel
            apiData={dataFinal}
            fileName={"hi"}
            dataFinal={dataFinal}
          />
        </div>

        <div
          style={{
            position: "fixed",
            zIndex: 99,
            right: "20px",

            width: "400px",
            height: "calc(100vh - 40px)",

            bottom: "20px",
            backgroundColor: "white",

            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src={Not_connected}
            width="90%"
            alt="no-selected-idea-illustration"
            style={{ marginBottom: "50px" }}
          ></img>
          <div className="no-ideas-yet">
            Wähle eine Idee aus, um diesen Bereich zu aktivieren
          </div>
          {this.props.UI.openMonitoringScream && <MonitoringEditScream />}
        </div>
      </div>
    );
  }
}

monitoring.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getAllFullScreams: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  openDialog: PropTypes.bool,
  getProjects: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  closeProject: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  logoutUser,
  getAllFullScreams,
  clearErrors,
  getProjects,
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
)(withStyles(styles)(monitoring));
