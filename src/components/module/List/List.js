/** @format */

import React from "react";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Scream from "../../scream/Scream";

const NoMore = styled.div`
  color: rgb(87, 87, 87);
  position: absolute;
  font-size: 20pt;
  margin-top: 0vh;
  margin-left: 0vw;
  width: 100%;
  text-align: center;
  font-family: Playfair Display;
`;

const NoContent = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
  z-index: 10;
`;

const List = ({ loading, dropdown, dataFinal, projectsData }) => {
  const { t } = useTranslation();
  return (
    !loading && (
      <React.Fragment>
        {dropdown === "newest" && (
          <div className={dropdown === "newest" ? "MainAnimation" : ""}>
            {_.orderBy(dataFinal, "createdAt", "desc").map((scream) => (
              <Scream
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
              <Scream
                loading={loading}
                key={scream.screamId}
                scream={scream}
                projectsData={projectsData}
              />
            ))}
          </div>
        )}

        {dataFinal.length > 0 ? (
          <NoMore>
            ... <br /> {t("noMoreIdeas")} <br />
          </NoMore>
        ) : (
          <NoContent>{t("noContentIdeas")}</NoContent>
        )}
      </React.Fragment>
    )
  );
};

export default List;
