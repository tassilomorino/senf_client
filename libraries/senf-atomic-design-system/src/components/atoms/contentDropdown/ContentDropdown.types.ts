/** @format */

import React from "react";
import { ContentDropdownItemProps } from "../contentDropdown/ContentDropdownItem.types";

export interface DropdownListContainerProps {
  data?: ContentDropdownItemProps[] | Element;
  options?: {
    title?: string;
    size?: ContentDropdownItemProps["size"];
    itemType?: ContentDropdownItemProps["type"];
    minWidth?: ContentDropdownItemProps["minWidth"];
    modal?: boolean;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    closeOnSelect?: boolean; // close dropdown on item select
    x?: string;
    y?: string;
    style?: React.CSSProperties;
  };
}
