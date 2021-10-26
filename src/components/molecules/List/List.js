/** @format */

import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import IdeaCard from "../Cards/IdeaCard";
import {
  NoMoreMainContent,
  NoMoreMyContent,
  NoMoreProjectsContent,
} from "./NoMoreContent";
import { isMobileCustom } from "../../../util/customDeviceDetect";

import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import SkeletonCard from "../Cards/SkeletonCard";

const Wrapper = styled.div`
  height: 100vh;
  overflow: scroll;
  position: relative;
  width: 100%;
  top: 0;

  animation: cardanimation 0.8s ease-in-out;

  @media (min-width: 768px) {
    width: 400px;
    top: 110px;
    position: fixed;
  }
`;
const List = ({
  type,
  loading,
  dropdown,
  dataFinal,
  dataFinalLength,
  projectsData,
}) => {
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevdataFinalLength = usePrevious({ dataFinalLength });

  useEffect(() => {
    if (
      dataFinalLength &&
      prevdataFinalLength.dataFinalLength !== dataFinalLength
    ) {
      setListItems(1);
      sethasMoreItems(true);
    }
  }, [dataFinalLength]);
  const itemsPerPage = 1;
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [listItems, setListItems] = useState(itemsPerPage);

  const showItems = (dataFinal) => {
    var items = [];
    for (var i = 0; i < listItems; i++) {
      items.push(
        <IdeaCard
          loading={loading}
          key={dataFinal[i]?.screamId}
          title={dataFinal[i]?.title}
          body={dataFinal[i]?.body}
          screamId={dataFinal[i]?.screamId}
          likeCount={dataFinal[i]?.likeCount}
          commentCount={dataFinal[i]?.commentCount}
          Stadtteil={dataFinal[i]?.Stadtteil}
          project={dataFinal[i]?.project}
          color={dataFinal[i]?.color}
          projectsData={projectsData}
        />
      );
    }
    return items;
  };

  const loadMore = () => {
    console.log(
      "loading more",
      "df.length",
      dataFinal.length,
      "listItems:",
      listItems
    );
    if (listItems === dataFinal.length) {
      sethasMoreItems(false);
    } else {
      setTimeout(() => {
        setListItems(listItems + itemsPerPage);
        //(posts.length-listItems)>10? setlistItems(listItems + 10):setlistItems(listItems+15);
      }, 100);
    }
  };

  // const content = (
  //   <MainAnimations>
  //     {dataFinal.map(
  //       ({
  //         title,
  //         body,
  //         screamId,
  //         likeCount,
  //         commentCount,
  //         Stadtteil,
  //         project,
  //         color,
  //       }) => (
  //         <IdeaCard
  //           loading={loading}
  //           key={screamId}
  //           title={title}
  //           body={body}
  //           screamId={screamId}
  //           likeCount={likeCount}
  //           commentCount={commentCount}
  //           Stadtteil={Stadtteil}
  //           project={project}
  //           color={color}
  //           projectsData={projectsData}
  //         />
  //       )
  //     )}
  //   </MainAnimations>
  // );
  return (
    !loading && (
      <Wrapper>
        {dropdown === "newest" && (
          <InfiniteScroll
            loadMore={() => loadMore()}
            hasMore={hasMoreItems}
            loader={<SkeletonCard></SkeletonCard>}
            useWindow={false}
          >
            {showItems(dataFinal)}
          </InfiniteScroll>
        )}
        {dropdown === "hottest" && (
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMoreItems}
            loader={<SkeletonCard>hi</SkeletonCard>}
            useWindow={false}
          >
            {showItems(dataFinal)}
          </InfiniteScroll>
        )}

        {!hasMoreItems && (
          <React.Fragment>
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
        )}
      </Wrapper>
    )
  );
};

export default List;
