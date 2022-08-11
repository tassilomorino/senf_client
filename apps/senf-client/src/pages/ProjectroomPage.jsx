/** @format */

import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// Redux stuff
import styled from "styled-components";
import orderBy from "lodash/orderBy";
import { useTranslation } from "react-i18next";
import { ProjectroomPage as ProjectroomPageComponent, ModalContext, Loader } from "senf-atomic-design-system";
import {
  openCreateProjectRoomFunc,
  openProjectRoomFunc,
} from "../redux/actions/projectActions";
import { clearErrors } from "../redux/actions/errorsActions";
import { handleTopicSelectorRedux } from "../redux/actions/UiActions";
import { filterByTagFilter, search, sort } from "../util/helpers";
import { isMobileCustom } from "../util/customDeviceDetect";

const CreateMainComponent = React.lazy(() =>
  import("../components/Create_Organisation_Projectrooms/CreateMainComponent")
);

const ProjectroomPage = ({
  viewport,
  dataFinalProjectRooms,
  loadingProjects,
  dataFinalMap,
  setOpenInsightsPage,
  user,
  handleButtonOpenCard,
  setPostIdeaOpen,
  handleSetInitialMapBoundsAndViewport,
  handleButtonLike,
  handleButtonComment,
}) => {
  const { t } = useTranslation();
  const { handleModal } = React.useContext(ModalContext) || {};

  const [path, setPath] = useState("");
  const [order, setOrder] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdown, setDropdown] = useState("newest");

  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);

  const project = useSelector((state) => state.data.project);
  const projects = useSelector((state) => state.data.projects);
  const organization = useSelector((state) => state.data.organization);
  const organizations = useSelector((state) => state.data.organizations);
  const [organizationImage, setOrganizationImage] = useState(null);

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
    dispatch(openProjectRoomFunc(null, false));
    handleSetInitialMapBoundsAndViewport();

    if (organization && isMobileCustom) {
      dispatch({
        type: "OPEN_ORGANIZATION",
        payload: true,
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (project && project.organizationId) {
      const organization = organizations.find(
        (org) => org.organizationId === project.organizationId
      );
      if (organization) {
        const organizationImage = organization.logoURL;
        setOrganizationImage(organizationImage);
      }
    }
  }, [organizations, project]);

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

  const projectRoomScreams = project?.screams;

  const dataFinalProjectRoomIdeas = useMemo(() => {
    let ideasData = [];

    ideasData = search(projectRoomScreams, searchTerm, [
      "title",
      "body",
      "Stadtteil",
      "Stadtbezirk",
      "locationHeader",
    ]);
    ideasData = filterByTagFilter(ideasData, selectedTopics, "Thema");

    ideasData = sort(ideasData, dropdown);

    return ideasData;
  }, [dropdown, projectRoomScreams, searchTerm, selectedTopics]);

  const handleEditProjectroom = () => {
    localStorage.setItem(
      "createProjectRoomOrganizationId",
      project.organizationId
    );
    localStorage.setItem("createProjectRoomId", project.projectRoomId);
    localStorage.setItem("createProjectRoomPostEdit", true);

    dispatch(openCreateProjectRoomFunc(true));

    handleModal("push", <React.Suspense fallback={<div style={{ width: "50px", height: "2000px" }}><Loader /></div>}>
      <CreateMainComponent type="projectRoom" /></React.Suspense>, { size: "full", swipe: !!isMobileCustom, height: isMobileCustom && window.innerHeight + 83, padding: 0 })

  };


  return (
    <ProjectroomPageComponent
      user={user}
      data={project}
      ideasData={dataFinalProjectRoomIdeas}
      organizations={organizations}
      handleButtonOpenCard={handleButtonOpenCard}
      handleButtonClose={handleClose}
      selectedTopics={selectedTopics}
      handleSelectTopics={(topic) => dispatch(handleTopicSelectorRedux(topic))}
      setPostIdeaOpen={() => setPostIdeaOpen(true)}
      handleEditProjectroom={handleEditProjectroom}
      handleButtonLike={handleButtonLike}
      handleButtonComment={handleButtonComment}
      setSearchOpen={setSearchOpen}
      searchOpen={searchOpen}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      path={path}
      checkedSortOption={dropdown}
      setCheckedSortOption={setDropdown}
    />
  );
};

export default memo(ProjectroomPage);
