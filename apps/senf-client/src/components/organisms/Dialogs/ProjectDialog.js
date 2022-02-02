/** @format */

import React, { useState, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
// Redux stuff
import { openProjectRoomFunc } from "../../../redux/actions/projectActions";
import { clearErrors } from "../../../redux/actions/errorsActions";
import {
  setMapBounds,
  setMapViewport,
} from "../../../redux/actions/mapActions";

//Components
import CalendarComponent from "../../atoms/calendar/CalendarComponent";

import SwipeList from "../SwipeLists/SwipeList";
import Header from "../../molecules/Headers/Header";
import InfoModal from "../../molecules/DialogInlineComponents/InfoModal";
import styled from "styled-components";
import { ModalBackground } from "../../atoms/Backgrounds/ModalBackground";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import _ from "lodash";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { useTranslation } from "react-i18next";
import PostScream from "../PostIdea/PostScream";
import { ProjectRoomTabData } from "../../../data/ProjectRoomTabData";

const ProjectDialog = ({
  viewport,
  projectsData,
  loadingProjects,
  dataFinalMap,
  setOpenInsightsPage,
}) => {
  const { t } = useTranslation();
  const [path, setPath] = useState("");
  const [order, setOrder] = useState(1);
  const [infoOpen, setInfoOpen] = useState(true);

  const [dropdown, setDropdown] = useState("newest");

  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);

  const project = useSelector((state) => state.data.project);
  const projects = useSelector((state) => state.data.projects);

  const dispatch = useDispatch();
  const loadingProjectRoom = useSelector(
    (state) => state.data.loadingProjectRoom
  );

  const mapBounds = useSelector((state) => state.data.mapBounds);

  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const selectedTopics = useSelector((state) => state.data.topics);

  useEffect(() => {
    dispatch(handleTopicSelectorRedux("all"));
    setPath(window.location.pathname);
  }, [openProjectRoom]);

  const handleClose = useCallback(() => {
    console.log(initialMapViewport);
    dispatch(openProjectRoomFunc(null, false));
    dispatch(clearErrors());
    dispatch(setMapViewport(initialMapViewport));
  }, [dispatch, initialMapViewport]);

  const handleClick = useCallback(
    (order) => {
      setOrder(order);

      if (order === 0) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }

      dispatch(clearErrors());
    },
    [dispatch]
  );

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const dataRar = project?.screams;

  const [searchTerm, setSearchTerm] = useState("");
  const screamsSearched = dataRar?.filter((val) => {
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

  const dataFinal = sortedScreams.filter(
    ({ Thema, status, lat, long }) =>
      selectedTopics.includes(Thema) &&
      lat <= mapBounds?.latitude1 &&
      lat >= mapBounds?.latitude2 &&
      long >= mapBounds?.longitude2 &&
      long <= mapBounds?.longitude3 &&
      status === "None"
  );

  const TabSlicer = project?.calendar ? 3 : 1;

  return (
    <React.Fragment>
      {isMobileCustom && !infoOpen && (
        <PostScream
          loadingProjects={loadingProjects}
          projectsData={projects}
          project={project}
        />
      )}
      {project && !loadingProjectRoom && (
        <Header
          infoOpen={infoOpen}
          setInfoOpen={setInfoOpen}
          title={project?.title}
          calendar={project?.calendar}
          order={order}
          path={path}
          handleClose={handleClose}
          handleClick={handleClick}
        />
      )}
      {project && !loadingProjectRoom && (
        <InfoModal
          description={project?.description}
          weblink={project?.weblink}
          contact={project?.contact}
          startDate={project?.startDate}
          endDate={project?.endDate}
          owner={project?.owner}
          ownerImg={project?.ownerImg}
          infoOpen={infoOpen}
          setInfoOpen={setInfoOpen}
        />
      )}

      {/* {!isMobileCustom ||
          (isMobileCustom && order === 0 && <ModalBackground />)} */}

      {(!infoOpen || (!isMobileCustom && !loadingProjectRoom)) && (
        <SwipeList
          type="projectIdeas"
          swipeListType={order === 1 ? "ideas" : "projectRoomOverview"}
          tabLabels={ProjectRoomTabData.map((item) => item.text).slice(
            0,
            TabSlicer
          )}
          loading={loadingProjectRoom}
          order={order}
          dataFinal={dataFinal}
          geoData={project?.geoData}
          viewport={viewport}
          handleDropdown={handleDropdown}
          dropdown={dropdown}
          projectsData={projectsData}
          loadingProjects={loadingProjects}
          dataFinalMap={dataFinalMap}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          handleClick={handleClick}
          setOpenInsightsPage={setOpenInsightsPage}
        />
      )}
    </React.Fragment>
  );
};

export default memo(ProjectDialog);
