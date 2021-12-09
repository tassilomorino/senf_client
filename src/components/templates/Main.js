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
  openProjectFunc,
  closeProject,
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
import IdeaList from "../organisms/SwipeLists/IdeaList";
import ProjectsPage from "../organisms/SubPages/ProjectsPage";
import ScreamDialog from "../organisms/Dialogs/ScreamDialog";
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
import { getOrganizations } from "../../redux/actions/organizationActions";
import OrganizationsDialog from "../organisms/Dialogs/OrganizationsDialog";
import ProjectList from "../organisms/SwipeLists/ProjectList";
import CreateOrganizationDialog from "../organisms/CreateOrganization/CreateOrganizationDialog";
import CreateProjectDialog from "../organisms/CreateProject/CreateProjectDialog";

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { screamId } = useParams();
  const { cookie_settings } = useSelector((state) => state.data);

  const [zoomBreak, setZoomBreak] = useState(0.6);

  const history = useHistory();
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openScream = useSelector((state) => state.UI.openScream);
  const openProject = useSelector((state) => state.UI.openProject);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const openOrganizations = useSelector((state) => state.UI.openOrganizations);
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
  const loadingIdea = useSelector((state) => state.data.loadingIdea);

  const projects = useSelector((state) => state.data.projects);
  const project = useSelector((state) => state.data.project);
  const mapBounds = useSelector((state) => state.data.mapBounds);

  const mapViewport = useSelector((state) => state.data.mapViewport);
  const selectedTopics = useSelector((state) => state.data.topics);

  const [order, setOrder] = useState(1);
  const [screamIdParam, setScreamIdParam] = useState(null);

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
      console.log("setMapBounds in Main", bounds);
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
  }, [openProject]);

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
    // if (navigator.userAgent.includes("Instagram") && isAndroid) {
    //   alert(
    //     "Bitte schau dir Senf.koeln in deinem Standardbrowser an, falls dir die Seite beschädigt angezeigt wird"
    //   );
    // }
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

          if (window.location.pathname === "/projects") {
            handleClick(2);
          }
        });
      }
    }
  }, [initialMapViewport]);

  useEffect(() => {
    if (screamId) {
      if (screamId.indexOf("_") > 0) {
        dispatch(openProjectFunc(screamId));
      } else {
        dispatch(openScreamFunc(screamId));
      }
      setScreamIdParam(screamId);
    }
  }, []);

  const handleClick = (order) => {
    setOrder(order);

    setScreamIdParam(null);

    dispatch(closeScream());
    dispatch(closeProject());
    dispatch(closeAccountFunc());

    dispatch(handleTopicSelectorRedux("all"));

    if (order === 2) {
      window.history.pushState(null, null, "/projects");
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    if (order === 3) {
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

  useEffect(() => {
    if (openScream) {
      setTimeout(() => {
        if (mapViewport.zoom > 15) {
          setZoomBreak(2);
        } else if (mapViewport.zoom > 11.5) {
          setZoomBreak(1);
        } else {
          setZoomBreak(0.6);
        }
      }, 1000);
    }
  }, [openScream, mapViewport]);

  const _onViewportChange = (viewport) => {
    dispatch(setMapViewport(viewport));
    if (viewport.zoom > 15) {
      setZoomBreak(2);
    } else if (viewport.zoom > 11.5) {
      setZoomBreak(1);
    } else {
      setZoomBreak(0.6);
    }

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

  const dataFinalLength = dataFinal.length;

  const dataFinalMap = openProject
    ? project.screams.filter(
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

  console.log(openCreateOrganization);

  return (
    <React.Fragment>
      {loading && isMobileCustom && <Loader />}
      <ErrorBackground loading={loading} />

      {voted && <ThanksForTheVote />}

      {changeLocationModalOpen && (
        <ChangeLocationModal
          setChangeLocationModalOpen={setChangeLocationModalOpen}
        />
      )}

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
      ></DesktopSidebar>
      {!isMobileCustom && (
        <MapDesktop
          loading={loading}
          loadingProjects={loadingProjects}
          dataFinal={dataFinalMap}
          _onViewportChange={_onViewportChange}
          zoomBreak={zoomBreak}
          id="mapDesktop"
          openProject={openProject}
          geoData={project && openProject && project.geoData}
          mapRef={mapRef}
          projects={projects}
          order={order}
        />
      )}

      <div
        style={
          isMobileCustom &&
          (order === 1 ||
            order === 2 ||
            openProject ||
            openScream ||
            openAccount)
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
      >
        <MapMobile
          dataFinal={dataFinalMap}
          viewport={mapViewport}
          _onViewportChange={_onViewportChange}
          zoomBreak={zoomBreak}
          openProject={openProject}
          geoData={project && openProject && project.geoData}
          mapRef={mapRef}
        />
      </div>
      {!loading &&
        !loadingProjects &&
        isMobileCustom &&
        (order === 1 || openProject || openScream || openAccount) && (
          <React.Fragment>
            <PostScream
              loadingProjects={loadingProjects}
              projectsData={projects}
              project={project}
            />
            <TopicFilter loading={loading} />
          </React.Fragment>
        )}
      {!openInfoPage && (
        <div className="contentWrapper">
          {loading && !isMobileCustom && <Loader />}
          <div className="MainBackgroundHome" />

          {!openProject && !openAccount && order === 1 && (
            <IdeaList
              type="allIdeas"
              loading={loading}
              order={order}
              dataFinal={dataFinal}
              dataFinalLength={dataFinalLength}
              dataFinalMap={dataFinalMap}
              viewport={mapViewport}
              handleDropdown={handleDropdown}
              projectsData={projects}
              dropdown={dropdown}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
          )}

          {openOrganizations && (
            <OrganizationsDialog dataFinalMap={dataFinalMap} />
          )}
          {!openOrganizations &&
            !openInfoPage &&
            !openProject &&
            !openAccount &&
            order === 2 && (
              <ProjectList
                type="allIdeas"
                loading={loadingProjects}
                order={order}
                dataFinal={projects}
                dataFinalLength={projects.length}
                dataFinalMap={dataFinalMap}
                viewport={mapViewport}
                handleDropdown={handleDropdown}
                projectsData={projects}
                dropdown={dropdown}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
              />
            )}

          {openProject && (
            <ProjectDialog
              loading={loading}
              openProject={openProject}
              dataFinalMap={dataFinalMap}
              screamIdParam={screamIdParam}
              handleClick={handleClick}
              loadingProjects={loadingProjects}
              projectsData={projects}
              viewport={mapViewport}
            />
          )}

          {openAccount && <Account dataFinalMap={dataFinalMap} />}
        </div>
      )}

      {/* {!openInfoPage && !openProject && !openAccount && order === 2 && (
        <ProjectsPage order={order} projectsData={projects}></ProjectsPage>
      )} */}
      {!openInfoPage && !openProject && !openAccount && order === 3 && (
        <div className="contentWrapper_insights">
          <InsightsPage order={order}></InsightsPage>
        </div>
      )}

      {!openInfoPage && openScream && <ScreamDialog />}

      {openCreateOrganization && <CreateOrganizationDialog />}
      {openCreateProjectRoom && <CreateProjectDialog />}
    </React.Fragment>
  );
};

export default Main;
