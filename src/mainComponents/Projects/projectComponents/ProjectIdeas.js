/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ToggleDisplay from "react-toggle-display";
import lamploader from "../../../images/lamp.png";
import Geofilter from "../../../components/map/Geofilter";
import Arrow from "../../../images/icons/sort.png";

import Scream from "../../../components/scream/Scream";

import NativeSelect from "@material-ui/core/NativeSelect";
import _ from "lodash";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import TopicFilter from "../../../components/layout/TopicFilter";

import "./ProjectIdeas.css";

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

export class ProjectIdeas extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      classes,
      loading,
      dropdown,
      projectScreams,

      viewport,
      latitude1,
      longitude1,
      latitude2,
      longitude2,
      latitude3,
      longitude3,
      latitude4,
      longitude4,
      handleRevert,
      _onViewportChange,
      onClick,

      handleDropdown,

      handleTopicSelector,
      topicsSelected,

      handleOpenGeofilter,
      handleCloseGeofilter,
      handleResetGeofilter,
      openGeofilter,
      showGeofilterResults,
      createGeofilterCircle,
      dataNoLocationHandle,
      selectedId,
      noLocation,

      loadingProjects,
      geoData,
    } = this.props;

    //

    const dataFinalChannel = projectScreams.filter(
      ({ Thema, lat, long, status }) =>
        topicsSelected.includes(Thema) &&
        lat <= latitude1 &&
        lat >= latitude2 &&
        long >= longitude2 &&
        long <= longitude3 &&
        status === "None"
    );

    let recentScreamsMarkup = _.orderBy(
      dataFinalChannel,
      "createdAt",
      "desc"
    ).map((scream) => <Scream key={scream.screamId} scream={scream} />);

    let HotScreamsMarkup = _.orderBy(dataFinalChannel, "likeCount", "desc").map(
      (scream) => <Scream key={scream.screamId} scream={scream} />
    );

    let screamLength = dataFinalChannel.length;

    let noMoreScreamsMarkup =
      !loading && screamLength > 0 ? (
        <div className="ende">
          ... <br /> Keine weiteren Ideen <br />
        </div>
      ) : !loading && screamLength !== projectScreams.length ? (
        <div className="no-ideas-yet">
            Mit den ausgewählten Filtern findest du noch keine Ideen.
        </div>
      ) : (
        <div className="no-ideas-yet">
           Zu diesem Projektraum wurde bisher noch keine Idee geteilt. Sei
          die/der erste und teile deine Idee!
        </div>
      );

    return !loading ? (
      <div className="projectIdeascontent">
        <div className="projectHeader">
          <div className="FilterComponentMobile">
            <TopicFilter
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
            ></TopicFilter>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            <div className="idea-header">
              <ToggleDisplay show={dropdown === "10" || dropdown === "20"}>
                <img
                  src={lamploader}
                  width="50px"
                  style={{ transform: "translateY(10px) rotate(30deg)" }}
                  alt="lamploader"
                ></img>
                {screamLength} Ideen{" "}
              </ToggleDisplay>
            </div>

            <MuiThemeProvider theme={theme}>
              <NativeSelect
                value={dropdown}
                onChange={handleDropdown}
                name="dropdown"
                className="formControl"
                inputProps={{ "aria-label": "dropdown" }}
                id="dropdown"
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
                <option value={10} className={classes.formText}>
                  neuste
                </option>
                <option value={20}>schärfste</option>
                {/* <option value={30}>umgesetzte</option>
                  <option value={40}>verworfene</option> */}
              </NativeSelect>
            </MuiThemeProvider>
          </div>
        </div>

        <Geofilter
          dataFinal={dataFinalChannel}
          latitude1={latitude1}
          latitude2={latitude2}
          latitude3={latitude3}
          latitude4={latitude4}
          longitude1={longitude1}
          longitude2={longitude2}
          longitude3={longitude3}
          longitude4={longitude4}
          viewport={viewport}
          _onViewportChange={_onViewportChange}
          onClick={onClick}
          handleRevert={handleRevert}
          noLocation={noLocation}
          handleOpenGeofilter={handleOpenGeofilter}
          handleCloseGeofilter={handleCloseGeofilter}
          handleResetGeofilter={handleResetGeofilter}
          openGeofilter={openGeofilter}
          showGeofilterResults={showGeofilterResults}
          createGeofilterCircle={createGeofilterCircle}
          dataNoLocationHandle={dataNoLocationHandle}
          selectedId={selectedId}
          noLocation={noLocation}
          loadingProjects={loadingProjects}
          geoData={geoData}
          handleTopicSelector={handleTopicSelector}
          topicsSelected={topicsSelected}
        />

        <ToggleDisplay show={dropdown === "10"}>
          <div className={dropdown === "10" ? "MainAnimation" : ""}>
            {recentScreamsMarkup}
            {noMoreScreamsMarkup}
          </div>
        </ToggleDisplay>
        <ToggleDisplay show={dropdown === "20"}>
          <div className={dropdown === "20" ? "MainAnimation" : ""}>
            {HotScreamsMarkup}
            {noMoreScreamsMarkup}
          </div>
        </ToggleDisplay>
      </div>
    ) : null;
  }
}
ProjectIdeas.propTypes = {};

const mapActionsToProps = {};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProjectIdeas));
