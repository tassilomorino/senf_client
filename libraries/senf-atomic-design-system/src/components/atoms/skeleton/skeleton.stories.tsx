/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import Skeleton from "./Skeleton";

import { SkeletonProps } from "./Skeleton.types";

export default {
  title: "Atom/Skeleton",
  component: Skeleton,
  argTypes: {},
} as Meta<typeof Skeleton>;

const Template: Story<SkeletonProps> = (args) => <Skeleton {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 4,
  height: "20px",
};
