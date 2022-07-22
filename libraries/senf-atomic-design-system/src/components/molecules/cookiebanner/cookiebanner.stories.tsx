/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import Cookiebanner from "./Cookiebanner";

import { CookiebannerProps } from "./Cookiebanner.types";

export default {
  title: "Molecules/Cookiebanner",
  component: Cookiebanner,
  argTypes: {},
} as Meta<typeof Cookiebanner>;

const Template: Story<CookiebannerProps> = (args) => <Cookiebanner {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "x",
};
