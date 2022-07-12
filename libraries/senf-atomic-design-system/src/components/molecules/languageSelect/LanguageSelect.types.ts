/** @format */

import { MouseEventHandler } from "react";

export interface LanguageSelectProps {
  example?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text?: string;
  direction?: "downLeft" | "downRight";
}
