/** @format */

import { MouseEventHandler } from "react";

export interface ButtonProps {
  text?: string;
  variant?: "primary" | "secondary" | "tertiary" | "white" | "plus";
  icon?: JSX.Element;
  iconRight?: boolean;
  transform?: string;
  borderStyle?: "dashed" | "solid";
  fillWidth?: "max" | undefined;
  loading?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "big";
  color?: string;
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
