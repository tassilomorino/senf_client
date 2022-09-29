/** @format */

import { MouseEventHandler } from "react";

export interface StatusCardProps {
  title?: string;
  description?: string;
  img?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
