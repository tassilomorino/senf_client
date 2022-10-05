/** @format */

import { FC } from "react";
import Plus from "./Plus";

const Close: FC = ({ ...props }) => (
  <Plus
    name="Close"
    transform="rotate(45)"
    {...props}
  />
);

export default Close;
