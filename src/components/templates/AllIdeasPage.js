/** @format */
import React from "react";
import ToggleDisplay from "react-toggle-display";
import _ from "lodash";
import { isMobileCustom } from "../../util/customDeviceDetect";
import styled, { css, keyframes } from "styled-components";

//Components
import TopicFilter from "../layout/TopicFilter";
import Geofilter from "../map/Geofilter";
import Scream from "../scream/Scream";

//Images
import ListHeader from "../module/Headers/ListHeader";

const MobileFilterAndMapWrapper = styled.div`
  margin-top: 100px;
  margin-left: 0%;
  width: 100%;
  z-index: 9;
`;

const AllIdeasPage = ({
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
  handleNoLocation,

  viewport,

  dataFinal,
  projectsData,
  handleTopicSelector,
  topicsSelected,
}) => {
  return order === 1 ? (
    <div className="MainAnimationChannels">
      <div>
        <div className="content">
          {isMobileCustom && (
            <MobileFilterAndMapWrapper>
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
                handleNoLocation={handleNoLocation}
                handleOpenGeofilter={handleOpenGeofilter}
                handleCloseGeofilter={handleCloseGeofilter}
                handleResetGeofilter={handleResetGeofilter}
                openGeofilter={openGeofilter}
                showGeofilterResults={showGeofilterResults}
                createGeofilterCircle={createGeofilterCircle}
                dataNoLocationHandle={dataNoLocationHandle}
                selectedId={selectedId}
                handleNoLocation={handleNoLocation}
                handleTopicSelector={handleTopicSelector}
                topicsSelected={topicsSelected}
              />
            </MobileFilterAndMapWrapper>
          )}

          {!loading && (
            <ListHeader
              handleDropdown={handleDropdown}
              dataFinal={dataFinal}
              marginTop={document.body.clientWidth > 768 ? "40px" : "0"}
            />
          )}

          {!loading && (
            <React.Fragment>
              <ToggleDisplay show={dropdown === "newest"}>
                <div className={dropdown === "newest" ? "MainAnimation" : ""}>
                  {_.orderBy(dataFinal, "createdAt", "desc").map((scream) => (
                    <Scream
                      loading={loading}
                      key={scream.screamId}
                      scream={scream}
                      projectsData={projectsData}
                    />
                  ))}
                </div>
              </ToggleDisplay>
              <ToggleDisplay show={dropdown === "hottest"}>
                <div className={dropdown === "hottest" ? "MainAnimation" : ""}>
                  {_.orderBy(dataFinal, "likeCount", "desc").map((scream) => (
                    <Scream
                      loading={loading}
                      key={scream.screamId}
                      scream={scream}
                      projectsData={projectsData}
                    />
                  ))}
                </div>
              </ToggleDisplay>
              {dataFinal.length > 0 ? (
                <div className="ende">
                  ... <br /> Keine weiteren Ideen <br />
                </div>
              ) : (
                <div className="no-ideas-yet">
                   Mit den ausgewählten Filtern findest du noch keine Ideen.
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default AllIdeasPage;
