/** @format */
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { isMobileCustom } from "../../util/customDeviceDetect";

import { useSelector, useDispatch } from "react-redux";
import { setMapBounds, setMapViewport } from "../../redux/actions/mapActions";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import styled from "styled-components";

//Components
import MapMobile from "../atoms/map/MapMobile";
import List from "../atoms/List/List";
import Toolbar from "../molecules/Toolbar/Toolbar";
import PostScream from "../organisms/PostIdea/PostScream";
import TopicFilter from "../atoms/Filters/TopicFilter";

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
  dataFinalMap,
  projectsData,
  geoData,
  loadingProjects,
  project,
  myScreams,
  handleTopicSelector,
  topicsSelected,
}) => {
  const { openScream } = useSelector((state) => state.UI);
  const mapViewport = useSelector((state) => state.data.mapViewport);
  const dispatch = useDispatch();

  const _onViewportChange = (viewport) => {
    dispatch(setMapViewport(viewport));

    const boundAdds = [500, 1000, 500, 1000];
    dispatch(setMapBounds(viewport, boundAdds));
  };

  const [swipePosition, setSwipePosition] = useState("bottom");
  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight - 120}px)`,
    overflow: "scroll",
    touchAction: "none",
  }));

  useEffect(() => {
    if (openScream) {
      set({
        marginTop: "90vh",
        transition: "0.3s",
      });
    } else {
      set({
        marginTop: "0",
        transition: "0s",
      });
    }
  }, [openScream]);

  const setSwipePositionUp = () => {
    setSwipePosition("top");
    set({
      y: 0,
      transform: `translateY(${141}px)`,
      touchAction: "unset",
    });
  };

  const setSwipePositionDown = () => {
    setSwipePosition("bottom");
    set({
      y: 0,
      transform: `translateY(${window.innerHeight - 120}px)`,
      touchAction: "none",
    });
  };

  const bind = useDrag(
    ({ down, movement: [, my], offset: [, y] }) => {
      if (my < -100) {
        set({
          y: down ? my : 141,
          transform:
            !down && swipePosition === "top"
              ? `translateY(${141}px)`
              : `translateY(${window.innerHeight - 120}px)`,
          touchAction: "unset",
        });
        setSwipePosition("top");
      }
      if (my > 150) {
        set({
          y: down ? my : window.innerHeight - 120,
          transform:
            !down && swipePosition === "bottom"
              ? `translateY(${window.innerHeight - 120}px)`
              : `translateY(${0}px)`,
          touchAction: "none",
        });
        setSwipePosition("bottom");
      }

      set({ y: down ? my : 0 });
    },
    {
      pointer: { touch: true },
      bounds: {
        top: swipePosition === "top" ? 0 : -window.innerHeight,
        bottom: swipePosition === "bottom" ? 20 : window.innerHeight - 420,
      },
      threshold: [10, 10],
      gesture: "movement",

      filterTaps: true,
    }
  );

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
            setSwipePositionUp={() => setSwipePositionUp()}
          />
          <TopicFilter
            loading={loading}
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
            swipePosition={swipePosition}
            setSwipePositionDown={() => setSwipePositionDown()}
          ></TopicFilter>
          <PostScream
            loadingProjects={loadingProjects}
            projectsData={projectsData}
            project={project}
          />
          <animated.div
            className={!loading ? "drag" : ""}
            // {...bind()}
            style={props}
          >
            <ListHeaderWrapper>
              <Toolbar
                loading={loading}
                handleDropdown={handleDropdown}
                dataFinal={dataFinal}
                marginTop={document.body.clientWidth > 768 ? "40px" : "0"}
                handleClickSwipe={
                  swipePosition === "bottom"
                    ? () => setSwipePositionUp()
                    : () => setSwipePositionDown()
                }
              />{" "}
            </ListHeaderWrapper>
            <List
              type={type}
              loading={loading}
              dropdown={dropdown}
              dataFinal={dataFinal}
              projectsData={projectsData}
              project={project}
              myScreams={myScreams}
            />{" "}
          </animated.div>
        </React.Fragment>
      ) : (
        <Content>
          <Toolbar
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
