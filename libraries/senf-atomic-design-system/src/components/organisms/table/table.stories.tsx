/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";
import Box from "../../atoms/box/Box";
import ImagePlaceholder from "../../atoms/imagePlaceholder/ImagePlaceholder";
import Typography from "../../atoms/typography/Typography"
import Button from "../../atoms/buttons/Button";

import Table from "./Table";

import { TableProps } from "./Table.types";

export default {
  title: "Organisms/Table",
  component: Table,
  argTypes: {},
} as Meta<typeof Table>;

const Template: Story<TableProps> = (args) => <Table {...args} />;


export const Default = Template.bind({});
Default.args = {
  data: [
    {
      handle: "@senf",
      name: "Senf",
      email: "email@senf.koeln",
      role: "Admin",
      division: "Division",
    }
  ],
  children: (row) => (
    <>
      <Box gap="16px">
        <ImagePlaceholder
          width="64px"
          height="64px"
          img="#"
        />
        <Box flexDirection="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h3">{row.handle}</Typography>
          { row?.email && <Typography variant="bodySm">{row.email}</Typography> }
        </Box>
      </Box>
      <Typography variant="bodySm">{row.division}</Typography>
      <Typography variant="bodySm">{row.role}</Typography>
      <Button
        variant="white"
        text="Delete"
      />
    </>
  ),
  columns: [
    'Column 1',
    'Column 2',
    'Column 3',
    'Column 4',
  ],
  checkbox: true,
};
