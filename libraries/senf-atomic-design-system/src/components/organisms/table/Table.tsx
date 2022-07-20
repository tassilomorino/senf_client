/* eslint-disable react/display-name */
/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import Typography from "../../atoms/typography/Typography";
import TableRow from "./TableRow";
import { TableProps } from "./Table.types";

const TableWrapper = styled.table<TableProps>`
  --border: 2px solid ${({ theme }) => theme.colors.greyscale.greyscale35tra};
  --radius: ${({ theme }) => theme.radii[1]}px};
  border: var(--border);
  border-radius: var(--radius);
  border-spacing: 0;
  thead {
    td {
      background-color: ${({ theme }) => theme.colors.beige.beige10};
      padding-block: ${({ theme }) => theme.space[5]};
      &:first-child {
        border-top-left-radius: var(--radius);
      }
      &:last-child {
        border-top-right-radius: var(--radius);
      }
    }
    &:last-child {
      td:first-child {
        border-bottom-left-radius: var(--radius);
      }
      td:last-child {
        border-bottom-right-radius: var(--radius);
      }
    }
  }
  tbody td, tr + tr td {
    border-top: var(--border);
  }
  td {
    white-space: nowrap;
  }
`;
const Table: FC<TableProps> = ({data, columns, children, checkbox}) => {
  const header = columns && [...columns];
  return (
    <TableWrapper>
      { header &&
        <thead><TableRow checkbox={checkbox}>{header.map(col => <Typography key="col" variant="buttonBg">{col}</Typography>)}</TableRow></thead>
      }
      { data?.length > 0 && typeof children === 'function' &&
        <tbody>
          {data.map((item, key) => (
            <TableRow key={key} checkbox={checkbox}>{children(item).props.children}</TableRow>
          ))}
          </tbody>
      }
    </TableWrapper>
  );
};

export default Table;
