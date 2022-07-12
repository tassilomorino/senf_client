/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import LanguageSelect from "./LanguageSelect";

import { LanguageSelectProps } from "./LanguageSelect.types";

export default {
  title: "Molecules/LanguageSelect",
  component: LanguageSelect,
  argTypes: {},
} as Meta<typeof LanguageSelect>;

const Template: Story<LanguageSelectProps> = (args) => (
  <LanguageSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "x",
};
