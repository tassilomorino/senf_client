/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
// Redux stuff
import { closeProject } from "../../../redux/actions/projectActions";
import { clearErrors } from "../../../redux/actions/errorsActions";
import {
  setMapViewport,
  setResetMapBounds,
} from "../../../redux/actions/mapActions";

//Components
import CalendarComponent from "../../atoms/calendar/CalendarComponent";

import IdeaList from "../IdeaList/IdeaList";
import ProjectHeader from "../../molecules/Headers/ProjectHeader";
import ProjectInfo from "../../molecules/DialogInlineComponents/ProjectInfo";
import styled from "styled-components";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import {
  BackgroundDesktop,
  BackgroundMobile,
} from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;

  @media (min-width: 768px) {
    height: 30px;
  }
`;

const ProjectDialog = ({
  viewport,
  projectsData,
  loadingProjects,
  dataFinalMap,
}) => {
  const [open, setOpen] = useState(false);

  const [oldPath, setOldPath] = useState("");
  const [newPath, setNewPath] = useState("");
  const [path, setPath] = useState("");
  const [order, setOrder] = useState(1);
  const [dropdown, setDropdown] = useState("newest");

  const openProject = useSelector((state) => state.UI.openProject);
  const project = useSelector((state) => state.data.project);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.UI.loading);
  const mapBounds = useSelector((state) => state.data.mapBounds);
  const selectedTopics = useSelector((state) => state.data.topics);
  const {
    title,
    owner,
    imgUrl,
    description,
    startDate,
    endDate,
    geoData,
    weblink,
    contact,
    calendar,
  } = project;

  useEffect(() => {
    const bounds = {
      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
    };

    dispatch(setResetMapBounds(bounds));
    dispatch(handleTopicSelectorRedux("all"));

    console.log(window.location.pathname);

    setPath(window.location.pathname);
    setTimeout(() => {
      // const newPath = `/${project}`;

      // if (project !== undefined) {
      //   window.history.pushState(null, null, newPath);
      // }

      // setTimeout(() => {
      //   setPath("https://senf.koeln" + newPath);
      // }, 10);

      if (project.centerLong !== undefined) {
        setTimeout(() => {
          const centerLat = project.centerLat;
          const centerLong = project.centerLong;
          const zoom = isMobileCustom ? project.zoom - 2 : project.zoom;

          zoomToBounds(centerLat, centerLong, zoom);
        }, 600);
      }
    }, 10);
  }, [openProject]);

  const handleClose = () => {
    dispatch(closeProject());
    dispatch(clearErrors());

    const viewport = {
      latitude: 50.95,
      longitude: 6.9503,
      zoom: isMobileCustom ? 9.5 : 11.5,
      transitionDuration: 4000,
      pitch: 30,
      bearing: 0,
    };
    dispatch(setMapViewport(viewport));
  };

  const handleClick = (order) => {
    setOrder(order);

    if (order === 2) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    dispatch(clearErrors());
  };

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const zoomToBounds = (centerLat, centerLong, zoom) => {
    const viewport = {
      latitude: centerLat,
      longitude: centerLong,
      zoom: zoom,
      transitionDuration: 1000,
      pitch: 30,
      bearing: 0,
    };
    dispatch(setMapViewport(viewport));
  };

  const dataRar = project.screams;

  const [searchTerm, setSearchTerm] = useState("");
  const screamsSearched = dataRar?.filter((val) => {
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
    ({ Thema, status, lat, long }) =>
      selectedTopics.includes(Thema) &&
      lat <= mapBounds.latitude1 &&
      lat >= mapBounds.latitude2 &&
      long >= mapBounds.longitude2 &&
      long <= mapBounds.longitude3 &&
      status === "None"
  );

  const dataFinalLength = dataFinal.length;

  return (
    openProject && (
      <React.Fragment>
        <ProjectHeader
          imgUrl={imgUrl}
          title={title}
          loading={loading}
          calendar={calendar}
          order={order}
          path={path}
          project={project}
          handleClose={handleClose}
          handleClick={handleClick}
        />

        <div className="projectDialog">
          {isMobileCustom && order !== 1 ? (
            <BackgroundMobile />
          ) : !isMobileCustom ? (
            <BackgroundDesktop />
          ) : null}
          {order === 1 && (
            <IdeaList
              type="projectIdeas"
              loading={loading}
              order={order}
              dataFinal={dataFinal}
              dataFinalLength={dataFinalLength}
              geoData={geoData}
              viewport={viewport}
              handleDropdown={handleDropdown}
              projectsData={projectsData}
              loadingProjects={loadingProjects}
              project={project}
              dropdown={dropdown}
              dataFinalMap={dataFinalMap}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
          )}
          {order === 2 && (
            <div
              style={{
                overflow: "scroll",
                height: "100vh",
                pointerEvents: "all",
              }}
            >
              <Break />

              <MainAnimations
                transition="0.5s"
                display="block"
                paddingBottom="2em"
                height="100%"
              >
                <ProjectInfo
                  description={description}
                  weblink={weblink}
                  contact={contact}
                  startDate={startDate}
                  endDate={endDate}
                  owner={owner}
                />
                <br />
              </MainAnimations>
            </div>
          )}
          {order === 3 && (
            <React.Fragment>
              <Break />

              <MainAnimations
                transition="0.5s"
                display="block"
                paddingBottom="2em"
                height="100%"
                position={document.body.clientWidth > 768 && "fixed"}
                top={document.body.clientWidth > 768 && "100px"}
              >
                <CalendarComponent
                  projectScreams={project.screams}
                  handleClick={handleClick}
                ></CalendarComponent>
              </MainAnimations>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    )
  );
};

export default ProjectDialog;
