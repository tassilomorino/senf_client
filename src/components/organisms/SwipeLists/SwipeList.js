/** @format */
import React, { useEffect, useState, memo } from "react";
import { isMobileCustom } from "../../../util/customDeviceDetect";

import { useSelector, useDispatch } from "react-redux";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import styled from "styled-components";

//Components
import List from "../../molecules/List/List";
import Toolbar from "../../molecules/Toolbar/Toolbar";
import {
  setSwipePositionDown,
  setSwipePositionUp,
} from "../../../redux/actions/UiActions";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import TagsFilter from "../../molecules/Filters/TagsFilter";
import { OrganizationTypeFilter } from "../../molecules/Filters/OrganizationTypeFilter";
import Tabs from "../../atoms/Tabs/Tabs";
import { MenuData } from "../../../data/MenuData";

const Content = styled.div`
  margin-top: 0px;
  padding-bottom: 150px;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  top: 0;
`;

const ListHeaderWrapper = styled(animated.div)`
  height: 70px;
  width: 100%;
  background-color: #fed957;
  display: block;
  z-index: 15;
  top: 0;

  position: sticky;

  border-radius: 20px 20px 0 0;
  overflow: hidden;
`;

const ListWrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  top: 0;
  pointer-events: all;
  animation: cardanimation 0.8s ease-in-out;

  @media (min-width: 768px) {
    width: 400px;
    top: 110px;
    position: relative;
  }
`;

const SlideUpSection = styled(animated.div)`
  height: 140px;
  position: relative;
`;
const OrganizationsIntroWrapper = styled.div`
  display: flex;
`;
const OrganizationsIntro = styled.h3`
  position: relative;
  font-size: 15pt;
  font-weight: 100;
  color: #414345;
  width: 250px;
  margin-left: 20px;

  text-align: left;
  z-index: 10;
`;

const ClickBackground = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  z-index: -15;
  pointer-events: auto;
  top: 0;
`;

const SwipeList = ({
  swipeListType,
  type,
  loading,
  order,
  dropdown,
  handleDropdown,
  dataFinal,
  projectsData,
  setSearchTerm,
  searchTerm,
  handleClick,
}) => {
  const dispatch = useDispatch();
  const openScream = useSelector((state) => state.UI.openScream);
  const [searchOpen, setSearchOpen] = useState(false);
  const mapBounds = useSelector((state) => state.data.mapBounds);

  const swipePosition = useSelector((state) => state.UI.swipePosition);
  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight - 120}px)`,
    overflow: "scroll",
    touchAction: "none",
    userSelect: "none",
    overflow: "hidden",
  }));

  const [slideUpSectionProps, setSlideUpSectionProps] = useSpring(() => ({
    transform: `translateY(${0}px)`,
    height: "0px",
    position: "relative",
    top: 0,
    overflow: "hidden",
  }));

  const [listHeaderProps, setListHeaderProps] = useSpring(() => ({
    height: "60px",
  }));
  const setSwipeUp = () => {
    dispatch(setSwipePositionUp());
    set({
      transform: `translateY(${30}px)`,
      touchAction: "unset",
    });
    setSlideUpSectionProps({
      height: "150px",
    });
    setListHeaderProps({
      height: "110px",
    });
  };

  const setSwipeDown = () => {
    dispatch(setSwipePositionDown());
    set({
      transform: `translateY(${window.innerHeight - 120}px)`,
      touchAction: "none",
    });
    setSlideUpSectionProps({
      height: "0px",
    });
    setListHeaderProps({
      height: "60px",
    });
  };

  useEffect(() => {
    if (openScream) {
      set({
        transform: `translateY(${window.innerHeight + 20}px)`,
        touchAction: "none",
      });
    } else {
      if (swipePosition === "bottom") {
        set({
          transform: `translateY(${window.innerHeight - 120}px)`,
          touchAction: "none",
        });
      } else {
        set({
          transform: `translateY(${30}px)`,
          touchAction: "unset",
        });
      }
    }
  }, [openScream]);

  useEffect(() => {
    if (swipePosition === "bottom") {
      setSwipeDown();
    }
    if (swipePosition === "top") {
      setSwipeUp();
    }
  }, [swipePosition]);

  const bind = useDrag(
    ({ last, down, movement: [, my], offset: [, y] }) => {
      if (last && my > 50) {
        set({
          transform: `translateY(${window.innerHeight - 120}px)`,
          touchAction: "none",
        });
        dispatch(setSwipePositionDown());
        setSlideUpSectionProps({
          height: "0px",
        });
        setListHeaderProps({
          height: "60px",
        });
      }

      if (last && my < -50) {
        set({
          transform: `translateY(${30}px)`,
          touchAction: "unset",
        });

        dispatch(setSwipePositionUp());
        setSlideUpSectionProps({
          height: "150px",
        });
        setListHeaderProps({
          height: "110px",
        });
      }

      set({ y: down ? my : 0 });
      console.log(-my);
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
      },
    }
  );

  return isMobileCustom ? (
    <React.Fragment>
      <animated.div
        className={!loading && !openScream ? "drag" : "drag_hide"}
        style={props}
      >
        {mapBounds?.latitude1 !== 0 && (
          <React.Fragment>
            <ListHeaderWrapper style={listHeaderProps}>
              <animated.div {...bind()} style={props} style={listHeaderProps}>
                <div style={{ height: "60px", pointerEvents: "all" }}>
                  <Tabs
                    loading={loading}
                    handleClick={handleClick}
                    order={order}
                    tabLabels={MenuData.map((item) => item.text).slice(0, 2)}
                    marginTop={"20px"}
                    marginBottom={"20px"}
                  />

                  {(order === 1 || order === 2) && (
                    <TagsFilter
                      placing="list"
                      type={order === 1 ? "topics" : "organizationType"}
                    />
                  )}

                  <ClickBackground
                    onClick={
                      swipePosition === "bottom"
                        ? () => setSwipeUp()
                        : () => setSwipeDown()
                    }
                  />
                </div>
              </animated.div>
            </ListHeaderWrapper>

            {searchOpen ? (
              <div style={{ height: "60px", transition: "0.5s" }} />
            ) : (
              <div style={{ height: "0px", transition: "0.5s" }} />
            )}

            {/* <ShadowBox display={shadow ? "block" : "none"} /> */}

            <ListWrapper>
              {order === 2 && (
                <SlideUpSection style={slideUpSectionProps}>
                  <OrganizationsIntroWrapper>
                    <OrganizationsIntro>
                      Entdecke die Organisationen hinter den Projekträumen.
                    </OrganizationsIntro>
                    <CustomIconButton
                      name="ArrowRight"
                      position="relative"
                      top="20px"
                      backgroundColor="#FFF0BC"
                      handleButtonClick={() => handleClick(3)}
                    />
                  </OrganizationsIntroWrapper>
                  <Toolbar
                    swipeListType={swipeListType}
                    loading={loading}
                    handleDropdown={handleDropdown}
                    dataFinalLength={dataFinal.length}
                    setSearchOpen={setSearchOpen}
                    searchOpen={searchOpen}
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                  />{" "}
                </SlideUpSection>
              )}

              <List
                swipeListType={swipeListType}
                type={type}
                order={order}
                loading={loading}
                dropdown={dropdown}
                dataFinal={dataFinal}
                projectsData={projectsData}
                handleClick={handleClick}
              />
            </ListWrapper>
          </React.Fragment>
        )}
      </animated.div>
    </React.Fragment>
  ) : (
    <Content>
      <Background />
      <Toolbar
        swipeListType={swipeListType}
        loading={loading}
        handleDropdown={handleDropdown}
        dataFinalLength={dataFinal.length}
        setSearchOpen={setSearchOpen}
        searchOpen={searchOpen}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        type={type}
      />{" "}
      {searchOpen ? (
        <div style={{ height: "60px", transition: "0.5s" }} />
      ) : (
        <div style={{ height: "0px", transition: "0.5s" }} />
      )}
      <ListWrapper>
        <List
          swipeListType={swipeListType}
          type={type}
          loading={loading}
          dropdown={dropdown}
          dataFinal={dataFinal}
          projectsData={projectsData}
        />
      </ListWrapper>
    </Content>
  );
};

export default memo(SwipeList);
