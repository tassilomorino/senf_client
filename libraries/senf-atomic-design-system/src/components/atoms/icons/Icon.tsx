/** @format */
import React, { FC } from "react";
import styled from "styled-components";
import * as Icons from "../../../assets/icons";
import { IconProps } from "./Icon.types";

const Wrapper = styled.div<IconProps>`
  width: ${({ width }) => width || "16px"};
  height: ${({ height }) => height || "16px"};
  color: ${({ color }) => color || "inherit"};
`;

const Icon: FC<IconProps> = ({ width, height, icon, color }) => (
  <Wrapper width={width} height={height} color={color}>
    {/* {icon} */}
    {typeof icon === "string" && typeof Icons[icon] === "function" ? Icons[icon]({ color }) : icon}
  </Wrapper>
);

export default Icon;
