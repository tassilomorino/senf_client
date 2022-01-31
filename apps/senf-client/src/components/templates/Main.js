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
import { isMobileCustom } from "../../util/customDeviceDetect";

import _ from "lodash";

import {
  getScreams,
  closeScream,
  openScreamFunc,
} from "../../redux/actions/screamActions";
import {
  getProjects,
  openProjectRoomFunc,
} from "../../redux/actions/projectActions";

import {
  setMapBounds,
  setInitialMapBounds,
  setMapViewport,
} from "../../redux/actions/mapActions";
import {
  handleTopicSelectorRedux,
  setSwipePositionDown,
} from "../../redux/actions/UiActions";

//Components
import InsightsPage from "../organisms/SubPages/InsightsPage";
import DesktopSidebar from "../molecules/Navigation/DesktopSidebar";
import Topbar from "../molecules/Navigation/Topbar";
import Map from "../atoms/map/Map";
import SwipeList from "../organisms/SwipeLists/SwipeList";
import IdeaDialog from "../organisms/Dialogs/IdeaDialog";
import ProjectDialog from "../organisms/Dialogs/ProjectDialog";
import ThanksForTheVote from "../atoms/Backgrounds/ThanksForTheVote";
import Account from "../organisms/Dialogs/Account";
import Loader from "../atoms/Backgrounds/Loader";
import { closeAccountFunc } from "../../redux/actions/accountActions";
import ErrorBackground from "../atoms/Backgrounds/ErrorBackground";
import TagsFilter from "../molecules/Filters/TagsFilter";
import PostScream from "../organisms/PostIdea/PostScream";
import ChangeLocationModal from "../molecules/Modals/ChangeLocationModal";
import { usePrevious } from "../../hooks/usePrevious";
import {
  getOrganizations,
  openOrganizationFunc,
} from "../../redux/actions/organizationActions";
import CreateMainComponent from "../organisms/Create_Organisation_Projectrooms/CreateMainComponent";
import OrganizationDialog from "../organisms/Dialogs/OrganizationDialog";
import OrganizationsPage from "../organisms/SubPages/OrganizationsPage";
import styled from "styled-components";
import { MenuData } from "../../data/MenuData";

const MainColumnWrapper = styled.div`
  width: 100vw;
  height: 100%;
  margin-top: 0vh;
  z-index: 90;
  top: 0;
  position: fixed;
  pointer-events: none;

  @media (min-width: 768px) {
    margin-left: 200px;
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
  background-color: rgb(0, 0, 0, 0.5);
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
  const { screamId, projectRoomId, organizationId } = useParams();
  const { cookie_settings } = useSelector((state) => state.data);
  const history = useHistory();
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
  const [openInsightsPage, setOpenInsightsPage] = useState(false);
  const [openOrganizationsPage, setOpenOrganizationsPage] = useState(false);

  const voted = useSelector((state) => state.UI.voted);
  const screams = useSelector((state) => state.data.screams);
  const myScreams = useSelector((state) => state.data.myScreams);
  const [initialLoading, setInitialLoading] = useState(true);

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

  const projects = useSelector((state) => state.data.projects);
  const project = useSelector((state) => state.data.project);

  const organizations = useSelector((state) => state.data.organizations);

  const mapBounds = useSelector((state) => state.data.mapBounds);

  const mapViewport = useSelector((state) => state.data.mapViewport);
  const selectedTopics = useSelector((state) => state.data.topics);
  const selectedOrganizationTypes = useSelector(
    (state) => state.data.organizationTypes
  );

  const [order, setOrder] = useState(1);
  const swipePosition = useSelector((state) => state.UI.swipePosition);

  const setSwipeDown = () => {
    dispatch(setSwipePositionDown());
  };
  const [dropdown, setDropdown] = useState("newest");
  const [changeLocationModalOpen, setChangeLocationModalOpen] = useState(false);

  const mapRef = useRef(null);
  const mapLoaded = useSelector((state) => state.data.mapLoaded);
  const { lat, long } = useSelector((state) => state.data.scream);
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );

  useEffect(() => {
    if (mapViewport?.latitude !== 0 && mapRef?.current && mapLoaded) {
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

  useEffect(() => {
    if (
      openProjectRoom &&
      project &&
      project.centerLong !== undefined &&
      mapViewport.latitude !== 0 &&
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

  const prevLat = usePrevious({ lat });

  useEffect(() => {
    if (
      openScream &&
      !loadingIdea &&
      mapViewport.latitude !== 0 &&
      mapRef.current &&
      mapLoaded
    ) {
      if (lat && prevLat && prevLat.lat !== lat) {
        setTimeout(() => {
          const ideaViewport = {
            latitude: isMobileCustom && openScream ? lat - 0.0008 : lat,
            longitude: long,
            zoom: 16.5,
            duration: 2700,
            pitch: 30,
          };

          dispatch(setMapViewport(ideaViewport));
        }, 500);
      }
    }
  }, [lat, long, loadingIdea, openScream]);

  useEffect(() => {
    if (
      cookie_settings !== "all" &&
      cookie_settings !== "minimum" &&
      isMobileCustom &&
      !screamId
    ) {
      history.push("/intro");
    } else {
      if (mapViewport && mapViewport.latitude !== 0) {
        Promise.all([
          dispatch(getOrganizations(mapViewport)),
          dispatch(getProjects(mapViewport)),
          dispatch(getScreams(mapViewport)),
          screamId && dispatch(openScreamFunc(screamId)),
          projectRoomId && dispatch(openProjectRoomFunc(projectRoomId, true)),
          organizationId &&
            dispatch(openOrganizationFunc(true, organizationId)),
        ]).then((values) => {
          setInitialLoading(false);
        });

        if (window.location.pathname === "/projectRooms") {
          setOrder(2);
        } else if (window.location.pathname === "/organizations") {
          setOrder(3);
        } else if (window.location.pathname === "/insights") {
          setOrder(4);
        } else if (screamId) {
          setOrder(1);
        } else if (projectRoomId) {
          setOrder(2);
        } else if (organizationId) {
          setOrder(3);
        }
      }
    }
  }, [initialMapViewport]);

  const handleClick = useCallback(
    (order) => {
      setOrder(order);
      setSearchTerm("");
      setDropdown("newest");
      setOpenInsightsPage(false);
      setOpenOrganizationsPage(false);
      dispatch(closeScream());
      dispatch(openProjectRoomFunc(null, false));
      dispatch(openOrganizationFunc(null, false));

      dispatch(closeAccountFunc());
      dispatch(handleTopicSelectorRedux("all"));

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

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    },
    [dispatch]
  );

  const handleDropdown = useCallback((value) => {
    setDropdown(value);
  }, []);

  const _onViewportChange = useCallback(
    (viewport) => {
      dispatch(setMapViewport(viewport));

      // if (isMobileCustom) {
      //   const map = mapRef.current.getMap();
      //   var canvas = map.getCanvas(),
      //     w = canvas.width,
      //     h = canvas.height,
      //     NW = map.unproject([0, 0]).toArray(),
      //     SE = map.unproject([w, h]).toArray();
      //   var boundsRar = [NW, SE];

      //   const bounds = {
      //     latitude1: boundsRar[0][1],
      //     latitude2: boundsRar[1][1],
      //     longitude2: boundsRar[0][0],
      //     longitude3: boundsRar[1][0],
      //   };

      //   dispatch(setMapBounds(bounds));
      // }
    },
    [dispatch]
  );

  const [searchTerm, setSearchTerm] = useState("");

  //IDEAS

  const screamsSearched = useMemo(
    () =>
      screams?.filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (
          val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.Stadtteil?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.Stadtbezirk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.locationHeader?.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val;
        }
      }),
    [screams, searchTerm]
  );

  const dataFinalIdeas = useMemo(() => {
    const sortedIdeas =
      dropdown === "newest"
        ? _.orderBy(screamsSearched, "createdAt", "desc")
        : _.orderBy(screamsSearched, "likeCount", "desc");

    return sortedIdeas.filter(
      ({ lat, long, Thema, status }) =>
        selectedTopics.includes(Thema) &&
        lat <= mapBounds?.latitude1 &&
        lat >= mapBounds?.latitude2 &&
        long >= mapBounds?.longitude2 &&
        long <= mapBounds?.longitude3 &&
        status === "None"
    );
  }, [
    mapBounds?.latitude1,
    mapBounds?.latitude2,
    mapBounds?.longitude2,
    mapBounds?.longitude3,
    selectedTopics,
    dropdown,
    screamsSearched,
  ]);

  const dataFinalMap = useMemo(
    () =>
      openProjectRoom
        ? project?.screams?.filter(
            ({ Thema, status }) =>
              selectedTopics.includes(Thema) && status === "None"
          )
        : myScreams !== null
        ? myScreams.filter(
            ({ Thema, status }) =>
              selectedTopics.includes(Thema) && status === "None"
          )
        : screamsSearched.filter(
            ({ Thema, status }) =>
              selectedTopics.includes(Thema) && status === "None"
          ),
    [
      myScreams,
      openProjectRoom,
      project?.screams,
      screamsSearched,
      selectedTopics,
    ]
  );

  //PROJECTROOMS

  // const projectRoomsWithOrganizationType = [];

  // organizations.forEach(({ organizationId, organizationType }) => {
  //   console.log(projects);
  //   if (projects.organizationId === organizationId) {
  //     projectRoomsWithOrganizationType.push(
  //       projectRoomId.includes(organizationId),
  //       organizationType
  //     );
  //   }
  // });

  const projectRoomsSearched = useMemo(
    () =>
      projects?.filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (
          val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val;
        }
      }),
    [projects, searchTerm]
  );

  const sortedProjectRooms =
    dropdown === "newest"
      ? _.orderBy(projectRoomsSearched, "createdAt", "desc")
      : dropdown === "aToZ"
      ? _.orderBy(
          projectRoomsSearched,
          [(pr) => pr.title.toLowerCase()],
          ["asc"]
        )
      : _.orderBy(
          projectRoomsSearched,
          [(pr) => pr.title.toLowerCase()],
          ["desc"]
        );

  const dataFinalProjectRooms = useMemo(() => {
    return sortedProjectRooms.filter(({ organizationType }) =>
      selectedOrganizationTypes.includes(organizationType)
    );
  }, [selectedOrganizationTypes, dropdown, projectRoomsSearched]);

  const dataFinalMapProjects = projects?.filter(
    ({ status, organizationType }) =>
      status === "active" &&
      selectedOrganizationTypes.includes(organizationType)
  );

  return (
    <React.Fragment>
      {(initialLoading || loadingIdea || loadingProjectRoom) &&
        isMobileCustom && <Loader withoutBg={true} />}

      {isMobileCustom ? (
        <Topbar loading={loading} handleClick={handleClick} order={order} />
      ) : (
        <DesktopSidebar
          handleClick={handleClick}
          order={order}
          setChangeLocationModalOpen={setChangeLocationModalOpen}
        />
      )}

      {isMobileCustom && !openScream && (
        <MobileMapClickBackground
          show={swipePosition === "top"}
          onClick={setSwipeDown}
        />
      )}
      <Map
        order={order}
        dataFinal={dataFinalMap}
        loading={loading}
        loadingProjects={loadingProjects}
        _onViewportChange={_onViewportChange}
        openProjectRoom={openProjectRoom}
        geoData={project && openProjectRoom && project.geoData}
        mapRef={mapRef}
        projects={dataFinalMapProjects}
      />

      {!loading &&
        !loadingUI &&
        !loadingProjects &&
        isMobileCustom &&
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
      {!loading &&
        !loadingProjects &&
        isMobileCustom &&
        !openScream &&
        !openAccount &&
        order === 1 && (
          <PostScream
            loadingProjects={loadingProjects}
            projectsData={dataFinalProjectRooms}
            project={dataFinalProjectRooms}
          />
        )}

      {!openInfoPage && (
        <MainColumnWrapper>
          {(initialLoading || loadingIdea || loadingProjectRoom) &&
            !isMobileCustom && <Loader left="200px" width="400px" />}

          {!openProjectRoom &&
            !openAccount &&
            !loadingProjects &&
            !loading &&
            !openOrganization &&
            (order === 1 || order === 2) && (
              <SwipeList
                swipeListType={order === 1 ? "ideas" : "projectRoomOverview"}
                tabLabels={MenuData.map((item) => item.text).slice(0, 2)}
                loading={order === 1 ? loading : loadingProjects}
                order={order}
                dataFinal={order === 1 ? dataFinalIdeas : dataFinalProjectRooms}
                dataFinalMap={dataFinalMap}
                viewport={mapViewport}
                handleDropdown={handleDropdown}
                projectsData={dataFinalProjectRooms}
                dropdown={dropdown}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                handleClick={handleClick}
                setOpenInsightsPage={setOpenInsightsPage}
                setOpenOrganizationsPage={setOpenOrganizationsPage}
              />
            )}

          {openProjectRoom && (
            <ProjectDialog
              loading={loading}
              handleClick={handleClick}
              loadingProjects={loadingProjects}
              projectsData={dataFinalProjectRooms}
              setOpenInsightsPage={setOpenInsightsPage}
            />
          )}
          {openOrganization && (
            <OrganizationDialog
              loading={loading}
              openOrganization={openOrganization}
              dataFinalMap={dataFinalMap}
              handleClick={handleClick}
              loadingProjects={false}
              // loadingOrganizations={loadingOrganizations}
              projectsData={dataFinalProjectRooms}
            />
          )}

          {openAccount && <Account dataFinalMap={dataFinalMap} />}

          {!openInfoPage && openScream && <IdeaDialog />}
        </MainColumnWrapper>
      )}

      {!openInfoPage &&
        !openProjectRoom &&
        !openAccount &&
        !openOrganization &&
        openOrganizationsPage && (
          <OrganizationsPage
            order={order}
            setOpenOrganizationsPage={setOpenOrganizationsPage}
          />
        )}

      {!openInfoPage &&
        !openAccount &&
        !openOrganization &&
        openInsightsPage && (
          <InsightsPage
            setOpenInsightsPage={setOpenInsightsPage}
            projectRoomId={project?.projectRoomId}
          />
        )}

      <ErrorBackground loading={loading} />

      {voted && <ThanksForTheVote />}
      {changeLocationModalOpen && (
        <ChangeLocationModal
          setChangeLocationModalOpen={setChangeLocationModalOpen}
        />
      )}

      {(openCreateProjectRoom || openCreateOrganization) && (
        <CreateMainComponent
          type={
            openCreateProjectRoom
              ? "projectRoom"
              : openCreateOrganization
              ? "organization"
              : null
          }
        />
      )}
    </React.Fragment>
  );
};

export default Main;
