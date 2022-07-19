/** @format */

import React, { FunctionComponent, useRef, useState } from "react";
import {
  TextField,
  Note,
  Label,
  InputField,
  Wrapper,
  // HoverContainer,
} from "./input.styles";
import { InputProps } from "./Input.types";
import Icon from "../icons/Icon";
import Box from "../box/Box";
import Search from "../../../assets/icons/Search";
import Plus from "../../../assets/icons/Plus";
import TertiaryButton from "../buttons/TertiaryButton";
import theme from "../../../styles/theme";

const adjustTextarea = (event: Event, rows: number, maxRows?: number) => {
  event.target.setAttribute('rows', null)
  const padding = parseFloat(window.getComputedStyle(event.target).paddingBlock, 10) * 2
  const lineHeight = parseFloat(window.getComputedStyle(event.target).lineHeight, 10)
  const scrollHeight = event.target.scrollHeight - padding
  const newRows = Math.round(scrollHeight / lineHeight)
  event.target.setAttribute('rows', Math.max(Math.min(newRows, maxRows || rows), rows))
}

const Input: FunctionComponent<InputProps> = ({
  id,
  name,
  type,
  label,
  note,
  icon,
  placeholder,
  required,
  error,
  success,
  disabled,
  rows = 3,
  maxRows = 10,
  onChange,
  value,
  onBlur,
  onClick,
  setSearchTerm,
  receiveValue,
  ...props
}) => {
  const [isSearch, setIsSearch] = useState(type === "search");
  const [isPassword, setIsPassword] = useState(type === "password");
  const [isFocused, setIsFocused] = useState(false);
  // const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);


  return (
    <Wrapper disabled={disabled}>
      {(label || note) && (
        <Box>
          {label && (
            <Label error={error}>{`${label}${required ? "*" : ""}`}</Label>
          )}
          {note && <Note error={error}>{note}</Note>}
        </Box>
      )}
      {/* the InputField wrapper is necessary for including icons and buttons */}
      <InputField
        id={id}
        focus={isFocused}
        icon={isSearch}
        onFocusCapture={() => setIsFocused((prevState) => !prevState)}
        onBlurCapture={() => setIsFocused((prevState) => !prevState)}
        onBlur={(event) => onBlur ? onBlur(event) : null}
      >
        {isSearch && <Icon icon={<Search />} />}
        <TextField
          id={name}
          type={isPassword ? "password" : isSearch ? "search" : "text"}
          placeholder={placeholder || `${isSearch ? "Search" : ""}`}
          disabled={disabled}
          rows={Math.max(rows, 2)}
          value={value}
          // onChange={(e: React.FormEvent<HTMLInputElement>) => {
          //   setValue(e.currentTarget.value);
          //   receiveValue(e.currentTarget.value);
          // }}
          onChange={
            (event) => {
              if (type === "textarea") adjustTextarea(event, rows, maxRows)
              if (isSearch && event.target && typeof setSearchTerm === "function") {
                return setSearchTerm(event.target.value)
              }
              return onChange
            }
          }
          ref={inputRef}
          as={type === "textarea" ? "textarea" : "input"}
        />
        {isSearch && value && (
          <TertiaryButton
            onClick={() => setSearchTerm("")}
            iconLeft={<Icon icon={<Plus transform="rotate(45deg)" />} />}
          // onClick={() => {
          //   inputRef.current!.focus();
          //   setValue("");
          // }}
          />
        )}
        {type === "password" && value && (
          <TertiaryButton
            onClick={() => setIsPassword((prevState) => !prevState)}
            text={isPassword ? "Zeigen" : "Verstecken"}
            color={theme.colors.primary.primary140}
            variant="semibold"
          />
        )}
      </InputField>
    </Wrapper>
  );
};

export default Input;
