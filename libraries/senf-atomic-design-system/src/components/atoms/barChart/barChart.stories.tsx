/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import { BarChart } from "./barChart";

import { BarChartProps } from "./barChart.types";

export default {
  title: "Atoms/BarChart",
  component: BarChart,
  argTypes: {},
} as Meta<typeof BarChart>;

// Endless loop of parentsize component in storybook makes it look like its animating
const Template: Story<BarChartProps> = (args) => (
  <BarChart dataList={args.dataList} />
);

export const Default = Template.bind({});
Default.args = {
  dataList: [
    { label: "A", value: 0.3 },
    { label: "B", value: 0.3 },
    { label: "C", value: 0.2 },
    { label: "E", value: 0.1 },
    { label: "D", value: 0.05 },
    { label: "F", value: 0.025 },
    { label: "G", value: 0.025 },
  ],
};
