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
60% {
        margin-left: 100%;
}


100% {
  margin-left: calc(100% - 120px);
}
    `;
const TopicFilterWrapperMobile = styled.div`
  z-index: 15;
  position: fixed;
  top: 100px;
  width: 100%;
  overflow-x: scroll;
  pointer-events: none;
`;

const TopicFilterInnerWrapperMobile = styled.div`
  width: 880px;

  border-radius: 20px;
  backdrop-filter: blur(5px);
  background-color: rgb(0, 0, 0, 0.1);
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 10px;
  margin-left: calc(100% - 120px);
  animation: ${enterAnimation} 5s;
  z-index: 15;
  pointer-events: auto;
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

export function TopicFilter({ handleTopicSelector, topicsSelected }) {
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

  return isMobileCustom ? (
    <TopicFilterWrapperMobile>
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
