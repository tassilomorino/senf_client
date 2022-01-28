/** @format */
import React, { useEffect, useState, memo, useCallback, useRef } from "react";
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
import Tabs from "../../atoms/Tabs/Tabs";
import { MenuData } from "../../../data/MenuData";
import Wave from "../../atoms/Backgrounds/Wave";
import CalendarComponent from "../../atoms/calendar/CalendarComponent";

const DragWrapper = styled(animated.div)`
  overscroll-behavior: contain;
  width: 100%;
  height: 100%;
  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(255, 218, 83, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  border-radius: 20px;
  position: absolute;
  z-index: 995;
  animation: dragEnterAnimation 0.5s;

  @media (min-width: 768px) {
    width: 400px;
    animation: none;
  }
`;
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
  overflow: ${(props) => (props.isMobileCustom ? "hidden" : "visble")};
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
  z-index: 999999;
  @media (min-width: 768px) {
    width: 400px;
    overflow-x: hidden;
    padding-top: ${(props) => (props.openProjectRoom ? "80px" : "40px")};
  }
`;

const SlideUpSection = styled(animated.div)`
  height: 140px;
  position: relative;
  z-index: 0;
  overflow: hidden;

  /* @media (min-width: 768px) {
    margin-top: 40px;
  } */
`;
const OrganizationsIntroWrapper = styled.div`
  display: flex;
`;
const OrganizationsIntro = styled.h3`
  position: relative;
  color: #414345;
  width: 250px;
  margin-left: 20px;

  text-align: left;
  z-index: 10;
  opacity: 1;
  transform: translateY(0px);
  animation: OrganizationsIntroAnimation 0.7s;

  @keyframes OrganizationsIntroAnimation {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    50% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
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

const DesktopTabWrapper = styled.div`
  position: absolute;
  margin-left: 200px;

  height: 50px;
  transform: translateX(-50%);
  width: 400px;
  z-index: 990;
  background-color: #fed957;
  padding-bottom: 20px;
`;

const SwipeList = ({
  swipeListType,
  tabLabels,
  loading,
  order,
  handleDropdown,
  dropdown,
  dataFinal,
  projectsData,
  setSearchTerm,
  searchTerm,
  handleClick,
  setOpenInsightsPage,
  setOpenOrganizationsPage,
}) => {
  const dispatch = useDispatch();
  const openScream = useSelector((state) => state.UI.openScream);
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const project = useSelector((state) => state.data.project);
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
  }));

  const [slideUpSectionProps, setSlideUpSectionProps] = useSpring(() => ({
    transform: `translateY(${0}px)`,
    height: isMobileCustom ? "0px" : "160px",
    position: "relative",
    top: 0,
    zIndex: -1,
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
      overflow: "visible",
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
      overflow: "hidden",
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
    if (isMobileCustom && swipePosition === "bottom") {
      setSwipeDown();
    }
    if (isMobileCustom && swipePosition === "top") {
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
          overflow: "hidden",
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
          overflow: "visible",
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

  const ref = useRef();

  const sectionFastLinks = !openAccount && (
    <React.Fragment>
      {order === 1 && (
        <SlideUpSection style={slideUpSectionProps}>
          <OrganizationsIntroWrapper>
            <OrganizationsIntro>
              Verschaff dir einen schnellen Einblick durch Statistiken.
            </OrganizationsIntro>
            <CustomIconButton
              name="ArrowRight"
              position="relative"
              top="20px"
              backgroundColor="#FFF0BC"
              handleButtonClick={() => setOpenInsightsPage(true)}
            />
          </OrganizationsIntroWrapper>
          <Toolbar
            swipeListType={swipeListType}
            loading={loading}
            handleDropdown={handleDropdown}
            dropdown={dropdown}
            dataFinalLength={dataFinal.length}
            setSearchOpen={setSearchOpen}
            searchOpen={searchOpen}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            marginTop={"0px"}
          />
        </SlideUpSection>
      )}
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
              handleButtonClick={() => setOpenOrganizationsPage(true)}
            />
          </OrganizationsIntroWrapper>
          <Toolbar
            swipeListType={swipeListType}
            loading={loading}
            handleDropdown={handleDropdown}
            dropdown={dropdown}
            dataFinalLength={dataFinal.length}
            setSearchOpen={setSearchOpen}
            searchOpen={searchOpen}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            marginTop={"0px"}
          />{" "}
        </SlideUpSection>
      )}
    </React.Fragment>
  );
  return isMobileCustom ? (
    <React.Fragment>
      <DragWrapper
        className={!loading && !openScream ? "" : "drag_hide"}
        style={props}
      >
        {mapBounds?.latitude1 !== 0 && (
          <React.Fragment>
            <ListHeaderWrapper
              isMobileCustom={true}
              style={order === 3 ? { height: "60px" } : listHeaderProps}
            >
              <animated.div {...bind()} style={props} style={listHeaderProps}>
                <div style={{ height: "60px", pointerEvents: "all" }}>
                  <Tabs
                    loading={loading}
                    handleClick={handleClick}
                    order={order}
                    tabLabels={tabLabels}
                    marginTop={"20px"}
                    marginBottom={"15px"}
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
            <ListWrapper ref={ref} id="ListWrapper">
              {sectionFastLinks}

              {searchOpen ? (
                <div style={{ height: "60px", transition: "0.5s" }} />
              ) : (
                <div style={{ height: "0px", transition: "0.5s" }} />
              )}

              <Wave />
              {!loading && (order === 1 || order === 2) && (
                <List
                  swipeListType={swipeListType}
                  order={order}
                  loading={loading}
                  dropdown={dropdown}
                  dataFinal={dataFinal}
                  projectsData={projectsData}
                  handleClick={handleClick}
                />
              )}
              {order === 3 && (
                <CalendarComponent
                  projectScreams={project?.screams}
                  handleClick={handleClick}
                />
              )}
            </ListWrapper>
          </React.Fragment>
        )}
      </DragWrapper>
    </React.Fragment>
  ) : (
    <DragWrapper>
      <Content>
        {openProjectRoom && (
          <DesktopTabWrapper>
            <Tabs
              loading={loading}
              handleClick={handleClick}
              order={order}
              tabLabels={tabLabels}
              marginTop="25px"
              marginBottom="0px"
            />
          </DesktopTabWrapper>
        )}

        <ListWrapper openProjectRoom={openProjectRoom}>
          {sectionFastLinks}
          <Wave />
          {!loading && (order === 1 || order === 2) && (
            <List
              swipeListType={swipeListType}
              order={order}
              loading={loading}
              dropdown={dropdown}
              dataFinal={dataFinal}
              projectsData={projectsData}
              handleClick={handleClick}
            />
          )}
          {order === 3 && (
            <CalendarComponent
              projectScreams={project?.screams}
              handleClick={handleClick}
            />
          )}
        </ListWrapper>
      </Content>
    </DragWrapper>
  );
};

export default memo(SwipeList);
