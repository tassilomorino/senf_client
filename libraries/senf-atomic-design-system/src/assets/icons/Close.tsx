/** @format */

import React, { FC } from "react";
import Plus from "./Plus";

const Close: FC = ({ ...props }) => (
  <Plus name="Close" transform="rotate(45deg)" {...props} />
);

export default Close;
