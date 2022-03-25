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
import NotPublishedIcon from "../../../images/icons/notPublished.png";
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

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { truncateString } from "../../../util/helpers";
import { openOrganizationFunc } from "../../../redux/actions/organizationActions";

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

const DeactivatedWrapper = styled.div`
  position: absolute;
  top: calc(50% - 60px);
  z-index: 5;
  color: white;
  width: 30%;
  margin-left: 35%;
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
  padding-right: 5px;
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

const ProjectCard = (props) => {
  const {
    project: { projectRoomId, title, brief, status, organizationId, icon },
  } = props;

  const thisProjectRoomId = projectRoomId;

  const [logo, setLogo] = useState(null);
  const cardOrganizationId = organizationId;
  const screams = useSelector((state) => state.data.screams);

  const organizations = useSelector((state) => state.data.organizations);
  const openOrganization = useSelector((state) => state.UI.openOrganization);
  const dispatch = useDispatch();

  const [projectRoomImage, setProjectRoomImage] = useState(null);

  useEffect(() => {
    function onResolve1(image) {
      setProjectRoomImage(image);
    }
    function onResolve(logo) {
      setLogo(logo);
    }
    const storageRef = firebase.storage().ref();
    storageRef
      .child(`/organizationsData/${organizationId}/logo/logo`)
      .getDownloadURL()
      .then(onResolve);

    storageRef
      .child(`/organizationsData/${organizationId}/${projectRoomId}/thumbnail`)
      .getDownloadURL()
      .then(onResolve1);
  }, [organizationId, projectRoomId]);

  const pushScreamId = () => {
    dispatch(openProjectRoomFunc(thisProjectRoomId, true));

    if (openOrganization) {
      dispatch(openOrganizationFunc("hide", null));
    }
  };

  const [organizationCardData, setOrganizationCardData] = useState([]);

  useEffect(() => {
    if (organizations) {
      organizations.map(({ organizationId, title }) => {
        if (cardOrganizationId === organizationId) {
          setOrganizationCardData([...organizationCardData, title]);
        }
      });
    }
  }, [organizations]);

  const ideasSize = screams.filter(
    ({ projectRoomId }) => projectRoomId === thisProjectRoomId
  ).length;

  return (
    <Card type="projectRoomCard" status={status}>
      {status !== "active" && (
        <DeactivatedWrapper>
          <img src={NotPublishedIcon} width="100%" />
        </DeactivatedWrapper>
      )}
      <CardContent>
        <ExpandButton handleButtonClick={() => pushScreamId()} />
        <CardTitle>
          <StyledH2 fontWeight="900">
            {title &&
              truncateString(
                title,
                document.body.clientWidth < 350
                  ? 28
                  : document.body.clientWidth < 380
                  ? 35
                  : 40
              )}
          </StyledH2>
        </CardTitle>
        <ImgWrapper img={projectRoomImage} />
        <RightWrapper>
          <StyledText smallText={document.body.clientWidth < 350}>
            {brief &&
              truncateString(
                brief,
                document.body.clientWidth < 350
                  ? 90
                  : document.body.clientWidth < 380
                  ? 100
                  : 130
              )}
          </StyledText>
        </RightWrapper>
        <BottomBar>
          <Icon>{icon}</Icon>
          <OrganizationLogo>
            {logo && (
              <StyledImg src={logo} width="100%" alt="organizationLogo" />
            )}
          </OrganizationLogo>

          <StyledH4>
            {organizationCardData[0] &&
              truncateString(
                organizationCardData[0],
                document.body.clientWidth < 350
                  ? 20
                  : document.body.clientWidth < 380
                  ? 30
                  : 40
              )}
          </StyledH4>

          <Icon marginLeft="auto" marginRight="5px">
            <img src={bulb} />
          </Icon>

          <StyledH4>{ideasSize}</StyledH4>
        </BottomBar>
      </CardContent>
    </Card>
  );
};
export default React.memo(ProjectCard);
