/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import ImageUploadTile from "./ImageUploadTile";

import { ImageUploadTileProps } from "./ImageUploadTile.types";

export default {
  title: "Atoms/ImageUploadTile",
  component: ImageUploadTile,
  argTypes: {},
} as Meta<typeof ImageUploadTile>;

const Template: Story<ImageUploadTileProps> = (args) => <ImageUploadTile {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "x",
};
