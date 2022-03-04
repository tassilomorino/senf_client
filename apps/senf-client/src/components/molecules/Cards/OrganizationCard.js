/** @format */

import React, { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import AddIcon from "../../../images/icons/plus_grey.png";
import { useTranslation } from "react-i18next";

import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import {
  openOrganizationFunc,
  stateCreateOrganizationsFunc,
} from "../../../redux/actions/organizationActions";
import { StyledH2, StyledImg, StyledText } from "../../../styles/GlobalStyle";
import setIconByOrganizationType from "../../../data/setIconByOrganizationType";

const Wrapper = styled.div`
  float: left;
  margin: 10px 0px 0px 10px;
  overflow: hidden;

  position: relative;
  box-sizing: border-box;

  width: 178px;
  height: auto;
  box-shadow: 0px 12px 18px -8px rgba(186, 160, 79, 0.2),
    0px -4px 10px 4px rgba(255, 255, 255, 0.2);
  background-color: ${(props) => (props.active ? "#feecab" : "#fcfbf8")};
  border-radius: 18px;
  border: 2px solid ${(props) => (props.active ? "#e8ba02" : "#ffffff")};
  animation: OrganizationCardAnimation 0.8s;

  @media (max-width: 768px) {
    width: calc(50% - 15px);
  }

  @keyframes OrganizationCardAnimation {
    0% {
      opacity: 0;
      transform: translateY(50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const LogoWrapper = styled.div`
  /* position: absolute;
  width: calc(100% - 20px);
  height: calc(100% - 60px);
  margin: 10px;
  flex: none;
  border-radius: 18px;
  overflow: hidden; */
  position: relative;
  margin-top: 10px;
  margin-left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  box-sizing: border-box;
  width: calc(100% - 20px);
  padding-bottom: auto;
  aspect-ratio: 1;
  background-color: #ffffff;
  overflow: visible;
  border-radius: 10px;
  border: 1px solid rgba(195, 186, 162, 0.2);
`;

const Thumbnail = styled.div`
  width: calc(100% - 20px);
  height: auto;
  aspect-ratio: 1;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  overflow: visible;
  background-image: url(${(props) => props.logo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
`;

const LogoPlacer = styled.div`
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  box-shadow: 0px 6px 8px -1px rgba(186, 160, 79, 0.2),
    0px -2px 5px 2px rgba(255, 255, 255, 0.2);
  background-color: #faf8f3;
  overflow: visible;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  margin: 134px 134px 69px 16px;
  position: absolute;
  bottom: 0;

  @media (max-width: 368px) {
    top: -32px;
  }
`;

const Icon = styled.div`
  margin: 5px;
`;

const Title = styled.h3`
  width: 146px;
  height: 24px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
  font-weight: 500;
  font-style: normal;
  font-family: "Nunito", serif;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  letter-spacing: 0px;
  line-height: 1.5;
  text-align: left;

  top: 0;
  position: relative;
  margin: 8px 16px 0px 16px;
`;

const SubTitle = styled.div`
  height: auto; /* 18px */
  width: auto;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
  font-weight: 500;
  font-style: normal;
  font-family: "Nunito", serif;
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  letter-spacing: 0px;
  line-height: 1.3;
  text-align: left;
  margin: 0px 0px 12px 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const OrganizationCard = (props) => {
  const {
    organization: {
      title,
      imgUrl,
      organizationId: thisOrganizationId,
      userIds,
      organizationType,
    },
  } = props;

  const organization = useSelector((state) => state.data.organization);

  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => state.data.projects);

  const dispatch = useDispatch();

  const handleEdit = () => {
    localStorage.setItem("createOrganizationId", thisOrganizationId);
    localStorage.setItem("createOrganizationPostEdit", true);

    dispatch(stateCreateOrganizationsFunc(true));
  };

  const handleOpenOrganization = () => {
    dispatch(openOrganizationFunc(true, thisOrganizationId));
  };

  const projectRoomsSize = projects?.filter(
    ({ organizationId }) => organizationId === thisOrganizationId
  ).length;

  return (
    <Wrapper active={thisOrganizationId === organization?.organizationId}>
      <ExpandButton handleButtonClick={handleOpenOrganization} />
      {userIds.includes(user.userId) && (
        <CustomIconButton
          name="Menu"
          iconWidth="25px"
          handleButtonClick={() => handleEdit()}
          position="absolute"
          left="calc(100% - 54px)"
          margin="2px"
          top="0px"
          backgroundColor="transparent"
          shadow={false}
          zIndex="99"
        />
      )}
      <LogoWrapper>
        <Thumbnail logo={imgUrl} width="100%" alt="profile" />
      </LogoWrapper>

      <LogoPlacer>
        <Icon>{setIconByOrganizationType(organizationType)}</Icon>
      </LogoPlacer>
      <Title>{title}</Title>
      <SubTitle>
        {projectRoomsSize}{" "}
        {projectRoomsSize === 1 ? "aktiver Projektraum" : "aktive Projekträume"}
      </SubTitle>
    </Wrapper>
  );
};
