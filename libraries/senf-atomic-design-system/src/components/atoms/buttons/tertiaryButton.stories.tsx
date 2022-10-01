/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";
import TertiaryButton from "./TertiaryButton";
import { TertiaryButtonProps } from "./TertiaryButton.types";
import { Arrow } from "../../../assets/icons";

export default {
  title: "Atom/TertiaryButton",
  component: TertiaryButton,
  argTypes: {},
} as Meta<typeof TertiaryButton>;

const Template: Story<TertiaryButtonProps> = (args) => (
  <TertiaryButton {...args} />
);

export const IconPure = Template.bind({});
IconPure.args = {
  iconLeft: <Arrow />,
  iconLeftTransform: "rotate(90) scale(0.7)",
};

export const IconLeft = Template.bind({});
IconLeft.args = {
  iconLeft: <Arrow />,
  iconLeftTransform: "scale(0.7)",
  text: "Teriary Button",
};

export const IconRight = Template.bind({});
IconRight.args = {
  iconRight: <Arrow />,
  iconRightTransform: "scale(0.7)",
  text: "Teriary Button",
};

export const TextPure = Template.bind({});
TextPure.args = {
  text: "Teriary Button",
};
