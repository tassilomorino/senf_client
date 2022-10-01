/** @format */

import React, { FC } from "react";
import styled from "styled-components";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { DatePickerProps } from "./DatePicker.types";

const Wrapper = styled.div<DatePickerProps>`

.rmdp-week-day {
  color: rgb(53, 53, 53, 0.9) !important;
}

.rmdp-arrow {
  border: solid #353535 !important;
  border-width: 0 2px 2px 0 !important
}

.rmdp-arrow-container:hover {
  background-color: rgb(0, 0, 0, 0.2) !important;
  padding: 2px !important;
}

.rmdp-day.rmdp-today span {
  background-color: rgb(53, 53, 53, 0.1) !important;
  color: black !important
}

.rmdp-day.rmdp-selected span:not(.highlight) {
  background-color: #353535 !important;
}

.rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover {
  background-color: rgb(53, 53, 53, 0.2) !important;

}

.rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:active {
  background-color: #353535 !important;

}

.rmdp-panel-body li {
  background-color: rgb(53, 53, 53, 0.9) !important;

}

.rmdp-panel-body li.rmdp-focused {
  background-color: #353535 !important;
}

.rmdp-panel-body span {

  width: 100%;
  text-align: left;
}


`;

const DatePicker: FC<DatePickerProps> = ({
  handleChangeCalendar,
  selectedDays,
}) => {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    <Wrapper>
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
            key="date_panel"
            header="Ausgewählte Daten"
            position="bottom"
            markFocused
          />,
          <TimePicker
            key="time_picker"
            position="right"
            hideSeconds
            format="MMM/DD"
            style={{ minWidth: "100px" }}
          />,
        ]}
      ></Calendar>
    </Wrapper>
  );
};

export default DatePicker;
