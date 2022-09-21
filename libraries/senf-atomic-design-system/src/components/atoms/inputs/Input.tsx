/** @format */

import React, { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from "react";
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
import Button from "../buttons/Button";
import theme from "../../../styles/theme";

const adjustTextarea = (event: Event, rows: number, maxRows?: number) => {
  if (!event?.target) return;
  const Element = event.target as HTMLTextAreaElement;
  Element.setAttribute('rows', "")
  const padding = parseFloat(window.getComputedStyle(Element).paddingBlock) * 2
  const lineHeight = parseFloat(window.getComputedStyle(Element).lineHeight)
  const scrollHeight = Element.scrollHeight - padding
  const newRows = Math.round(scrollHeight / lineHeight)
  Element.setAttribute('rows', Math.max(Math.min(newRows, maxRows || rows), rows).toString())
}

const Input: FunctionComponent<InputProps> = ({
  // explicit props
  value,
  name = Math.random().toString(36).substring(2, 5),
  type,
  label,
  placeholder,
  note, // or helperText
  size, // sm, md, lg
  variant, // grey (default) or white
  autocomplete,

  leadingIcon, // leadingIcon
  trailingIcon, // trailingIcon
  leadingIconLabel,
  trailingIconLabel,

  required,
  disabled,
  clearable,

  rows = 3,
  maxRows = 10,
  // methods
  onChange,
  onBlur,
  onClick,
  onSubmit,
  receiveValue,
  error,
  success,
  leadingIconClick,
  trailingIconClick,
  refProp,

  // implicit props
  ...props
}) => {
  const [isSearch, setIsSearch] = useState(type === "search");
  const [isPassword, setIsPassword] = useState(type === "password");
  const [isFocused, setIsFocused] = useState(false);
  // const [value, setValue] = useState("");
  const inputRef = refProp || useRef<HTMLInputElement>(null);



  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (type === "textarea") adjustTextarea(event, rows, maxRows)
    if (typeof onChange === "function") {
      // if (isSearch && event.target) return onChange(event.target.value)
      return onChange(event)
    }
    return null
  }

  const clear = clearable || isSearch

  const placeholderState = placeholder || `${isSearch ? "Search" : ""}`


  // const leadingIconState = leadingIcon;
  // const leadingIconClickState = leadingIconClick;
  // const trailingIconState = trailingIcon;
  // const trailingIconClickState = trailingIconClick;

  const [leadingIconState, setLeadingIconState] = useState(leadingIcon);
  const [leadingIconClickState, setLeadingIconClickState] = useState(() => leadingIconClick);
  const [leadingIconLabelState, setLeadingIconLabelState] = useState(leadingIconLabel);
  const [trailingIconState, setTrailingIconState] = useState(trailingIcon);
  const [trailingIconClickState, setTrailingIconClickState] = useState(() => trailingIconClick);
  const [trailingIconLabelState, setTrailingIconLabelState] = useState(trailingIconLabel);

  useEffect(() => setLeadingIconState(leadingIcon), [leadingIcon]);
  useEffect(() => { if (!error) setLeadingIconClickState(() => leadingIconClick) }, [leadingIconClick, error]);
  useEffect(() => setTrailingIconState(trailingIcon), [trailingIcon]);
  useEffect(() => { if (!error) setTrailingIconClickState(() => trailingIconClick) }, [trailingIconClick, error]);

  useEffect(() => {
    if (isSearch && !leadingIcon) {
      setLeadingIconState("Search");
    }
  }, [isSearch, leadingIcon]);

  useEffect(() => {
    if (type === "password") {
      setTrailingIconState(isPassword ? "Bulb" : "Dot")
      setTrailingIconClickState(() => () => setIsPassword(!isPassword))
    }
  }, [type, isPassword])

  useEffect(() => {
    if (clear && value) {
      setTrailingIconState("Close")
      setTrailingIconClickState(() => () => {
        onChange?.({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)
        setIsFocused((prevState) => !prevState)
      })
    }
  }, [clear, value])

  useEffect(() => {
    if (error) setTrailingIconState("Alert")
    if (error) setTrailingIconClickState(undefined)
    return () => setTrailingIconClickState(() => trailingIconClick)
  }, [error]);



  const LeadingIconWrapper = typeof leadingIconClickState === "function" ? Button : "label";
  const TrailingIconWrapper = typeof trailingIconClickState === "function" ? Button : "label";

  const iconWrapperProps = (onClick?) => onClick && typeof onClick === "function" ? {
    variant: "tertiary",
    size: "small",
    onClick
  } : {
    htmlFor: name,
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
        name={name}
        focus={isFocused}
        icon={leadingIconState}
        onFocusCapture={() => setIsFocused((prevState) => !prevState)}
        onBlurCapture={() => setIsFocused((prevState) => !prevState)}
        onBlur={(event) => onBlur && typeof onBlur === "function" ? onBlur(event) : null}
        size={size || 'lg'}
        type={type}
        htmlFor={name}
      >
        {/* {label && (
          <Label error={error} size={size} icon={!!leadingIconState} active={isFocused || value !== ""}>{`${label}${required ? "*" : ""}`}</Label>
        )} */}
        {leadingIconState &&
          <LeadingIconWrapper {...iconWrapperProps(leadingIconClickState)} title={leadingIconLabelState} >
            <Icon icon={leadingIconState} style={{ pointerEvents: "none" }} />
          </LeadingIconWrapper>
        }
        <InputField
          id={name}
          type={fieldType()}
          placeholder={placeholderState}
          disabled={disabled}
          rows={(type === "textarea" && Math.max(rows, 2)) || null}
          value={value || ""}
          onClick={onClick}
          onChange={handleChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSubmit(value)
          }}
          ref={inputRef}
          as={type === "textarea" ? "textarea" : "input"}
          autocomplete={autocomplete}
        />
        {trailingIconState &&
          <TrailingIconWrapper {...iconWrapperProps(trailingIconClickState)} title={trailingIconLabelState}>
            <Icon icon={trailingIconState} color={error && theme.colors.signal.redDark} style={{ pointerEvents: "none" }} />
          </TrailingIconWrapper>
        }
      </InputContainer>
      {note && <Note error={error} size={size}>{note}</Note>}
    </Wrapper >
  );
};

export default Input;
