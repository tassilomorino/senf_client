/** @format */
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import _ from "lodash";
import { isMobileCustom } from "../../util/customDeviceDetect";

import { useSelector, useDispatch } from "react-redux";
import { setMapBounds, setMapViewport } from "../../redux/actions/mapActions";

import styled, { keyframes } from "styled-components";
import Swipe from "react-easy-swipe";

//Components
import MapMobile from "../module/map/MapMobile";
import List from "../module/List/List";
import ListHeader from "../module/Headers/ListHeader";
import PostScream from "../postScream/PostScream";
import TopicFilter from "../module/Filters/TopicFilter";
import SwipeCard from "./SwipeCard";

const ListEnterAnimation = keyframes`
       0% {
  transform: translateY(100%) ; 
}

100% {
  transform: translateY(0%) ; 
}
    `;

const Wrapper = styled.div`
  opacity: 1;
  display: flex;
  flex-direction: row;
  transition: 0.5s;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  height: 100%;
  width: 100%;

  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(255, 218, 83, 1) 25%,
    rgba(255, 255, 255, 1) 50%
  );
  position: fixed;
  border-radius: 20px 20px 0 0;
  z-index: 9;
  /* top: ${(props) => props.Top && props.Top}; */
  top: 70%;

  transform: translateY(${(props) => props.marginTop && props.marginTop});

  animation: ${ListEnterAnimation} 3s;
  box-shadow: 0 8px 20px 12px rgba(0, 0, 0, 0.1);
  transition: 0.1s ease-out;
`;

const Content = styled.div`
  margin-top: 0px;
  padding-bottom: 150px;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  top: 0;
`;

const ContentMobile = styled(Content)`
  position: absolute;
  overflow: scroll;
`;

const SwipeContainer = styled.div`
  position: fixed;

  width: 100%;
  z-index: 15;
  height: ${(props) => (props.Top && props.Top === "top" ? "70px" : "30%")};
`;

const ListHeaderWrapper = styled.div`
  height: 70px;
  width: 100%;
  background-color: #fed957;
  display: block;
  position: sticky;
  z-index: 15;
  top: 0;

  border-radius: 20px 20px 0 0;
`;

const ShadowBox = styled.div`
  width: 90%;
  margin-left: 5%;
  height: 70px;
  display: block;
  position: absolute;
  top: 0;

  box-shadow: rgb(38, 57, 77, 0.4) 0px 20px 30px -15px;
  z-index: 14;
  display: ${(props) => props.display && props.display};
`;
const Swipee = styled.div`
  border-radius: 16px;
  user-select: none;
  background: hotpink;
  color: white;
  width: 100%;
  height: 300%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
const IdeaList = ({
  type,
  loading,
  order,
  dropdown,
  handleDropdown,
  dataFinal,
  dataFinalMap,
  projectsData,
  geoData,
  loadingProjects,
  project,
  myScreams,
  handleTopicSelector,
  topicsSelected,
}) => {
  const [shadow, setShadow] = useState(false);
  const { openScream } = useSelector((state) => state.UI);

  const mapViewport = useSelector((state) => state.data.mapViewport);
  const dispatch = useDispatch();

  const _onViewportChange = (viewport) => {
    dispatch(setMapViewport(viewport));

    const boundAdds = [500, 1000, 500, 1000];
    dispatch(setMapBounds(viewport, boundAdds));
  };

  const handleScroll = (e) => {
    const element = e.target;

    if (element.scrollTop > 5) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  return order === 1 ? (
    <Wrapper>
      {" "}
      {isMobileCustom ? (
        <React.Fragment>
          <MapMobile
            dataFinal={dataFinalMap}
            geoData={geoData}
            viewport={mapViewport}
            _onViewportChange={_onViewportChange}
          />
          <TopicFilter
            loading={loading}
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
          ></TopicFilter>
          <PostScream
            loadingProjects={loadingProjects}
            projectsData={projectsData}
            project={project}
          />
          <SwipeCard>
            <Swipee>hiiii</Swipee>
          </SwipeCard>
          {/* <ScrollContainer onScroll={handleScroll}>
            <ContentMobile>
              <div
                className="card"
                ref={cardRef}
                // style={{ height: `${cardHeight}px` }}
                style={{
                  backgroundColor: "green",
                  height: "200px",
                  width: "100%",
                }}
              >
                <span
                  className="card-knob"
                  style={{
                    backgroundColor: "blue",
                    height: "200px",
                    width: "100%",
                  }}
                  onMouseDown={touchStart}
                  onTouchStart={touchStart}
                  onMouseMove={touchMove}
                  onTouchMove={touchMove}
                  onMouseUp={touchEnd}
                  onTouchEnd={touchEnd}
                >
                  <SwipeContainer>
                    <ListHeaderWrapper>
                      <ListHeader
                        loading={loading}
                        handleDropdown={handleDropdown}
                        dataFinal={dataFinal}
                        marginTop={
                          document.body.clientWidth > 768 ? "40px" : "0"
                        }
                      />{" "}
                    </ListHeaderWrapper>
                    <ShadowBox display={shadow ? "block" : "none"} />
                  </SwipeContainer>
                </span>
              </div>
              <List
                type={type}
                loading={loading}
                dropdown={dropdown}
                dataFinal={dataFinal}
                projectsData={projectsData}
                project={project}
                myScreams={myScreams}
              />{" "}
            </ContentMobile>{" "} 
          </ScrollContainer>{" "}*/}
        </React.Fragment>
      ) : (
        <Content>
          <ListHeader
            loading={loading}
            handleDropdown={handleDropdown}
            dataFinal={dataFinal}
            marginTop={document.body.clientWidth > 768 ? "40px" : "0"}
          />
          <List
            type={type}
            loading={loading}
            dropdown={dropdown}
            dataFinal={dataFinal}
            projectsData={projectsData}
            project={project}
            myScreams={myScreams}
          />{" "}
        </Content>
      )}{" "}
    </Wrapper>
  ) : null;
};

export default IdeaList;
