/** @format */

import React, { useState, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
  },

  paper: {
    borderRadius: "20px",
    height: "150px",
    width: "90vw",
    maxWidth: "400px",
  },
  confirmButton: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70%",
    clear: "both",
    color: "red",
  },
  line: {
    height: 1,
    width: "100%",

    backgroundColor: "grey",
  },
  cancelButton: {
    fontSize: 20,
    clear: "both",
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "30%",
  },
};

const ReportScream = ({ userHandle, screamId, classes }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const reportScream = () => {
    const thisPath = `/users/${userHandle}/scream/${screamId}`;
    const siteLink = "senf.koeln" + thisPath;

    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Meldung: Beitrag beinhaltet unangebrachten Inhalt ") +
      "&body=" +
      escape(
        "Dieser Beitrag beinhaltet unangebrachten Inhalt:" +
          "\n" +
          "\n" +
          siteLink
      );
    window.location.href = link;
  };

  return (
    <Fragment>
      <MyButton
        tip="Delete Scream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      ></MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        width="md"
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
      >
        <Button className={classes.confirmButton} onClick={reportScream}>
          Melden
        </Button>
        <div className={classes.line} />
        <Button className={classes.cancelButton} onClick={handleClose}>
          Abbrechen
        </Button>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(ReportScream);
