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

const List = ({
  type,
  loading,
  dropdown,
  dataFinal,
  dataFinalLength,
  projectsData,
}) => {
  const content = (
    <MainAnimations>
      {dataFinal.map(
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
  );
  return (
    !loading && (
      <React.Fragment>
        {dropdown === "newest" && content}
        {dropdown === "hottest" && content}

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
