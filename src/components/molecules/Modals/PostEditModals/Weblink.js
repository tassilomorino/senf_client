/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

// REDUX Stuff
import { connect } from "react-redux";

import WeblinkIcon from "../../../../images/icons/world-wide-web-on-grid.png";
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

class Weblink extends Component {
  render() {
    const {
      classes,
      weblink,
      weblinkTitle,
      handleChange,
      openWeblink,
      handleOpenWeblink,
      handleCloseWeblink,
      handleSaveWeblink,
    } = this.props;

    return (
      <Fragment>
        <div
          onClick={handleOpenWeblink}
          className="buttonRound buttonWeblink"
          style={
            weblink !== null && weblinkTitle !== null
              ? { backgroundColor: "#fed957" }
              : {}
          }
        >
          <img src={WeblinkIcon} width="35" alt="AddIcon" />
        </div>
        <Dialog
          open={openWeblink}
          onClose={handleCloseWeblink}
          width="md"
          BackdropProps={{ classes: { root: classes.root } }}
          PaperProps={{ classes: { root: classes.paper } }}
        >
          <h3 className="modal_title">Link hinzufügen</h3>
          <div className="textFields">
            <TextField
              id="weblinkTitle"
              name="weblinkTitle"
              type="text"
              label="Link-Titel"
              placeholder="Mehr Infos, Programm o.ä."
              margin="normal"
              color="transparent"
              variant="outlined"
              className="textField"
              value={weblinkTitle}
              onChange={handleChange}
              style={{ marginTop: "5px", marginBottom: "5px" }}
            ></TextField>
            <TextField
              id="weblink"
              name="weblink"
              type="text"
              label="Link "
              placeholder="https://www..."
              margin="normal"
              color="transparent"
              variant="outlined"
              className="textField"
              value={weblink}
              onChange={handleChange}
              style={{ marginTop: "5px", marginBottom: "5px" }}
            ></TextField>
          </div>

          <div className="buttons">
            <Button className={classes.button} onClick={handleCloseWeblink}>
              {weblink !== null && weblinkTitle !== null
                ? "Löschen"
                : "Abbrechen"}
            </Button>
            <Button
              className={classes.button}
              onClick={handleSaveWeblink}
              style={
                weblink !== null && weblinkTitle !== null
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

Weblink.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Weblink));
