/** @format */

import React, { MouseEventHandler } from "react";

export interface ButtonProps {
  text?: string;
  variant?: "primary" | "secondary" | "tertiary" | "white" | "plus";
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
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
