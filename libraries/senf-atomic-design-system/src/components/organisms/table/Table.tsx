/* eslint-disable react/display-name */
/** @format */

import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import orderBy from "lodash/orderBy";
import Typography from "../../atoms/typography/Typography";
import TableRow from "./TableRow";
import { TableProps } from "./Table.types";
import Box from "../../atoms/box/Box";
import Icon from "../../atoms/icons/Icon";
import Sort from "../../../assets/icons/Sort";
import theme from "../../../styles/theme";

const TableContainer = styled.div`
  overflow-x: auto;
  max-width: 100%;
  `
const TableWrapper = styled.table<TableProps>`
  --border: 2px solid ${({ theme }) => theme.colors.greyscale.greyscale35tra};
  --radius: ${({ theme }) => theme.radii[1]}px};
  --padding: ${({ theme }) => theme.space[3]};
  width: 100%;
  box-sizing: border-box;
  border-radius: var(--radius);
  border-spacing: 0;
  border: var(--border);
  thead {
    position: sticky;
    top: 0;
    z-index: 99;
    td {
      background-color: ${({ theme }) => theme.colors.beige.beige10};
      padding-block: var(--padding);
      border-bottom: var(--border);
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
  tbody {
    position: relative;
    z-index: 0;
  }
  tr + tr td {
    border-top: var(--border);
  }
  td {
    white-space: nowrap;
    padding: var(--padding);
    &:last-child {
      width: 0;
      column-span: all;
      & > * {
        margin-left: auto;
      }
    }
  }

  @media (min-width: 768px) {
    --padding: ${({ theme }) => theme.space[4]};
  }
`;
const Table: FC<TableProps> = ({ data, template, columns, children, checkbox, bulkEdit }) => {
  const [checked, setChecked] = useState([]);
  const [sortedData, setSortedData] = useState(null)
  const [sortKey, setSortKey] = useState(null)
  const [sortDirection, setSortDirection] = useState(true)
  const cols = columns
  // this is how the thead is populated using the template...
  // const cols = template().map(e => e.header)
  const header = cols && (checked.length > 0 ? [bulkEdit, ...cols.slice(1)] : [...cols]);
  const allChecked = checked.length === 0 ? false : data.every(item => checked.includes(item[checkbox])) ? true : 'indeterminate';
  const handleCheck = (checkboxId, value) => {
    setChecked(value ? [...checked, checkboxId] : checked.filter(item => item !== checkboxId))
  }
  const checkAll = (checkboxId, value) => {
    setChecked(value ? data.map(item => item[checkbox]) : [])
  }
  useEffect(() => {
    setSortDirection(false)
    setSortKey(cols[0].key)
    setSortedData(data)
  }, [data])

  const handleSort = (key) => {
    setSortDirection(!sortDirection)
    setSortKey(key)
    if (key !== sortKey) {
      setSortDirection(false)
    }
  }

  useEffect(() => {
    setSortedData(orderBy(data, sortKey, sortDirection === false ? "asc" : "desc"))
  }, [sortKey, sortDirection])


  return (
    <TableContainer>
      <TableWrapper>
        {header &&
          <thead><TableRow checked={allChecked} checkbox={checkbox} handleChange={checkAll}>{header.map(col => <Box gap="5px" alignItems="center" onClick={() => handleSort(col.key)}><Typography key="col" variant="buttonBg">{col.label}</Typography> <Icon icon={<Sort topFill={sortKey === col.key && sortDirection === false ? theme.colors.black.black100 : theme.colors.black.black30tra} bottomFill={sortKey === col.key && sortDirection === true ? theme.colors.black.black100 : theme.colors.black.black30tra} />} /></Box>)}</TableRow></thead>
        }
        {sortedData?.length > 0 && typeof children === 'function' &&
          <tbody>
            {sortedData.map((item, key) => (
              <TableRow key={key} checked={checked.includes(item[checkbox])} checkbox={item[checkbox]} handleChange={handleCheck}>{children(item).props.children}</TableRow>
            ))}
          </tbody>
        }
      </TableWrapper>
    </TableContainer>
  );
};

export default Table;
