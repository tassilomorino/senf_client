/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import EditIdeaPage from "./EditIdeaPage";

import { EditIdeaPageProps } from "./EditIdeaPage.types";

export default {
  title: "Pages/EditIdeaPage",
  component: EditIdeaPage,
  argTypes: {},
} as Meta<typeof EditIdeaPage>;

const Template: Story<EditIdeaPageProps> = (args) => <EditIdeaPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "x",
};
