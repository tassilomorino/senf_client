/** @format */

import React, { FunctionComponent, useRef, useState } from "react";
import {
  InputField,
  Note,
  Label,
  InputContainer,
  Wrapper,
  // HoverContainer,
} from "./input.styles";
import { InputProps } from "./Input.types";
import Icon from "../icons/Icon";
import Box from "../box/Box";
import Button from "../buttons/Button";
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
  // explicit props
  value,
  name = Math.random().toString(36).substr(2, 5),
  type,
  label,
  placeholder,
  note, // or helperText
  size, // sm, md, lg
  variant, // grey (default) or white

  leadingIcon, // leadingIcon
  trailingIcon, // trailingIcon

  required,
  disabled,
  clearable,

  rows = 3,
  maxRows = 10,
  // methods
  onChange,
  onBlur,
  onClick,
  receiveValue,
  error,
  success,
  leadingIconClick,
  trailingIconClick,

  // implicit props
  ...props
}) => {
  const [isSearch, setIsSearch] = useState(type === "search");
  const [isPassword, setIsPassword] = useState(type === "password");
  const [isFocused, setIsFocused] = useState(false);
  // const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);



  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (type === "textarea") adjustTextarea(event, rows, maxRows)
    if (typeof onChange === "function") {
      // if (isSearch && event.target) return onChange(event.target.value)
      return onChange(event)
    }
    return null
  }

  const clear = clearable || isSearch

  const placeholderSet = placeholder || `${isSearch ? "Search" : ""}`


  let leadingIconSet = leadingIcon;
  const leadingIconClickSet = leadingIconClick;
  let trailingIconSet = trailingIcon;
  let trailingIconClickSet = trailingIconClick;
  if (isSearch && !leadingIcon) {
    leadingIconSet = "Search";
  }

  if (type === "password") {
    trailingIconSet = isPassword ? "Bulb" : "Dot";
    trailingIconClickSet = () => setIsPassword(!isPassword);
  }

  if (clear && value) {
    trailingIconSet = "Close";
    trailingIconClickSet = () => {
      const e = { target: { value: "" } }
      onChange(e)
      setIsFocused((prevState) => !prevState)
    }
  }

  if (error) {
    trailingIconSet = "Alert";
  }

  const LeadingIconWrapper = typeof leadingIconClickSet === "function" ? Button : "label";
  const TrailingIconWrapper = typeof trailingIconClickSet === "function" ? Button : "label";

  const iconWrapperProps = (onClick?) => onClick && typeof onClick === "function" ? {
    variant: "tertiary",
    size: "small",
    onClick
  } : {
    for: name,
  }

  const fieldType = () => {
    if (
      type === "textarea" ||
      type === "password" && !isPassword
    ) return "text"
    return type
  }

  return (
    <Wrapper disabled={disabled} {...props}>
      {label && (
        <Label error={error} active={isFocused && value !== ""} size={size}>{`${label}${required ? "*" : ""}`}</Label>
      )}
      {/* the InputContainer wrapper is necessary for including icons and buttons */}
      <InputContainer
        focus={isFocused}
        icon={leadingIconSet}
        onFocusCapture={() => setIsFocused((prevState) => !prevState)}
        onBlurCapture={() => setIsFocused((prevState) => !prevState)}
        onBlur={(event) => onBlur && typeof onBlur === "function" ? onBlur(event) : null}
        size={size || 'lg'}
        type={type}
        for={name}
      >
        {/* {label && (
          <Label error={error} size={size} icon={!!leadingIconSet} active={isFocused || value !== ""}>{`${label}${required ? "*" : ""}`}</Label>
        )} */}
        {leadingIconSet &&
          <LeadingIconWrapper {...iconWrapperProps(leadingIconClickSet)}>
            <Icon icon={leadingIconSet} />
          </LeadingIconWrapper>
        }
        <InputField
          id={name}
          type={fieldType()}
          placeholder={placeholderSet}
          disabled={disabled}
          rows={type === "textarea" && Math.max(rows, 2)}
          value={value || ""}
          onClick={onClick}
          onChange={handleChange}
          ref={inputRef}
          as={type === "textarea" ? "textarea" : "input"}
        />
        {trailingIconSet &&
          <TrailingIconWrapper {...iconWrapperProps(trailingIconClickSet)}>
            <Icon icon={trailingIconSet} color={error && theme.colors.signal.redDark} />
          </TrailingIconWrapper>
        }
      </InputContainer>
      {note && <Note error={error} size={size}>{note}</Note>}
    </Wrapper >
  );
};

export default Input;
