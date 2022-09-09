/** @format */

import React, { MouseEventHandler } from "react";

export interface ContentDropdownProps {
  example?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  OpenButton?: React.ReactNode;
  Content?: React.ReactNode;
  openButtonWidth?: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  direction?: "downLeft" | "downRight";
}
