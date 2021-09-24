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
`;

const Content = styled.div`
  margin-top: 0px;
  padding-bottom: 150px;
  overflow-x: hidden;
`;

const ScrollContainer = styled.div`
  height: 75vh;
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
  display: ${(props) => props.display && props.display};
`;

const AllIdeasPage = ({
  loading,
  order,
  dropdown,
  handleDropdown,
  handleRevert,
  handleCloseGeofilter,
  latitude1,
  latitude2,
  longitude2,
  longitude3,

  dataFinal,
  projectsData,
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
        <Content>
          <MobileFilterAndMapWrapper>
            <Geofilter
              dataFinal={dataFinal}
              latitude1={latitude1}
              latitude2={latitude2}
              longitude2={longitude2}
              longitude3={longitude3}
              viewport={mapViewport}
              _onViewportChange={_onViewportChange}
              handleRevert={handleRevert}
              handleCloseGeofilter={handleCloseGeofilter}
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

            <List
              loading={loading}
              dropdown={dropdown}
              dataFinal={dataFinal}
              projectsData={projectsData}
            />
          </ScrollContainer>
        </Content>
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

export default AllIdeasPage;
