/** @format */

import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import Box from "../box/Box";
import { Wrapper, Label, Note, InputField } from "../inputs/input.styles";
import { DropdownProps, MultiListItems } from "./Dropdown.types";
import MultiDropdown from "./multi/MultiDropdown";
import SingleDropdown from "./single/SingleDropdonw";
import { Selector } from "./Dropdown.styles";

const Dropdown: FunctionComponent<DropdownProps> = ({
  id,
  placeholder,
  label,
  note,
  multi,
  listItems,
  onChange,
  value,
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Box>
        <Label htmlFor={id}>{label}</Label>
        <Note>{note}</Note>
      </Box>
      <InputField
        multi
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
          <option key={item.label} value={item.value}>
            {item.label}
          </option>
        ))}
      </InputField>
    </Wrapper>
  );
};

export default Dropdown;
