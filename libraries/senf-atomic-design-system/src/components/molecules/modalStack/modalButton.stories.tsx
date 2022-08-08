/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import ModalButton from "./ModalButton";
import Box from "../../atoms/box/Box";

export default {
  title: "Molecules/ModalButton",
  component: ModalButton,
  argTypes: {},
} as Meta<typeof SwipeModal>;

const Template: Story<SwipeModalProps> = (args) => <ModalButton {...args} style={{ margin: "20px" }} />;

export const Default = Template.bind({});
Default.args = {
  text: "Open Modal",
  variant: "primary",
  options: {
    title: "Modal Title",
    descrition: "Modal Description",
    onSubmit: () => alert("submited"),
    submitText: "Add Member",
    cancelText: "Cancel",
  },

  children: (
    <p>
      Content of a Default Modal
    </p>
  ),
};
export const Stack = Template.bind({});
Stack.args = {
  text: "Open Modal Stack",
  variant: "primary",
  options: {
    title: "Modal Title",
    description: "Modal Description",
  },

  children: (
    <Box display="flex" flexDirection="column" gap="10px">
      <ModalButton text="Open second Modal" options={{
        title: "Modal Title",
        description: "Modal Description",
        onSubmit: () => alert("submited"),
        submitText: "Add Member",
        cancelText: "Cancel",
        size: "lg"
      }}>
        <ModalButton text="Open third Modal" options={{
          swipe: true,
          title: "Swipeeee Modal",
          description: "Modal Description",
          onSubmit: (e) => console.log("success", e),
          submitText: "Add Member",
          cancelText: "Cancel",
        }}>
          Content of a deeply nested modal
        </ModalButton>
      </ModalButton>
    </Box>
  ),
};

export const Swipe = Template.bind({});
Swipe.args = {
  text: "Open Swipe Modal",
  variant: "primary",
  options: {
    swipe: true,
    title: "Modal Title",
    descrition: "Modal Description",
    onSubmit: () => alert("submitted"),
    submitDisabled: true,
    submitText: "Add Member",
    cancelText: "Cancel",
  },

  children: (
    <p>
      Content of a Swipe Modal
    </p>
  ),
};

export const Sized = Template.bind({});
Sized.args = {
  text: "Open default modal",
  options: {
    title: "Default Modal",
  },
  children: (
    <Box display="flex" flexDirection="column" gap="10px" width="100%">
      <ModalButton text="Open small modal" options={{
        size: "sm",
        title: "Small Modal",
      }} />
      <ModalButton text="Open medium modal (default)" options={{
        size: "md",
        title: "Medium Modal (default)",
      }} />
      <ModalButton text="Open large modal" options={{
        size: "lg",
        title: "Large Modal",
      }} />
      <ModalButton text="Open extra large modal" options={{
        size: "xl",
        title: "Extra Large Modal",
      }} />
      <ModalButton text="Open full size modal" options={{
        size: "full",
        title: "Full Size Modal",
      }} />
    </Box>
  ),
};
