/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleTopicSelectorRedux,
  handleOrganizationTypesSelectorRedux,
} from "../../../redux/actions/UiActions";
import topics from "../../../data/topics";
import organizationTypes from "../../../data/organizationTypes";

import { useTranslation } from "react-i18next";

import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";

const FilterWrapperMobile = styled.div`
  z-index: 1;
  position: ${(props) =>
    props.placing !== "list" && props.placing !== "insights" && isMobileCustom
      ? "fixed"
      : "relative"};

  top: ${(props) =>
    props.placing === "list"
      ? "0px"
      : props.placing === "insights"
      ? "20px"
      : "none"};

  top: ${(props) =>
    props.placing !== "list" && props.placing !== "insights" && isMobileCustom
      ? "60px"
      : "none"};
  width: 100%;

  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  transition: 1s;
  padding-bottom: 20px;
  padding-top: 20px;
  margin-top: -20px;
  /* animation: FilterWrapperMobileAnimation 1s;
  @keyframes FilterWrapperMobileAnimation {
    0% {
      margin-left: 100%;
    }

    100% {
      margin-left: 10px;
    }
  } */

  @media (min-width: 768px) {
    top: 0;
    padding-left: 0;
    padding-bottom: 0;
  }
`;

const FilterInnerWrapperMobile = styled.div`
  padding-left: 0px;
  padding-right: 20px;
  margin: 5px;
  margin-left: 10px;

  display: flex;
  flex-direction: row;
  width: max-content;

  @media (min-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: ${(props) => (props.column ? "column" : "row")};
    align-items: flex-start;

    text-align: left;
    flex-wrap: wrap;
    padding: 0px;
    margin-left: 0;
  }
`;

const Tag = styled.button`
  flex-shrink: 0;
  width: auto; /* 62px */
  height: auto; /* 16px */
  white-space: pre;
  overflow: visible;
  font-weight: 600;
  font-style: normal;
  font-family: "Nunito", serif;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  letter-spacing: 0px;
  line-height: 1.2;
  text-align: center;
  cursor: pointer;

  margin-right: 5px;
  /* box-shadow: ${(props) =>
    props.placing !== "list" && props.placing !== "insights"
      ? "0 8px 30px -12px rgba(0, 0, 0, 0.8)"
      : "none"};
  background-color: ${(props) =>
    props.checked
      ? ` rgb(255, 255, 255, 1)`
      : props.placing !== "list"
      ? "rgb(236, 236, 236, 0.6)"
      : "#FFE898"}; */

  transform: ${(props) => (props.hide ? "scale(0.8)" : "scale(1)")};
  opacity: ${(props) => (props.hide ? "0" : "1")};
  transition: 0.4s;

  box-sizing: border-box;
  width: auto; /* 104px */
  height: 34px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 10px 14px 10px;
  box-shadow: 0px 4px 6px -2px rgba(186, 160, 79, 0.2),
    0px -2px 5px 2px rgba(255, 255, 255, 0.2);
  background-color: ${(props) =>
    props.checked ? "#feecab" : props.placing !== "list" ? "#fff" : "#f3f1ec"};
  overflow: visible;
  border-radius: 10px;
  border: ${(props) => (props.checked ? "2px" : "1px")} solid
    ${(props) => (props.checked ? "#e8ba02" : "rgba(255, 255, 255, 0.3)")};



    animation: tagsAnimation 0.4s;
  @keyframes tagsAnimation {
    0% {
      transform:scale(0.8);
  opacity:  0;
    }

    100% {
      transform:scale(1));
  opacity:  1;
    }
  };

  @media (min-width: 768px) {
    box-shadow: none;
    margin-top: 5px;
    padding-right: 10px;
    font-size: 14px;

    &:hover {
      background-color: #fee381;
      border: 2px solid #e8ba02;
    }
  }
`;

const StyledCheckbox = styled.div`
  width: 13px;
  position: relative;
  height: 13px;
  border-radius: 6px;
  flex-grow: 0;

  background-color: ${(props) => props.color && props.color};

  margin-right: 10px;
  margin-left: 3px;
`;

const Icon = styled.div`
  width: 16px;
  position: relative;
  height: 16px;
  flex-grow: 0;
  margin-right: 10px;
  margin-left: 3px;
`;
const Span = styled.span``;

export function TagsFilter({ loading, placing, type, inline, column }) {
  const openScream = useSelector((state) => state.UI.openScream);
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);
  const project = useSelector((state) => state.data.project);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const openOrganization = useSelector((state) => state.UI.openOrganization);
  const swipePosition = useSelector((state) => state.UI.swipePosition);

  const selectedTopics = useSelector((state) => state.data.topics);
  const selectedOrganizationTypes = useSelector(
    (state) => state.data.organizationTypes
  );
  const [moveLeft, setMoveLeft] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (openScream) {
      setMoveLeft(false);
    }
  }, [openScream]);

  return (
    !loading &&
    !inline && (
      <FilterWrapperMobile
        openScream={openScream}
        id="Wrapper"
        placing={placing}
      >
        <FilterInnerWrapperMobile column={column}>
          <Tag
            placing={placing}
            hide={
              (placing === "list" && swipePosition === "bottom") ||
              (placing !== "list" &&
                placing !== "insights" &&
                isMobileCustom &&
                (openScream ||
                  (openProjectRoom && !project?.screams) ||
                  openAccount ||
                  openOrganization ||
                  swipePosition === "top"))
            }
            onClick={
              type === "topics"
                ? () => dispatch(handleTopicSelectorRedux("all"))
                : () => dispatch(handleOrganizationTypesSelectorRedux("all"))
            }
            checked={
              type === "topics"
                ? selectedTopics.length === 7
                : selectedOrganizationTypes.length === 7
            }
            color="#000000"
          >
            <Icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                <path
                  d="M 3 0 C 4.657 0 6 1.343 6 3 C 6 4.657 4.657 6 3 6 C 1.343 6 0 4.657 0 3 C 0 1.343 1.343 0 3 0 Z M 11 0 C 12.657 0 14 1.343 14 3 C 14 4.657 12.657 6 11 6 C 9.343 6 8 4.657 8 3 C 8 1.343 9.343 0 11 0 Z M 3 8 C 4.657 8 6 9.343 6 11 C 6 12.657 4.657 14 3 14 C 1.343 14 0 12.657 0 11 C 0 9.343 1.343 8 3 8 Z M 11 8 C 12.657 8 14 9.343 14 11 C 14 12.657 12.657 14 11 14 C 9.343 14 8 12.657 8 11 C 8 9.343 9.343 8 11 8 Z"
                  fill="hsl(0, 0%, 0%)"
                ></path>
              </svg>
            </Icon>

            {type === "topics" ? t("topics_all") : t("organizationTypes_all")}
          </Tag>
          {type === "topics"
            ? topics.map((topic, i) => (
                <Tag
                  key={topic.name}
                  placing={placing}
                  onClick={() => dispatch(handleTopicSelectorRedux(topic.name))}
                  checked={
                    selectedTopics.includes(topic.name) &&
                    selectedTopics.length !== 7
                  }
                  color={topic.color}
                  hide={
                    (placing === "list" && swipePosition === "bottom") ||
                    (placing !== "list" &&
                      placing !== "insights" &&
                      isMobileCustom &&
                      (openScream ||
                        (openProjectRoom && !project?.screams) ||
                        openAccount ||
                        openOrganization ||
                        swipePosition === "top"))
                  }
                >
                  <StyledCheckbox color={topic.color} data-cy={topic.name} />

                  <Span>{topic.label}</Span>
                </Tag>
              ))
            : organizationTypes.map((organizationTypes, i) => (
                <Tag
                  key={organizationTypes.name}
                  placing={placing}
                  onClick={() =>
                    dispatch(
                      handleOrganizationTypesSelectorRedux(
                        organizationTypes.name
                      )
                    )
                  }
                  checked={
                    selectedOrganizationTypes.includes(
                      organizationTypes.name
                    ) && selectedOrganizationTypes.length !== 7
                  }
                  color={organizationTypes.color}
                  hide={
                    (placing === "list" && swipePosition === "bottom") ||
                    (placing !== "list" &&
                      placing !== "insights" &&
                      isMobileCustom &&
                      (openScream ||
                        (openProjectRoom && !project?.screams) ||
                        openAccount ||
                        openOrganization ||
                        swipePosition === "top"))
                  }
                >
                  <Icon data-cy={organizationTypes.name}>
                    {organizationTypes.svgIcon}
                  </Icon>

                  {organizationTypes.label}
                </Tag>
              ))}
        </FilterInnerWrapperMobile>
      </FilterWrapperMobile>
    )
  );
}

export default React.memo(TagsFilter);
