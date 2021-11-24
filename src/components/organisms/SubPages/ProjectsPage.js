/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//Components
import { ProjectCard, CreateProject } from "../../molecules/Cards/ProjectCard";

import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import MainDialog from "../../atoms/Layout/MainDialog";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  animation: cardanimation 0.8s ease-in-out;

  @media (min-width: 768px) {
    margin-left: 200px;
    width: 400px;
  }
`;
const ProjectRoomDescription = styled.div`
  font-size: 14pt;
  color: rgb(65, 67, 69);
  width: 90%;
  text-align: left;
  margin-left: 5%;
  padding-bottom: 30px;
`;
const NoIdeasYet = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
`;
const ProjectsPage = ({ loadingProjects, order, projects }) => {
  const { t } = useTranslation();

  return (
    order === 2 && (
      <Wrapper>
        {isMobileCustom ? (
          <div style={{ height: "110px" }} />
        ) : (
          <div style={{ height: "80px" }} />
        )}
        <ProjectRoomDescription>
          {t("projectrooms_description")}
        </ProjectRoomDescription>

        <MainDialog />

        {!loadingProjects ? (
          projects
            ?.sort(function (a, b) {
              if (a.createdAt > b.createdAt) {
                return -1;
              }
              return 0;
            })
            .map((projects) => (
              <ProjectCard key={projects.project} project={projects} />
            ))
        ) : (
          <NoIdeasYet>{t("projectrooms_loader")}</NoIdeasYet>
        )}
        {!loadingProjects && projects.length === 0 && (
          <NoIdeasYet>{t("projectrooms_loading_error")}</NoIdeasYet>
        )}

        <br />
        <br />
        <br />

        <CreateProject />

        <br />
        <br />
        <br />
      </Wrapper>
    )
  );
};

export default ProjectsPage;
