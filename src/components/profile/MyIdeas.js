/** @format */

import React, { Component } from "react";

import ToggleDisplay from "react-toggle-display";
import lamploader from "../../images/lamp.png";
import Geofilter from "../map/Geofilter";
import Scream from "../scream/Scream";

import _ from "lodash";

import TopicFilter from "../layout/TopicFilter";
import { isMobileCustom } from "../../util/customDeviceDetect";
import SortingSelect from "../module/SortingSelect";

const MyIdeas = ({
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
  handleNoLocation,
}) => {
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

  let noMoreScreamsMarkup =
    !loading && MyDataFinal.length > 0 ? (
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
            <ToggleDisplay
              show={dropdown === "newest" || dropdown === "hottest"}
            >
              <img
                src={lamploader}
                width="50px"
                style={{ transform: "translateY(10px) rotate(30deg)" }}
                alt="lamploader"
              ></img>
              {MyDataFinal.length} Ideen{" "}
            </ToggleDisplay>
          </div>

          <SortingSelect handleDropdown={handleDropdown} />
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
        handleNoLocation={handleNoLocation}
        handleOpenGeofilter={handleOpenGeofilter}
        handleCloseGeofilter={handleCloseGeofilter}
        handleResetGeofilter={handleResetGeofilter}
        openGeofilter={openGeofilter}
        showGeofilterResults={showGeofilterResults}
        createGeofilterCircle={createGeofilterCircle}
        dataNoLocationHandle={dataNoLocationHandle}
        selectedId={selectedId}
        handleTopicSelector={handleTopicSelector}
        topicsSelected={topicsSelected}
      />

      <ToggleDisplay show={dropdown === "newest"}>
        <div className={dropdown === "newest" ? "MainAnimation" : ""}>
          {recentScreamsMarkup}
          {noMoreScreamsMarkup}
        </div>
      </ToggleDisplay>
      <ToggleDisplay show={dropdown === "hottest"}>
        <div className={dropdown === "hottest" ? "MainAnimation" : ""}>
          {HotScreamsMarkup}
          {noMoreScreamsMarkup}
        </div>
      </ToggleDisplay>
    </div>
  ) : null;
};

export default MyIdeas;
