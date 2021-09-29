/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../../util/MyButton";

//TIMESTAMP
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// COMPONENTS
import LikeButton from "../../scream/LikeButton";
import SignNote from "../../profile/SignNote";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// Icons
import ChatBorder from "../../../images/icons/chat.png";

// Redux
import { useSelector, useDispatch } from "react-redux";

import { openScream } from "../../../redux/actions/screamActions";
import { openProject } from "../../../redux/actions/projectActions";
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

  content: {
    padding: 15,
    color: "rgb(87, 87, 87)",
    width: "95%",
    objectFit: "cover",
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

  locationOuter: {
    float: "left",
    marginLeft: "10px",
    color: "rgb(255, 205, 6)",
    height: "3vh",
  },
  locationHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "2%",
    width: "100%",
  },
};

const IdeaCard = ({ classes, projectsData, scream }) => {
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.user);
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

  return (
    <Card
      className={classes.card}
      style={project && projectsData ? { height: "23em" } : {}}
    >
      <CardContent className={classes.content}>
        <div
          style={{
            width: "15px",
            position: "relative",
            height: "15px",
            margintop: "5px",
            borderRadius: "100%",
            border: "0.5px white solid",
            backgroundColor: setColorByTopic(Thema),
            opacity: "1",
            float: "left",
          }}
        />{" "}
        <div className={classes.locationOuter}>
          <div
            className={classes.locationHeader}
            style={{
              color: setColorByTopic(Thema),
            }}
          >
            {Stadtteil}{" "}
          </div>
        </div>
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
        {project && projectsData && (
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
