/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../../util/MyButton";
import styled from "styled-components";

//TIMESTAMP
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// COMPONENTS
import LikeButton from "../../module/CustomButtons/LikeButton";
import SignNote from "../../profile/SignNote";

// Icons
import ChatBorder from "../../../images/icons/chat.png";

// Redux
import { useSelector, useDispatch } from "react-redux";

import { openScream } from "../../../redux/actions/screamActions";
import setColorByTopic from "../../../data/setColorByTopic";
import ExpandButton from "../CustomButtons/ExpandButton";

const styles = {};

const IdeaCard = ({ classes, projectsData, scream }) => {
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.user);
  const { openProject } = useSelector((state) => state.UI);

  const {
    title,
    body,
    screamId,
    likeCount,
    commentCount,
    Stadtteil,
    project,
    Thema,
  } = scream;

  const fetchDataScream = (screamId) => {
    dispatch(openScream(screamId));
  };

  const fetchDataProject = (project) => {
    dispatch(openProject(project));
  };

  const projectsDataFinal = [];
  if (projectsData) {
    projectsData.forEach((element) => {
      if (project === element.project) {
        projectsDataFinal.push(element.title);
      }
    });
  }

  const CardContent = styled.div`
    color: rgb(87, 87, 87);
    width: 95%;
    padding: 15px;
    object-fit: cover;
  `
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
    height: ${(props) => props.project && "23em"} 
  `

  const ColorDot = styled.div`
    width: 15px;
    position: relative;
    height: 15px;
    border-radius: 100%;
    border: 0.5px solid white;
    background-color: ${(props) => setColorByTopic(Thema)};
    opacity: 1;
    float: left;
  `

  const LocationOuter = styled.div`
    color: rgb(255, 205, 6);
    float: left;
    height: 3vh;
    margin-left: 10px;
  `

  const LocationHeader = styled.div`
    color: ${(props) => setColorByTopic(Thema)};
    float: left;
    width: 100%;
    padding-right: 2%;
  `

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
  `
  const BodyText = styled.div`
    white-space: pre-line;
    position: relative;
    width: 85%;
    font-size: 14pt;
    line-height: 17pt;
    overflow: hidden;
    max-height: 4.8em;  
  `
  const Gradient = styled.div`
    width: 100%;
    bottom: 0;
    height: 100px;
    position: absolute;
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%);
  `

  const Line = styled.div`
    top: 0%;
    left: 85%;
    width: 1px;
    height: 100%;
    position: absolute;
    background-color: #d5dadd;
  `

  const LikeButtonWrapper = styled.div`
    top: ${(props) => props.project && props.projectsData ? "10px" : "10%"};
    left: 85%;
    z-index: 10;
    position: absolute;
    text-align: center;
  `

  const LikeButtonDesign = styled.div`
    top: 10%;
    left: 0%;
    z-index: 10;
    position: relative;
  `

  const Engagement = styled.div`
    color: black;
    width: 100%;
    font-size: 14px;
    text-align: center;
    padding-right: 10px;
  `

  const Gradient2 = styled.div`
    width: 80%;
    bottom: 50px;
    height: 50px;
    position: absolute;
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%);
  `
  // buttonWide overwritten by ScreamcardProjectContainer for a few elements (see commented out)
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
      z-index: 10;
      color: #353535;
      font-size: 12pt;
      box-shadow: rgb(38 57 77 / 0%) 0px 20px 30px -15px;

      // border-radius: 30px;
      text-transform: none;
      /* font-size: 14pt;
      background-color: white;
      height: 50px; */
      font-family: Futura PT W01 Book;
      // box-shadow: rgb(38 57 77 / 70%) 0px 20px 30px -15px;
    `
  const CommentButtonWrapper = styled.button`
        top: ${(props) => props.project && props.projectsData ? "100px" : "55%"};
        left: 85%;
        z-index: ${(props) => props.authenticated ? "0" : "10"};
        position: absolute;
      `

  return (
    <Card
      project={!openProject && project && projectsData}
    >
      <CardContent>
        <ColorDot />{" "}
        <LocationOuter>
          <LocationHeader>
            {Stadtteil}
          </LocationHeader>
        </LocationOuter>
        <ScreamCardTitle>{title}</ScreamCardTitle>
        <BodyText /* className="bodytext"*/>{body} </BodyText>
        <Gradient></Gradient>
        <Line />
        <LikeButtonWrapper
          project={project}
          projectsData={projectsData}
        >
          <LikeButtonDesign>
            <LikeButton screamId={screamId} />
          </LikeButtonDesign>
          <Engagement>{likeCount} </Engagement>
        </LikeButtonWrapper>
        <CommentButtonWrapper
          authenticated={authenticated}
          project={project}
          projectsData={projectsData}
        >
          <MyButton>
            {!authenticated && <SignNote />}
            <img src={ChatBorder} width="100%" alt="ChatIcon" />
          </MyButton>
          <Engagement>{commentCount}</Engagement>
        </CommentButtonWrapper>
        <br />
        {!openProject && project && projectsData && (
          <>
            <Gradient2></Gradient2>
            <ScreamcardProjectContainerButtonWide
              onClick={() => fetchDataProject(project)}
            >
              {projectsDataFinal}
            </ScreamcardProjectContainerButtonWide>
          </>
        )}
        <ExpandButton
          handleButtonClick={() => fetchDataScream(screamId)}
         />
      </CardContent>
    </Card>
  );
};

IdeaCard.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
  openScream: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
};

export default withStyles(styles)(IdeaCard);
