/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//Components
import { ProjectCard, CreateProject } from "../../molecules/Cards/ProjectCard";

import _ from "lodash";
import MainAnimations from "../../atoms/Animations/MainAnimations";

const HomeHeadermain = styled.div`
  position: relative;
  z-index: 9;
  margin-top: 2.8em;
  margin-left: 2.5%;
  width: 95%;
  padding-bottom: 1em;
  font-size: 25pt;
  color: white;
  text-align: left;
  font-family: "Playfair Display", serif;
  animation: enteranimation 0.5s;
  z-index: 99;
`;
const ProjectRoomDescription = styled.div`
  font-size: 14pt;
  color: rgb(65, 67, 69);
  width: 90%;
  text-align: left;
  margin-left: 5%;
  padding-bottom: 15px;
  z-index: 0;
`;
const NoIdeasYet = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
  z-index: 10;
`;
const ProjectsPage = ({ loadingProjects, order, projects }) => {
  const { t } = useTranslation();

  return (
    <MainAnimations
      transition="0.5s"
      display="block"
      paddingBottom="2em"
      height="100%"
    >
      {order === 2 && (
        <div>
          <HomeHeadermain></HomeHeadermain>

          <MainAnimations>
            <ProjectRoomDescription>
              {t("projectrooms_description")}
            </ProjectRoomDescription>
            <br />
            {!loadingProjects ? (
              _.orderBy(projects, "createdAt", "desc").map((projects) => (
                <ProjectCard key={projects.project} project={projects} />
              ))
            ) : (
              <MainAnimations>
                <NoIdeasYet>{t("projectrooms_loader")}</NoIdeasYet>
              </MainAnimations>
            )}
            {!loadingProjects && projects.length === 0 && (
              <MainAnimations>
                <NoIdeasYet>{t("projectrooms_loading_error")}</NoIdeasYet>
              </MainAnimations>
            )}

            <br />
            <br />
            <br />

            <CreateProject />

            <br />
            <br />
            <br />
          </MainAnimations>
        </div>
      )}
    </MainAnimations>
  );
};

export default ProjectsPage;
