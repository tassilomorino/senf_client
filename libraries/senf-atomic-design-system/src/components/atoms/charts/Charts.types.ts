/** @format */

import { MouseEventHandler } from "react";

export interface ChartsProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  data: Array<object>;
  direction: string;
  stacked: boolean;
}
