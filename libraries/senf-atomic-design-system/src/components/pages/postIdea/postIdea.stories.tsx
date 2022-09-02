/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import PostIdeaForm from "./PostIdeaForm";

import { PostIdeaFormProps } from "./PostIdeaForm.types";

export default {
  title: "Pages/PostIdeaForm",
  component: PostIdeaForm,
  argTypes: {},
} as Meta<typeof PostIdeaForm>;

const Template: Story<PostIdeaFormProps> = (args) => <PostIdeaForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "x",
};
