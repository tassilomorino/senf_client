/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import ErrorLoading from "./ErrorLoading";

import { ErrorLoadingProps } from "./ErrorLoading.types";

export default {
  title: "Pages/WarningPages",
  component: ErrorLoading,
  argTypes: {},
} as Meta<typeof ErrorLoading>;

const ErrorLoadingTemplate: Story<ErrorLoadingProps> = (args) => (
  <ErrorLoading {...args} />
);

export const ErrorLoadingPage = ErrorLoadingTemplate.bind({});
ErrorLoadingPage.args = {
  text: "x",
};
