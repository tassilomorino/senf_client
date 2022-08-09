/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";
import Button from "./Button";
import { ButtonProps } from "./Button.types";
import { Room } from "../../../assets/icons";

export default {
  title: "Atom/Button",
  component: Button,
  argTypes: {},
} as Meta<typeof Button>;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const IconBig = Template.bind({});
IconBig.args = {
  icon: <Room />,
  variant: "primary",
};

export const IconMedium = Template.bind({});
IconMedium.args = {
  icon: <Room />,
  variant: "primary",
  size: "medium"
};

export const IconSmall = Template.bind({});
IconSmall.args = {
  icon: <Room />,
  variant: "primary",
  size: "small"
};


export const Big = Template.bind({});
Big.args = {
  icon: <Room />,
  variant: "primary",
  text: "Button",
};

export const Medium = Template.bind({});
Medium.args = {
  icon: <Room />,
  variant: "primary",
  text: "Button",
  size: "medium"
};

export const Small = Template.bind({});
Small.args = {
  icon: <Room />,
  variant: "primary",
  text: "Button",
  size: "small"
};


export const SecondaryBig = Template.bind({});
SecondaryBig.args = {
  icon: <Room />,
  variant: "secondary",
  text: "Button",
};

export const TertiaryBig = Template.bind({});
TertiaryBig.args = {
  icon: <Room />,
  variant: "tertiary",
  text: "Button",
};

// export const Primary = Template.bind({});
// Primary.args = {
//   variant: "primary",
//   text: "Primary",
// };

// export const PrimaryWhite = Template.bind({});
// PrimaryWhite.args = {
//   variant: "white",
//   text: "Primary White",
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   variant: "secondary",

//   text: "Secondary",
// };

// export const SecondaryDashed = Template.bind({});
// SecondaryDashed.args = {
//   variant: "secondary",
//   borderStyle: "dashed",
//   text: "Secondary",
// };

// export const Disabled = Template.bind({});
// Disabled.args = {
//   disabled: true,
//   text: "Disabled",
// };

// export const Loading = Template.bind({});
// Loading.args = {
//   loading: true,
// };

// export const Icon = Template.bind({});
// Icon.args = {
//   icon: "bulb",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   text: "Small",
// };

// export const SmallIcon = Template.bind({});
// SmallIcon.args = {
//   icon: "check",
//   size: "small",
//   text: "Small",
// };
