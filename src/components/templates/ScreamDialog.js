/** @format */

import React, { Fragment, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMapViewport } from "../../redux/actions/mapActions";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import LikeButton from "../module/CustomButtons/LikeButton";
import ChatBorder from "../../images/icons/chat.png";
import Comments from "../module/Comments/Comments";
import CommentForm from "../module/Comments/CommentForm";
import dayjs from "dayjs";
// MUI Stuff

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import CreateIcon from "@material-ui/icons/Create";
import EventIcon from "@material-ui/icons/Event";

import WeblinkIcon from "../../images/icons/weblink.png";

import contactIcon from "../../images/icons/mail.png";

import * as linkify from "linkifyjs";

//MAPSTUFF
import "mapbox-gl/dist/mapbox-gl.css";

// Redux stuff
import { closeScream } from "../../redux/actions/screamActions";
import { openProject } from "../../redux/actions/projectActions";
import { clearErrors } from "../../redux/actions/errorsActions";

//COMPONENTS
import SignNote from "../profile/SignNote";

//ANIMATION
import lamploader from "../../images/lamp.png";

import ScreamShare from "../modals/ScreamShare";

import { isMobileCustom } from "../../util/customDeviceDetect";

import {
  CustomButton,
  CustomIconButton,
} from "../module/CustomButtons/CustomButton";
import setColorByTopic from "../../data/setColorByTopic";
import EditButton from "../module/CustomButtons/EditButton";
import styled from "styled-components";

const BackgroundMobile = styled.div`
  position: absolute;
  margin-top: -10px;
  height: 110%;
  width: 100vw;
  border-radius: 20px 20px 0 0;
  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 100%
  );
  z-index: 99;
  box-shadow: 0 8px 20px 12px rgba(0, 0, 0, 0.1);
`;

const BackgroundDesktop = styled.div`
  position: fixed;
  margin-top: 0px;
  top: 0;
  height: 100%;
  width: 400px;
  border-radius: 0px 0px 0 0;
  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 100%
  );
  z-index: 99;
`;

const Button = styled.button`
  border-radius: 20px;
  text-transform: none;
  font-size: 12pt;
  background-color: white;
  height: 40px;
  font-family: Futura PT W01 Book;
  box-shadow: none;
  padding-right: 15px;
  padding-left: 15px;
  background-color: rgb(254, 217, 87);
  margin-right: 5px;
  box-shadow: rgb(38, 57, 77, 0) 0px 20px 30px -16px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const styles = {
  header: {
    paddingTop: "10px",
    marginLeft: "0vw",
    width: "90%",
    objectFit: "cover",
  },
  user: {
    position: "relative",
    float: "left",
    color: "#353535",
    fontSize: "12pt",
    height: "16px",
  },
  date: {
    position: "relative",
    color: "#353535",
    fontSize: "12pt",
  },

  faceButton: {
    zIndex: 9999,
  },

  expandButton: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "110%",
    height: "110%",
    borderRadius: 0,
    // marginTop: "-20px",
    // marginLeft: "-10px",
    zIndex: 9,
    // backgroundColor: "rgb(0,0,0,0.5)",
  },

  content: {
    width: "95%",
    padding: 15,
    objectFit: "cover",
  },

  line: {
    position: "absolute",
    left: "85%",
    top: "0%",
    width: "1px",
    backgroundColor: "#d5dadd",
    height: "100%",
  },

  horrizontalLine: {
    position: "relative",
    left: "-15px",

    height: "1px",
    backgroundColor: "#d5dadd",
    width: "calc(85% + 25px)",
    marginTop: "20px",
    marginBottom: "10px",
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
    top: "50px",
    textAlign: "center",
  },
  commentButtonWrapper: {
    top: "170px",
    position: "absolute",
    left: "85%",
  },

  title: {
    position: "relative",
    width: "83%",
    color: "rgb(87, 87, 87)",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "Playfair Display",
    clear: "both",
  },
  bodytext: {
    width: "80%",
    fontSize: "19px !important",
    whiteSpace: "pre-line",
  },
  engagement: {
    paddingRight: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    color: "black",
  },

  locationOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",

    height: "25px",
  },
  selectedDatesOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",

    height: "auto",
    paddingBottom: "10px",
  },

  locationIcon: {
    marginTop: "-3px",
    paddingRight: "2px",
    float: "left",
    color: "#353535",
  },
  locationHeader: {
    color: "##353535",
    float: "left",
    paddingRight: "2%",
    width: "100%",
    fontSize: "12pt",
  },

  district: {
    float: "left",
    marginLeft: "10px",
    color: "rgb(255, 205, 6)",
    height: "3vh",
  },

  districtHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "2%",
    width: "100%",
  },

  anmeldeText: {
    fontFamily: "Futura PT W01-Bold",
    fontSize: "14pt",
    color: "#414345",
    width: "95%",
    marginTop: "15px",
    textAlign: "center",
    marginLeft: "2.5%",
    paddingBottom: "15px",
  },

  card2: {
    zIndex: "99",
    position: "relative",
    display: "flex",
    marginTop: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
    borderRadius: 20,
    minHeight: "auto",

    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
  },
  vertline: {
    width: "4px",
    position: "relative",
    backgroundColor: "#414345",
    height: "10px",
    marginLeft: "-2px",
    left: "50%",
    zIndex: "0",
  },
};

const ScreamDialog = ({ classes, projectsData }) => {
  const {
    screamId,
    locationHeader,
    Stadtteil,
    title,
    body,
    createdAt,
    likeCount,
    commentCount,
    lat,
    long,
    userHandle,
    comments,
    Thema,
    project,
    weblink,
    weblinkTitle,
    contact,
    contactTitle,
    selectedUnix,
  } = useSelector((state) => state.data.scream);

  const dispatch = useDispatch();
  const { loading, openScream } = useSelector((state) => state.UI);

  const { authenticated } = useSelector((state) => state.user);

  const [path, setPath] = useState("");
  const [clicked, setClicked] = useState(false);

  const convertedLinkRaw = weblink && linkify.find(weblink);
  const convertedLink =
    weblink && convertedLinkRaw[0] !== undefined && convertedLinkRaw[0].href;

  useEffect(() => {
    if (openScream && lat !== undefined) {
      setTimeout(() => {
        const viewport = {
          latitude: isMobileCustom && openScream ? lat - 0.0008 : lat,
          longitude: long,
          zoom: 16.5,
          transitionDuration: 4000,
          pitch: 30,
          bearing: 0,
        };
        dispatch(setMapViewport(viewport));
      }, 400);

      setPath(`https://senf.koeln/${screamId}`);
    }
  }, [loading]);

  const handleClose = () => {
    dispatch(closeScream());
    dispatch(clearErrors());
  };

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Senf.koeln – ${title}`,
          url: convertedLink,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      // fallback
    }
  };

  const openTheProject = (project) => {
    dispatch(openProject(project));
  };

  const openLink = (convertedLink) => {
    window.open(convertedLink, "_blank");
  };
  const openMail = (contact) => {
    window.location.href = "mailto:" + contact;
  };

  const projectsDataFinal = [];
  if (projectsData) {
    const projectsDataArray = projectsData;

    projectsDataArray.forEach((element) => {
      if (project === element.project) {
        projectsDataFinal.push(element.title);
      }
    });
  }

  const projectTitle = project ? (
    // && project === this.props.projects.project
    <button
      className="screamcardProjectContainer buttonWide "
      onClick={() => openTheProject(project)}
    >
      {projectsDataFinal}
    </button>
  ) : null;

  let selectedDates = [];
  const selectedUnixArray = selectedUnix;
  const options = {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (selectedUnixArray !== undefined && selectedUnixArray !== null) {
    if (selectedUnixArray.length > 0) {
      selectedUnixArray.forEach((element) => {
        selectedDates.push(
          <div>
            {new Date(element * 1000).toLocaleTimeString("de-DE", options)}{" "}
            <br />{" "}
          </div>
        );
      });
    } else {
      selectedDates = (
        <div>
          {new Date(selectedUnix * 1000).toLocaleTimeString("de-DE", options)}{" "}
          <br />{" "}
        </div>
      );
    }
  }

  return (
    <Fragment>
      {!loading ? (
        <React.Fragment>
          <CommentForm screamId={screamId} clicked={clicked} />

          <CustomIconButton
            name="ArrowLeft"
            position="fixed"
            margin="10px"
            top="0px"
            handleButtonClick={handleClose}
          />

          <div className="wrapperScreamDialog">
            {/* <ScreamShare
              screamId={screamId}
              userHandle={userHandle}
              likeCount={3}
              title={title}
              path={path}
              locationHeader={locationHeader}
              Stadtteil={Stadtteil}
              handleUnErrorMap={handleUnErrorMap}
            />*/}
            <CustomIconButton
              name="Share"
              margin="10px"
              left="calc(100% - 130px)"
              position="relative"
              handleButtonClick={handleShare}
            />
            <EditButton screamId={screamId} userHandle={userHandle} />
            {isMobileCustom ? <BackgroundMobile /> : <BackgroundDesktop />}
            <div
              className="dialogCard"
              style={project ? { paddingBottom: "50px", zIndex: 9999 } : {}}
            >
              <div className={classes.content}>
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
                <div className={classes.district}>
                  <div className={classes.districtHeader}> {Stadtteil} </div>
                </div>
                <div className={classes.title}>{title} </div>
                <Typography className={classes.bodytext}>{body}</Typography>
                <div className={classes.line} />
                <div className={classes.likeButtonWrapper}>
                  <div className={classes.likeButton}>
                    <LikeButton screamId={screamId} />
                  </div>
                  <div className={classes.engagement}>{likeCount} </div>
                </div>
                <div className={classes.commentButtonWrapper}>
                  <div className={classes.commentButton}>
                    {!authenticated ? (
                      <MyButton>
                        <SignNote />
                        <img src={ChatBorder} width="100%" alt="ChatIcon" />
                      </MyButton>
                    ) : (
                      <MyButton onClick={() => handleClick()}>
                        <img src={ChatBorder} width="90%" alt="ChatIcon" />
                      </MyButton>
                    )}
                  </div>
                  <div className={classes.engagement}>{commentCount}</div>
                </div>
                <div className={classes.horrizontalLine}></div>
                <div className={classes.header}>
                  {selectedUnixArray !== undefined &&
                    selectedUnixArray !== null && (
                      <div className={classes.selectedDatesOuter}>
                        <EventIcon className={classes.locationIcon} />

                        <div className={classes.locationHeader}>
                          {" "}
                          {selectedDates}{" "}
                        </div>
                      </div>
                    )}
                  <div className={classes.locationOuter}>
                    <LocationOn className={classes.locationIcon} />{" "}
                    <div className={classes.locationHeader}>
                      {" "}
                      {locationHeader}{" "}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "start",
                    }}
                  >
                    <CreateIcon className={classes.locationIcon} />{" "}
                    <Typography
                      // component={Link}
                      // to={`/users/${userHandle}`}
                      className={classes.user}
                    >
                      {userHandle}
                      &nbsp;am&nbsp;
                    </Typography>
                    <Typography className={classes.date}>
                      {dayjs(createdAt).format("DD.MM.YYYY")}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {weblink && (
                      <Button onClick={() => openLink(convertedLink)}>
                        {weblinkTitle}
                        <img
                          src={WeblinkIcon}
                          style={{
                            paddingLeft: "9px",
                            marginTop: "-2px",
                          }}
                          width="15"
                          alt="WeblinkIcon"
                        />
                      </Button>
                    )}

                    {contact && (
                      <Button onClick={() => openMail(contact)}>
                        {contactTitle}
                        <img
                          src={contactIcon}
                          style={{ paddingLeft: "9px" }}
                          width="22"
                          alt="WeblinkIcon"
                        />
                      </Button>
                    )}
                  </div>

                  {projectTitle}
                </div>
              </div>
            </div>
            <div className={classes.vertline} />
            <Card className={classes.card2}>
              <div className={classes.anmeldeText}>
                <span>
                  {" "}
                  Was hältst du von der Idee? <br /> Rege den Meinungsaustausch
                  hier an!
                </span>

                {!authenticated && (
                  <div className={classes.anmeldeText}>
                    <SignNote />
                    <CustomButton
                      text="Melde dich an"
                      backgroundColor="#353535"
                      textColor="white"
                      position="relative"
                      top="10px"
                      zIndex="0"
                    />
                  </div>
                )}
              </div>
            </Card>
            <Comments comments={comments} />
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
          </div>
        </React.Fragment>
      ) : (
        <div className="fullGradientWrapper">
          <div className="spinnerDiv">
            <img src={lamploader} className="lamploader" alt="LikeIcon" />
          </div>
        </div>
      )}
    </Fragment>
  );
};

ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  closeScream: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScreamDialog);
