/** @format */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { isMobileCustom } from "../../util/customDeviceDetect";

// Redux stuff
import { connect } from "react-redux";
import { clearErrors } from "../../redux/actions/errorsActions";

import firebase from "firebase/app";
import "firebase/firestore";

//Components

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import IdeaList from "../templates/IdeaList";
import AccountHeader from "./AccountHeader";

import styled from "styled-components";
import AccountSettings from "./AccountSettings";

const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  root: {
    backgroundColor: "transparent",
    padding: "0",
  },

  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    // overflow: "hidden",
    padding: "0",
  },

  closeButton: {
    position: "relative",
    height: "35px",
    width: "35px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
    borderRadius: "100%",
    backgroundColor: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
  },
  header: {
    paddingTop: "10px",
    marginLeft: "0vw",
    width: "90%",
    objectFit: "cover",
  },
  user: {
    position: "relative",
    float: "left",
    color: "#414345",
    fontSize: "12pt",
  },
  date: {
    position: "relative",
    width: "80vw",
    color: "#414345",
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
    width: "100%",
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
    width: "95%",
    color: "#353535",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: "18px",
    fontWeight: 500,
    fontFamily: "Futura PT W01-Bold",
    clear: "both",
  },
  bodytext: {
    width: "95%",
    fontSize: "14pt",
    textAlign: "center",
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
    color: "rgb(255, 205, 6)",
    height: "3vh",
  },
  locationHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "2%",
    width: "100%",
  },
  locationIcon: {
    marginTop: "-3px",
    paddingRight: "2px",
    float: "left",
    color: "rgb(255, 205, 6)",
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

  commentHeader: {
    fontFamily: "Futura PT W01-Bold",
    marginLeft: "5vw",
    paddingTop: "1em",
    paddingBottom: "1em",
    color: "#414345",
  },
  KontaktButton: {
    position: "absolute",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    top: "265vh",
    borderRadius: "100px",
    color: "#414345",
    backgroundColor: "white",
    textTransform: "none",
    fontSize: "14pt",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
  },

  mapPlaceholder: {
    position: "relative",
    width: "100vw",
    zIndex: 0,
    height: "52vh",
    backgroundColor: "lightgrey",
    overflow: "hidden",
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
    left: "50vw",
    zIndex: "0",
  },
};

class Account extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    open: false,
    myScreams: [],
    order: 1,
    dropdown: "newest",
    dialogStyle: {},
  };

  handleOpen = () => {
    const userHandle = this.props.user.credentials.handle;

    this.fetchMyScreams(userHandle);

    setTimeout(() => {
      this.setState({
        open: true,
      });
    }, 500);
    setTimeout(() => {
      this.setState({
        dialogStyle: { position: "initial" },
      });
    }, 2000);
  };

  fetchMyScreams = async (userHandle) => {
    if (userHandle !== undefined) {
      const db = firebase.firestore();
      const ref = await db
        .collection("screams")
        .where("userHandle", "==", userHandle)
        .orderBy("createdAt", "desc")
        .get();

      const screams = [];
      ref.docs.forEach((doc) => {
        const docData = {
          screamId: doc.id,
          lat: doc.data().lat,
          long: doc.data().long,
          title: doc.data().title,
          body: doc.data().body.substr(0, 170),
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          status: doc.data().status,
          Thema: doc.data().Thema,
          Stadtteil: doc.data().Stadtteil,
          project: doc.data().project,
          projectId: doc.data().project,
        };

        screams.push(docData);
        this.setState({ myScreams: screams });
      });
    }
  };

  handleClose = () => {
    window.history.pushState(null, null, `/`);
    this.setState({ open: false });

    setTimeout(() => {
      this.setState({
        dialogStyle: {},
      });
    }, 2000);

    this.props.clearErrors();
  };

  onSwipeMove(position) {
    if (`${position.x}` > 150) {
      this.handleClose();
    }
    var el = document.querySelector(".wrapperScreamDialog");
    if (el.scrollTop < 5) {
      if (`${position.y}` > 250) {
        this.handleClose();
      }
    }
  }

  handleClick = (order) => {
    this.setState({
      order,
    });
  };

  handleDropdown = (value) => {
    this.setState({
      dropdown: value,
    });
  };

  render() {
    const {
      classes,

      handleTopicSelector,
      topicsSelected,

      user: {
        credentials: { handle },
      },
    } = this.props;

    const { loadingMyScreams, mapViewport } = this.props.data;

    const dialogMarkup = (
      <div className="wrapperScreamDialog">
        <AccountHeader
          handle={handle}
          loading={loadingMyScreams}
          order={this.state.order}
          handleClose={this.handleClose}
          handleClick={this.handleClick}
        />

        {this.state.order === 1 && (
          <div className="MainAnimationChannels">
            {!loadingMyScreams && this.state.open && (
              <IdeaList
                loading={loadingMyScreams}
                order={this.state.order}
                classes={classes}
                dataFinal={this.state.myScreams}
                viewport={mapViewport}
                handleDropdown={this.handleDropdown}
                dropdown={this.state.dropdown}
                handleTopicSelector={handleTopicSelector}
                topicsSelected={topicsSelected}
              ></IdeaList>
            )}
          </div>
        )}

        {this.state.order === 2 && (
          <React.Fragment>
            {isMobileCustom && <Break />}
            <div className="MainAnimationChannels">
              <AccountSettings />
            </div>
          </React.Fragment>
        )}
      </div>
    );

    return (
      <Fragment>
        <button
          onClick={this.handleOpen}
          className="buttonExpand ripple"
          data-cy="profile-button"
        ></button>

        {!this.props.UI.openInfoPage &&
          (isMobileCustom ? (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={Transition}
              fullScreen
            >
              {dialogMarkup}
            </Dialog>
          ) : (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              BackdropProps={{ classes: { root: classes.root } }}
              PaperProps={{ classes: { root: classes.paper } }}
              TransitionComponent={Transition}
              fullScreen
              hideBackdrop // Disable the backdrop color/image
              disableEnforceFocus // Let the user focus on elements outside the dialog
              style={this.state.dialogStyle} // This was the key point, reset the position of the dialog, so the user can interact with other elements
              disableBackdropClick // Remove the backdrop click (just to be sure)
            >
              <div className="contentWrapper_dialog">{dialogMarkup}</div>
            </Dialog>
          ))}
      </Fragment>
    );
  }
}

Account.propTypes = {
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  data: state.data,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Account));
