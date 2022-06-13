/** @format */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { isMobileCustom } from "../util/customDeviceDetect";

import {
  getScreams,
  closeScream,
  openScreamFunc,
} from "../redux/actions/screamActions";
import {
  getProjects,
  openProjectRoomFunc,
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
import InsightsPage from "../components/organisms/SubPages/InsightsPage";
import DesktopSidebar from "../components/molecules/Navigation/DesktopSidebar";
import Topbar from "../components/molecules/Navigation/Topbar";
import Map from "../components/atoms/map/Map";
import SwipeList from "../components/organisms/SwipeLists/SwipeList";
import IdeaDialog from "../components/organisms/Dialogs/IdeaDialog";
import ProjectDialog from "../components/organisms/Dialogs/ProjectDialog";
import ThanksForTheVote from "../components/atoms/Backgrounds/ThanksForTheVote";
import Account from "../components/organisms/Dialogs/Account";
import Loader from "../components/atoms/Backgrounds/Loader";
import {
  closeAccountFunc,
  getMyOrganizations,
  getMyScreams,
  openAccountFunc,
} from "../redux/actions/accountActions";
import ErrorBackground from "../components/atoms/Backgrounds/ErrorBackground";
import TagsFilter from "../components/molecules/Filters/TagsFilter";
import PostScream from "../components/organisms/PostIdea/PostScream";
import ChangeLocationModal from "../components/molecules/Modals/ChangeLocationModal";
import { usePrevious } from "../hooks/usePrevious";
import {
  getOrganizations,
  openOrganizationFunc,
  stateCreateOrganizationsFunc,
} from "../redux/actions/organizationActions";

import OrganizationDialog from "../components/organisms/Dialogs/OrganizationDialog";
import OrganizationsPage from "../components/organisms/SubPages/OrganizationsPage";
import styled from "styled-components";
import { MenuData } from "../data/MenuData";
import {
  filterByGeodata,
  filterByTagFilter,
  filterByStatus,
  pick,
  search,
  sort,
  countStatusOfScreams,
} from "../util/helpers";
import LoginRegistration from "../components/organisms/Auth/LoginRegistration";

import {
  MainSwipeList,
  OrganizationsOverview,
  MenuSidebar,
  TagSlide,
  Box,
} from "senf-atomic-design-system";
import OrganizationPage from "./OrganizationPage";
import { likeScream, unlikeScream } from "../redux/actions/likeActions";
import InlineInformationPage from "../components/organisms/infocomponents/InlineInformationPage";
import ProjectroomPage from "./ProjectroomPage";
import ProfilePage from "./ProfilePage";

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
  const history = useHistory();
  const dispatch = useDispatch();
  const [authOpen, setAuthOpen] = useState(false);
  const [postIdeaOpen, setPostIdeaOpen] = useState(false);

  const [swipedUp, setSwipedUp] = useState(false);
  const organization = useSelector((state) => state.data.organization);

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
  const userId = user.userId;
  const userLikes = user.likes;

  const voted = useSelector((state) => state.UI.voted);
  const screams = useSelector((state) => state.data.screams);
  const myScreams = useSelector((state) => state.data.myScreams);

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

  const swipePosition = useSelector((state) => state.UI.swipePosition);
  const setSwipeDown = () => {
    dispatch(setSwipePositionDown());
  };

  const [changeLocationModalOpen, setChangeLocationModalOpen] = useState(false);
  const mapRef = useRef(null);

  const mapBounds = useSelector((state) => state.data.mapBounds);
  const mapLoaded = useSelector((state) => state.data.mapLoaded);
  const { lat, long } = useSelector((state) => state.data.scream);
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const mapViewportRef = useRef(initialMapViewport);

  //Initial-ZOOM
  useEffect(() => {
    if (mapRef?.current && mapLoaded) {
      const map = mapRef.current.getMap();
      var canvas = map.getCanvas(),
        w = canvas.width,
        h = canvas.height,
        NW = map.unproject([0, 0]).toArray(),
        SE = map.unproject([w, h]).toArray();
      var boundsRar = [NW, SE];

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

  //PROJECTROOM-ZOOM
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

  //IDEA-ZOOM
  const prevLat = usePrevious({ lat });
  useEffect(() => {
    if (openScream && !loadingIdea && mapRef.current && mapLoaded) {
      if (lat && prevLat && prevLat.lat !== lat) {
        setTimeout(() => {
          dispatch(
            setMapViewport({
              latitude: isMobileCustom && openScream ? lat - 0.0008 : lat,
              longitude: long,
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
      history.push("/intro");
    }
  }, [cookie_settings, history]);

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

  //IDEAS

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

  //PROJECTROOMS

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

  //ORGANIZATIONS

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

  //MAP
  const dataMap = useMemo(
    () =>
      openProjectRoom
        ? project?.screams?.filter(({ Thema }) =>
            selectedTopics.includes(Thema)
          )
        : myScreams !== null
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

  const dataFinalMapProjects = useMemo(() => {
    return projects.filter(({ organizationType }) =>
      selectedOrganizationTypes.includes(organizationType)
    );
  }, [projects, selectedOrganizationTypes]);
  const swipeListTablabels = useMemo(() => {
    return MenuData?.map((item) => item.text).slice(0, 2);
  }, []);

  const handleButtonOpenCard = (event, cardType, cardId) => {
    if (cardType === "ideaCard") {
      dispatch(openScreamFunc(cardId));
    } else if (cardType === "projectroomCard") {
      dispatch(openProjectRoomFunc(cardId, true));
    } else if (cardType === "organizationCard") {
      dispatch(openOrganizationFunc(cardId, true));
    }
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

  console.log(openOrganizationsOverview);

  const handleOpenMyAccount = () => {
    dispatch(openProjectRoomFunc(null, false));
    dispatch(closeScream());
    dispatch(openAccountFunc(userId));
    window.history.pushState(null, null, "/");

    dispatch(handleTopicSelectorRedux("all"));
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

  const handleOpenCreateOrganization = () => {
    if (!user.authenticated) {
      setOpenModalAuthenticate(true);
      return;
    } else {
      dispatch(stateCreateOrganizationsFunc(true));
    }
  };

  return (
    <React.Fragment>
      {(loading || loadingIdea || loadingProjectRoom) && (
        <Loader withoutBg={true} />
      )}

      {openInfoPage && (
        <InlineInformationPage
          setOrder={setOrder}
          setOpenOrganizationsOverview={setOpenOrganizationsOverview}
        />
      )}
      <LoginRegistration setAuthOpen={setAuthOpen} authOpen={authOpen} />

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
      {isMobileCustom ? (
        <React.Fragment>
          {isMobileCustom && !openScream && (
            <MobileMapClickBackground
              show={swipePosition === "top"}
              onClick={setSwipeDown}
            />
          )}
          {!loading &&
            !loadingUI &&
            !loadingProjects &&
            !openScream &&
            (order === 1 || order === 2 || openProjectRoom || openAccount) && (
              <TagsFilter
                loading={loading}
                type={
                  order === 1 || openProjectRoom || openAccount
                    ? "topics"
                    : "organizationType"
                }
              />
            )}

          <Topbar
            loading={loading}
            handleClick={handleClick}
            order={order}
            setOrder={setOrder}
            setOpenOrganizationsPage={setOpenOrganizationsOverview}
            setAuthOpen={setAuthOpen}
          />
        </React.Fragment>
      ) : (
        !loading && (
          // <DesktopSidebar
          //   handleClick={handleClick}
          //   order={order}
          //   setChangeLocationModalOpen={setChangeLocationModalOpen}
          //   loading={loading}
          //   setOrder={setOrder}
          //   setOpenOrganizationsPage={setOpenOrganizationsOverview}
          //   mapViewportRef={mapViewportRef}
          //   setAuthOpen={setAuthOpen}
          // />
          <Box margin="10px 10px 10px 500px" position="fixed" zIndex={9}>
            <TagSlide
              type={order === 1 ? "topics" : "organizationTypes"}
              selectedTopics={selectedTopics}
              selectedOrganizationTypes={selectedOrganizationTypes}
              handleSelectTopics={handleSelectTopics}
              handleSelectOrganizationTypes={handleSelectOrganizationTypes}
            />
          </Box>
        )
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
              />
            )}

          {openProjectRoom && (
            // <ProjectDialog
            //   loading={loading}
            //   handleClick={handleClick}
            //   loadingProjects={loadingProjects}
            //   dataFinalProjectRooms={dataFinalProjectRooms}
            //   setOpenInsightsPage={setOpenStatisticsOverview}
            // />
            <ProjectroomPage
              setPostIdeaOpen={setPostIdeaOpen}
              handleButtonOpenCard={handleButtonOpenCard}
            />
          )}

          {openAccount && (
            <ProfilePage
              dataFinalMap={dataFinalMap}
              handleButtonOpenCard={handleButtonOpenCard}
            />
          )}

          {!openInfoPage && openScream && (
            <IdeaDialog
              handleButtonLike={handleButtonLike}
              handleButtonComment={handleButtonComment}
              projectroomsData={dataFinalProjectRooms}
              user={user}
            />
          )}
        </MainColumnWrapper>
      )}

      {openOrganization && !loadingOrganization && (
        <OrganizationPage
          organization={organization}
          organizations={organizations}
          handleCloseOrganizationPage={setOpenOrganizationsPage}
          handleOpenCreateOrganization={handleOpenCreateOrganization}
          handleButtonOpenCard={handleButtonOpenCard}

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
          <InsightsPage
            openStatisticsOverview={openStatisticsOverview}
            setOpenStatisticsOverview={setOpenStatisticsOverview}
            projectRoomId={project?.projectRoomId}
          />
        )}

      <ErrorBackground loading={loading} />

      {voted && userLikes.length <= 1 && <ThanksForTheVote />}
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
