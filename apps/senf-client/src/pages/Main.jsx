/** @format */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MainSwipeList,
  OrganizationsOverview,
  Modal,
  Button,
  TagSlide,
  Box,
  MobileTopBar,
  ErrorLoading,
} from "senf-atomic-design-system";
import { isMobileCustom } from "../util/customDeviceDetect";

import {
  getScreams,
  closeScream,
  openScreamFunc,
} from "../redux/actions/screamActions";
import {
  getProjects,
  openProjectRoomFunc,
  openCreateProjectRoomFunc,
} from "../redux/actions/projectActions";

import {
  setMapBounds,
  setInitialMapBounds,
  setMapViewport,
} from "../redux/actions/mapActions";
import {
  handleTopicSelectorRedux,
  handleOrganizationTypesSelectorRedux,
  setSwipePositionDown,
  setSwipePositionUp,
  setInfoPageClosed,
  setInfoPageOpen,
} from "../redux/actions/UiActions";

// Components
import StatisticsOverviewPage from "./StatisticsOverviewPage";
import Map from "../components/atoms/map/Map";
import IdeaDialog from "./IdeaDetailPage";
import Loader from "../components/atoms/Backgrounds/Loader";
import {
  closeAccountFunc,
  getMyOrganizations,
  getMyScreams,
  openAccountFunc,
} from "../redux/actions/accountActions";
import PostScream from "../components/organisms/PostIdea/PostScream";
import ChangeLocationModal from "../components/molecules/Modals/ChangeLocationModal";
import { usePrevious } from "../hooks/usePrevious";
import {
  getOrganizations,
  openOrganizationFunc,
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
import Auth from "./Auth";

import OrganizationPage from "./OrganizationPage";
import { likeScream, unlikeScream } from "../redux/actions/likeActions";
import InlineInformationPage from "../components/organisms/infocomponents/InlineInformationPage";
import ProjectroomPage from "./ProjectroomPage";
import ProfilePage from "./ProfilePage";
import { StyledH3 } from "../styles/GlobalStyle";

const CreateMainComponent = React.lazy(() =>
  import(
    "../components/organisms/Create_Organisation_Projectrooms/CreateMainComponent"
  )
);
const MainColumnWrapper = styled.div`
  width: 100vw;
  height: 100%;
  margin-top: 0vh;
  z-index: 90;
  top: 0;
  position: fixed;
  pointer-events: none;

  @media (min-width: 768px) {
    left: 0px;
    /* width: 400px; */
    height: 100vh;
    overflow-y: scroll;
    z-index: 90;
    top: 0;
    position: fixed;
    overflow-x: visible;
  }
`;
const MobileMapClickBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(0, 0, 0, 0);
  z-index: 10;
  position: fixed;
  top: 0;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: 0.5s;
  pointer-events: ${(props) => (props.show ? "all" : "none")};
`;
const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.UI.errors);
  const [authOpen, setAuthOpen] = useState(false);
  const [authEditOpen, setAuthEditOpen] = useState(false);

  const [postIdeaOpen, setPostIdeaOpen] = useState(false);

  const [modalData, setModalData] = useState(null);

  const [swipedUp, setSwipedUp] = useState(false);
  const organization = useSelector((state) => state.data.organization);

  const [
    openModalAuthenticateForProjectRoom,
    setOpenModalAuthenticateForProjectRoom,
  ] = useState(false);

  const [openCreateOrganizationFirst, setOpenCreateOrganizationFirst] =
    useState(false);

  const [openRequestProjectRoom, setOpenRequestProjectRoom] = useState(false);

  const [openModalAuthenticate, setOpenModalAuthenticate] = useState(false);

  const { screamId, projectRoomId, organizationId } = useParams();
  const { cookie_settings } = useSelector((state) => state.data);
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openScream = useSelector((state) => state.UI.openScream);
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const openOrganization = useSelector((state) => state.UI.openOrganization);
  const openCreateOrganization = useSelector(
    (state) => state.UI.openCreateOrganization
  );
  const openCreateProjectRoom = useSelector(
    (state) => state.UI.openCreateProjectRoom
  );
  const [openStatisticsOverview, setOpenStatisticsOverview] = useState(false);
  const [openOrganizationsOverview, setOpenOrganizationsOverview] =
    useState(false);

  const user = useSelector((state) => state.user);
  const { userId } = user;
  const userLikes = user.likes;

  const voted = useSelector((state) => state.UI.voted);
  const screams = useSelector((state) => state.data.screams);
  const myScreams = useSelector((state) => state.user.myScreams);

  const loading = useSelector((state) => state.data.loading);
  const loadingUI = useSelector((state) => state.UI.loading);
  const loadingProjects = useSelector((state) => state.data.loadingProjects);
  const loadingOrganizations = useSelector(
    (state) => state.data.loadingOrganizations
  );

  const loadingIdea = useSelector((state) => state.data.loadingIdea);
  const loadingProjectRoom = useSelector(
    (state) => state.data.loadingProjectRoom
  );
  const loadingOrganization = useSelector(
    (state) => state.data.loadingOrganization
  );

  const projects = useSelector((state) => state.data.projects);
  const project = useSelector((state) => state.data.project);

  const organizations = useSelector((state) => state.data.organizations);

  const selectedTopics = useSelector((state) => state.data.topics);
  const selectedOrganizationTypes = useSelector(
    (state) => state.data.organizationTypes
  );

  const [order, setOrder] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const [dropdown, setDropdown] = useState("newest");
  const [dropdownStatus, setdropdownStatus] = useState([]);

  const [changeLocationModalOpen, setChangeLocationModalOpen] = useState(false);
  const mapRef = useRef(null);

  const mapBounds = useSelector((state) => state.data.mapBounds);
  const mapLoaded = useSelector((state) => state.data.mapLoaded);
  const { lat, long } = useSelector((state) => state.data.scream);
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const mapViewportRef = useRef(initialMapViewport);

  // Initial-ZOOM
  useEffect(() => {
    if (mapRef?.current && mapLoaded) {
      const map = mapRef.current.getMap();
      const canvas = map.getCanvas();
      const w = canvas.width;
      const h = canvas.height;
      const NW = map.unproject([0, 0]).toArray();
      const SE = map.unproject([w, h]).toArray();
      const boundsRar = [NW, SE];

      const bounds = {
        latitude1: boundsRar[0][1],
        latitude2: boundsRar[1][1],
        longitude2: boundsRar[0][0],
        longitude3: boundsRar[1][0],
      };
      dispatch(setInitialMapBounds(bounds));
      dispatch(setMapBounds(bounds));
    }
  }, [mapLoaded, initialMapViewport]);

  // PROJECTROOM-ZOOM
  useEffect(() => {
    if (
      openProjectRoom &&
      project &&
      project.centerLong !== undefined &&
      !openScream &&
      mapRef.current &&
      mapLoaded
    ) {
      setTimeout(() => {
        const projectViewport = {
          latitude: project.centerLat,
          longitude: project.centerLong,
          zoom: isMobileCustom ? project.zoom - 2 : project.zoom,
          duration: 2700,
          pitch: 30,
        };

        dispatch(setMapViewport(projectViewport));
      }, 500);
    }
  }, [project]);

  // IDEA-ZOOM
  const prevLat = usePrevious({ lat });
  useEffect(() => {
    if (openScream && !loadingIdea && mapRef.current && mapLoaded) {
      if (lat && prevLat && prevLat.lat !== lat) {
        setTimeout(() => {
          dispatch(
            setMapViewport({
              latitude: isMobileCustom && openScream ? lat - 0.0008 : lat,
              longitude: isMobileCustom ? long : long - 0.001,
              zoom: 16.5,
              duration: 2700,
              pitch: 30,
            })
          );
        }, 500);
      }
    }
  }, [lat, long, loadingIdea, openScream]);
  useEffect(() => {
    if (
      cookie_settings !== "all" &&
      cookie_settings !== "minimum" &&
      isMobileCustom
    ) {
      window.history.push("/intro");
    }
  }, [cookie_settings]);

  useEffect(() => {
    projectRoomId && dispatch(openProjectRoomFunc(projectRoomId, true));
    screamId && dispatch(openScreamFunc(screamId));
    organizationId && dispatch(openOrganizationFunc(organizationId, true));
  }, [dispatch, projectRoomId, screamId, organizationId]);

  useEffect(() => {
    if (window.location.pathname === "/projectRooms") {
      setOrder(2);
    } else if (window.location.pathname === "/organizations") {
      setOrder(2);
      dispatch(setSwipePositionUp());
      setOpenOrganizationsOverview(true);
    } else if (window.location.pathname === "/insights") {
      // setOrder(4);
    } else if (projectRoomId) {
      setOrder(2);
    } else if (screamId) {
      setOrder(1);
    } else if (organizationId) {
      setOrder(2);
      dispatch(setSwipePositionUp());
      setOpenOrganizationsOverview(true);
    }
  }, [dispatch, organizationId, screamId, projectRoomId]);

  const handleClick = useCallback(
    (order) => {
      setOrder(order);
      setSearchTerm("");
      setDropdown("newest");
      setOpenStatisticsOverview(false);
      setOpenOrganizationsOverview(false);
      dispatch(closeScream());
      dispatch(openProjectRoomFunc(null, false));
      dispatch(openOrganizationFunc(null, false));
      dispatch(closeAccountFunc());
      dispatch(handleTopicSelectorRedux("all"));
      const ListWrapper = document.getElementById("ListWrapper");

      ListWrapper?.scrollTo({
        top: 0,
        left: 0,
      });
      if (order === 1) {
        window.history.pushState(null, null, "/");
      }
      if (order === 2) {
        window.history.pushState(null, null, "/projectRooms");
      }
      if (order === 3) {
        window.history.pushState(null, null, "/organizations");
      }
      if (order === 4) {
        window.history.pushState(null, null, "/insights");
      }
    },
    [dispatch]
  );

  const handleDropdown = useCallback((value) => {
    setDropdown(value);
  }, []);
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

  // MAP
  const dataMap = useMemo(
    () =>
      openProjectRoom
        ? project?.screams?.filter(({ Thema }) =>
            selectedTopics.includes(Thema)
          )
        : myScreams !== null && myScreams !== undefined
        ? myScreams.filter(({ Thema }) => selectedTopics.includes(Thema))
        : dataFinalIdeas,
    [
      myScreams,
      openProjectRoom,
      project?.screams,
      dataFinalIdeas,
      selectedTopics,
    ]
  );
  const dataFinalMap = useMemo(
    () =>
      dataMap?.map((object) =>
        pick(["title", "lat", "long", "screamId", "color", "likeCount"], object)
      ),
    [dataMap]
  );

  const dataFinalMapProjects = useMemo(
    () =>
      projects.filter(({ organizationType }) =>
        selectedOrganizationTypes.includes(organizationType)
      ),
    [projects, selectedOrganizationTypes]
  );

  const handleButtonOpenCard = (event, cardType, cardId) => {
    if (cardType === "ideaCard") {
      dispatch(openScreamFunc(cardId));
    } else if (cardType === "projectroomCard") {
      dispatch(openProjectRoomFunc(cardId, true));
    } else if (cardType === "organizationCard") {
      dispatch(openOrganizationFunc(cardId, true));
    }
  };

  const handleOpenProjectroom = (event, projectroomId) => {
    event.stopPropagation();
    dispatch(openProjectRoomFunc(projectroomId, true));
  };

  const handleButtonLike = (event, screamId) => {
    event.stopPropagation();
    if (!user.authenticated) {
      setAuthOpen(true);
      return;
    }

    if (user.likes && user.likes.find((like) => like.screamId === screamId)) {
      dispatch(unlikeScream(screamId, user));
    } else {
      dispatch(likeScream(screamId, user));
    }
  };

  const handleButtonComment = () => {};

  const handleSelectTopics = (topics) => {
    dispatch(handleTopicSelectorRedux(topics));
  };

  const handleSelectOrganizationTypes = (organizationTypes) => {
    console.log(organizationTypes);
    dispatch(handleOrganizationTypesSelectorRedux(organizationTypes));
  };

  const handleOpenMyAccount = () => {
    if (user?.authenticated) {
      dispatch(openProjectRoomFunc(null, false));
      dispatch(closeScream());
      dispatch(openAccountFunc(userId));
      window.history.pushState(null, null, "/");
      dispatch(handleTopicSelectorRedux("all"));
    } else {
      setAuthOpen(true);
    }
  };
  useEffect(() => {
    if (userId && openAccount) {
      if (userId) {
        dispatch(getMyScreams(userId));
        dispatch(getMyOrganizations(userId));
      }
    }
  }, [dispatch, openAccount, userId]);

  const handleOpenInfoPage = useCallback(() => {
    dispatch(setInfoPageOpen());
  }, [dispatch]);

  const handleCloseOrganizationPage = () => {
    dispatch(openOrganizationFunc(null, false));
  };

  const handleOpenCreateOrganization = () => {
    if (!user.authenticated) {
      setOpenModalAuthenticate(true);
    } else {
      dispatch(stateCreateOrganizationsFunc(true));
      setOpenCreateOrganizationFirst(false);
    }
  };

  const handleCreateProjectroom = () => {
    if (!user.authenticated) {
      setOpenModalAuthenticateForProjectRoom(true);
    } else if (!user?.organizationId?.length) {
      setOpenCreateOrganizationFirst(true);
    } else if (user?.isOrgModerator === true) {
      dispatch(getMyOrganizations(user.userId));
      dispatch(openCreateProjectRoomFunc(true));
    } else {
      setOpenRequestProjectRoom(true);
    }
  };

  return (
    <React.Fragment>
      {openModalAuthenticateForProjectRoom && !user.authenticated && (
        <Modal
          zIndex={9999999999}
          openModal={openModalAuthenticateForProjectRoom}
          setOpenModal={setOpenModalAuthenticateForProjectRoom}
        >
          <StyledH3 textAlign="center" margin="20px">
            {t("authenticatedForCreateProjectRoom")}
          </StyledH3>
          <Box justifyContent="center" margin="0px 0px 10px 0px">
            <Button text={t("login")} onClick={() => setAuthOpen(true)} />
          </Box>
        </Modal>
      )}

      {openCreateOrganizationFirst && (
        <Modal
          zIndex={9999999999}
          openModal={openCreateOrganizationFirst}
          setOpenModal={setOpenCreateOrganizationFirst}
        >
          <StyledH3 textAlign="center" margin="20px">
            {t("createOrganizationForCreateProjectRoom")}
          </StyledH3>
          <Box justifyContent="center" margin="0px 0px 10px 0px">
            <Button
              text={t("createOrganization")}
              margin="20px"
              onClick={handleOpenCreateOrganization}
            />
          </Box>
        </Modal>
      )}

      {openRequestProjectRoom && (
        <Modal
          zIndex={9999999999}
          openModal={openRequestProjectRoom}
          setOpenModal={setOpenRequestProjectRoom}
        >
          <StyledH3 textAlign="center" margin="20px">
            {t("requestCreateProjectRoom")}
          </StyledH3>
          <Box justifyContent="center" margin="0px 0px 10px 0px">
            <Button
              text={t("getInTouch")}
              zIndex="999"
              backgroundColor="#fed957"
              textColor="#353535"
              margin="20px"
              onClick={openMailRequestProjectRoom}
            />
          </Box>
        </Modal>
      )}

      {(loading || loadingIdea || loadingProjectRoom) && (
        <Loader withoutBg={true} />
      )}

      {openInfoPage && (
        <InlineInformationPage
          setOrder={setOrder}
          setOpenOrganizationsOverview={setOpenOrganizationsOverview}
        />
      )}
      {(authOpen || authEditOpen) && (
        <Auth
          setAuthOpen={setAuthOpen}
          setAuthEditOpen={setAuthEditOpen}
          authOpen={authOpen}
          authEditOpen={authEditOpen}
        />
      )}

      {isMobileCustom && !postIdeaOpen && (
        <React.Fragment>
          {isMobileCustom &&
            !openScream &&
            !openAccount &&
            !openProjectRoom && (
              <MobileMapClickBackground
                show={swipedUp}
                onClick={() => swipedUp(false)}
              />
            )}

          <MobileTopBar
            setOrder={setOrder}
            handleOpenMyAccount={handleOpenMyAccount}
            setInfoPageOpen={handleOpenInfoPage}
            swipedUp={
              swipedUp ||
              openProjectRoom ||
              openAccount ||
              openScream ||
              loading
            }
          />
        </React.Fragment>
      )}

      {!loading && !loadingUI && !loadingProjects && (
        // !openScream &&
        // (order === 1 || order === 2 || openProjectRoom || openAccount) &&
        <Box
          margin={
            isMobileCustom ? "60px 10px 10px 10px" : "10px 10px 10px 500px"
          }
          position="absolute"
          zIndex={9}
        >
          <TagSlide
            flexDirection={!isMobileCustom && "column"}
            type={
              order === 1 || openProjectRoom || openAccount
                ? "topics"
                : "organizationTypes"
            }
            hide={
              openInfoPage ||
              swipedUp ||
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
        <PostScream
          loadingProjects={loadingProjects}
          projectsData={projects}
          project={project}
          mapViewportRef={mapViewportRef}
          setPostIdeaOpen={setPostIdeaOpen}
          postIdeaOpen={postIdeaOpen}
          setAuthOpen={setAuthOpen}
        />
      )}

      <Map
        order={order}
        dataFinal={dataFinalMap}
        loading={loading}
        loadingProjects={loadingProjects}
        openProjectRoom={openProjectRoom}
        geoData={project && openProjectRoom && project.geoData}
        mapRef={mapRef}
        mapViewportRef={mapViewportRef}
        projects={dataFinalMapProjects}
      />

      {!openInfoPage && (
        <MainColumnWrapper>
          {/* {(loading || loadingIdea || loadingProjectRoom) &&
            !isMobileCustom && <Loader left="200px" width="400px" />} */}

          {!openProjectRoom &&
            !openAccount &&
            !loading &&
            (order === 1 || (order === 2 && !loadingProjects)) && (
              // <SwipeList
              //   swipeListType={order === 1 ? "ideas" : "projectRoomOverview"}
              //   tabLabels={swipeListTablabels}
              //   loading={loading}
              //   order={order}
              //   dataFinal={order === 1 ? dataFinalIdeas : dataFinalProjectRooms}
              //   dataFinalMap={dataFinalMap}
              //   handleDropdown={handleDropdown}
              //   handledropdownStatus={handledropdownStatus}
              //   dataFinalProjectRooms={dataFinalProjectRooms}
              //   dropdown={dropdown}
              //   dropdownStatus={dropdownStatus}
              //   dropdownStatusNumbers={dropdownStatusNumbers}
              //   setSearchTerm={setSearchTerm}
              //   searchTerm={searchTerm}
              //   handleClick={handleClick}
              //   setOpenInsightsPage={setOpenInsightsPage}
              //   setOpenOrganizationsPage={setOpenOrganizationsPage}
              //   openOrganizationsPage={openOrganizationsPage}
              //   openInsightsPage={openInsightsPage}
              //   mapViewportRef={mapViewportRef}
              // />

              <MainSwipeList
                order={order === 1 ? "ideas" : "projectrooms"}
                setOrder={handleClick}
                // setOpenOrganizationsOverview={setOpenOrganizationsOverview}
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
                setOpenStatisticsOverview={setOpenStatisticsOverview}
                openStatisticsOverview={openStatisticsOverview}
                setOpenOrganizationsOverview={setOpenOrganizationsOverview}
                openOrganizationsOverview={openOrganizationsOverview}
                setPostIdeaOpen={setPostIdeaOpen}
                handleOpenMyAccount={handleOpenMyAccount}
                setInfoPageOpen={handleOpenInfoPage}
                handleCreateProjectroom={handleCreateProjectroom}
              />
            )}

          {openProjectRoom && !openScream && (
            // <ProjectDialog
            //   loading={loading}
            //   handleClick={handleClick}
            //   loadingProjects={loadingProjects}
            //   dataFinalProjectRooms={dataFinalProjectRooms}
            //   setOpenInsightsPage={setOpenStatisticsOverview}
            // />
            <ProjectroomPage
              user={user}
              setPostIdeaOpen={setPostIdeaOpen}
              handleButtonOpenCard={handleButtonOpenCard}
            />
          )}

          {openAccount && (
            <ProfilePage
              dataFinalMap={dataFinalMap}
              handleButtonOpenCard={handleButtonOpenCard}
              handleOpenProjectroom={handleOpenProjectroom}
              setAuthEditOpen={setAuthEditOpen}
            />
          )}

          {!openInfoPage && openScream && (
            <IdeaDialog
              handleButtonLike={handleButtonLike}
              handleButtonComment={handleButtonComment}
              projectroomsData={dataFinalProjectRooms}
              user={user}
              setAuthOpen={setAuthOpen}
            />
          )}
        </MainColumnWrapper>
      )}

      {openOrganization && !loadingOrganization && (
        <OrganizationPage
          organization={organization}
          organizations={organizations}
          handleCloseOrganizationPage={handleCloseOrganizationPage}
          handleEdit={handleOpenCreateOrganization}
          handleButtonOpenCard={handleButtonOpenCard}
          user={user}
          setModalData={setModalData}
          // setContactOpen,
          // setFaqOpen,

          // openOrganization={openOrganization}
          // dataFinalMap={dataFinalMap}
          // handleClick={handleClick}
          // loadingProjects={false}
          // loading={loadingOrganizations}
          // projectsData={dataFinalProjectRooms}
          // setOpenOrganizationsPage={setOpenOrganizationsOverview}
          // handleOpenCreateOrganization={handleOpenCreateOrganization}
        />
      )}

      {!openInfoPage &&
        !openProjectRoom &&
        !openAccount &&
        openOrganizationsOverview &&
        !loadingOrganizations && (
          // <OrganizationsPage
          //   order={order}
          //   setOpenOrganizationsPage={setOpenOrganizationsOverview}
          //   dataFinal={dataFinalOrganizations}
          //   dropdown={dropdown}
          //   handleDropdown={handleDropdown}
          //   setDropdown={setDropdown}
          //   searchTerm={searchTerm}
          //   setSearchTerm={setSearchTerm}
          //   dataFinalProjectRooms={dataFinalProjectRooms}
          // />
          <OrganizationsOverview
            data={dataFinalOrganizations}
            selectedOrganizationTypes={selectedOrganizationTypes}
            user={user}
            organizations={organizations}
            organization={organization}
            openOrganizationsOverview={openOrganizationsOverview}
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

      {!openInfoPage &&
        !openAccount &&
        !openOrganization &&
        openStatisticsOverview && (
          <StatisticsOverviewPage
            openStatisticsOverview={openStatisticsOverview}
            setOpenStatisticsOverview={setOpenStatisticsOverview}
            projectRoomId={project?.projectRoomId}
          />
        )}

      {errors && !loading && <ErrorLoading />}

      {/* {voted && userLikes.length <= 1 && <ThanksForTheVote />} */}

      {modalData && (
        <Modal
          openModal={modalData}
          setOpenModal={setModalData}
          zIndex="999999999"
          backgroundColor="beige"
          size={"xl"}
        >
          {modalData}
        </Modal>
      )}

      {changeLocationModalOpen && (
        <ChangeLocationModal
          setChangeLocationModalOpen={setChangeLocationModalOpen}
        />
      )}

      {(openCreateProjectRoom || openCreateOrganization) && (
        <React.Suspense fallback={<Loader />}>
          <CreateMainComponent
            type={
              openCreateProjectRoom
                ? "projectRoom"
                : openCreateOrganization && "organization"
            }
          />
        </React.Suspense>
      )}
    </React.Fragment>
  );
};

export default Main;
