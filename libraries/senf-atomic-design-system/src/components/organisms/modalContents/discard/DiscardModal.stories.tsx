/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { DiscardModalProps } from "./DiscardModal.types";
import DiscardModal from "./DiscardModal";

export default {
  title: "Organisms/ModalContents/discard/DiscardModal",
  component: DiscardModal,
  argTypes: {},
} as Meta<typeof DiscardModal>;

const Template: Story<DiscardModalProps> = (args) => <DiscardModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  header: "Do you want to end composing idea ?",
};
