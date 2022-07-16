/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import DatePicker from "./DatePicker";

import { DatePickerProps } from "./DatePicker.types";

export default {
  title: "Organisms/DatePicker",
  component: DatePicker,
  argTypes: {},
} as Meta<typeof DatePicker>;

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "x",
};
