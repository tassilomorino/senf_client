/** @format */

import { MouseEventHandler } from "react";

export interface ToggleInputProps {
  checked?: boolean | "indeterminate";
  type?: "checkbox" | "radio" | "check";
  receiveValue?: (value?: string) => void;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  label?: string;
  borderRadius?: string;
}
