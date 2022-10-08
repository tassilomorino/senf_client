/** @format */

import { MouseEventHandler } from "react";

export interface SubNavbarProps {
  leadingIcon?: string;
  textLeft?: string;
  header?: string;
  trailingIcon?: string;
  textRight?: string;
  handlebar?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
