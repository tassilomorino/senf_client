/** @format */

import React, { FC, SVGProps } from "react";
import styled from "styled-components";

interface SVGRProps {
  color?: string;
  transform?: string;
}

const Svg = styled.svg`
  transform: ${({ transform }) => transform || undefined};
`;

const Dot: FC<SVGRProps> = ({ color = "black", transform }) => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="Dot"
    transform={transform}
  >
    <title>Dot</title>
    <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Icons/Dot" fill={color}>
        <circle id="🎨-Icon-Color" cx="8" cy="8" r="6.5"></circle>
      </g>
    </g>
  </Svg>
);

export default Dot;
