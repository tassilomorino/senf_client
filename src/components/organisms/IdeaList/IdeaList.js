/** @format */
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import _ from "lodash";
import { isMobileCustom } from "../../../util/customDeviceDetect";

import { useSelector, useDispatch } from "react-redux";
import {
  setMapBounds,
  setMapViewport,
} from "../../../redux/actions/mapActions";

import styled, { keyframes } from "styled-components";
import Swipe from "react-easy-swipe";

//Components
import MapMobile from "../../atoms/map/MapMobile";
import List from "../../molecules/List/List";
import ListHeader from "../../atoms/Headers/ListHeader";
import PostScream from "../PostIdea/PostScream";
import TopicFilter from "../../atoms/Filters/TopicFilter";
import IdeaListSwipe from "../../../hooks/IdeaListSwipe";

const Wrapper = styled.div`
  opacity: 1;
  display: flex;
  flex-direction: row;
  transition: 0.5s;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  margin-top: 0px;
  padding-bottom: 150px;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  top: 0;
`;

const ContentMobile = styled.div`
  /* overflow-y: ${(props) => props.openScream && "hidden"};
  pointer-events: ${(props) => props.openScream && "none"};
  position: ${(props) => props.openScream && "fixed"};
  top: ${(props) => props.openScream && "90vh"}; */
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

const IdeaList = ({
  type,
  loading,
  order,
  dropdown,
  handleDropdown,
  dataFinal,
  dataFinalLength,
  dataFinalMap,
  projectsData,
  geoData,
  loadingProjects,
  project,
  handleTopicSelector,
  topicsSelected,
}) => {
  const [shadow, setShadow] = useState(false);

  const mapViewport = useSelector((state) => state.data.mapViewport);
  const dispatch = useDispatch();

  const openScream = useSelector((state) => state.UI.openScream);

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
          <ContentMobile openScream={openScream} id="listMobile">
            <IdeaListSwipe loading={loading}>
              <ListHeaderWrapper>
                <ListHeader
                  loading={loading}
                  handleDropdown={handleDropdown}
                  dataFinalLength={dataFinalLength}
                  marginTop={document.body.clientWidth > 768 ? "40px" : "0"}
                />{" "}
              </ListHeaderWrapper>
              <ShadowBox display={shadow ? "block" : "none"} />
              <List
                type={type}
                loading={loading}
                dropdown={dropdown}
                dataFinal={dataFinal}
                dataFinalLength={dataFinalLength}
                projectsData={projectsData}
              />
            </IdeaListSwipe>
          </ContentMobile>
        </React.Fragment>
      ) : (
        <Content>
          <ListHeader
            loading={loading}
            handleDropdown={handleDropdown}
            dataFinalLength={dataFinalLength}
            marginTop={document.body.clientWidth > 768 ? "40px" : "0"}
          />
          <List
            type={type}
            loading={loading}
            dropdown={dropdown}
            dataFinal={dataFinal}
            dataFinalLength={dataFinalLength}
            projectsData={projectsData}
          />{" "}
        </Content>
      )}{" "}
    </Wrapper>
  ) : null;
};

export default IdeaList;
