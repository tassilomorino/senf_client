/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import SubNavbar from "./SubNavbar";

import { SubNavbarProps } from "./SubNavbar.types";

export default {
  title: "Molecules/SubNavbar",
  component: SubNavbar,
  argTypes: {},
} as Meta<typeof SubNavbar>;

const Template: Story<SubNavbarProps> = (args) => <SubNavbar {...args} />;

export const FAQ = Template.bind({});
FAQ.args = {
  header: "FAQ",
  leadingIcon: "Arrow",
};

export const Organisationen = Template.bind({});
Organisationen.args = {
  header: "Organisationen",
  leadingIcon: "ArrowDown",
  textLeft: "zurück",
};

export const PageAllFunctions = Template.bind({});
PageAllFunctions.args = {
  header: "Page with all Functions",
  leadingIcon: "Arrow",
  textLeft: "zurück",

  trailingIcon: "ArrowDown",
  textRight: "weiter",
};
