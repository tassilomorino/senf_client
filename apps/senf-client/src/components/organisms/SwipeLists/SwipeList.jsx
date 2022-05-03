/** @format */
import React, { useEffect, useState, memo, useCallback, useRef } from "react";
import ReactDOM from "react-dom";

import { isMobileCustom } from "../../../util/customDeviceDetect";
import { Trans, useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import styled from "styled-components";
import { StyledH3 } from "../../../styles/GlobalStyle";
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
import Wave from "../../atoms/Backgrounds/Wave";

import { openCreateProjectRoomFunc } from "../../../redux/actions/projectActions";
import { stateCreateOrganizationsFunc } from "../../../redux/actions/organizationActions";

import NewButton from "../../atoms/CustomButtons/NewButton";
import PostScream from "../PostIdea/PostScream";
import MainModal from "../../atoms/Layout/MainModal";
import LoginRegistration from "../Auth/LoginRegistration";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { CircularProgress } from "@material-ui/core";

const CalendarComponent = React.lazy(() =>
  import("../../atoms/calendar/CalendarComponent")
);

const DragWrapper = styled(animated.div)`
  overscroll-behavior: contain;
  overflow-x: hidden;

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
  transform: ${(props) =>
    props.$openOrganizationsPage && "scale(1.9) translateY(-20px)"};

  @media (min-width: 768px) {
    width: 400px;
    animation: none;
    border-radius: 0px;
  }
`;

const HandleBar = styled.div`
  width: 50px;
  height: 2px;
  background-color: #f2c71c;
  overflow: visible;
  border-radius: 1px;
  margin-top: 8px;
  margin-left: 50%;
  transform: translateX(-50%);
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
  overflow: ${(props) => (props.$isMobileCustom ? "hidden" : "visble")};
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
    padding-top: ${(props) => (props.openProjectRoom ? "20px" : "40px")};
    height: ${(props) => (props.openAccount ? "calc(100vh - 150px)" : "100vh")};
  }
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
  position: relative;
  margin-left: 200px;
  height: 40px;
  transform: translateX(-50%);
  width: 400px;
  background-color: #fed957;
  padding-bottom: 0px;
  z-index: 99;
  top: 0;
  padding-top: 25px;
`;

const ButtonWrapper = styled.div`
  width: calc(100% - 20px);
  margin: 0px 10px 10px 10px;
`;

const SwipeList = ({
  swipeListType,
  type,
  tabLabels,
  loading,
  order,
  handleDropdown,
  handledropdownStatus,
  dropdown,
  dropdownStatus,
  dropdownStatusNumbers,
  dataFinal,
  dataFinalProjectRooms,
  setSearchTerm,
  searchTerm,
  handleClick,
  setOpenOrganizationsPage,
  openOrganizationsPage,
  openInsightsPage,
  setOpenInsightsPage,
  mapViewportRef,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openScream = useSelector((state) => state.UI.openScream);
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const project = useSelector((state) => state.data.project);
  const [searchOpen, setSearchOpen] = useState(false);
  const mapBounds = useSelector((state) => state.data.mapBounds);
  const swipePosition = useSelector((state) => state.UI.swipePosition);
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => state.data.projects);
  const loadingProjects = useSelector((state) => state.data.loadingProjects);

  const [
    openModalAuthenticateForProjectRoom,
    setOpenModalAuthenticateForProjectRoom,
  ] = useState(false);

  const [openCreateOrganizationFirst, setOpenCreateOrganizationFirst] =
    useState(false);

  const [openRequestProjectRoom, setOpenRequestProjectRoom] = useState(false);

  const openCreateOrganization = () => {
    dispatch(stateCreateOrganizationsFunc(true));
    setOpenCreateOrganizationFirst(false);
  };

  const openCreateProjectRoom = () => {
    dispatch(openCreateProjectRoomFunc(true));
  };

  const openMailRequestProjectRoom = () => {
    var link =
      "mailto:dein@senf.koeln" + "?subject=" + escape("Projektraum-Anfrage");
    // +
    // "&body=" +
    // escape(
    //   "Projektraum-Titel:" +
    //     "\n" +
    //     "\n" +
    //     "Worum geht's:" +
    //     "\n" +
    //     "\n" +
    //     "Projektzeitraum:" +
    //     "\n" +
    //     "\n" +
    //     "Logo + Cover-Bild:"
    // );
    window.location.href = link;
  };

  const [springProps, setSpring] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight - 120}px)`,
    overflow: "visible",
    touchAction: "none",
    userSelect: "none",
  }));

  const [slideUpSectionProps, setSlideUpSectionProps] = useSpring(() => ({
    transform: `translateY(${0}px)`,
    height: isMobileCustom ? "0px" : "150px",
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
    setSpring({
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
    setSpring({
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
    setSearchOpen(false);
  };

  useEffect(() => {
    if (openScream) {
      setSpring({
        transform: `translateY(${window.innerHeight + 20}px)`,
        touchAction: "none",
      });
    } else {
      if (swipePosition === "bottom") {
        setSpring({
          transform: `translateY(${window.innerHeight - 120}px)`,
          touchAction: "none",
        });
      } else {
        setSpring({
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

  useEffect(() => {
    if (searchOpen) {
      setSlideUpSectionProps({
        height: "210px",
      });
    }
    if (!searchOpen && (swipePosition !== "bottom" || !isMobileCustom)) {
      setSlideUpSectionProps({
        height: "150px",
      });
    }
  }, [searchOpen]);

  useEffect(() => {
    setSpring({
      transition: "0.5s",
    });
  }, [openOrganizationsPage, openInsightsPage]);

  const bind = useDrag(
    ({ last, down, movement: [, my], offset: [, y] }) => {
      setSpring({
        transition: "0s",
      });
      if (last && my > 50) {
        setSpring({
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
        setSearchOpen(false);
      }

      if (last && my < -50) {
        setSpring({
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

      setSpring({ y: down ? my : 0 });
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
      },
    }
  );

  const ref = useRef();

  const sectionFastLinks = !openAccount && dataFinal && (
    <React.Fragment>
      {openModalAuthenticateForProjectRoom &&
        !user.authenticated &&
        ReactDOM.createPortal(
          <MainModal
            handleButtonClick={() =>
              setOpenModalAuthenticateForProjectRoom(false)
            }
          >
            <StyledH3 textAlign="center" margin="20px">
              {t("authenticatedForCreateProjectRoom")}
            </StyledH3>

            <SubmitButton
              text={t("login")}
              zIndex="999"
              backgroundColor="#fed957"
              textColor="#353535"
              margin="20px"
            >
              <LoginRegistration />
            </SubmitButton>
          </MainModal>,
          document.getElementById("portal-root-modal")
        )}

      {openCreateOrganizationFirst &&
        ReactDOM.createPortal(
          <MainModal
            handleButtonClick={() => setOpenCreateOrganizationFirst(false)}
          >
            <StyledH3 textAlign="center" margin="20px">
              {t("createOrganizationForCreateProjectRoom")}
            </StyledH3>

            <SubmitButton
              text={t("createOrganization")}
              zIndex="999"
              backgroundColor="#fed957"
              textColor="#353535"
              margin="20px"
              handleButtonClick={openCreateOrganization}
            />
          </MainModal>,
          document.getElementById("portal-root-modal")
        )}

      {openRequestProjectRoom &&
        ReactDOM.createPortal(
          <MainModal handleButtonClick={() => setOpenRequestProjectRoom(false)}>
            <StyledH3 textAlign="center" margin="20px">
              {t("requestCreateProjectRoom")}
            </StyledH3>

            <SubmitButton
              text={t("getInTouch")}
              zIndex="999"
              backgroundColor="#fed957"
              textColor="#353535"
              margin="20px"
              handleButtonClick={openMailRequestProjectRoom}
            />
          </MainModal>,
          document.getElementById("portal-root-modal")
        )}

      {order === 1 && (
        <animated.div style={slideUpSectionProps}>
          <OrganizationsIntroWrapper>
            <OrganizationsIntro>
              <Trans i18nKey="list_fastlink_statistics">
                .<span style={{ fontWeight: "900" }}>.</span>.
              </Trans>
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
            dropdownStatus={dropdownStatus}
            dropdownStatusNumbers={dropdownStatusNumbers}
            handledropdownStatus={handledropdownStatus}
            dropdown={dropdown}
            dataFinalLength={dataFinal.length}
            setSearchOpen={setSearchOpen}
            searchOpen={searchOpen}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            marginTop={"0px"}
          />
        </animated.div>
      )}
      {order === 2 && (
        <animated.div style={slideUpSectionProps}>
          <OrganizationsIntroWrapper>
            <OrganizationsIntro>
              <Trans i18nKey="list_fastlink_organizations">
                .<span style={{ fontWeight: "900" }}>.</span>.
              </Trans>
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
          />
        </animated.div>
      )}
    </React.Fragment>
  );
  return isMobileCustom ? (
    <DragWrapper
      className={!loading && !openScream ? "" : "drag_hide"}
      style={
        openOrganizationsPage || openInsightsPage
          ? {
              scale: 0.9,
              transform: `translateY(${-20}px)`,
              filter: "brightness(80%)",
              transition: "0.5s",
              overflow: "visible",
            }
          : springProps
      }
      $openOrganizationsPage={openOrganizationsPage}
    >
      <HandleBar />
      {isMobileCustom && (
        <PostScream
          loadingProjects={loadingProjects}
          projectsData={projects}
          project={project}
          mapViewportRef={mapViewportRef}
        />
      )}
      {mapBounds?.latitude1 !== 0 && (
        <React.Fragment>
          <ListHeaderWrapper
            $isMobileCustom={true}
            style={order === 3 ? { height: "60px" } : listHeaderProps}
          >
            <animated.div {...bind()} style={listHeaderProps}>
              <div style={{ height: "60px", pointerEvents: "all" }}>
                <Tabs
                  loading={loading}
                  handleClick={handleClick}
                  order={order}
                  tabLabels={tabLabels}
                  marginTop={"15px"}
                  marginBottom={"15px"}
                  secondaryColor="#d6ab00"
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
          <ListWrapper
            ref={ref}
            id="ListWrapper"
            onTouchStart={
              swipePosition === "bottom" ? () => setSwipeUp() : null
            }
            style={swipePosition === "bottom" ? { overflow: "hidden" } : null}
          >
            {sectionFastLinks}

            {swipeListType === "projectRoomOverview" &&
              swipePosition === "top" && (
                <ButtonWrapper>
                  <NewButton
                    borderType="dashed"
                    handleButtonClick={
                      !user.authenticated
                        ? () => setOpenModalAuthenticateForProjectRoom(true)
                        : !user?.organizationId?.length
                        ? () => setOpenCreateOrganizationFirst(true)
                        : user?.isOrgModerator === true
                        ? openCreateProjectRoom
                        : () => setOpenRequestProjectRoom(true)
                    }
                  >
                    {t("createProjectRoom")}
                  </NewButton>
                </ButtonWrapper>
              )}

            {!loading &&
              (order === 1 || order === 2 || (order === 3 && openAccount)) && (
                <React.Fragment>
                  {openAccount && (
                    <Toolbar
                      swipeListType={swipeListType}
                      loading={loading}
                      handleDropdown={handleDropdown}
                      dropdownStatus={dropdownStatus}
                      dropdownStatusNumbers={dropdownStatusNumbers}
                      handledropdownStatus={handledropdownStatus}
                      dropdown={dropdown}
                      dataFinalLength={dataFinal.length}
                      setSearchOpen={setSearchOpen}
                      searchOpen={searchOpen}
                      setSearchTerm={setSearchTerm}
                      searchTerm={searchTerm}
                      marginTop={"0px"}
                    />
                  )}
                  <List
                    swipeListType={swipeListType}
                    type={type}
                    loading={loading}
                    dropdown={dropdown}
                    dataFinal={dataFinal}
                    projectsData={dataFinalProjectRooms}
                  />
                </React.Fragment>
              )}

            {order === 3 && openProjectRoom && (
              <React.Suspense
                fallback={<CircularProgress size={50} thickness={2} />}
              >
                <CalendarComponent handleClick={handleClick} />
              </React.Suspense>
            )}
            <Wave />
          </ListWrapper>
        </React.Fragment>
      )}
    </DragWrapper>
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
              secondaryColor="#d6ab00"
            />
          </DesktopTabWrapper>
        )}
        {openAccount && (
          <>
            <DesktopTabWrapper>
              <Tabs
                loading={loading}
                handleClick={handleClick}
                order={order}
                tabLabels={tabLabels}
                secondaryColor="#d6ab00"
              />
            </DesktopTabWrapper>
            <Toolbar
              swipeListType={swipeListType}
              loading={loading}
              handleDropdown={handleDropdown}
              dropdownStatus={dropdownStatus}
              dropdownStatusNumbers={dropdownStatusNumbers}
              handledropdownStatus={handledropdownStatus}
              dropdown={dropdown}
              dataFinalLength={dataFinal.length}
              setSearchOpen={setSearchOpen}
              searchOpen={searchOpen}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              marginTop={"0px"}
            />
          </>
        )}

        <ListWrapper
          openProjectRoom={openProjectRoom}
          openAccount={openAccount}
          id="ListWrapper"
        >
          {sectionFastLinks}

          {swipeListType === "projectRoomOverview" && (
            <ButtonWrapper>
              <NewButton
                borderType="dashed"
                handleButtonClick={
                  !user.authenticated
                    ? () => setOpenModalAuthenticateForProjectRoom(true)
                    : !user?.organizationId?.length
                    ? () => setOpenCreateOrganizationFirst(true)
                    : user?.isOrgModerator === true
                    ? openCreateProjectRoom
                    : () => setOpenRequestProjectRoom(true)
                }
              >
                {t("createProjectRoom")}
              </NewButton>
            </ButtonWrapper>
          )}

          {!loading &&
            (order === 1 || order === 2 || (order === 3 && openAccount)) && (
              <List
                swipeListType={swipeListType}
                type={type}
                loading={loading}
                dropdown={dropdown}
                dataFinal={dataFinal}
                projectsData={dataFinalProjectRooms}
              />
            )}
          {order === 3 && openProjectRoom && (
            <React.Suspense
              fallback={<CircularProgress size={50} thickness={2} />}
            >
              <CalendarComponent
                projectScreams={project?.screams}
                handleClick={handleClick}
              />
            </React.Suspense>
          )}
        </ListWrapper>
        <Wave />
      </Content>
    </DragWrapper>
  );
};

export default memo(SwipeList);
