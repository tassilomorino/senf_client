/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AddIcon from "../../images/icons/plus_grey.png";

import { createMuiTheme } from "@material-ui/core";
import ProjectCards from "./projectComponents/ProjectCards";

import _ from "lodash";

const styles = {};

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
export class ProjectsPage extends Component {
  constructor(props) {
    super(props);
  }

  createProject = () => {
    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Projektraum-Anfrage") +
      "&body=" +
      escape(
        "Projektraum-Titel:" +
          "\n" +
          "\n" +
          "Worum geht's:" +
          "\n" +
          "\n" +
          "Projektzeitraum:" +
          "\n" +
          "\n" +
          "Logo + Cover-Bild:"
      );
    window.location.href = link;
  };

  render() {
    const {
      loadingProjects,
      order,

      projectsData,
      userHandle,
    } = this.props;

    let ProjectsDataFinal = [];

    projectsData.forEach((element) => {
      if (userHandle === "TomM") {
        ProjectsDataFinal.push(element);
      } else {
        if (element.createdAt !== "") {
          ProjectsDataFinal.push(element);
        }
      }
    });

    let projects = !loadingProjects ? (
      _.orderBy(ProjectsDataFinal, "createdAt", "desc").map((projects) => (
        <ProjectCards
          key={projects.project}
          project={projects}
          // screamIdParam={screamIdParam}
          // _onViewportChangeDesktop={_onViewportChangeDesktop}
          // showTitles={showTitles}
          // viewport={viewport}
          // zoomToBounds={zoomToBounds}
          // handleClick={handleClick}
          // latitude1={latitude1}
          // latitude2={latitude2}
          // latitude3={latitude3}
          // latitude4={latitude4}
          // longitude1={longitude1}
          // longitude2={longitude2}
          // longitude3={longitude3}
          // longitude4={longitude4}
          // openInfoPageDesktop={openInfoPageDesktop}
          // projectsData={projectsData}
          // loadingProjects={loadingProjects}
          // mapDesktopShowResults={mapDesktopShowResults}
        />
      ))
    ) : (
      <div className="MainAnimation">
        <div className="no-ideas-yet">Projekträume werden geladen...</div>
      </div>
    );

    const error =
      !loadingProjects && ProjectsDataFinal.length === 0 ? (
        <div className="MainAnimation">
          <div className="no-ideas-yet">
            Beim laden ist ein Fehler aufgetreten. Bitte refreshe die Seite...
          </div>
        </div>
      ) : null;

    return (
      <div className="MainAnimationChannels">
        <div
          style={
            order === 2
              ? { display: "block", width: "100%", minWidth: "100%" }
              : { display: "none", width: "100%", minWidth: "100%" }
          }
        >
          <div className="homeHeadermain"></div>

          <div className="MainAnimation">
            <div
              style={{
                fontSize: "14pt",
                color: "#414345",
                width: "90%",

                textAlign: "left",
                marginLeft: "5%",
                paddingBottom: "15px",
                zIndex: 0,
              }}
            >
              Gemeinsam mit Organisationen und Initiativen suchen wir zu
              spezifischen Themen/ Orten eure Ideen. In den jeweiligen
              Projekträumen könnt ihr die Ideen ansehen, kommentieren & neue
              eintragen!
            </div>
            <br />
            {projects}
            {error}
            <br />
            <br />
            <br />

            <div className="projectCard" onClick={this.createProject}>
              <div className="leftWrapper" style={{ opacity: 0.5 }}>
                <img
                  src={AddIcon}
                  alt="profile"
                  className="profile-image"
                  width="50%"
                  style={{ width: "50%", marginLeft: "25%" }}
                />
              </div>
              <div className="rightWrapper">
                <div className="owner"> Für Organisation/Initiativen </div>
                <div className="title"> Projektraum anfragen!</div>
                <div className="date">
                  Ihr möchtet zu einem spezifischen Thema/ Ort Ideen sammeln?
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}
ProjectsPage.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapActionsToProps = {};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProjectsPage));
