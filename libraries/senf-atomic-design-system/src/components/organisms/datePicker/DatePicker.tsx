/** @format */

import React, { FC } from "react";
import styled from "styled-components";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { DatePickerProps } from "./DatePicker.types";

const Wrapper = styled.div<DatePickerProps>``;

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
    </Wrapper>
  );
};

export default DatePicker;
