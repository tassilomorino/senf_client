/** @format */

import React, {
  FC
} from "react";
import styled from "styled-components";
import Loader from "../animations/Loader";
import Box from "../box/Box";
import Icon from "../icons/Icon";
import {
  LayerGreyButtonsDefault,
  LayerGreyButtonsHover,
  LayerWhiteFirstDefault,
  LayerWhiteFirstHover,
  LayerYellowDefault,
  LayerYellowHover,
} from "../layerStyles/LayerStyles";
import {
  ButtonProps
} from "./Button.types";

const StyledButton = styled.button < ButtonProps> `
  position: relative;
  cursor: ${(props) => (props.disabled === true ? "not-allowed" : "pointer")};
  box-sizing: border-box;
  width: auto; /* 150px */
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  align-items: center;

  //ADD THEME-OPACITY
  opacity: ${({ disabled }) => (disabled === true ? 0.6 : 1)};
  //ADD THEME-RADII


  //ADD THEME-SPACE?
  height: ${({ size }) => (size === "small" ? "36px" : size === "medium" ? "44px" : "50px")};

  //FOR SMALLICONBUTTON – is this really correct?
  width: ${({ fillWidth }) => (fillWidth === "max" ? "100%" : "auto")};

  min-width: ${({ size }) => (size === "small" ? "36px" : size === "medium" ? "44px" : "50px")};

  color: ${({ loading }) => (loading === true ? "transparent" : "auto")};
  pointer-events: ${({ loading }) => (loading === true ? "none" : "all")};

  //ADD THEME-SPACE?
  padding: ${({ size }) => (size === "small" ? "8px 10px" : size === "medium" ? "10px 14px" : "13px 16px")};
  border-radius: ${({ size }) => (size === "small" ? "12px" : size === "medium" ? "14px" : "16px")};
  font-size: ${({ size }) => (size === "small" ? "14px" : size === "medium" ? "16px" : "16px")};
  font-weight: ${({ variant }) => ((variant === "primary" || variant === undefined) && 700)};

  ${({ variant }) =>
    variant === "primary" || variant === undefined
      ? LayerYellowDefault
      : variant === "white"
        ? LayerWhiteFirstDefault
        : variant === "secondary" && LayerGreyButtonsDefault};

  background-color: ${({ variant }) => (variant === "tertiary" && "transparent")};


  //ADD THEME-BORDER
  border: ${({ borderStyle, variant, theme }) =>
    variant === "tertiary" ? 0 :
      borderStyle === "dashed"
        ? `2px dashed ${theme.colors.greyscale.greyscale50tra}`
        : "auto"};

  &:hover:enabled {
  ${(props) =>
    props.variant === "primary" || props.variant === undefined
      ? LayerYellowHover
      : props.variant === "white"
        ? LayerWhiteFirstHover
        : props.variant === "secondary" && LayerGreyButtonsHover}

  background-color: ${({ theme, variant }) => variant === "tertiary" && theme.colors.greyscale.greyscale20tra};


  //ADD THEME-BORDER
  border: ${({ borderStyle, variant, theme }) =>
    variant === "tertiary" ? 0 :
      borderStyle === "dashed"
        ? `2px dashed ${theme.colors.greyscale.greyscale50tra}`
        : "auto"};
  }

  &:active:enabled {
  ${(props) =>
    props.variant === "primary" || props.variant === undefined
      ? LayerYellowHover
      : props.variant === "white"
        ? LayerWhiteFirstHover
        : props.variant === "secondary" && LayerGreyButtonsHover};

  background-color: ${({ theme, variant }) => variant === "tertiary" && theme.colors.greyscale.greyscale20tra};


  //ADD THEME-BORDER
  border: ${({ borderStyle, variant, theme }) =>
    variant === "tertiary" ? 0 :
      borderStyle === "dashed"
        ? `2px dashed ${theme.colors.greyscale.greyscale50tra}`
        : "auto"};

  }
  `;

const LoaderWrapper = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  `;

const IconWrapper = styled.div < ButtonProps> `
    padding-right: ${(props) => (props.text === undefined ? "0px" : "10px")};
    `;

const Button: FC<ButtonProps> = ({
  text,
  children,
  icon,
  iconRight,
  transform,
  size,
  variant,
  borderStyle,
  justifyContent,
  fillWidth,
  loading,
  onClick,
  ...rest
}) => (
  <StyledButton type="button" text={text} variant={variant} icon={icon} borderStyle={borderStyle}
    justifyContent={justifyContent} fillWidth={fillWidth} $loading={loading} onClick={onClick} size={size}
    {...rest}>
    {
      children && children
    } {
      icon && (< IconWrapper text={text}>
        < Icon icon={icon} transform={transform} />
      </IconWrapper>)} {text}

    {iconRight && (
      <Box marginLeft="11px">
        <Icon
          icon={iconRight}

        />
      </Box>
    )}




    {loading && (< LoaderWrapper>
      < Loader />
    </LoaderWrapper>)}


  </StyledButton>);

export default Button;
