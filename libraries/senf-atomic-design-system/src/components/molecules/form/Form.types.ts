/** @format */

import { InputProps } from "../../atoms/inputs/Input.types";

export interface FormProps {
  inputItems?: Array<InputProps>;
  margin?: string;
  maxWidth?: string;
  formik?: string;
  outsideClick?: boolean;
}
