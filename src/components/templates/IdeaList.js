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
  transform: translateY(10%) ; 
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
  animation: ${ListEnterAnimation} 3s;
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

          <SwipeCard loading={loading}>
            <ListHeaderWrapper>
              <ListHeader
                loading={loading}
                handleDropdown={handleDropdown}
                dataFinal={dataFinal}
                marginTop={document.body.clientWidth > 768 ? "40px" : "0"}
              />{" "}
            </ListHeaderWrapper>
            <ShadowBox display={shadow ? "block" : "none"} />
            <List
              type={type}
              loading={loading}
              dropdown={dropdown}
              dataFinal={dataFinal}
              projectsData={projectsData}
              project={project}
              myScreams={myScreams}
            />{" "}
          </SwipeCard>
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
