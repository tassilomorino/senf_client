/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { isMobileCustom } from "../../util/customDeviceDetect";

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
  setInitialMapViewport,
} from "../../redux/actions/mapActions";

//Components
import InsightsPage from "../organisms/SubPages/InsightsPage";
import DesktopSidebar from "../molecules/Navigation/DesktopSidebar";
import Topbar from "../molecules/Navigation/Topbar";
import MapDesktop from "../atoms/map/MapDesktop";
import IdeaList from "../organisms/IdeaList/IdeaList";
import ProjectsPage from "../organisms/SubPages/ProjectsPage";
import ScreamDialog from "../organisms/Dialogs/ScreamDialog";
import ProjectDialog from "../organisms/Dialogs/ProjectDialog";
import ThanksForTheVote from "../atoms/Backgrounds/ThanksForTheVote";
import Account from "../organisms/Dialogs/Account";
import Loader from "../atoms/Backgrounds/Loader";
import { closeAccountFunc } from "../../redux/actions/accountActions";
import ErrorBackground from "../atoms/Backgrounds/ErrorBackground";
import { isAndroid } from "react-device-detect";
import MapMobile from "../atoms/map/MapMobile";
import TopicFilter from "../molecules/Filters/TopicFilter";
import PostScream from "../organisms/PostIdea/PostScream";

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

  const voted = useSelector((state) => state.UI.voted);

  const screams = useSelector((state) => state.data.screams);
  const myScreams = useSelector((state) => state.data.myScreams);

  const loading = useSelector((state) => state.data.loading);
  const loadingProjects = useSelector((state) => state.UI.loadingProjects);
  const loadingIdea = useSelector((state) => state.data.loadingIdea);

  const projects = useSelector((state) => state.data.projects);
  const project = useSelector((state) => state.data.project);
  const mapBounds = useSelector((state) => state.data.mapBounds);

  const mapViewport = useSelector((state) => state.data.mapViewport);

  const [topicsSelected, setTopicsSelected] = useState([
    "Verkehr",
    "Versorgung",
    "Umwelt und Grün",
    "Rad",
    "Inklusion / Soziales",
    "Sport / Freizeit",
    "Sonstige",
  ]);
  const [order, setOrder] = useState(1);
  const [screamIdParam, setScreamIdParam] = useState(null);

  const [dropdown, setDropdown] = useState("newest");

  const mapRef = useRef(null);
  const mapLoaded = useSelector((state) => state.data.mapLoaded);
  const initialMapBounds = useSelector((state) => state.data.initialMapBounds);

  useEffect(() => {
    const TopViewport = {
      //Köln
      latitude: 50.93864020643174,
      longitude: 6.958725744885521,

      // BERLIN
      // latitude: 52.52,
      // longitude: 13.405,

      //RIO
      // latitude: -22.908333,
      // longitude: -43.196388,

      zoom: isMobileCustom ? 7.2 : 9.2,

      // minZoom: 8,
      duration: 0,
    };

    dispatch(setMapViewport(TopViewport));

    const viewport = {
      latitude: TopViewport.latitude,
      longitude: TopViewport.longitude,

      zoom: TopViewport.zoom + 1.3,
      pitch: 30,
      duration: 2700,
    };

    dispatch(setInitialMapViewport(viewport));
  }, []);

  useEffect(() => {
    if (
      initialMapBounds === null &&
      mapViewport.latitude !== 0 &&
      mapRef.current &&
      mapLoaded
    ) {
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
  }, [mapViewport, mapLoaded]);

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

  const { lat, long } = useSelector((state) => state.data.scream);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevLat = usePrevious({ lat });
  const prevLong = usePrevious({ long });

  useEffect(() => {
    if (
      openScream &&
      !loadingIdea &&
      lat !== undefined &&
      mapViewport.latitude !== 0 &&
      mapRef.current &&
      mapLoaded
    ) {
      if (
        (lat && prevLat && prevLat.lat !== lat) ||
        (long && prevLong && prevLong.long !== long)
      ) {
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
      dispatch(getScreams()).then(() => {
        dispatch(getProjects());
        if (window.location.pathname === "/projects") {
          handleClick(2);
        }
      });
    }
  }, []);

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

    handleTopicSelector("all");

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

  const handleTopicSelector = (topic) => {
    const index = topicsSelected.indexOf(topic);
    if (topic === "all") {
      setTopicsSelected([
        "Verkehr",
        "Versorgung",
        "Umwelt und Grün",
        "Rad",
        "Inklusion / Soziales",
        "Sport / Freizeit",
        "Sonstige",
      ]);
    } else if (topicsSelected.length === 7) {
      setTopicsSelected([topic]);
    } else if (index === -1) {
      setTopicsSelected(topicsSelected.concat(topic));
    } else {
      const newTopics = topicsSelected.filter((item) => item !== topic);

      if (newTopics.length === 0) {
        setTopicsSelected([
          "Verkehr",
          "Versorgung",
          "Umwelt und Grün",
          "Rad",
          "Inklusion / Soziales",
          "Sport / Freizeit",
          "Sonstige",
        ]);
      } else {
        setTopicsSelected(...[newTopics]);
      }
    }
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
      val.body.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return val;
    }
  });
  const sortedScreams =
    dropdown === "newest"
      ? screamsSearched?.sort(function (a, b) {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          return 0;
        })
      : screamsSearched?.sort(function (a, b) {
          if (a.likeCount > b.likeCount) {
            return -1;
          }
          return 0;
        });

  const dataFinal = sortedScreams.filter(
    ({ Thema, lat, long, status }) =>
      topicsSelected.includes(Thema) &&
      lat <= mapBounds.latitude1 &&
      lat >= mapBounds.latitude2 &&
      long >= mapBounds.longitude2 &&
      long <= mapBounds.longitude3 &&
      status === "None"
  );

  const dataFinalLength = dataFinal.length;

  const dataFinalMap = openProject
    ? project.screams.filter(
        ({ Thema, status }) =>
          topicsSelected.includes(Thema) && status === "None"
      )
    : myScreams !== null
    ? myScreams.filter(
        ({ Thema, status }) =>
          topicsSelected.includes(Thema) && status === "None"
      )
    : screamsSearched.filter(
        ({ Thema, status }) =>
          topicsSelected.includes(Thema) && status === "None"
      );

  return (
    <React.Fragment>
      {loading && isMobileCustom && <Loader />}
      <ErrorBackground loading={loading} />

      {voted && <ThanksForTheVote />}

      <Topbar
        loading={loading}
        handleClick={handleClick}
        order={order}
        handleTopicSelector={handleTopicSelector}
        topicsSelected={topicsSelected}
        dataFinalMap={dataFinalMap}
      />
      <DesktopSidebar
        loading={loading}
        handleClick={handleClick}
        order={order}
        handleTopicSelector={handleTopicSelector}
        topicsSelected={topicsSelected}
        loadingProjects={loadingProjects}
        projectsData={projects}
        dataFinalMap={dataFinalMap}
      ></DesktopSidebar>
      {!isMobileCustom && (
        <MapDesktop
          loading={loading}
          loadingProjects={loadingProjects}
          dataFinal={dataFinalMap.slice(0, 300)}
          _onViewportChange={_onViewportChange}
          zoomBreak={zoomBreak}
          id="mapDesktop"
          openProject={openProject}
          geoData={project && openProject && project.geoData}
          mapRef={mapRef}
        ></MapDesktop>
      )}

      <div
        style={
          isMobileCustom &&
          (order === 1 || openProject || openScream || openAccount)
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
            <TopicFilter
              loading={loading}
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
            />
          </React.Fragment>
        )}
      {!openInfoPage && (
        <div className="contentWrapper">
          {loading && !isMobileCustom && <Loader />}
          <div className="MainBackgroundHome" />

          {!openProject && !openAccount && (
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
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
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
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
            />
          )}
          {openAccount && (
            <Account
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
              dataFinalMap={dataFinalMap}
            />
          )}
        </div>
      )}

      {!openInfoPage && !openProject && !openAccount && order === 2 && (
        <div className="contentWrapper_insights">
          <ProjectsPage
            loadingProjects={loadingProjects}
            order={order}
            projects={projects}
          ></ProjectsPage>
        </div>
      )}
      {!openInfoPage && !openProject && !openAccount && order === 3 && (
        <div className="contentWrapper_insights">
          <InsightsPage order={order}></InsightsPage>
        </div>
      )}

      {!openInfoPage && openScream && <ScreamDialog />}
    </React.Fragment>
  );
};

export default Main;
