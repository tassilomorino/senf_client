/** @format */

import { MouseEventHandler } from "react";

export interface TagProps {
  text?: string;
  variant?: "primary" | "white" | "secondary" | "plus";
  icon?: React.ReactNode;
  iconColor?: string;
  width?: "max" | undefined;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  hide?: boolean;
}
