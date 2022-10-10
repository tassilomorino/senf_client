/** @format */

import { MouseEventHandler } from "react";

export interface TertiaryButtonProps {
  text?: string;
  iconLeft?: React.ReactNode;
  iconLeftTransform?: string;
  trailingIcon?: React.ReactNode;
  iconRightTransform?: string;
  width?: "max" | undefined;
  loading?: boolean;
  disabled?: boolean;
  size?: "small" | "big";
  variant?: "medium" | "semibold" | "bold";
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
