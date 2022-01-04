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
  CardTitle,
  ColorDot,
  DistrictHeader,
  EngagementWrapper,
  ProjectOpenButton,
} from "./styles/sharedStyles";
import { FatH2, StyledText } from "../../../styles/GlobalStyle";

import ProjectRoomIcon from "../../../images/icons/projectRoomIcon.png";

const CardContent = styled.div`
  color: rgb(87, 87, 87);
  width: 95%;
  padding: 15px;
  object-fit: cover;
`;
const Card = styled.div`
  background-color: white;
  width: 95%;
  display: flex;
  position: relative;
  box-shadow: 0 8px 40px -12px rgb(0 0 0 / 0%);

  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  margin-bottom: 10px;
  height: ${(props) => (props.project ? "13.5em" : "11em")};
  overflow: hidden;
  animation: IdeaCardAnimation 0.8s;

  @keyframes IdeaCardAnimation {
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

const BodyText = styled.p`
  white-space: none;
  position: relative;
  width: 100%;

  overflow: hidden;
  max-height: 4.8em;
  margin-top: 0;
`;
const Gradient = styled.div`
  width: 100%;
  bottom: 0;
  height: 80px;
  position: absolute;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 20%,
    rgba(255, 255, 255, 0) 100%
  );
`;

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
  project,
  color,
}) => {
  const ideaCardProject = project;
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);

  const fetchDataScream = () => {
    dispatch(openScreamFunc(screamId));
  };

  const fetchDataProject = () => {
    dispatch(openProjectRoomFunc(project, true));
  };

  const projectsDataFinal = [];
  if (projectsData) {
    projectsData.forEach(({ projectRoomId, title }) => {
      if (ideaCardProject === projectRoomId) {
        projectsDataFinal.push(title);
      }
    });
  }

  return (
    <Card project={!openProjectRoom && project && projectsData}>
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
          <FatH2>{title}</FatH2>
        </CardTitle>
        <BodyText>
          <StyledText>{body} </StyledText>
        </BodyText>
        <Gradient />
        <br />
        {!openProjectRoom && project && projectsData && (
          <>
            <Gradient2></Gradient2>
            <ProjectOpenButton onClick={fetchDataProject}>
              <img
                src={ProjectRoomIcon}
                width="20px"
                style={{ paddingRight: "10px", alignSelf: "center" }}
                alt="ProjectRoomIcon"
              />
              {projectsDataFinal}
            </ProjectOpenButton>
          </>
        )}
        <ExpandButton handleButtonClick={fetchDataScream} />
      </CardContent>
    </Card>
  );
};

export default memo(IdeaCard);
