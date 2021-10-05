/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import topics from "../../../data/topics";
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

  top: ${(props) => (props.openScream ? "10px" : "90px")};
  width: 100%;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  transition: 1s;
`;

const MapClickContainer = styled.div`
  position: absolute;
  width: calc(100% - 120px);
  height: 50px;
  z-index: 9;
`;

const TopicFilterInnerWrapperMobile = styled.div`
  width: 880px;

  border-radius: 20px 0 0 20px;
  backdrop-filter: blur(5px);
  background-color: rgb(0, 0, 0, 0.1);
  padding: 5px;
  padding-left: 20px;
  padding-right: 0px;
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
  setSwipeMovePosition,
}) {
  const { openScream } = useSelector((state) => state.UI);

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
    <TopicFilterWrapperMobile openScream={openScream}>
      {swipePosition === "top" && (
        <MapClickContainer onClick={() => setSwipeMovePosition("0")} />
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
