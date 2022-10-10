/** @format */

import React, { FC } from "react";
import styled, {css} from "styled-components";
import Box from "../box/Box";
import Icon from "../icons/Icon";
import theme from "../../../styles/theme";
import {
  LayerGreyButtonsDefault,
  LayerYellowDefault,
  LayerYellowHover,
} from "../layerStyles/LayerStyles";
import ToggleInput from "../toggleInput/ToggleInput";
import Typography from "../typography/Typography";
import { ContentDropdownItemProps } from "./ContentDropdownItem.types";

const Wrapper = styled.button<ContentDropdownItemProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-width: ${({ minWidth }) => minWidth || "max-content"};
  height: 30px;
  border-radius: 8px;
  gap: ${({ theme }) => theme.space[3]};
  height: ${({ theme, size }) => theme.inputHeight(size)};
  padding-block: ${({ theme, size }) => theme.inputPadding(size)};
  padding-inline: ${({ theme, type, size }) =>
    !type || type === "check" ? theme.inputPadding(size) : 0};
  & > div {
    margin-left: ${({ theme, type }) =>
      type === "check" ? `${parseFloat(theme.space[2]) * -1}rem` : "inherit"};
  }
  position: relative;
  & + *:before {
    content: '';
    position: absolute;
    width: 100%;
    width: ${({ theme, size }) => `calc(100% - (${theme.inputPadding(size)} * 2))`};
    height: 1px;
    top: -2px;
  }
  &:not(:hover) + *:not(:hover):before {
    background-color: ${() => theme.colors.palette["grey-300"]};
  }
  ${({type}) => type !== "check" ? css`
    & + *:before {
      background-color: ${theme.colors.palette["grey-300"]};
    }
  ` : null}
  box-sizing: border-box;
  border: 2px solid transparent;
  background-color: transparent;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : null)};
  ${({ checked, disabled, type }) =>
    checked && !type
      ? disabled
        ? LayerGreyButtonsDefault
        : LayerYellowDefault
      : null}

  &:hover {
    background-color: ${({ type, theme }) =>
      !type || type === "check"
        ? theme.colors.greyscale.greyscale10tra
        : theme.colors.white.white50tra};

    ${({ checked, type }) => (checked && !type ? LayerYellowHover : null)}
  }
`;

const ContentDropdownItem: FC<ContentDropdownItemProps> = ({
  leadingIcon,
  trailingIcon,
  type,
  text,
  checked,
  onClick,
  disabled,
  size = "sm",
  minWidth = "200px",
}) => {
  return (
    <Wrapper
      checked={checked}
      disabled={disabled}
      type={type}
      data-type={type}
      onClick={onClick}
      minWidth={minWidth}
      size={size}
    >
      {type ? (
        <ToggleInput
          type={type}
          checked={checked}
        />
      ) : null}
      {leadingIcon ? <Icon icon={leadingIcon} /> : null}
      <Typography
        variant="bodySm"
        fontWeight={checked ? "bold" : "regular"}
      >
        {text}
      </Typography>
      {trailingIcon && (
        <Box marginLeft="auto">
          <Icon icon={trailingIcon} />
        </Box>
      )}
    </Wrapper>
  );
  // return (
  //   <Wrapper checked={checked} type={type} onClick={onClick}>
  //     {type && type !== "withoutIcon" && (
  //       <Box
  //         width="33px"
  //         height="33px"
  //         justifyContent="center"
  //         alignItems="center"
  //       >
  //         <ToggleInput type={type} checked={checked} />
  //       </Box>
  //     )}
  //     {icon && <Box paddingInline="10px"><Icon icon={icon} /></Box>}
  //     <Box margin="0px 6px 0px 0px">
  //       <Typography variant="bodySm" fontWeight={checked ? "bold" : "regular"}>
  //         {text}
  //       </Typography>
  //     </Box>
  //   </Wrapper>
  // );
};

export default ContentDropdownItem;
