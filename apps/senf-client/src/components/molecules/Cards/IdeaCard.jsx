/** @format */

import React, { memo } from "react";
import styled from "styled-components";

//TIMESTAMP
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// COMPONENTS
import LikeButton from "../../atoms/CustomButtons/LikeButton";

// Redux
import { useSelector, useDispatch } from "react-redux";

import { openScreamFunc } from "../../../redux/actions/screamActions";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { openProjectRoomFunc } from "../../../redux/actions/projectActions";
import CommentButton from "../../atoms/CustomButtons/CommentButton";
import {
  BodyText,
  Card,
  CardContent,
  CardTitle,
  ColorDot,
  DistrictHeader,
  EngagementWrapper,
  Gradient,
  Icon,
  ProjectOpenButton,
} from "./styles/sharedStyles";
import { StyledH2, StyledText } from "../../../styles/GlobalStyle";

import ProjectRoomIcon from "../../../images/icons/projectRoomIcon.png";
import setIconByOrganizationType from "apps/senf-client/src/data/setIconByOrganizationType";

const Gradient2 = styled.div`
  width: 100%;
  bottom: 30px;
  height: 70px;
  position: absolute;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 20%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const IdeaCard = ({
  projectsData,
  title,
  body,
  screamId,
  likeCount,
  commentCount,
  Stadtteil,
  projectRoomId,
  color,
}) => {
  const ideaCardProjectRoomId = projectRoomId;

  dayjs.extend(relativeTime);
  const dispatch = useDispatch();
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);
  const fetchDataScream = () => {
    dispatch(openScreamFunc(screamId));
  };

  const fetchDataProject = () => {
    dispatch(openProjectRoomFunc(projectRoomId, true));
  };

  const projectRoomDataFinal = [];
  if (projectsData) {
    projectsData.map(({ projectRoomId, title, organizationType }) => {
      const svgIcon = setIconByOrganizationType(organizationType);

      if (ideaCardProjectRoomId === projectRoomId) {
        projectRoomDataFinal.push(
          projectRoomId.includes(ideaCardProjectRoomId),
          title,
          svgIcon
        );
      }
    });
  }

  return (
    <Card project={!openProjectRoom && projectRoomId && projectsData}>
      <CardContent>
        <ColorDot color={color} />
        <DistrictHeader color={color}>
          <h4>{Stadtteil}</h4>
        </DistrictHeader>
        <EngagementWrapper>
          <LikeButton screamId={screamId} />
          <h4>{likeCount} </h4>

          <CommentButton handleButtonClick={fetchDataScream} />
          <h4>{commentCount}</h4>
        </EngagementWrapper>
        <CardTitle>
          <StyledH2 fontWeight="900">{title}</StyledH2>
        </CardTitle>

        <StyledText>{body} </StyledText>

        <Gradient />
        <br />
        {!openProjectRoom &&
          projectsData &&
          ideaCardProjectRoomId &&
          projectRoomDataFinal[0] && (
            <React.Fragment>
              <Gradient2></Gradient2>
              <ProjectOpenButton onClick={fetchDataProject}>
                <Icon>{projectRoomDataFinal[2]}</Icon>
                {projectRoomDataFinal[1]}
              </ProjectOpenButton>
            </React.Fragment>
          )}
        <ExpandButton handleButtonClick={fetchDataScream} />
      </CardContent>
    </Card>
  );
};

export default memo(IdeaCard);
