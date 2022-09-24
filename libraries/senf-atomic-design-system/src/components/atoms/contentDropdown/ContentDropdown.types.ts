/** @format */

import React, { MouseEventHandler } from "react";
import { ContentDropdownItemProps } from "../contentDropdownItem/ContentDropdownItem.types";
import { ToggleInputProps } from "../toggleInput/ToggleInput.types";

export interface ContentDropdownProps {
  example?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  OpenButton?: React.ReactNode;
  Content?: React.ReactNode;
  openButtonWidth?: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  direction?: "downLeft" | "downRight" | "upLeft" | "upRight";
  data?: ContentDropdownItemProps[];
  itemType?: ToggleInputProps["type"];
  size?: ContentDropdownItemProps["size"];
}
