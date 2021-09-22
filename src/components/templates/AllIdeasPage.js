/** @format */
import React, { useState } from "react";
import ToggleDisplay from "react-toggle-display";
import _ from "lodash";
import { isMobileCustom } from "../../util/customDeviceDetect";
import styled, { css, keyframes } from "styled-components";

//Components
import TopicFilter from "../layout/TopicFilter";
import Geofilter from "../map/Geofilter";
import Scream from "../scream/Scream";
import Swipe from "react-easy-swipe";

//Images
import ListHeader from "../module/Headers/ListHeader";
const MobileFilterAndMapWrapper = styled.div`
  margin-top: 100px;
  margin-left: 0%;
  width: 100%;
  z-index: 9;
  position: fixed;
`;

const ListHeaderWrapper = styled.div`
  height: 70px;
  width: 100%;
  background-color: #ffd19b;
  position: fixed;
  z-index: 15;
  top: ${(props) => props.Top && props.Top};
  margin-top: ${(props) => props.marginTop && props.marginTop + "px"};
  border-radius: 20px 20px 0 0;
  transition: 0s;
`;

const ShadowBox = styled.div`
  width: 90%;
  margin-left: 5%;
  height: 70px;
  position: fixed;
  top: ${(props) => props.Top && props.Top};
  margin-top: ${(props) => props.marginTop && props.marginTop + "px"};
  box-shadow: rgb(38, 57, 77, 0.4) 0px 20px 30px -15px;
  z-index: 14;
  transition: 5s ease-in;
  display: ${(props) => props.display && props.display};
`;

const ScrollContainer = styled.div`
  height: 80vh;
  width: 100%;
  background-image: linear-gradient(to bottom, #ffd19b, #ffda53, #ffffff);
  background-repeat: no-repeat;
  background: -webkit-linear-gradient(to left, #ffd19b, #ffda53, #ffffff);
  position: fixed;
  overflow: scroll;
  border-radius: 20px 20px 0 0;
  z-index: 9;
  top: ${(props) => props.Top && props.Top};
  margin-top: ${(props) => props.marginTop && props.marginTop + "px"};
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
  const [swipePosition, setSwipePosition] = useState("70vh");
  const [swipeMovePosition, setSwipeMovePosition] = useState(0);
  const [shadow, setShadow] = useState(false);

  const onSwipeMove = (position, event) => {
    setSwipeMovePosition(position.y);
  };

  const onSwipeEnd = (position, event) => {
    console.log(position.y);
    if (swipeMovePosition < -150) {
      setSwipePosition("25vh");
      setSwipeMovePosition(0);
    } else if (swipeMovePosition > 150) {
      setSwipePosition("70vh");
      setSwipeMovePosition(0);
    } else {
      setSwipePosition("70vh");
      setSwipeMovePosition(0);
    }
  };

  const handleScroll = (e) => {
    const element = e.target;

    if (element.scrollTop > 5) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  const content = !loading && (
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
  );

  const listHeaderComponent = !loading && (
    <ListHeader
      handleDropdown={handleDropdown}
      dataFinal={dataFinal}
      marginTop={document.body.clientWidth > 768 ? "40px" : "0"}
    />
  );
  return order === 1 ? (
    <div className="MainAnimationChannels">
      <div>
        <div className="content">
          {isMobileCustom ? (
            <React.Fragment>
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

              <ScrollContainer
                Top={swipePosition}
                marginTop={swipeMovePosition}
                onScroll={handleScroll}
              >
                <Swipe
                  onSwipeMove={onSwipeMove}
                  onSwipeEnd={onSwipeEnd}
                  style={{
                    height: "70px",
                    width: "100%",
                  }}
                >
                  <ListHeaderWrapper
                    Top={swipePosition}
                    marginTop={swipeMovePosition}
                  >
                    {listHeaderComponent}
                  </ListHeaderWrapper>

                  <ShadowBox
                    Top={swipePosition}
                    marginTop={swipeMovePosition}
                    display={shadow ? "block" : "none"}
                  />
                </Swipe>

                {content}
              </ScrollContainer>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {listHeaderComponent}
              {content}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default AllIdeasPage;
