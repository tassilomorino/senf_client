/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IdeaCard from "../Cards/IdeaCard";
import {
  NoMoreMainContent,
  NoMoreMyContent,
  NoMoreProjectsContent,
} from "./NoMoreContent";
import { isMobileCustom } from "../../../util/customDeviceDetect";

import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import { usePrevious } from "../../../hooks/usePrevious";
import { ProjectCard } from "../Cards/ProjectCard";
import { useTranslation } from "react-i18next";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import HorizontalSwiper from "../../organisms/SwipeLists/HorizontalSwiper";

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  top: 0;
  pointer-events: all;
  animation: cardanimation 0.8s ease-in-out;

  @media (min-width: 768px) {
    width: 400px;
    top: 110px;
    position: relative;
  }
`;

const NoIdeasYet = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
`;
const ProjectsList = ({
  type,
  loading,
  dropdown,
  dataFinal,
  dataFinalLength,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const mapBounds = useSelector((state) => state.data.mapBounds);
  const prevdataFinalLength = usePrevious({ dataFinalLength });
  const prevDropdown = usePrevious({ dropdown });

  useEffect(() => {
    if (
      (dataFinalLength &&
        prevdataFinalLength &&
        prevdataFinalLength.dataFinalLength !== dataFinalLength) ||
      (dropdown && prevDropdown && prevDropdown.dropdown !== dropdown)
    ) {
      const element = document.getElementById("List");
      element?.scrollTo({
        top: 0,
        left: 0,
      });

      setListItems(1);
      sethasMoreItems(true);
    }
  }, [loading, dropdown, dataFinalLength]);
  const itemsPerPage = 1;
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [listItems, setListItems] = useState(itemsPerPage);

  const showItems = (projects) => {
    var items = [];
    if (projects.length !== 0) {
      for (var i = 0; i < listItems; i++) {
        items.push(
          projects[i]?.project && (
            <ProjectCard key={projects[i]?.project} project={projects[i]} />
          )
        );
      }
      return items;
    }
  };

  const loadMore = () => {
    if (listItems === dataFinal.length) {
      sethasMoreItems(false);
    } else {
      setTimeout(() => {
        setListItems(listItems + itemsPerPage);
        //(posts.length-listItems)>10? setlistItems(listItems + 10):setlistItems(listItems+15);
      }, 100);
    }
  };

  const { isAdmin } = useSelector((state) => state.user);

  return (
    !loading &&
    mapBounds && (
      <Wrapper id="List">
        {isAdmin && <HorizontalSwiper />}
        <InfiniteScroll
          loadMore={() => loadMore()}
          hasMore={hasMoreItems}
          // loader={<SkeletonCard dataFinalLength={dataFinalLength === 0} />}
          useWindow={false}
        >
          {showItems(dataFinal)}
        </InfiniteScroll>

        {loading && <NoIdeasYet>{t("projectrooms_loader")}</NoIdeasYet>}
        {!loading && dataFinal.length === 0 && (
          <NoIdeasYet>{t("projectrooms_loading_error")}</NoIdeasYet>
        )}

        {isMobileCustom ? (
          <div style={{ height: "70%" }} />
        ) : (
          <div style={{ height: "500px" }} />
        )}
      </Wrapper>
    )
  );
};

export default ProjectsList;
