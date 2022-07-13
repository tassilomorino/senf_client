/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import Map from "./Map";

import { MapProps } from "./Map.types";

export default {
  title: "Atom/Map",
  component: Map,
  argTypes: {},
} as Meta<typeof Map>;

const Template: Story<MapProps> = (args) => <Map {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialViewport: { lat: 50.93864020643174, lng: 6.935142517089844, zoom: 10 },
};
