/** @format */

import { ChangeEventHandler } from "react";

export interface InputProps {
  value?: string | number; //! why are we passing value to input component?
  name?: string;
  type?: React.HTMLInputTypeAttribute | "textarea" | "password" | "text";
  label?: string;
  placeholder?: string;
  note?: string;
  size?: "sm" | "md" | "lg";
  variant?: "grey" | "white";

  leadingIcon?: JSX.Element | string;
  trailingIcon?: JSX.Element | string;
  leadingIconLbel?: string;
  trailingIconLbel?: string;

  required?: boolean;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  clearable?: boolean;

  rows?: number;
  maxRows?: number;

  // methods
  // setValue?: ChangeEventHandler<HTMLInputElement>;  //! why are we passing setValue to input component?
  leadingIconClick?: () => void;
  trailingIconClick?: () => void;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: ChangeEventHandler<HTMLInputElement>;
  onSubmit?: ChangeEventHandler<HTMLInputElement>;
  receiveValue?: (value?: string) => void;
}
