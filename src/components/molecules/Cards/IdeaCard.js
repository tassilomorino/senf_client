/** @format */

import React from "react";
import styled from "styled-components";

//TIMESTAMP
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// COMPONENTS
import LikeButton from "../../atoms/CustomButtons/LikeButton";
import RegistrationAndLogin from "../../atoms/Auth/LoginRegistration";

// Icons
import ChatBorder from "../../../images/icons/chat.png";

// Redux
import { useSelector, useDispatch } from "react-redux";

import { openScreamFunc } from "../../../redux/actions/screamActions";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { openProjectFunc } from "../../../redux/actions/projectActions";
import MyButtonStyle from "../../atoms/CustomButtons/MyButtonStyle";

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
  max-height: 14.5em;
  min-height: 12em;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  margin-bottom: 10px;
  height: ${(props) => props.project && "23em"};
  overflow: hidden;
`;

const ColorDot = styled.div`
  width: 15px;
  position: relative;
  height: 15px;
  border-radius: 100%;
  border: 0.5px solid white;
  background-color: ${(props) => props.color};
  opacity: 1;
  float: left;
`;

const LocationOuter = styled.div`
  color: rgb(255, 205, 6);
  float: left;
  height: 3vh;
  margin-left: 10px;
`;

const LocationHeader = styled.div`
  color: ${(props) => props.color};
  float: left;
  width: 100%;
  padding-right: 2%;
`;

const ScreamCardTitle = styled.div`
  clear: both;
  color: rgb(87, 87, 87);
  width: 85%;
  position: relative;
  font-size: 20px;
  font-family: Playfair Display;
  font-weight: 500;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: 800;
`;
const BodyText = styled.div`
  white-space: pre-line;
  position: relative;
  width: 85%;
  font-size: 14pt;
  line-height: 17pt;
  overflow: hidden;
  max-height: 4.8em;
`;
const Gradient = styled.div`
  width: 100%;
  bottom: 0;
  height: 100px;
  position: absolute;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 20%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const Gradient2 = styled.div`
  width: 80%;
  bottom: 50px;
  height: 50px;
  position: absolute;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 20%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const ScreamcardProjectContainerButtonWide = styled.button`
  background-color: #f8f8f8;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  left: 0;
  height: 50px;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  border-radius: 0%;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 11;
  color: #353535;
  font-size: 12pt;
  box-shadow: rgb(38 57 77 / 0%) 0px 20px 30px -15px;
  text-transform: none;
  font-family: Futura PT W01 Book;
`;

const Line = styled.div`
  top: 0%;
  left: 85%;
  width: 1px;
  height: ${(props) =>
    !props.openProject && props.project && props.projectsData
      ? "calc(100% - 50px)"
      : "100%"};
  position: absolute;
  background-color: #d5dadd;
  z-index: 11;
`;

const LikeButtonWrapper = styled.div`
  top: ${(props) => (props.project && props.projectsData ? "10px" : "10%")};
  left: 85%;
  z-index: 10;
  position: absolute;
  text-align: center;
`;

const Engagement = styled.div`
  color: black;
  width: 100%;
  font-size: 14px;
  text-align: center;
  padding-right: 10px;
`;

const CommentButtonWrapper = styled.div`
  top: ${(props) => (props.project && props.projectsData ? "100px" : "55%")};
  left: 85%;
  z-index: ${(props) => (props.authenticated ? "0" : "10")};
  position: absolute;
  background-color: white;
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
  const authenticated = useSelector((state) => state.user.authenticated);
  const openProject = useSelector((state) => state.UI.openProject);

  const fetchDataScream = () => {
    dispatch(openScreamFunc(screamId));
  };

  const fetchDataProject = () => {
    dispatch(openProjectFunc(project));
  };

  const projectsDataFinal = [];
  if (projectsData) {
    projectsData.forEach(({ project, title }) => {
      if (ideaCardProject === project) {
        projectsDataFinal.push(title);
      }
    });
  }

  return (
    <Card project={!openProject && project && projectsData}>
      <CardContent>
        <ColorDot color={color} />{" "}
        <LocationOuter>
          <LocationHeader color={color}>{Stadtteil}</LocationHeader>
        </LocationOuter>
        <ScreamCardTitle>{title}</ScreamCardTitle>
        <BodyText>{body} </BodyText>
        <Gradient></Gradient>
        <Line
          openProject={openProject}
          project={project}
          projectsData={projectsData}
        />
        <LikeButtonWrapper project={project} projectsData={projectsData}>
          <LikeButton screamId={screamId} />
          <Engagement>{likeCount} </Engagement>
        </LikeButtonWrapper>
        <CommentButtonWrapper
          authenticated={authenticated}
          project={project}
          projectsData={projectsData}
        >
          <MyButtonStyle>
            {!authenticated && <RegistrationAndLogin />}
            <img src={ChatBorder} width="100%" alt="ChatIcon" />
          </MyButtonStyle>
          <Engagement>{commentCount}</Engagement>
        </CommentButtonWrapper>
        <br />
        {!openProject && project && projectsData && (
          <>
            <Gradient2></Gradient2>
            <ScreamcardProjectContainerButtonWide onClick={fetchDataProject}>
              {projectsDataFinal}
            </ScreamcardProjectContainerButtonWide>
          </>
        )}
        <ExpandButton handleButtonClick={fetchDataScream} />
      </CardContent>
    </Card>
  );
};

export default IdeaCard;
