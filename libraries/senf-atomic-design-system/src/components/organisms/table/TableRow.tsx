/** @format */
import React, { FC, useEffect, useState } from "react";
// import styled from "styled-components";
import styled from "styled-components";
import { TableRowProps } from "./TableRow.types";
import Box from "../../atoms/box/Box";
import ToggleInput from "../../atoms/toggleInput/ToggleInput";

const Tr = styled.tr`
  &:hover {
    background-color: ${({ theme }) => theme.colors.beige.beige10};
    cursor: pointer;
    }
  `
const TableRow: FC<TableRowProps> = (data) => {
  const { children, checked, checkbox, handleChange, onClick } = data
  // console.log(data)
  const [rowChecked, setRowChecked] = useState(checked);
  useEffect(() => {
    setRowChecked(checked)
  }, [checked])
  return (
    <Tr onClick={onClick}>
      {!!checkbox &&
        <td style={{ width: 0 }}>
          <Box>
            <ToggleInput
              checked={rowChecked}
              type="checkbox"
              receiveValue={() => { setRowChecked(!rowChecked); handleChange(checkbox, rowChecked === "indeterminate" ? true : !rowChecked) }}
            />
          </Box>
        </td>
      }
      {children && children.map((item, key) => (
        <td key={key} colSpan={key === children.length - 1 && "99" || 1}>{item}</td>
      ))
      }
    </Tr >
  );
};
export default TableRow;