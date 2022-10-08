/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import Plus from "../../../assets/icons/Plus";
import Icon from "../icons/Icon";
import {
  LayerWhiteGradientBordersDefault,
  LayerYellowDefault,
  LayerYellowHover,
} from "../layerStyles/LayerStyles";
import { ButtonProps } from "./Button.types";

const StyledButton = styled.button<ButtonProps>`
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  aspect-ratio: 1 / 1;

  //ADD THEME-RADII
  border-radius: 28px;

  //ADD THEME-BORDER
  border: 2px solid #ffffff;

  //ADD THEME-SPACE?
  height: 68px;
  width: 68px;

  color: ${(props) => (props.loading === true ? "transparent" : "auto")};
  pointer-events: all;

  //ADD THEME-TRANSITION
  transition: 0.3s;

  ${(props) =>
    props.variant === "primary"
      ? LayerYellowDefault
      : LayerWhiteGradientBordersDefault}

  &:hover:enabled {
    transform: scale(1.088);
  }

  &:active:enabled {
    transform: scale(1.088);
  }
`;

const IconWrapper = styled.div<ButtonProps>`
  position: absolute;
`;

const RoundedButton: FC<ButtonProps> = ({
  leadingIcon,
  variant,
  size,
  color,
  onClick,
  ...rest
}) => {
  return (
    <StyledButton
      type="button"
      variant={variant}
      size={size}
      onClick={onClick}
      {...rest}
    >
      <IconWrapper>
        <Icon
          icon={leadingIcon}
          width="24px"
        />
      </IconWrapper>
    </StyledButton>
  );
};

export default RoundedButton;
