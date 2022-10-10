/** @format */

import React, { useState, useEffect, useCallback, useMemo } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Typography,
  MainSwipeList,
  OrganizationsOverview,
  Button,
  TagSlide,
  Box,
  MobileTopBar,
  ErrorLoading,
  Loader,
  useModals,
  DiscardModalContent,
} from "senf-atomic-design-system";
import { AuthModal } from "senf-shared";
import { isMobileCustom } from "../util/customDeviceDetect";

import { closeScream, setIdea } from "../redux/actions/screamActions";

import {
  handleTopicSelectorRedux,
  handleOrganizationTypesSelectorRedux,
  setSwipePositionUp,
} from "../redux/actions/UiActions";

// Components
import StatisticsOverviewPage from "./StatisticsOverviewPage";
import IdeaDetailPage from "./IdeaDetailPage";
import {
  closeAccountFunc,
  getMyOrganizations,
  getMyScreams,
  openAccountFunc,
} from "../redux/actions/accountActions";
import {
  setOrganization,
  stateCreateOrganizationsFunc,
} from "../redux/actions/organizationActions";

import {
  filterByGeodata,
  filterByTagFilter,
  filterByStatus,
  pick,
  search,
  sort,
  countStatusOfScreams,
} from "../util/helpers";

import OrganizationPage from "./OrganizationPage";
import { likeScream, unlikeScream } from "../redux/actions/likeActions";
import ProjectroomPage from "./ProjectroomPage";
import ProfilePage from "./ProfilePage";
import { StyledH3 } from "../styles/GlobalStyle";
import { getUserData } from "../redux/actions/userActions";
import PostIdeaPage from "./PostIdeaPage";

const CreateMainComponent = React.lazy(() =>
  import("../components/Create_Organisation_Projectrooms/CreateMainComponent")
);
// const MainColumnWrapper = styled.div`
//   width: 100vw;
//   height: 100%;
//   margin-top: 0vh;
//   z-index: 90;
//   top: 0;
//   position: fixed;
//   pointer-events: none;

//   @media (min-width: 768px) {
//     left: 0px;
//     /* width: 400px; */
//     height: 100vh;
//     overflow-y: scroll;
//     z-index: 90;
//     top: 0;
//     position: fixed;
//     overflow-x: visible;
//   }
// `;
const MobileMapClickBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(0, 0, 0, 0);
  z-index: 1;
  position: fixed;
  top: 0;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: 0.5s;
  pointer-events: ${(props) => (props.show ? "all" : "none")};
`;

const ScaleContainer = styled.div`
  width: 100vw;
  height: 100%;
  margin-top: 0vh;
  z-index: 90;
  top: 0;
  position: fixed;
  pointer-events: none;
  transform: ${({ show }) => (show ? "scale(1)" : "scale(0.9)")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition: 0.5s;

  @media (min-width: 768px) {
    left: 0px;
    /* width: 500px;   */
    height: 100vh;
    overflow: visible;
    z-index: 90;
    top: 0;
    position: fixed;
    overflow-x: visible;
  }
`;
const Main = ({
  statefulMap,
  setStatefulMap,
  mapFilterActive,
  swipedUp,
  setSwipedUp,
  order,
  setOrder,
  postIdeaOpen,
  setPostIdeaOpen,
  postIdeaSuccessModalOpen,
  setPostIdeaSuccessModalOpen,
  handleSetInitialMapBoundsAndViewport,
  postIdeaDiscardModalOpen,
  setShowUI,
  showUI,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.UI.errors);
  const { openModal, closeModal } = useModals();
  const { cookie_settings } = useSelector((state) => state.data);
  const organization = useSelector((state) => state.data.organization);

  const { screamId, projectRoomId, organizationId, city, profileId, ideaId } =
    useParams();
  const navigate = useNavigate();

  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openScream = useSelector((state) => state.UI.openScream);
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const openOrganization = useSelector((state) => state.UI.openOrganization);

  const setOpenStatisticsOverview = (bool) => {
    if (bool) {
      navigate(`/${city}/statistics`);
      return;
    }

    navigate(`/${city}`);
  };
  const setOpenOrganizationsOverview = (bool) => {
    if (bool) {
      navigate(`/${city}/organizations`);
      return;
    }

    navigate(`/${city}/projectRooms`);
  };

  const user = useSelector((state) => state.user);
  const myProfileData = useSelector((state) => state.user);
  const { userId } = user;
  const userLikes = user.likes;

  const screams = useSelector((state) => state.data.screams);

  const loading = useSelector((state) => state.data.loading);
  const loadingUI = useSelector((state) => state.UI.loading);
  const loadingProjects = useSelector((state) => state.data.loadingProjects);
  const loadingOrganizations = useSelector(
    (state) => state.data.loadingOrganizations
  );

  const projects = useSelector((state) => state.data.projects);
  const project = useSelector((state) => state.data.project);

  const organizations = useSelector((state) => state.data.organizations);

  const selectedTopics = useSelector((state) => state.data.topics);
  const selectedOrganizationTypes = useSelector(
    (state) => state.data.organizationTypes
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const [dropdown, setDropdown] = useState("newest");
  const [dropdownStatus, setdropdownStatus] = useState([]);

  const [changeLocationModalOpen, setChangeLocationModalOpen] = useState(false);
  const mapBounds = useSelector((state) => state.data.mapBounds);

  useEffect(() => {
    if (profileId) {
      dispatch(openAccountFunc());
      const profilePage = true;
      if (profileId !== myProfileData.userId && openAccount) {
        // visiting profile of other user

        dispatch(getUserData(profileId, profilePage));
        dispatch(getMyScreams(profileId, profilePage));
        dispatch(getMyOrganizations(profileId, profilePage));
      } else if (profileId === myProfileData.userId && openAccount) {
        // visiting my own profile

        dispatch(getUserData(myProfileData.userId, profilePage));
        dispatch(getMyScreams(myProfileData.userId, profilePage));
        dispatch(getMyOrganizations(myProfileData.userId, profilePage));
      }
    }
  }, [dispatch, openAccount, myProfileData.userId, profileId]);

  useEffect(() => {
    if (postIdeaDiscardModalOpen && !isMobileCustom) {
      openModal(
        <DiscardModalContent
          title="Discard idea?"
          closeModal={closeModal}
          setPostIdeaOpen={setPostIdeaOpen}
        />,
        {
          modal: true,
          size: "sm",
          swipe: true,
        }
      );
    }
  }, [postIdeaDiscardModalOpen]);
  const urlPath = window.location.pathname;
  useEffect(() => {
    if (urlPath === "/verify") {
      openModal(<AuthModal />, { swipe: !!isMobileCustom });
    }
  }, [urlPath]);

  const location = useLocation();

  const handleClick = useCallback(
    (order) => {
      // setOrder(order);
      setSearchTerm("");
      setDropdown("newest");
      setOpenStatisticsOverview(false);
      setOpenOrganizationsOverview(false);
      dispatch(closeScream());
      // dispatch(openProjectRoomFunc(null, false));
      // dispatch(openOrganizationFunc(null, false));
      dispatch(closeAccountFunc());
      dispatch(handleTopicSelectorRedux("all"));
      const ListWrapper = document.getElementById("ListWrapper");

      ListWrapper?.scrollTo({
        top: 0,
        left: 0,
      });
      if (order === 1) {
        navigate("/");
      }
      if (order === 2) {
        navigate(`/${city}/projectRooms`);
      }
      if (order === 3) {
        navigate("/organizations");
      }
      if (order === 4) {
        navigate("/insights");
      }
    },
    [dispatch]
  );

  // const handleDropdown = useCallback((value) => {
  //   setDropdown(value);
  // }, []);
  const handledropdownStatus = useCallback(
    (id) => {
      if (dropdownStatus.includes(id)) {
        setdropdownStatus(dropdownStatus.filter((filter) => filter !== id));
      } else {
        setdropdownStatus([...dropdownStatus, id]);
      }
    },
    [dropdownStatus]
  );

  // IDEAS

  const dataFinalIdeas = useMemo(() => {
    let ideasData = [];

    ideasData = search(screams, searchTerm, [
      "title",
      "body",
      "Stadtteil",
      "Stadtbezirk",
      "locationHeader",
    ]);
    ideasData = filterByTagFilter(ideasData, selectedTopics, "Thema");

    ideasData = sort(ideasData, dropdown);
    ideasData = filterByStatus(ideasData, dropdownStatus);
    ideasData = filterByGeodata(ideasData, mapBounds);
    return ideasData;
  }, [
    dropdown,
    dropdownStatus,
    searchTerm,
    selectedTopics,
    screams,
    mapBounds,
    userLikes,
  ]);

  const dropdownStatusNumbers = useMemo(
    () => countStatusOfScreams(screams),
    [screams]
  );

  // PROJECTROOMS

  const dataFinalProjectRooms = useMemo(() => {
    let projectRoomsData = [];

    projectRoomsData = search(projects, searchTerm, [
      "title",
      "brief",
      "description_about",
      "description_motivation",
      "description_procedure",
      "description_learnmore",
    ]);
    projectRoomsData = sort(projectRoomsData, dropdown);
    projectRoomsData = filterByTagFilter(
      projectRoomsData,
      selectedOrganizationTypes,
      "organizationType"
    );
    return projectRoomsData;
  }, [dropdown, projects, searchTerm, selectedOrganizationTypes]);

  // ORGANIZATIONS

  const dataFinalOrganizations = useMemo(() => {
    let organizationsData;
    organizationsData = search(organizations, searchTerm, ["title"]);
    organizationsData = sort(organizationsData, dropdown);
    organizationsData = filterByTagFilter(
      organizationsData,
      selectedOrganizationTypes,
      "organizationType"
    );
    return organizationsData;
  }, [dropdown, organizations, searchTerm, selectedOrganizationTypes]);

  const handleButtonOpenCard = (event, cardType, cardId) => {
    if (cardType === "ideaCard") {
      navigate(`/${city}/ideas/${cardId}`);
    } else if (cardType === "organizationCard") {
      navigate(`/${city}/organizations/${cardId}`);
    }
  };

  const handleOpenProjectroom = (event, projectroomId) => {
    event.stopPropagation();
    navigate(`/${city}/projectRooms/${projectroomId}`);
    // dispatch(openProjectRoomFunc(projectroomId, true, navigate));
  };

  const handleButtonLike = (event, screamId) => {
    event.stopPropagation();
    if (!user.authenticated) {
      openModal(<AuthModal />, { swipe: !!isMobileCustom });
      return;
    }
    if (user.likes && user.likes.find((like) => like.screamId === screamId)) {
      dispatch(unlikeScream(screamId, user));
    } else {
      dispatch(likeScream(screamId, user));
    }
  };

  const handleButtonComment = () => {
    console.log("handleButtonComment");
  };

  const handleSelectTopics = (topics) => {
    dispatch(handleTopicSelectorRedux(topics));
  };

  const handleSelectOrganizationTypes = (organizationTypes) => {
    dispatch(handleOrganizationTypesSelectorRedux(organizationTypes));
  };

  const handleOpenMyAccount = () => {
    if (user?.authenticated) {
      dispatch(openAccountFunc());
      navigate(`/profile/${userId}`);
    } else {
      openModal(<AuthModal />, { swipe: !!isMobileCustom });
    }
  };

  const handleCloseOrganizationPage = () => {
    navigate(`/${city}/organizations`);
  };

  const handleOpenCreateOrganization = () => {
    if (!user.authenticated) {
      // Add text into auth like "first you gt to create an account"
      openModal(<AuthModal />, { swipe: !!isMobileCustom });
    } else {
      openModal(
        <React.Suspense
          fallback={
            <div style={{ width: "50px", height: "2000px" }}>
              <Loader />
            </div>
          }
        >
          <CreateMainComponent type="organization" />
        </React.Suspense>,
        { size: "full", swipe: !!isMobileCustom }
      );
    }
  };

  const openMailRequestProjectroom = () => {
    const link =
      `mailto:dein@senf.koeln` +
      `?subject=${escape(
        "Projektraum erstellen – Anfrage: Termin zur Erstbesprechung"
      )}
    )}`;
    window.location.href = link;
  };
  const handleCreateProjectroom = () => {
    if (!user.authenticated) {
      // Add text into auth like "first you gt to create an account"
      openModal(<AuthModal />, { swipe: !!isMobileCustom });
    } else if (!user?.organizationId?.length) {
      openModal(
        <>
          <Box margin="30px 40px">
            <Typography
              variant="h3"
              textAlign="center"
            >
              {t("createOrganizationForCreateProjectRoom")}
            </Typography>
          </Box>
          <Box
            justifyContent="center"
            margin="0px 0px 10px 0px"
          >
            <Button
              text={t("createOrganization")}
              margin="20px"
              onClick={handleOpenCreateOrganization}
            />
          </Box>
        </>,
        { swipe: !!isMobileCustom }
      );
    } else if (user?.isOrgModerator === true) {
      dispatch(getMyOrganizations(user.userId));
      // dispatch(openCreateProjectRoomFunc(true));

      openModal(
        <React.Suspense
          fallback={
            <div style={{ width: "50px", height: "2000px" }}>
              <Loader />
            </div>
          }
        >
          <CreateMainComponent type="projectRoom" />
        </React.Suspense>,
        { size: "full", swipe: !!isMobileCustom }
      );
    } else {
      openModal(
        <>
          <Box margin="30px 40px">
            <Typography
              variant="h3"
              textAlign="center"
            >
              {t("requestCreateProjectRoom")}
            </Typography>
          </Box>
          <Box
            justifyContent="center"
            margin="0px 0px 10px 0px"
          >
            <Button
              text={t("getInTouch")}
              zIndex="999"
              backgroundColor="#fed957"
              textColor="#353535"
              margin="20px"
              onClick={openMailRequestProjectroom}
            />
          </Box>
        </>,
        { swipe: !!isMobileCustom }
      );
    }
  };

  return (
    <React.Fragment>
      {isMobileCustom && !postIdeaOpen && (
        <React.Fragment>
          {isMobileCustom && !openScream && !openAccount && !openProjectRoom && (
            <MobileMapClickBackground
              show={swipedUp}
              onClick={() => setSwipedUp(false)}
            />
          )}

          <MobileTopBar
            setOrder={setOrder}
            handleOpenMyAccount={handleOpenMyAccount}
            setShowUI={setShowUI}
            hide={
              swipedUp ||
              openProjectRoom ||
              openAccount ||
              openScream ||
              loading
            }
          />
        </React.Fragment>
      )}

      {showUI && !loading && !loadingUI && !loadingProjects && !postIdeaOpen && (
        <Box
          margin={
            isMobileCustom ? "60px 10px 10px 0px" : "10px 10px 10px 500px"
          }
          position="absolute"
          zIndex={1}
        >
          <TagSlide
            flexDirection={!isMobileCustom && "column"}
            type={
              order === 1 || openProjectRoom || openAccount
                ? "topics"
                : "organizationTypes"
            }
            hide={
              !showUI ||
              openInfoPage ||
              (isMobileCustom && swipedUp) ||
              (isMobileCustom && openScream) ||
              (openProjectRoom && !project?.screams) ||
              openAccount ||
              openOrganization
            }
            selectedTopics={selectedTopics}
            selectedOrganizationTypes={selectedOrganizationTypes}
            handleSelectTopics={handleSelectTopics}
            handleSelectOrganizationTypes={handleSelectOrganizationTypes}
          />
        </Box>
      )}

      {postIdeaOpen && (
        <PostIdeaPage
          loadingProjects={loadingProjects}
          projectsData={projects}
          project={project}
          postIdeaOpen={postIdeaOpen}
          setPostIdeaOpen={setPostIdeaOpen}
          postIdeaSuccessModalOpen={postIdeaSuccessModalOpen}
          setPostIdeaSuccessModalOpen={setPostIdeaSuccessModalOpen}
          statefulMap={statefulMap}
          projectroomsData={projects}
        />
      )}

      <ScaleContainer show={true}>
        {!openInfoPage && (
          <>
            {city && !loading && (
              <MainSwipeList
                order={
                  location.pathname.indexOf("projectRooms") > -1
                    ? "projectrooms"
                    : "ideas"
                }
                setOrder={handleClick}
                ideasDataOriginal={screams}
                ideasData={dataFinalIdeas}
                projectroomsData={dataFinalProjectRooms}
                organizations={organizations}
                selectedTopics={selectedTopics}
                selectedOrganizationTypes={selectedOrganizationTypes}
                checkedSortOption={dropdown}
                setCheckedSortOption={setDropdown}
                handleSelectTopics={handleSelectTopics}
                handleSelectOrganizationTypes={handleSelectOrganizationTypes}
                swipedUp={swipedUp}
                setSwipedUp={setSwipedUp}
                openScream={openScream}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                handleButtonOpenCard={handleButtonOpenCard}
                handleOpenProjectroom={handleOpenProjectroom}
                handleButtonLike={handleButtonLike}
                handleButtonComment={handleButtonComment}
                user={user}
                myProfileData={myProfileData}
                setOpenStatisticsOverview={setOpenStatisticsOverview}
                setOpenOrganizationsOverview={setOpenOrganizationsOverview}
                openOrganizationsOverview={true}
                handleOpenMyAccount={handleOpenMyAccount}
                setShowUI={setShowUI}
                handleCreateProjectroom={handleCreateProjectroom}
                handleMapBoundsReset={handleSetInitialMapBoundsAndViewport}
                mapFilterActive={mapFilterActive}
                postIdeaOpen={postIdeaOpen}
                setPostIdeaOpen={setPostIdeaOpen}
                postIdeaSuccessModalOpen={postIdeaSuccessModalOpen}
              />
            )}

            {projectRoomId && (
              <ProjectroomPage
                projectRoomId={projectRoomId}
                user={user}
                setPostIdeaOpen={setPostIdeaOpen}
                handleButtonOpenCard={handleButtonOpenCard}
                handleSetInitialMapBoundsAndViewport={
                  handleSetInitialMapBoundsAndViewport
                }
                handleButtonLike={handleButtonLike}
                handleButtonComment={handleButtonComment}
                setOpenStatisticsOverview={setOpenStatisticsOverview}
              />
            )}

            {openAccount && (
              <ProfilePage
                handleButtonOpenCard={handleButtonOpenCard}
                handleOpenProjectroom={handleOpenProjectroom}
                handleButtonLike={handleButtonLike}
                handleButtonComment={handleButtonComment}
              />
            )}

            {city && ideaId && (
              <IdeaDetailPage
                ideaId={ideaId}
                handleButtonLike={handleButtonLike}
                handleButtonComment={handleButtonComment}
                projectroomsData={dataFinalProjectRooms}
                user={user}
              />
            )}
          </>
        )}

        {organizationId && (
          <OrganizationPage
            organizationId={organizationId}
            organizations={organizations}
            handleCloseOrganizationPage={handleCloseOrganizationPage}
            handleEdit={handleOpenCreateOrganization}
            handleButtonOpenCard={handleButtonOpenCard}
            user={user}
          />
        )}

        {location.pathname.indexOf("organizations") > -1 && (
          <OrganizationsOverview
            data={dataFinalOrganizations}
            selectedOrganizationTypes={selectedOrganizationTypes}
            handleSelectOrganizationTypes={handleSelectOrganizationTypes}
            user={user}
            organizations={organizations}
            organization={organization}
            setOpenOrganizationsOverview={setOpenOrganizationsOverview}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            checkedSortOption={dropdown}
            setCheckedSortOption={setDropdown}
            handleButtonOpenCard={handleButtonOpenCard}
            projectroomsData={dataFinalProjectRooms}
            handleOpenCreateOrganization={handleOpenCreateOrganization}

            // openCreateOrganization,
            // setOpenModalAuthenticate,
          />
        )}

        {location.pathname.indexOf("statistics") > -1 && (
          <StatisticsOverviewPage
            setOpenStatisticsOverview={setOpenStatisticsOverview}
            projectRoomId={project?.projectRoomId}
          />
        )}
      </ScaleContainer>

      {errors && !loading && <ErrorLoading />}

      {/* {changeLocationModalOpen && (
        <ChangeLocationModal
          setChangeLocationModalOpen={setChangeLocationModalOpen}
        />
      )} */}

      {/* <Box position="fixed" right="100px" bottom="10px">
        <Button text="Stadt auswählen" onClick={setChangeLocationModalOpen} />
      </Box> */}
    </React.Fragment>
  );
};

export default Main;
