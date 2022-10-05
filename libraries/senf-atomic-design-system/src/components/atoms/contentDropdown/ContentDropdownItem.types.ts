/** @format */

import { MouseEventHandler } from "react";
import { ToggleInputProps } from "../toggleInput/ToggleInput.types";

export interface ContentDropdownItemProps {
  leadingIcon?: JSX.Element | string;
  trailingIcon?: JSX.Element | string;
  text?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ToggleInputProps["type"];
  minWidth?: string;
  size?: "small" | "medium" | "large" | "sm" | "md" | "lg";
}
