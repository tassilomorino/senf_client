/** @format */
import React from "react";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import withStyles from "@material-ui/core/styles/withStyles";

// MUI Stuff
import Button from "@material-ui/core/Button";
import MainModal from "../Layout/MainModal";

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

const InlineDatePicker = ({ handleChangeCalendar, selectedDays }) => {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="textFields">
      <Calendar
        weekStartDayIndex={1}
        weekDays={["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]}
        months={[
          "Januar",
          "Februar",
          "März",
          "April",
          "Mai",
          "Juni",
          "Juli",
          "August",
          "September",
          "Oktober",
          "November",
          "Dezember",
        ]}
        value={selectedDays}
        onChange={handleChangeCalendar}
        format="D. MMMM HH:mm"
        sort
        shadow={false}
        plugins={[
          <DatePanel
            header="Ausgewählte Daten"
            position="bottom"
            markFocused
          />,
          <TimePicker
            position="right"
            hideSeconds
            format="MMM/DD"
            style={{ minWidth: "100px" }}
          />,
        ]}
      ></Calendar>
    </div>
  );
};

export default InlineDatePicker;
