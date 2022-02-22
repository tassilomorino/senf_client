/** @format */
import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

// MUI Stuff
import Button from "@material-ui/core/Button";
import MainModal from "../../atoms/Layout/MainModal";
import InlineDatePicker from "../../atoms/InlineDatePicker/InlineDatePicker";

const styles = {
  paper: {
    borderRadius: "20px",

    // width: "95%",
    margin: "2.5%",
    maxWidth: "400px",
    width: "95%",
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
  button: {
    fontSize: 20,

    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70px",
  },
};

const InlineDatePickerModal = ({
  classes,
  setCalendarOpen,
  handleChangeCalendar,
  handleCloseCalendar,
  handleSaveCalendar,
  selectedDays,
}) => {
  return (
    <MainModal handleButtonClick={() => setCalendarOpen(false)} zIndex={999}>
      <h3 className="modal_title">Datum hinzufügen:</h3>

      <p style={{ widthh: "100%", textAlign: "center" }}>
        Zuerst Datum, dann Zeit auswählen.
      </p>

      <InlineDatePicker
        handleChangeCalendar={handleChangeCalendar}
        selectedDays={selectedDays}
      />
      <div className="buttons">
        <Button className={classes.button} onClick={handleCloseCalendar}>
          {selectedDays !== [] ? "Löschen" : "Abbrechen"}
        </Button>
        <Button
          className={classes.button}
          onClick={handleSaveCalendar}
          style={
            selectedDays !== [] ? {} : { pointerEvents: "none", opacity: 0.6 }
          }
        >
          Speichern
        </Button>
      </div>
    </MainModal>
  );
};

export default withStyles(styles)(InlineDatePickerModal);
