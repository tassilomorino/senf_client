/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import EditIdea from "./EditIdea";

import { EditIdeaProps } from "./EditIdea.types";

export default {
  title: "Templates/EditIdea",
  component: EditIdea,
  argTypes: {},
} as Meta<typeof EditIdea>;

const Template: Story<EditIdeaProps> = (args) => <EditIdea {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "x",
};
