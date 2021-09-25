/** @format */

import React from "react";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import IdeaCard from "../ListItems/IdeaCard";
import { NoMoreMainContent } from "./NoMoreContent";

const List = ({ loading, dropdown, dataFinal, projectsData }) => {
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

        <NoMoreMainContent dataFinal={dataFinal} />
      </React.Fragment>
    )
  );
};

export default List;
