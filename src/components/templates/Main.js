/** @format */

import React, { useState, useEffect, useRef } from "react";
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
import { handleTopicSelectorRedux } from "../../redux/actions/UiActions";

//Components
import InsightsPage from "../organisms/SubPages/InsightsPage";
import DesktopSidebar from "../molecules/Navigation/DesktopSidebar";
import Topbar from "../molecules/Navigation/Topbar";
import MapDesktop from "../atoms/map/MapDesktop";
import SwipeList from "../organisms/SwipeLists/SwipeList";
import IdeaDialog from "../organisms/Dialogs/IdeaDialog";
import ProjectDialog from "../organisms/Dialogs/ProjectDialog";
import ThanksForTheVote from "../atoms/Backgrounds/ThanksForTheVote";
import Account from "../organisms/Dialogs/Account";
import Loader from "../atoms/Backgrounds/Loader";
import { closeAccountFunc } from "../../redux/actions/accountActions";
import ErrorBackground from "../atoms/Backgrounds/ErrorBackground";
import MapMobile from "../atoms/map/MapMobile";
import TopicFilter from "../molecules/Filters/TopicFilter";
import PostScream from "../organisms/PostIdea/PostScream";
import ChangeLocationModal from "../molecules/Modals/ChangeLocationModal";
import { usePrevious } from "../../hooks/usePrevious";
import {
  getOrganizations,
  openOrganizationFunc,
} from "../../redux/actions/organizationActions";
import CreateOrganizationDialog from "../organisms/CreateOrganization/CreateOrganizationDialog";
import CreateProjectDialog from "../organisms/CreateProject/CreateProjectDialog";
import OrganizationDialog from "../organisms/Dialogs/OrganizationDialog";
import { OrganizationTypeFilter } from "../molecules/Filters/OrganizationTypeFilter";
import OrganizationsPage from "../organisms/SubPages/OrganizationsPage";
import styled from "styled-components";

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
    width: 400px;
    height: 100vh;
    overflow-y: scroll;
    z-index: 90;
    top: 0;
    position: fixed;
  }
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
  const voted = useSelector((state) => state.UI.voted);
  const screams = useSelector((state) => state.data.screams);
  const myScreams = useSelector((state) => state.data.myScreams);

  const loading = useSelector((state) => state.data.loading);
  const loadingProjects = useSelector((state) => state.data.loadingProjects);
  const loadingOrganizations = useSelector(
    (state) => state.data.loadingOrganizations
  );

  const loadingIdea = useSelector((state) => state.data.loadingIdea);

  const projects = useSelector((state) => state.data.projects);
  const project = useSelector((state) => state.data.project);
  const mapBounds = useSelector((state) => state.data.mapBounds);

  const mapViewport = useSelector((state) => state.data.mapViewport);
  const selectedTopics = useSelector((state) => state.data.topics);

  const [order, setOrder] = useState(1);

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
  }, [openProjectRoom]);

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
        dispatch(getScreams(mapViewport)).then(() => {
          dispatch(getProjects(mapViewport)).then(() => {
            dispatch(getOrganizations(mapViewport));
          });

          if (screamId) {
            setOrder(1);
            dispatch(openScreamFunc(screamId));
          } else if (projectRoomId) {
            setOrder(2);
            dispatch(openProjectRoomFunc(projectRoomId, true));
          } else if (organizationId) {
            setOrder(3);
            dispatch(openOrganizationFunc(true, organizationId));
          } else if (window.location.pathname === "/projectRooms") {
            setOrder(2);
          } else if (window.location.pathname === "/organizations") {
            setOrder(3);
          } else if (window.location.pathname === "/insights") {
            setOrder(4);
          }
        });
      }
    }
  }, [initialMapViewport]);

  const handleClick = (order) => {
    setOrder(order);
    dispatch(closeScream());
    dispatch(openProjectRoomFunc(null, false));
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
  };

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const _onViewportChange = (viewport) => {
    dispatch(setMapViewport(viewport));

    if (isMobileCustom) {
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

      dispatch(setMapBounds(bounds));
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const screamsSearched = screams?.filter((val) => {
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
  });

  const sortedScreams =
    dropdown === "newest"
      ? _.orderBy(screamsSearched, "createdAt", "desc")
      : _.orderBy(screamsSearched, "likeCount", "desc");

  const sortedProjectRooms = _.orderBy(projects, "createdAt", "desc");
  // const sortedScreams =
  //   dropdown === "newest"
  //     ? screamsSearched?.sort(function (a, b) {
  //         if (a.createdAt > b.createdAt) {
  //           return -1;
  //         }
  //         return 0;
  //       })
  //     : screamsSearched?.sort(function (a, b) {
  //         if (a.likeCount > b.likeCount) {
  //           return -1;
  //         }
  //         return 0;
  //       });

  const dataFinal = sortedScreams.filter(
    ({ Thema, lat, long, status }) =>
      selectedTopics.includes(Thema) &&
      lat <= mapBounds?.latitude1 &&
      lat >= mapBounds?.latitude2 &&
      long >= mapBounds?.longitude2 &&
      long <= mapBounds?.longitude3 &&
      status === "None"
  );

  const dataFinalMapProjects = projects?.filter(
    ({ status }) => status === "active"
  );

  const dataFinalMap = openProjectRoom
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
      );

  return (
    <React.Fragment>
      {loading && isMobileCustom && <Loader />}
      <Topbar
        loading={loading}
        handleClick={handleClick}
        order={order}
        dataFinalMap={dataFinalMap}
      />
      <DesktopSidebar
        loading={loading}
        handleClick={handleClick}
        order={order}
        loadingProjects={loadingProjects}
        projectsData={projects}
        dataFinalMap={dataFinalMap}
        setChangeLocationModalOpen={setChangeLocationModalOpen}
      />
      {!isMobileCustom ? (
        <MapDesktop
          loading={loading}
          loadingProjects={loadingProjects}
          dataFinal={dataFinalMap}
          _onViewportChange={_onViewportChange}
          openProjectRoom={openProjectRoom}
          geoData={project && openProjectRoom && project.geoData}
          mapRef={mapRef}
          projects={dataFinalMapProjects}
          order={order}
        />
      ) : (
        <MapMobile
          order={order}
          dataFinal={dataFinalMap}
          viewport={mapViewport}
          _onViewportChange={_onViewportChange}
          openProjectRoom={openProjectRoom}
          projects={dataFinalMapProjects}
          geoData={project && openProjectRoom && project.geoData}
          mapRef={mapRef}
        />
      )}

      {!loading &&
        !loadingProjects &&
        isMobileCustom &&
        (order === 1 || openProjectRoom || openScream || openAccount) && (
          <React.Fragment>
            <PostScream
              loadingProjects={loadingProjects}
              projectsData={projects}
              project={project}
            />
            <TopicFilter loading={loading} />
          </React.Fragment>
        )}

      {!loading &&
        !loadingProjects &&
        isMobileCustom &&
        !openProjectRoom &&
        !openScream &&
        !openAccount &&
        order === 2 && <OrganizationTypeFilter loading={loading} />}

      {!openInfoPage && (
        <MainColumnWrapper>
          {loading && !isMobileCustom && <Loader />}

          {!openProjectRoom && !openAccount && order === 1 && (
            <SwipeList
              swipeListType="ideas"
              type="standalone"
              loading={loading}
              order={order}
              dataFinal={dataFinal}
              dataFinalMap={dataFinalMap}
              viewport={mapViewport}
              handleDropdown={handleDropdown}
              projectsData={projects}
              dropdown={dropdown}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
          )}

          {!openInfoPage &&
            !openProjectRoom &&
            !openAccount &&
            !loadingProjects &&
            order === 2 && (
              <SwipeList
                swipeListType="projectRoomOverview"
                type="standalone"
                loading={loadingProjects}
                order={order}
                dataFinal={sortedProjectRooms}
                dataFinalMap={dataFinalMap}
                viewport={mapViewport}
                handleDropdown={handleDropdown}
                projectsData={sortedProjectRooms}
                dropdown={dropdown}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
              />
            )}

          {openProjectRoom && (
            <ProjectDialog
              loading={loading}
              dataFinalMap={dataFinalMap}
              handleClick={handleClick}
              loadingProjects={loadingProjects}
              projectsData={projects}
              viewport={mapViewport}
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
              projectsData={projects}
              viewport={mapViewport}
            />
          )}

          {openAccount && <Account dataFinalMap={dataFinalMap} />}

          {!openInfoPage && openScream && <IdeaDialog />}

          {!openInfoPage &&
            !openProjectRoom &&
            !openAccount &&
            !openOrganization &&
            !loadingOrganizations &&
            order === 3 && <OrganizationsPage order={order} />}

          {!openInfoPage && !openProjectRoom && !openAccount && order === 4 && (
            <InsightsPage order={order} />
          )}
        </MainColumnWrapper>
      )}

      <ErrorBackground loading={loading} />

      {voted && <ThanksForTheVote />}
      {changeLocationModalOpen && (
        <ChangeLocationModal
          setChangeLocationModalOpen={setChangeLocationModalOpen}
        />
      )}
      {openCreateOrganization && <CreateOrganizationDialog />}
      {openCreateProjectRoom && <CreateProjectDialog />}
    </React.Fragment>
  );
};

export default Main;
