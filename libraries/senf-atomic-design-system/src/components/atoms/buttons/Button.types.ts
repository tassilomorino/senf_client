/** @format */

import React, { MouseEventHandler } from "react";

export interface ButtonProps {
  text?: string;
  variant?: "primary" | "secondary" | "tertiary" | "white" | "plus";

  leadingIcon?: JSX.Element | string;
  trailingIcon?: JSX.Element | string;

  transform?: string;
  borderStyle?: "dashed" | "solid";
  width?: "max" | "height" | number;
  loading?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large" | "sm" | "md" | "lg";
  color?: string;
  justifyContent?:
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}
