/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import { icons } from "../../../assets/icons/icons";
import { IconProps } from "./Icon.types";

const Wrapper = styled.div<IconProps>`
  width: ${({ width }) => width || "16px"};
  height: ${({ height }) => height || "16px"};
  color: ${({ color }) => color || "inherit"};
`;

const Icon: FC<IconProps> = ({ width, height, icon }) => (
  <Wrapper width={width} height={height}>
    {icon}
  </Wrapper>
);

export default Icon;
