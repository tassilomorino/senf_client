/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import Celebrate from "../../images/celebrateImage.png";

import { connect } from "react-redux";

import Thx from "./../../images/headlines/thx.png";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "0%",
    top: "15%",
    width: "100%",
    height: "70%",
  },
  root: {
    backgroundColor: "rgb(255,255,255,0.1)",
    backgroundImage:
      "linear-gradient(to bottom, rgba(255,209,155,0.9), rgba(255,218,83,0.9), #ffffff)",
    backgroundRepeat: "no-repeat",
  },

  paper: {
    borderRadius: "20px",
    height: "100vh",
    boxShadow: "none",
    backgroundColor: "transparent",
    margin: "0",
  },

  cancelButton: {
    fontFamily: "Playfair Display",
    fontSize: "13vw",
    clear: "both",
    textAlign: "center",
    textTransform: "none",
    width: "95vw",
    maxWidth: "600px",
    marginTop: "0vh",
    height: "100%",
    color: "white",
  },
};

class WishNote extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
    setTimeout(
      function () {
        this.setState({ open: false });
      }.bind(this),
      2000
    );
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        ></MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          width="md"
          BackdropProps={{ classes: { root: classes.root } }}
          PaperProps={{ classes: { root: classes.paper } }}
        >
          <div className={classes.cancelButton} onClick={this.handleClose}>
            <div className="Wishanimation">
              <img src={Thx} style={{ width: "70%" }} alt="EndImage" />

              {/* <i> Danke für deine Stimme</i> */}
            </div>
            <img src={Celebrate} className="Celebrate" alt="EndImage" />
          </div>
        </Dialog>
      </Fragment>
    );
  }
}

WishNote.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, {})(withStyles(styles)(WishNote));
