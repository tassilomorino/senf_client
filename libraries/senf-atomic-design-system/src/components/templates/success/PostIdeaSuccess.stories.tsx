/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import PostIdeaSuccess from "./PostIdeaSuccess";

import { SuccessProps } from "./PostIdeaSuccess.types";

export default {
  title: "Templates/PostIdeaSuccess",
  component: PostIdeaSuccess,
  argTypes: {},
} as Meta<typeof PostIdeaSuccess>;

const Template: Story<SuccessProps> = (args) => <PostIdeaSuccess {...args} />;

export const Default = Template.bind({});

Default.args = {};
