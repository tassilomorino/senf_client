/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";

import lamploader from "../../images/lamp.png";

import TopicFilter from "../../components/layout/TopicFilter";
import ToggleDisplay from "react-toggle-display";

import Geofilter from "../../components/map/Geofilter";
import Scream from "../../components/scream/Scream";

import _ from "lodash";
import { isMobileCustom } from "../../util/customDeviceDetect";
import SortingSelect from "../../components/module/SortingSelect";

export class AllIdeasPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      loading,
      order,
      dropdown,
      handleDropdown,
      _onViewportChange,
      handleRevert,
      openGeofilter,
      handleOpenGeofilter,
      handleCloseGeofilter,
      handleResetGeofilter,
      showGeofilterResults,
      createGeofilterCircle,
      latitude1,
      longitude1,
      latitude2,
      longitude2,
      latitude3,
      longitude3,
      latitude4,
      longitude4,

      dataNoLocationHandle,
      selectedId,
      noLocation,

      viewport,

      dataFinal,
      projectsData,
      handleTopicSelector,
      topicsSelected,
    } = this.props;

    let HotScreamsMarkup = _.orderBy(dataFinal, "likeCount", "desc").map(
      (scream) => (
        <Scream
          loading={loading}
          key={scream.screamId}
          scream={scream}
          projectsData={projectsData}
        />
      )
    );

    let recentScreamsMarkup = _.orderBy(dataFinal, "createdAt", "desc").map(
      (scream) => (
        <Scream
          loading={loading}
          key={scream.screamId}
          scream={scream}
          projectsData={projectsData}
        />
      )
    );

    let noMoreScreamsMarkup =
      !loading && dataFinal.length > 0 ? (
        <div className="ende">
          ... <br /> Keine weiteren Ideen <br />
        </div>
      ) : (
        <div className="no-ideas-yet">
           Mit den ausgewählten Filtern findest du noch keine Ideen.
        </div>
      );

    const content = !loading ? (
      <>
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
      </>
    ) : null;

    return order === 1 ? (
      <div className="MainAnimationChannels">
        <div>
          <div className="content">
            <div className="homeHeadermain">
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
                      style={{
                        transform: "translateY(10px) rotate(30deg)",
                      }}
                      alt="lamploader"
                    ></img>
                    {dataFinal.length} Ideen{" "}
                  </ToggleDisplay>
                </div>

                <SortingSelect
                  dropdown={dropdown}
                  handleDropdown={handleDropdown}
                />
              </div>
            </div>

            <Geofilter
              dataFinal={dataFinal}
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

            {content}
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default AllIdeasPage;
