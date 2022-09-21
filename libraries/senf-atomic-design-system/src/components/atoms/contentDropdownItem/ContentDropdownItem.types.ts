/** @format */

import { MouseEventHandler } from "react";
import { ToggleInputProps } from "../toggleInput/ToggleInput.types";

export interface ContentDropdownItemProps {
  leadingIcon?: JSX.Element | string;
  trailingIcon?: JSX.Element | string;
  text?: string;
  checked?: boolean;
  disabled?: boolean;
  type?: ToggleInputProps["type"];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  minWidth?: string;
  size?: "sm" | "md" | "lg";
}
