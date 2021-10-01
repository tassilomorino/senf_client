/** @format */

import React from "react";
import { isMobileCustom } from "../../util/customDeviceDetect";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import topics from "../../data/topics";
import { useTranslation } from "react-i18next";

import styled, { keyframes } from "styled-components";

const enterAnimation = keyframes`
       0% {
        margin-left: 100%;
}
30% {
        margin-left: 100%;
}


100% {
  margin-left: calc(100% - 120px);
}
    `;
const TopicFilterWrapperMobile = styled.div`
  z-index: 15;
  position: fixed;

  top: 90px;
  width: 100%;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
`;

const MapClickContainer = styled.div`
  position: absolute;
  width: calc(100% - 120px);
  height: 50px;
  z-index: 9;
`;

const TopicFilterInnerWrapperMobile = styled.div`
  width: 880px;

  border-radius: 20px;
  backdrop-filter: blur(5px);
  background-color: rgb(0, 0, 0, 0.1);
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 5px;

  margin-left: calc(100% - 120px);
  animation: ${enterAnimation} 3.5s;
  z-index: 15;
`;

const TopicFilterWrapperDesktop = styled.div`
  position: relative;
  width: 100%;
  left: 20px;
  top: 70px;
  background-color: transparent;
  padding: 0px;
  height: auto;
`;

export function TopicFilter({
  handleTopicSelector,
  topicsSelected,
  loading,
  swipePosition,
  setSwipePosition,
}) {
  const { t } = useTranslation();
  // Handler at index 0 is for the "all" checkbox
  const topicFilters = topics.map((topic, i) => {
    return (
      <Checkbox
        color="default"
        icon={<FiberManualRecordIcon />}
        checkedIcon={<FiberManualRecordIcon className="activelegenditem" />}
        onChange={() => handleTopicSelector(topic.name)}
        data-cy={topic.name}
        checked={
          topicsSelected.includes(topic.name) && topicsSelected.length !== 7
        }
        style={{ color: topic.color }}
      />
    );
  });

  return isMobileCustom && !loading ? (
    <TopicFilterWrapperMobile>
      {swipePosition === "141px" && (
        <MapClickContainer onClick={() => setSwipePosition("70%")} />
      )}
      <TopicFilterInnerWrapperMobile>
        <FormControlLabel
          control={
            <Checkbox
              icon={<FiberManualRecordIcon />}
              checkedIcon={
                <FiberManualRecordIcon className="activelegenditem" />
              }
              data-cy="topic-all"
              onChange={() => handleTopicSelector("all")}
              checked={topicsSelected.length === 7}
              style={{ color: "#000000" }}
            />
          }
          label={t("topics_all")}
        />
        {topics.map((topic, i) => (
          <FormControlLabel
            key={`${topic.name}-${i}`}
            control={topicFilters[i]}
            label={topic.label}
          />
        ))}
      </TopicFilterInnerWrapperMobile>
    </TopicFilterWrapperMobile>
  ) : (
    <TopicFilterWrapperDesktop>
      <FormControlLabel
        control={
          <Checkbox
            icon={<FiberManualRecordIcon />}
            checkedIcon={<FiberManualRecordIcon className="activelegenditem" />}
            data-cy="topic-all"
            onChange={() => handleTopicSelector("all")}
            checked={topicsSelected.length === 7}
            style={{ color: "#000000" }}
          />
        }
        label={t("topics_all")}
      />
      {topics.map((topic, i) => (
        <FormControlLabel
          key={`${topic.name}-${i}`}
          control={topicFilters[i]}
          label={topic.label}
        />
      ))}
    </TopicFilterWrapperDesktop>
  );
}

export default TopicFilter;
