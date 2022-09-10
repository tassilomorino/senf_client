/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import Avatar from "./Avatar";

import { AvatarProps } from "./Avatar.types";

export default {
  title: "Atom/Avatar",
  component: Avatar,
  argTypes: {},
} as Meta<typeof Avatar>;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "T"
};

export const WithImg = Template.bind({});
WithImg.args = {
  img:
    "https://firebasestorage.googleapis.com/v0/b/senf-prod.appspot.com/o/organizationsData%2FXaZl7rCTh5PVQKE4hQvj%2FRHeBEXczxNIE5RsF4JG9%2Fthumbnail?alt=media&token=889689e4-7fad-484c-a343-7ddf45b5cc39",

};

