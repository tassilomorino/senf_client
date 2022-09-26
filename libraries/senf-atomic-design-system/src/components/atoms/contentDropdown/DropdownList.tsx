/** @format */

import React, { FC } from "react";

import { DropdownListContainerProps } from "./ContentDropdown.types";
import { ContentDropdownItemProps } from "./ContentDropdownItem.types";
import ContentDropdownItem from "./ContentDropdownItem";

const DropdownList: FC<DropdownListContainerProps> = ({
  data,
  options,
}) => {
  const onItemClick = (item: ContentDropdownItemProps, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    item.onClick?.(e);
    if (options?.closeOnSelect) options?.setOpen?.(false)
  }
  return data?.length && data.length > 0 ?
    data.map((item: ContentDropdownItemProps, key: number) => (
      <ContentDropdownItem
        {...item}
        key={key}
        type={options?.itemType || item.type}
        size={options?.size}
        onClick={e => onItemClick(item, e)}
      />
    )) : null
};

export default DropdownList;
