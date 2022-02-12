/** @format */

import React, { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  openCreateProjectRoomFunc,
  openProjectRoomFunc,
} from "../../../redux/actions/projectActions";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

import styled from "styled-components";
import notPublishedIcon from "../../../images/icons/notPublished.png";
import bulb from "../../../images/svgIcons/bulb.svg";

import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import {
  BodyText,
  Card,
  CardContent,
  CardTitle,
  ColorDot,
  DistrictHeader,
  Gradient,
} from "./styles/sharedStyles";
import {
  StyledH2,
  StyledH3,
  StyledH4,
  StyledImg,
  StyledText,
} from "../../../styles/GlobalStyle";
import organizationTypes from "../../../data/organizationTypes";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const ImgWrapper = styled.div`
  /* position: relative;
  width: calc(100% + 30px);
  height: 70px;
  background-color: white;
  border-radius: 18px;

  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  overflow: hidden;
  flex-shrink: 0;
  margin: -15px -15px; */

  box-sizing: border-box;
  width: 118px;
  height: 118px;
  overflow: visible;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  border: 1px solid rgba(195, 186, 162, 0.5);
`;

const ImgWrapperOverlay = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255, 0.8);
  border-radius: 18px;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TopFlexWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;
const RightWrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 140px;
  height: 118px;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;
  flex-grow: 0;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "10px")};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "3px")};
`;

const OrganizationLogo = styled.div`
  width: 32px;
  height: 32px;
  box-shadow: 0px 4px 10px -4px #c3baa2;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  margin-left: 5px;
  margin-right: 15px;
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 5px;
  width: calc(100% - 30px);
  height: 40px;
`;

export const ProjectCard = (props) => {
  const {
    project: {
      projectRoomId,
      title,
      owner,
      imgUrl,
      brief,
      status,
      organizationId,
      icon,
    },
  } = props;

  const thisProjectRoomId = projectRoomId;

  const [logo, setLogo] = useState(null);
  const cardOrganizationId = organizationId;
  const user = useSelector((state) => state.user);
  const screams = useSelector((state) => state.data.screams);

  const organizations = useSelector((state) => state.data.organizations);
  const dispatch = useDispatch();

  const pushScreamId = () => {
    dispatch(openProjectRoomFunc(thisProjectRoomId, true));
  };
  const handleEdit = () => {
    localStorage.setItem("createProjectRoomOrganizationId", organizationId);
    localStorage.setItem("createProjectRoomId", thisProjectRoomId);
    localStorage.setItem("createProjectPostEdit", true);

    dispatch(openCreateProjectRoomFunc(true));
  };

  const organizationCardData = [];

  if (organizations) {
    organizations.forEach(({ organizationId, userIds }) => {
      if (cardOrganizationId === organizationId) {
        organizationCardData.push(userIds);
      }
    });
  }

  const ideasSize = screams.filter(
    ({ projectRoomId }) => projectRoomId === thisProjectRoomId
  );
  const storageRef = firebase.storage().ref();

  storageRef
    .child(`/organizationsData/${organizationId}/logo/logo`)
    .getDownloadURL()
    .then(onResolve);

  function onResolve(logo) {
    setLogo(logo);
  }

  return (
    <Card type="projectRoomCard">
      <CardContent>
        {organizationCardData[0]?.includes(user.userId) && (
          <CustomIconButton
            name="Menu"
            iconWidth="70%"
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
        <ExpandButton handleButtonClick={() => pushScreamId()} />
        <CardTitle>
          <StyledH2 fontWeight="900">{title}</StyledH2>
        </CardTitle>
        <ImgWrapper img={imgUrl}>
          {status === "archived" && (
            <ImgWrapperOverlay>
              <img src={notPublishedIcon} alt="UploadImageIcon" width="50%" />
            </ImgWrapperOverlay>
          )}
        </ImgWrapper>
        <RightWrapper>
          <StyledText>{brief} </StyledText>
        </RightWrapper>
        <BottomBar>
          <Icon>{icon}</Icon>
          <OrganizationLogo>
            {logo && (
              <StyledImg src={logo} width="100%" alt="organizationLogo" />
            )}
          </OrganizationLogo>

          <StyledH4>{owner}</StyledH4>

          <Icon marginLeft="auto" marginRight="5px">
            <img src={bulb} />
          </Icon>

          <StyledH4>{ideasSize.length}</StyledH4>
        </BottomBar>
      </CardContent>
    </Card>
  );
};
