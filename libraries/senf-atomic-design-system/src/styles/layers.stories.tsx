/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { useState } from "@storybook/addons";

import styled from "styled-components";
import { type } from "os";
import Typography from "../components/atoms/typography/Typography";
import Box from "../components/atoms/box/Box";
import theme from "./theme";
import layers, {BaseLayerProps} from "./layers";


export default {
  title: "Theme/Layers",
  component: layers,
  argTypes: {
    interactive: {
      control: "boolean",
    },
    activatable: {
      control: "boolean",
      if: { arg: 'interactive', truthy: true },
    },
    border: {
      options: ["light", "dark"],
      control: { type: "inline-radio" },
      if: { arg: 'type', eq: "primary" },
    },
    lightness: {
      options: ["light", "medium", "dark"],
      control: { type: "inline-radio" },
      if: { arg: 'type', eq: "white" },
    },
    color: {
      options: ["alert", "warning", "success", "info", "shade", "grey", "white"],
      control: { type: "inline-radio" },
      if: { arg: 'type', eq: "transparent" },
    }

  },
} as Meta<typeof layers>;


const Layer = styled.button<BaseLayerProps>`
  ${(props: BaseLayerProps) => theme.layers(props)}
  border-radius: 10px;
  color: ${() => theme.colors.palette.text};
  padding: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Template: Story = (args) => {
  return (
    <Box gap="30px" flexDirection="column" padding="30px">
      {args.type &&
        <Typography variant="h1">{args.type.charAt(0).toUpperCase() + args.type.slice(1)}</Typography>
      }
      <Layer {...args}>{args.text}</Layer>
    </Box>
  );
};


export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
  text: "Primary",
  border: "light",
  interactive: true,
  activatable: true,
} as BaseLayerProps;

export const White = Template.bind({});
White.args = {
  type: "white",
  text: "White",
  lightness: "light",
  border: "light",
  interactive: true,
  activatable: true,
} as BaseLayerProps;

export const Invisible = Template.bind({});
Invisible.args = {
  type: "invisible",
  text: "Invisible",
  interactive: true,
  activatable: true,
} as BaseLayerProps;

export const Transparent = Template.bind({});
Transparent.args = {
  type: "transparent",
  text: "Transparent",
  color: "shade",
  interactive: true,
  activatable: true,
} as BaseLayerProps;

const controls = { include: ['border', "text", "lightness", "color", "interactive", "activatable"]}
Primary.parameters = { controls };
White.parameters = { controls };
Invisible.parameters = { controls };
Transparent.parameters = { controls };