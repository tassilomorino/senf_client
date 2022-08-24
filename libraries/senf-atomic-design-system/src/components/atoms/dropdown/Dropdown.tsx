/** @format */

import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import Box from "../box/Box";
import { Wrapper, Label, Note, InputContainer } from "../inputs/input.styles";
import { DropdownProps, MultiListItems } from "./Dropdown.types";
import { Selector } from "./Dropdown.styles";

const Dropdown: FunctionComponent<DropdownProps> = ({
  id,
  placeholder,
  label,
  note,
  listItems,
  onChange,
  value,
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      {label || note &&
        <Box>
          {label && <Label htmlFor={id}>{label}</Label>}
          {note && <Note>{note}</Note>}
        </Box>
      }
      <InputContainer
        as={Selector}
        name={id}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      >
        {id && (
          <option disabled selected hidden>
            {t(id)}
          </option>
        )}
        {Object.values(listItems).map((item) => (
          <option key={item.label + item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </InputContainer>
    </Wrapper>
  );
};

export default Dropdown;
