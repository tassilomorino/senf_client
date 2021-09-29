/** @format */
import React, { useState } from "react";
import _ from "lodash";
import { isMobileCustom } from "../../util/customDeviceDetect";

import { useSelector, useDispatch } from "react-redux";
import { setMapBounds } from "../../redux/actions/mapActions";

import styled, { keyframes } from "styled-components";
import Swipe from "react-easy-swipe";

//Components
import Geofilter from "../map/Geofilter";
import List from "../module/List/List";
import ListHeader from "../module/Headers/ListHeader";
import PostScream from "../postScream/PostScream";
import TopicFilter from "../layout/TopicFilter";

const enterAnimation = keyframes`
       0% {
  opacity: 0;
  transform: translateY(10%) ;
}

100% {
  opacity: 1;
  transform: translateY(0%) ; 
}
    `;

const Wrapper = styled.div`
  opacity: 1;
  display: flex;
  flex-direction: row;
  transition: 0.5s;
  animation: ${enterAnimation} 0.8s ease-in-out;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 0px;
  padding-bottom: 150px;
  overflow-x: hidden;
  width: 100%;
`;

const MapClickContainer = styled.div`
  position: fixed;
  top: 100px;
  width: 100%;
  height: 100px;
  z-index: 9;
`;

const SwipeContainer = styled.div`
  position: fixed;
  top: ${(props) => props.Top && props.Top};
  margin-top: ${(props) => props.marginTop && props.marginTop + "px"};
  width: 100%;
  z-index: 14;
  height: ${(props) => (props.Top && props.Top === "25vh" ? "70px" : "30vh")};
`;

const ScrollContainer = styled.div`
  height: 75vh;
  width: 100%;
  background-image: linear-gradient(to bottom, #fed957, #ffda53, #ffffff);
  background-repeat: no-repeat;
  background: -webkit-linear-gradient(to left, #fed957, #ffda53, #ffffff);
  position: fixed;
  overflow: scroll;
  border-radius: 20px 20px 0 0;
  z-index: 9;
  top: ${(props) => props.Top && props.Top};
  margin-top: ${(props) => props.marginTop && props.marginTop + "px"};
  transition: 0.2s ease-out;
`;

const ListHeaderWrapper = styled.div`
  height: 70px;
  width: 100%;
  background-color: #fed957;
  position: fixed;
  z-index: 15;
  top: ${(props) => props.Top && props.Top};
  margin-top: ${(props) => props.marginTop && props.marginTop + "px"};
  border-radius: 20px 20px 0 0;
  transition: 0.2s ease-out;
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
  display: ${(props) => props.display && props.display};
  transition: 0.2s ease-out;
`;

const IdeaList = ({
  loading,
  order,
  dropdown,
  handleDropdown,
  dataFinal,
  projectsData,
  geoData,
  loadingProjects,
  project,
  handleTopicSelector,
  topicsSelected,
}) => {
  const [swipePosition, setSwipePosition] = useState("70vh");
  const [swipeMovePosition, setSwipeMovePosition] = useState(0);
  const [shadow, setShadow] = useState(false);

  const mapViewport = useSelector((state) => state.data.mapViewport);
  const dispatch = useDispatch();

  const onSwipeMove = (position, event) => {
    setSwipeMovePosition(position.y);
  };

  const onSwipeEnd = (position, event) => {
    console.log(position.y);
    if (swipeMovePosition < -100) {
      setSwipePosition("25vh");
      setSwipeMovePosition(0);
    } else if (swipePosition === "70vh" && swipeMovePosition > 50) {
      setSwipePosition("90vh");
      setSwipeMovePosition(0);
    } else if (swipeMovePosition > 100) {
      setSwipePosition("70vh");
      setSwipeMovePosition(0);
    } else {
      //  setSwipePosition("70vh");
      setSwipeMovePosition(0);
    }
  };

  const _onViewportChange = (viewport) => {
    const boundAdds = [500, 1000, 500, 1000];
    dispatch(setMapBounds(viewport, boundAdds));

    setSwipePosition("90vh");
    setSwipeMovePosition(0);
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
      {isMobileCustom ? (
        <React.Fragment>
          <Geofilter
            dataFinal={dataFinal}
            geoData={geoData}
            viewport={mapViewport}
            _onViewportChange={_onViewportChange}
          />
          <TopicFilter
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
          ></TopicFilter>

          {swipePosition === "25vh" && (
            <MapClickContainer onClick={() => setSwipePosition("70vh")} />
          )}

          <PostScream
            loadingProjects={loadingProjects}
            projectsData={projectsData}
            project={project}
            swipePosition={swipePosition}
          />

          <ScrollContainer
            Top={swipePosition}
            marginTop={swipeMovePosition}
            onScroll={handleScroll}
          >
            <Swipe
              onSwipeMove={onSwipeMove}
              onSwipeEnd={onSwipeEnd}
              style={{ height: "70px" }}
            >
              <SwipeContainer
                Top={swipePosition}
                marginTop={swipeMovePosition}
                onClick={() => setSwipePosition("25vh")}
              />

              <ListHeaderWrapper
                Top={swipePosition}
                marginTop={swipeMovePosition}
              >
                <ListHeader
                  loading={loading}
                  handleDropdown={handleDropdown}
                  dataFinal={dataFinal}
                  marginTop={document.body.clientWidth > 768 ? "40px" : "0"}
                />
              </ListHeaderWrapper>

              <ShadowBox
                Top={swipePosition}
                marginTop={swipeMovePosition}
                display={shadow ? "block" : "none"}
              />
            </Swipe>

            <Content>
              <List
                loading={loading}
                dropdown={dropdown}
                dataFinal={dataFinal}
                projectsData={projectsData}
              />
            </Content>
          </ScrollContainer>
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
            loading={loading}
            dropdown={dropdown}
            dataFinal={dataFinal}
            projectsData={projectsData}
          />
        </Content>
      )}
    </Wrapper>
  ) : null;
};

export default IdeaList;
