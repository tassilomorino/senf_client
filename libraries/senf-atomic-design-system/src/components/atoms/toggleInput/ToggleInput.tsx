/** @format */

import React, { FC, useState } from "react";
import styled from "styled-components";
import Check from "../../../assets/icons/Check";
import CheckDropShadow from "../../../assets/icons/CheckDropShadow";
import Box from "../box/Box";
import Icon from "../icons/Icon";
import { ToggleInputProps } from "./ToggleInput.types";

const Wrapper = styled.div<ToggleInputProps>``;

const ToggleInputContainer = styled.div<ToggleInputProps>`
  display: flex;
  z-index: 99;
  cursor: pointer;
  pointer-events: ${({ pointerEvents }) => pointerEvents || "all"};
`;

const RadioIcon = styled.div<ToggleInputProps>`
  width: 9px;
  position: relative;
  height: 9px;
  border-radius: 9px;
  flex-grow: 0;
  background-color: white;
  box-shadow: 0px 2px 4px 0px rgba(134, 124, 99, 0.18);
`;

const StyledToggleInput = styled.div<ToggleInputProps>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: ${({ checked, theme }) =>
    checked && checked !== "indeterminate"
      ? theme.colors.primary.primary100
      : theme.colors.white.white50tra};
  border-radius: ${({ borderRadius }) => borderRadius || "7px"};
  transition: all 150ms;
  border: 2px solid
    ${({ checked, theme }) =>
      checked && checked !== "indeterminate"
        ? theme.colors.primary.primary120
        : theme.colors.greyscale.greyscale50};

  ${RadioIcon} {
    visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
  }
  flex: none;
`;

const CheckBoxLabel = styled.label`
  color: #353535;
  margin-left: 20px;
  cursor: pointer;
`;

const ToggleInput: FC<ToggleInputProps> = ({
  type,
  checked,
  receiveValue,
  pointerEvents,
  label,
}) => {
  const [toggle, setToggle] = useState(false);
  const id = Math.random().toString(36).substring(2, 5);
  if (type === "check" && !checked) {
    return null;
  }
  return (
    <ToggleInputContainer
      onClick={(e: React.FormEvent<HTMLInputElement>) => {
        setToggle(!toggle);
        receiveValue?.(e.currentTarget.value);
      }}
      pointerEvents={pointerEvents}
    >
      {type === "check" && checked && (
        <Box
          width="20px"
          height="20px"
          justifyContent="center"
          alignItems="center"
        >
          <Icon icon={<Check />} />
        </Box>
      )}
      {type === "checkbox" && (
        <StyledToggleInput
          checked={checked}
          borderRadius="7px"
          id={id}
        >
          {checked && checked !== "indeterminate" && (
            <Icon icon={<CheckDropShadow color="white" />} />
          )}
          {checked && checked === "indeterminate" && <Icon icon="More" />}
        </StyledToggleInput>
      )}
      {type === "radio" && (
        <StyledToggleInput
          checked={checked}
          borderRadius={"50%"}
          id={id}
        >
          <RadioIcon />
        </StyledToggleInput>
      )}
      {label && <CheckBoxLabel for={id}>{label}</CheckBoxLabel>}
    </ToggleInputContainer>
  );
};

export default ToggleInput;
