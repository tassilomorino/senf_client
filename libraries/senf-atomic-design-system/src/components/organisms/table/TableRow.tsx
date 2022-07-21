/** @format */

import React, { FC, useState } from "react";
import styled from "styled-components";
import { TableRowProps } from "./TableRow.types";
import Box from "../../atoms/box/Box";
import ToggleInput from "../../atoms/toggleInput/ToggleInput";

const TableRowWrapper = styled.tr<TableRowProps>`
  td {
    padding: ${({ theme }) => theme.space[4]};
  }
  td:last-child {
    width: 0;
    column-span: all;
    & > * {
      margin-left: auto;
    }
  }
`;
const TableRow: FC<TableRowProps> = ({children, checkbox}) => {
  const [checked, setChecked] = useState(false);
  return (
    <TableRowWrapper>
      { checkbox &&
        <td style={{width: 0}}><Box>
        <ToggleInput
          checked={checked}
          type="checkbox"
          receiveValue={() => setChecked(!checked)}
        />
      </Box></td>
      }
      { children && children.map((item, key) => (
        <td key={key} colSpan={key === children.length - 1 && "99" || 1}>{item}</td>
      ))
      }
    </TableRowWrapper>
  );
};

export default TableRow;
