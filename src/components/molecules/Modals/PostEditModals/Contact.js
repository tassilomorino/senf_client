/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

// REDUX Stuff
import { connect } from "react-redux";

import MailIcon from "../../../../images/icons/mail.png";
import { TextField } from "@material-ui/core";

const styles = {
  paper: {
    borderRadius: "20px",

    // width: "95%",
    margin: "2.5%",
    maxWidth: "400px",
  },

  button: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70px",
  },
};

class Contact extends Component {
  render() {
    const {
      classes,
      contact,
      contactTitle,
      handleChange,
      openContact,
      handleOpenContact,
      handleCloseContact,
      handleSaveContact,
    } = this.props;

    return (
      <Fragment>
        <div
          onClick={handleOpenContact}
          className="buttonRound buttonContact"
          style={
            contact !== null && contactTitle !== null
              ? { backgroundColor: "#fed957" }
              : {}
          }
        >
          <img src={MailIcon} width="35" alt="AddIcon" />
        </div>
        <Dialog
          open={openContact}
          onClose={handleCloseContact}
          width="md"
          BackdropProps={{ classes: { root: classes.root } }}
          PaperProps={{ classes: { root: classes.paper } }}
        >
          <h3 className="modal_title">Kontaktdaten öffentlich zeigen</h3>
          <div className="textFields">
            <TextField
              id="contactTitle"
              name="contactTitle"
              type="text"
              label="Kontakt-Titel"
              placeholder="Mach mit, Kontakt o.ä."
              margin="normal"
              color="transparent"
              variant="outlined"
              className="textField"
              value={contactTitle}
              onChange={handleChange}
              style={{ marginTop: "5px", marginBottom: "5px" }}
            ></TextField>
            <TextField
              id="contact"
              name="contact"
              type="text"
              label="Kontaktdaten "
              placeholder="max@mail.de"
              margin="normal"
              color="transparent"
              variant="outlined"
              className="textField"
              value={contact}
              onChange={handleChange}
              style={{ marginTop: "5px", marginBottom: "5px" }}
            ></TextField>
          </div>

          <div className="buttons">
            <Button className={classes.button} onClick={handleCloseContact}>
              {contact !== null && contactTitle !== null
                ? "Löschen"
                : "Abbrechen"}
            </Button>
            <Button
              className={classes.button}
              onClick={handleSaveContact}
              style={
                contact !== null && contactTitle !== null
                  ? {}
                  : { pointerEvents: "none", opacity: 0.6 }
              }
            >
              Speichern
            </Button>
          </div>
        </Dialog>
      </Fragment>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Contact));
