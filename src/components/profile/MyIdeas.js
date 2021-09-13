/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";

import ToggleDisplay from "react-toggle-display";
import lamploader from "../../images/lamp.png";
import Geofilter from "../map/Geofilter";
import Arrow from "../../images/icons/sort.png";

import Scream from "../scream/Scream";

import NativeSelect from "@material-ui/core/NativeSelect";
import _ from "lodash";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import TopicFilter from "../layout/TopicFilter";
import { isMobileCustom } from "../../util/customDeviceDetect";
import SortingSelect from "../module/SortingSelect";

const styles = {
  inlineText: {
    fontFamily: "Futura PT W01-Bold",
    position: "absolute",
    fontSize: "15pt",
    color: "#414345",
    width: "80vw",
    marginLeft: "10vw",
    textAlign: "center",
    zIndex: "10",
  },
};

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

export class MyIdeas extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      classes,
      loading,
      dropdown,

      myScreams,

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

      showTitles,
      _onViewportChangeDesktop,
    } = this.props;

    //

    const MyDataFinal = myScreams.filter(
      ({ Thema, lat, long, status }) =>
        topicsSelected.includes(Thema) &&
        lat <= latitude1 &&
        lat >= latitude2 &&
        long >= longitude2 &&
        long <= longitude3 &&
        status === "None"
    );

    let recentScreamsMarkup = _.orderBy(MyDataFinal, "createdAt", "desc").map(
      (scream) => <Scream key={scream.screamId} scream={scream} />
    );

    let HotScreamsMarkup = _.orderBy(MyDataFinal, "likeCount", "desc").map(
      (scream) => <Scream key={scream.screamId} scream={scream} />
    );

    let screamLength = MyDataFinal.length;

    let noMoreScreamsMarkup =
      !loading && screamLength > 0 ? (
        <div className="ende">
          ... <br /> Keine weiteren Ideen <br />
        </div>
      ) : myScreams === undefined ? (
        <div className="no-ideas-yet">
          Du hast bisher noch keine Idee geteilt. Es gibt noch so viele Ideen da
          draußen & du bist kreativ! Teile deine Ideen!
        </div>
      ) : (
        <div className="no-ideas-yet">
           Zu den ausgewählten Filtern hast du noch keine Ideen geteilt.
        </div>
      );
    return !loading ? (
      <div className="projectIdeascontent">
        <div className="projectHeader">
          {isMobileCustom && (
            <TopicFilter
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
            ></TopicFilter>
          )}

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

            <SortingSelect
              dropdown={dropdown}
              handleDropdown={handleDropdown}
            />
          </div>
        </div>

        <Geofilter
          dataFinal={MyDataFinal}
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
MyIdeas.propTypes = {};

const mapActionsToProps = {};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(MyIdeas));
