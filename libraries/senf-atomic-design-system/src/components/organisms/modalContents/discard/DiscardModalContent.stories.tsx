/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { DiscardModalContentProps } from "./DiscardModalContent.types";
import DiscardModalContent from "./DiscardModalContent";

export default {
  title: "Organisms/ModalContents/discard/DiscardModalContent",
  component: DiscardModalContent,
  argTypes: {},
} as Meta<typeof DiscardModalContent>;

const Template: Story<DiscardModalContentProps> = (args) => (
  <DiscardModalContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  header: "Do you want to end composing idea ?",
};
