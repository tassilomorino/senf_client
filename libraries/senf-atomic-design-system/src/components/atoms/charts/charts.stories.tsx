/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import SimpleBarChart from "./SimpleBarChart";

import { ChartsProps } from "./Charts.types";

export default {
  title: "Atom/Charts",
  component: SimpleBarChart,
  argTypes: {},
} as Meta<typeof SimpleBarChart>;

const Template: Story<ChartsProps> = (args) => <SimpleBarChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  direction: 'horizontal',
  data: [
    {
      name: 'Neustadt-Nord',
      rad: 4000,
      verkehr: 2400,
      key3: 2400,
    },
    {
      name: 'Page B',
      rad: 3000,
      verkehr: 1398,
      key3: 2210,
    },
    {
      name: 'Page C',
      rad: 2000,
      verkehr: 9800,
      key3: 2290,
    },
    {
      name: 'Page D',
      rad: 2780,
      verkehr: 3908,
      key3: 2000,
    },
    {
      name: 'Page E',
      rad: 1890,
      verkehr: 4800,
      key3: 2181,
    },
    {
      name: 'Page F',
      rad: 2390,
      verkehr: 3800,
      key3: 2500,
    },
    {
      name: 'Page G',
      rad: 3490,
      verkehr: 4300,
      key3: 2100,
    },
  ],
};
