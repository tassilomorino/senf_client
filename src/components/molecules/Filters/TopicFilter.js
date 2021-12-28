/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import {
  handleTopicSelectorRedux,
  handleOrganizationTypesSelectorRedux,
} from "../../../redux/actions/UiActions";
import topics from "../../../data/topics";
import organizationTypes from "../../../data/organizationTypes";

import { useTranslation } from "react-i18next";

import styled from "styled-components";

const FilterWrapperMobile = styled.div`
  z-index: 15;
  position: relative;

  top: ${(props) =>
    props.openScream
      ? "15px"
      : props.placing === "list"
      ? "0px"
      : props.moveUp
      ? "-90px"
      : "60px"};
  width: 100%;

  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  transition: 1s;
  padding-bottom: 20px;
  padding-top: 20px;
  margin-top: -20px;
  padding-left: ${(props) => (props.openScream ? "60px" : "0px")};
  animation: FilterWrapperMobileAnimation 1s;
  @keyframes FilterWrapperMobileAnimation {
    0% {
      margin-left: 100%;
    }

    100% {
      margin-left: 10px;
    }
  }
`;

const TopicFilterInnerWrapperMobile = styled.div`
  border-radius: 20px 0 0 20px;
  backdrop-filter: blur(5px);
  /* background-color: rgb(255, 255, 255, 0.5); */
  /* box-shadow: 0 -18px 40px 12px rgba(0, 0, 0, 0.2); */
  /* padding: 5px; */
  padding-left: 10px;
  padding-right: 20px;
  margin: 5px;
  /* margin-left: calc(100% - 120px); */
  margin-left: 10px;
  z-index: 15;
  display: flex;
  flex-direction: row;
  width: max-content;
`;

const TopicFilterWrapperDesktop = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  flex-wrap: wrap;
  padding: 10px;
`;

export function TopicFilter({ loading, placing, type, inline, column }) {
  const openScream = useSelector((state) => state.UI.openScream);
  const selectedTopics = useSelector((state) => state.data.topics);
  const selectedOrganizationTypes = useSelector(
    (state) => state.data.organizationTypes
  );
  const swipePosition = useSelector((state) => state.UI.swipePosition);
  const [moveLeft, setMoveLeft] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (openScream) {
      setMoveLeft(false);
    }
  }, [openScream]);

  // Handler at index 0 is for the "all" checkbox
  const topicFilters = topics.map((topic, i) => {
    return (
      <Checkbox
        color="default"
        icon={<FiberManualRecordIcon />}
        checkedIcon={<FiberManualRecordIcon className="activelegenditem" />}
        onChange={() => dispatch(handleTopicSelectorRedux(topic.name))}
        data-cy={topic.name}
        checked={
          selectedTopics.includes(topic.name) && selectedTopics.length !== 7
        }
        style={{ color: topic.color }}
      />
    );
  });

  const organizationTypesFilters = organizationTypes.map(
    (organizationTypes, i) => {
      return (
        <Checkbox
          color="default"
          icon={<FiberManualRecordIcon />}
          checkedIcon={<FiberManualRecordIcon className="activelegenditem" />}
          onChange={() =>
            dispatch(
              handleOrganizationTypesSelectorRedux(organizationTypes.name)
            )
          }
          data-cy={organizationTypes.name}
          checked={
            selectedOrganizationTypes.includes(organizationTypes.name) &&
            selectedOrganizationTypes.length !== 7
          }
          style={{ color: organizationTypes.color }}
        />
      );
    }
  );
  return isMobileCustom && !loading && !inline ? (
    <FilterWrapperMobile
      openScream={openScream}
      id="Wrapper"
      placing={placing}
      moveUp={swipePosition === "top"}
    >
      <TopicFilterInnerWrapperMobile>
        <FormControlLabel
          style={{
            backgroundColor: "white",
            paddingRight: "10px",
            borderRadius: "8px",
            boxShadow:
              placing !== "list"
                ? "0 8px 30px -12px rgba(0, 0, 0, 0.8)"
                : "none",
          }}
          control={
            <Checkbox
              icon={<FiberManualRecordIcon />}
              checkedIcon={
                <FiberManualRecordIcon className="activelegenditem" />
              }
              data-cy="topic-all"
              onChange={
                type === "topics"
                  ? () => dispatch(handleTopicSelectorRedux("all"))
                  : () => dispatch(handleOrganizationTypesSelectorRedux("all"))
              }
              checked={selectedTopics.length === 7}
              style={{ color: "#000000" }}
            />
          }
          label={
            type === "topics" ? t("topics_all") : t("organizationTypes_all")
          }
        />
        {type === "topics"
          ? topics.map((topic, i) => (
              <FormControlLabel
                style={{
                  backgroundColor: "white",
                  paddingRight: "10px",
                  borderRadius: "8px",
                  boxShadow:
                    placing !== "list"
                      ? "0 8px 30px -12px rgba(0, 0, 0, 0.8)"
                      : "none",
                }}
                key={`${topic.name}-${i}`}
                control={topicFilters[i]}
                label={topic.label}
              />
            ))
          : organizationTypes.map((organizationTypes, i) => (
              <FormControlLabel
                style={{
                  backgroundColor: "white",
                  paddingRight: "10px",
                  borderRadius: "8px",
                  boxShadow:
                    placing !== "list"
                      ? "0 8px 30px -12px rgba(0, 0, 0, 0.8)"
                      : "none",
                }}
                key={`${organizationTypes.name}-${i}`}
                control={organizationTypesFilters[i]}
                label={organizationTypes.label}
              />
            ))}
      </TopicFilterInnerWrapperMobile>
    </FilterWrapperMobile>
  ) : (
    <TopicFilterWrapperDesktop column={column}>
      <FormControlLabel
        control={
          <Checkbox
            icon={<FiberManualRecordIcon />}
            checkedIcon={<FiberManualRecordIcon className="activelegenditem" />}
            data-cy="topic-all"
            onChange={
              type === "topics"
                ? () => dispatch(handleTopicSelectorRedux("all"))
                : () => dispatch(handleOrganizationTypesSelectorRedux("all"))
            }
            checked={selectedTopics.length === 7}
            style={{ color: "#000000" }}
          />
        }
        label={type === "topics" ? t("topics_all") : t("organizationTypes_all")}
      />

      {type === "topics"
        ? topics.map((topic, i) => (
            <FormControlLabel
              key={`${topic.name}-${i}`}
              control={topicFilters[i]}
              label={topic.label}
            />
          ))
        : organizationTypes.map((organizationTypes, i) => (
            <FormControlLabel
              key={`${organizationTypes.name}-${i}`}
              control={organizationTypesFilters[i]}
              label={organizationTypes.label}
            />
          ))}
    </TopicFilterWrapperDesktop>
  );
}

export default React.memo(TopicFilter);
