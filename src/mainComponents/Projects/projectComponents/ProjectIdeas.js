/** @format */

import React from "react";
import ToggleDisplay from "react-toggle-display";
import _ from "lodash";
import { isMobileCustom } from "../../../util/customDeviceDetect";

//Components
import Geofilter from "../../../components/map/Geofilter";
import Scream from "../../../components/scream/Scream";
import TopicFilter from "../../../components/layout/TopicFilter";
import SortingSelect from "../../../components/module/SortingSelect";

//Images
import lamploader from "../../../images/lamp.png";

const ProjectIdeas = ({
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
}) => {
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

  let noMoreScreamsMarkup =
    !loading && dataFinalChannel.length > 0 ? (
      <div className="ende">
        ... <br /> Keine weiteren Ideen <br />
      </div>
    ) : !loading && dataFinalChannel.length !== projectScreams.length ? (
      <div className="no-ideas-yet">
          Mit den ausgewählten Filtern findest du noch keine Ideen.
      </div>
    ) : (
      <div className="no-ideas-yet">
         Zu diesem Projektraum wurde bisher noch keine Idee geteilt. Sei die/der
        erste und teile deine Idee!
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
              {dataFinalChannel.length} Ideen{" "}
            </ToggleDisplay>
          </div>

          <SortingSelect dropdown={dropdown} handleDropdown={handleDropdown} />
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
};

export default ProjectIdeas;
