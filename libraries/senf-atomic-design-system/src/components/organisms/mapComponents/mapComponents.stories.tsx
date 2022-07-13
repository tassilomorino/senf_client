/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import PostIdeaMap from "./PostIdeaMap";

import { PostIdeaMapProps } from "./PostIdeaMap.types";

export default {
  title: "Organisms/MapComponents",
  component: PostIdeaMap,
  argTypes: {},
} as Meta<typeof PostIdeaMap>;

const Template: Story<PostIdeaMapProps> = (args) => <PostIdeaMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialViewport: { lat: 50.93864020643174, lng: 6.935142517089844, zoom: 10 },
};
