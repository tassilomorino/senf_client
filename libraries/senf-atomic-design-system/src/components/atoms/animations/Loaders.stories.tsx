/** @format */
import React from "react";
import { Story, Meta } from "@storybook/react";
import Loader from "./Loader";
import MainLoader from "./MainLoader";
import { LoaderProps } from "./Loader.types";

export default {
  title: "Atom/Loaders",
  component: Loader,
} as Meta<typeof Loader>;

const DotLoaderTemplate: Story<LoaderProps> = (args) => <Loader {...args} />;

export const DotLoaderAnimation = DotLoaderTemplate.bind({});
DotLoaderAnimation.args = {
  loading: true,
  width: "200px",
  height: "200px",
};

const MainLoaderTemplate: Story<LoaderProps> = (args) => (
  <MainLoader {...args} />
);

export const MainLoaderAnimation = MainLoaderTemplate.bind({});
MainLoaderAnimation.args = {
  loading: true,
  width: "200px",
  height: "200px",
};
