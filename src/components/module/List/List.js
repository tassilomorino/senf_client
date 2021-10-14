/** @format */

import React from "react";
import _ from "lodash";
import IdeaCard from "../ListItems/IdeaCard";
import {
  NoMoreMainContent,
  NoMoreMyContent,
  NoMoreProjectsContent,
} from "./NoMoreContent";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import MainAnimations from "../Animations/MainAnimations";

const List = ({
  type,
  loading,
  dropdown,
  dataFinal,
  projectsData,
  project,
  myScreams,
}) => {

  return (
    !loading && (
      <React.Fragment>
        {dropdown === "newest" && (
          // was the logic here double? if not "newest" then this {element} will be skipped
          // <div className={dropdown === "newest" ? "MainAnimation" : ""}>
          <MainAnimations>
            {_.orderBy(dataFinal, "createdAt", "desc").map((scream) => (
              <IdeaCard
                loading={loading}
                key={scream.screamId}
                scream={scream}
                projectsData={projectsData}
              />
            ))}
          </MainAnimations>
        )}

        {dropdown === "hottest" && (
          // same as for "newest"?
          // <div className={dropdown === "hottest" ? "MainAnimation" : ""}>
          <MainAnimations>
            {_.orderBy(dataFinal, "likeCount", "desc").map((scream) => (
              <IdeaCard
                loading={loading}
                key={scream.screamId}
                scream={scream}
                projectsData={projectsData}
              />
            ))}
          </MainAnimations>
        )}

        {type === "myIdeas" ? (
          <NoMoreMyContent dataFinal={dataFinal} myScreams={myScreams} />
        ) : type === "projectIdeas" ? (
          <NoMoreProjectsContent dataFinal={dataFinal} project={project} />
        ) : (
          <NoMoreMainContent dataFinal={dataFinal} />
        )}

        {isMobileCustom ? (
          <div style={{ height: "70%" }} />
        ) : (
          <div style={{ height: "200px" }} />
        )}
      </React.Fragment>
    )
  );
};

export default List;
