/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import Geocoder from "./Geocoder";

import { GeocoderProps } from "./Geocoder.types";

export default {
  title: "Atom/Geocoder",
  component: Geocoder,
  argTypes: {},
} as Meta<typeof Geocoder>;

const Template: Story<GeocoderProps> = (args) => <Geocoder {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "x",
};
