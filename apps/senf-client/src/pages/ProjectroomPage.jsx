/** @format */

import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// Redux stuff
import styled from "styled-components";
import orderBy from "lodash/orderBy";
import { useTranslation } from "react-i18next";
import { ProjectroomPage as ProjectroomPageComponent } from "senf-atomic-design-system";
import {
  openCreateProjectRoomFunc,
  openProjectRoomFunc,
} from "../redux/actions/projectActions";
import { clearErrors } from "../redux/actions/errorsActions";
import { setMapBounds, setMapViewport } from "../redux/actions/mapActions";
import { handleTopicSelectorRedux } from "../redux/actions/UiActions";

import { openOrganizationFunc } from "../redux/actions/organizationActions";

import { filterByTagFilter, search, sort } from "../util/helpers";

const Wrapper = styled.div`
  z-index: 999;
`;
const ProjectroomPage = ({
  viewport,
  dataFinalProjectRooms,
  loadingProjects,
  dataFinalMap,
  setOpenInsightsPage,
  user,
  handleButtonOpenCard,
  setPostIdeaOpen,
}) => {
  const { t } = useTranslation();
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
    dispatch(clearErrors());
    dispatch(setMapViewport(initialMapViewport));
    if (organization) {
      dispatch(openOrganizationFunc(organization.organizationId, true));
    }
  }, [dispatch, initialMapViewport]);

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
