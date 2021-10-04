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

const styles = {
  gradient: {
    width: "100%",
    height: "100px",
    position: "absolute",
    bottom: 0,

    background:
      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%)",
  },

  gradient2: {
    width: "80%",
    height: "50px",
    position: "absolute",
    bottom: "50px",

    background:
      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%)",
  },

  line: {
    position: "absolute",
    left: "85%",
    top: "0%",
    width: "1px",
    backgroundColor: "#d5dadd",
    height: "100%",
  },

  likeButton: {
    zIndex: 10,
    position: "relative",
    left: "0%",
    // width: "15vw",
    // height: "15vw",
    top: "10%",
  },
  likeButtonWrapper: {
    zIndex: 10,
    position: "absolute",
    left: "85%",
    // width: "15vw",
    top: "10%",
    textAlign: "center",
  },
  commentButtonWrapper: {
    top: "55%",
    position: "absolute",
    left: "85%",
    zIndex: 0,
  },

  commentButtonWrapperNotAuthenticated: {
    top: "55%",
    position: "absolute",
    left: "85%",
    zIndex: 10,
  },
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    minHeight: "12em",
    width: "95%",
    borderRadius: 20,
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
    maxHeight: "14.5em",
  },

  bodytext: {
    position: "relative",
    width: "85%",
    fontSize: "14pt",
    overflow: "hidden",
    maxHeight: "3.6em",
    textOverflow: "-o-ellipsis-lastline",
  },

  engagement: {
    paddingRight: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    color: "black",
  },
};

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
    height: ${(props) => props.project && "23em" } 
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

  return (
    <Card
      project={!openProject && project && projectsData }
    >
      <CardContent>
      
        <ColorDot/>{" "}
        <LocationOuter>
          <LocationHeader>
            {Stadtteil}
          </LocationHeader>
        </LocationOuter>
        <div className="screamcardTitle">{title} </div>
        <div className="bodytext">{body}</div>
        <div className={classes.gradient}></div>
        <div className={classes.line} />
        <div
          className={classes.likeButtonWrapper}
          style={project && projectsData ? { top: "10px" } : {}}
        >
          <div className={classes.likeButton}>
            <LikeButton screamId={screamId} />
          </div>
          <div className={classes.engagement}>{likeCount} </div>
        </div>
        <div
          className={
            !authenticated
              ? classes.commentButtonWrapperNotAuthenticated
              : classes.commentButtonWrapper
          }
          style={project && projectsData ? { top: "100px" } : {}}
        >
          <div className={classes.commentButton}>
            <MyButton>
              {!authenticated && <SignNote />}
              <img src={ChatBorder} width="100%" alt="ChatIcon" />
            </MyButton>
          </div>
          <div className={classes.engagement}>{commentCount}</div>
        </div>
        <br />
        {!openProject && project && projectsData && (
          <>
            <div className={classes.gradient2}></div>
            <button
              className="screamcardProjectContainer buttonWide "
              onClick={() => fetchDataProject(project)}
            >
              {projectsDataFinal}
            </button>
          </>
        )}
        <button
          onClick={() => fetchDataScream(screamId)}
          className="buttonExpand ripple"
        ></button>
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
