/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import ActionModal from "./ActionModal";

import { ActionModalProps } from "./ActionModal.types";

export default {
  title: "Organisms/ActionModal",
  component: ActionModal,
  argTypes: {},
} as Meta<typeof ActionModal>;

const Template: Story<ActionModalProps> = (args) => <ActionModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "x",
};
