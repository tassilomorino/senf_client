/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//Components
import { ProjectCard, CreateProject } from "../module/ListItems/ProjectCard";

import _ from "lodash";

const MainAnimationChannels = styled.div`
  opacity: 1;
  display: block;
  transition: 0.5s;
  padding-bottom: 2em;
  height:100%;

  animation: cardanimation 0.8s ease-in-out;
`

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
  animation: enteranimation .5s;
  z-index:99
`

const MainAnimation = styled.div`
  opacity: 1;
  animation: cardanimation 0.8s ease-in-out;
`
const ProjectRoomDescription = styled.div`
  font-size: 14pt;
  color: rgb(65, 67, 69);
  width: 90%;
  text-align: left;
  margin-left: 5%;
  padding-bottom: 15px;
  z-index: 0;
`

const ProjectsPage = ({ loadingProjects, order, projects }) => {
  const { t } = useTranslation();

  return (
    <MainAnimationChannels>
      {order === 2 && (
        <div>
          <HomeHeadermain></HomeHeadermain>

          <MainAnimation>
            <ProjectRoomDescription>
              {t("projectrooms_description")}
            </ProjectRoomDescription>
            <br />
            {!loadingProjects ? (
              _.orderBy(projects, "createdAt", "desc").map((projects) => (
                <ProjectCard key={projects.project} project={projects} />
              ))
            ) : (
              <MainAnimation>
                <div className="no-ideas-yet">{t("projectrooms_loader")}</div>
              </MainAnimation>
            )}
            {!loadingProjects && projects.length === 0 && (
              <MainAnimation>
                <div className="no-ideas-yet">
                  {t("projectrooms_loading_error")}
                </div>
              </MainAnimation>
            )}
            <br />
            <br />
            <br />

            <CreateProject />

            <br />
            <br />
            <br />
          </MainAnimation>
        </div>
      )}
    </MainAnimationChannels>
  );
};

export default ProjectsPage;
