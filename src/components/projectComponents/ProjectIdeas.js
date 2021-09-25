/** @format */

import React from "react";
import { useSelector } from "react-redux";
import ToggleDisplay from "react-toggle-display";
import _ from "lodash";
import { isMobileCustom } from "../../util/customDeviceDetect";
import styled from "styled-components";

//Components
import Geofilter from "../map/Geofilter";
import Scream from "../scream/Scream";
import TopicFilter from "../layout/TopicFilter";

//Images
import ListHeader from "../module/Headers/ListHeader";

const MobileFilterAndMapWrapper = styled.div`
  margin-top: 0px;
  margin-left: 2.5%;
  width: 95%;
  z-index: 9;
`;

const ProjectIdeas = ({
  loading,
  dropdown,
  projectScreams,
  handleDropdown,

  viewport,
  _onViewportChange,

  loadingProjects,
  geoData,

  topicsSelected,
  handleTopicSelector,
}) => {
  const { mapBounds } = useSelector((state) => state.data);

  const dataFinalChannel = projectScreams.filter(
    ({ Thema, lat, long, status }) =>
      topicsSelected.includes(Thema) &&
      lat <= mapBounds.latitude1 &&
      lat >= mapBounds.latitude2 &&
      long >= mapBounds.longitude2 &&
      long <= mapBounds.longitude3 &&
      status === "None"
  );

  console.log(mapBounds);
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
      {isMobileCustom && (
        <MobileFilterAndMapWrapper>
          <TopicFilter
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
          ></TopicFilter>

          <Geofilter
            dataFinal={dataFinalChannel}
            viewport={viewport}
            _onViewportChange={_onViewportChange}
            loadingProjects={loadingProjects}
            geoData={geoData}
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
          />
        </MobileFilterAndMapWrapper>
      )}

      <ListHeader
        loading={loading}
        handleDropdown={handleDropdown}
        dataFinal={dataFinalChannel}
        marginTop={document.body.clientWidth > 768 ? "40px" : "0"}
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

export default ProjectIdeas;
