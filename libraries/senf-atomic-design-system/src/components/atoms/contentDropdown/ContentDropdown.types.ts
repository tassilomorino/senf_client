/** @format */

import React from "react";
import { ContentDropdownItemProps } from "../contentDropdown/ContentDropdownItem.types";
import { ToggleInputProps } from "../toggleInput/ToggleInput.types";

export interface DropdownListContainerProps {
  data?: ContentDropdownItemProps[],
  options?: {
    title?: string,
    size?: ContentDropdownItemProps["size"],
    itemType?: ContentDropdownItemProps["type"],
    minWidth?: ContentDropdownItemProps["minWidth"],
    modal?: boolean
    direction?: "downRight" | "downLeft"
    open?: boolean
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    closeOnSelect?: boolean // close dropdown on item select
    x?: string
    y?: string
  }
}