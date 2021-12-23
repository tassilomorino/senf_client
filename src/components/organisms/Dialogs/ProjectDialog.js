/** @format */

import React, { useState, useEffect } from "react";
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
import ProjectHeader from "../../molecules/Headers/ProjectHeader";
import ProjectInfo from "../../molecules/DialogInlineComponents/ProjectInfo";
import styled from "styled-components";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import _ from "lodash";

const Wrapper = styled.div`
  @media (min-width: 768px) {
    padding-top: 70px;
  }
`;

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
  const [path, setPath] = useState("");
  const [order, setOrder] = useState(1);
  const [dropdown, setDropdown] = useState("newest");

  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);

  const project = useSelector((state) => state.data.project);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.UI.loading);
  const mapBounds = useSelector((state) => state.data.mapBounds);

  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const selectedTopics = useSelector((state) => state.data.topics);

  useEffect(() => {
    dispatch(handleTopicSelectorRedux("all"));
    setPath(window.location.pathname);
  }, [openProjectRoom]);

  const handleClose = () => {
    console.log(initialMapViewport);
    dispatch(openProjectRoomFunc(null, false));
    dispatch(clearErrors());
    dispatch(setMapViewport(initialMapViewport));
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

  return (
    <React.Fragment>
      <ProjectHeader
        imgUrl={project?.imgUrl}
        title={project?.title}
        loading={loading}
        calendar={project?.calendar}
        order={order}
        path={path}
        handleClose={handleClose}
        handleClick={handleClick}
      />

      <Wrapper>
        {!isMobileCustom || (isMobileCustom && order !== 1 && <Background />)}

        {order === 1 && (
          <SwipeList
            swipeListType="ideas"
            type="projectIdeas"
            loading={loading}
            order={order}
            dataFinal={dataFinal}
            geoData={project?.geoData}
            viewport={viewport}
            handleDropdown={handleDropdown}
            projectsData={projectsData}
            loadingProjects={loadingProjects}
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
                description={project?.description}
                weblink={project?.weblink}
                contact={project?.contact}
                startDate={project?.startDate}
                endDate={project?.endDate}
                owner={project?.owner}
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
                projectScreams={project?.screams}
                handleClick={handleClick}
              />
            </MainAnimations>
          </React.Fragment>
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default ProjectDialog;
