/** @format */

import React from "react";
import _ from "lodash";
import IdeaCard from "../Cards/IdeaCard";
import {
  NoMoreMainContent,
  NoMoreMyContent,
  NoMoreProjectsContent,
} from "./NoMoreContent";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import MainAnimations from "../../atoms/Animations/MainAnimations";

const List = ({ type, loading, dropdown, dataFinal, projectsData }) => {
  const dataFinalLength = dataFinal?.length;
  return (
    !loading && (
      <React.Fragment>
        {dropdown === "newest" && (
          <MainAnimations>
            {_.orderBy(dataFinal, "createdAt", "desc").map(
              ({
                title,
                body,
                screamId,
                likeCount,
                commentCount,
                Stadtteil,
                project,
                color,
              }) => (
                <IdeaCard
                  loading={loading}
                  key={screamId}
                  title={title}
                  body={body}
                  screamId={screamId}
                  likeCount={likeCount}
                  commentCount={commentCount}
                  Stadtteil={Stadtteil}
                  project={project}
                  color={color}
                  projectsData={projectsData}
                />
              )
            )}
          </MainAnimations>
        )}

        {dropdown === "hottest" && (
          <MainAnimations>
            {_.orderBy(dataFinal, "likeCount", "desc").map(
              ({
                title,
                body,
                screamId,
                likeCount,
                commentCount,
                Stadtteil,
                project,
                color,
              }) => (
                <IdeaCard
                  loading={loading}
                  key={screamId}
                  title={title}
                  body={body}
                  screamId={screamId}
                  likeCount={likeCount}
                  commentCount={commentCount}
                  Stadtteil={Stadtteil}
                  project={project}
                  color={color}
                  projectsData={projectsData}
                />
              )
            )}
          </MainAnimations>
        )}

        {type === "myIdeas" ? (
          <NoMoreMyContent dataFinalLength={dataFinalLength} />
        ) : type === "projectIdeas" ? (
          <NoMoreProjectsContent dataFinalLength={dataFinalLength} />
        ) : (
          <NoMoreMainContent dataFinalLength={dataFinalLength} />
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
