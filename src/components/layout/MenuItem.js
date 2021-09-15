/** @format */

import React from "react";

export function MenuItem({
  index,
  order,
  isSelectedIcon,
  isNotSelectedIcon,
  text,
  handleClick,
}) {
  return (
    <div className="profile" onClick={() => handleClick(index)}>
      <img
        src={order === index ? isSelectedIcon : isNotSelectedIcon}
        width="35"
        alt={text}
        style={{ paddingRight: "10px" }}
      />
      {text}
    </div>
  );
}
