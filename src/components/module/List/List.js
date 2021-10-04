/** @format */

import React from "react";
import _ from "lodash";
<<<<<<< HEAD
import { useTranslation } from "react-i18next"
=======
import { useTranslation } from "react-i18next";
>>>>>>> main
import IdeaCard from "../ListItems/IdeaCard";
import {
  NoMoreMainContent,
  NoMoreMyContent,
  NoMoreProjectsContent,
} from "./NoMoreContent";
import { isMobileCustom } from "../../../util/customDeviceDetect";

const List = ({
  type,
  loading,
  dropdown,
  dataFinal,
  projectsData,
  project,
  myScreams,
}) => {
  const { t } = useTranslation();
  return (
    !loading && (
      <React.Fragment>
        {dropdown === "newest" && (
          <div className={dropdown === "newest" ? "MainAnimation" : ""}>
            {_.orderBy(dataFinal, "createdAt", "desc").map((scream) => (
              <IdeaCard
                loading={loading}
                key={scream.screamId}
                scream={scream}
                projectsData={projectsData}
              />
            ))}
          </div>
        )}

        {dropdown === "hottest" && (
          <div className={dropdown === "hottest" ? "MainAnimation" : ""}>
            {_.orderBy(dataFinal, "likeCount", "desc").map((scream) => (
              <IdeaCard
                loading={loading}
                key={scream.screamId}
                scream={scream}
                projectsData={projectsData}
              />
            ))}
          </div>
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
