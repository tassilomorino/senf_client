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

const Fullscreen: FC<SVGRProps> = ({ color = "black", transform }) => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="Fullscreen"
    transform={transform}
  >
    <title>Fullscreen</title>
    <g id="Fullscreen">
      <path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.75 2.5C2.05964 2.5 1.5 3.05964 1.5 3.75V12.25C1.5 12.9404 2.05964 13.5 2.75 13.5H13.25C13.9404 13.5 14.5 12.9404 14.5 12.25V3.75C14.5 3.05964 13.9404 2.5 13.25 2.5H2.75ZM0 3.75C0 2.23122 1.23122 1 2.75 1H13.25C14.7688 1 16 2.23122 16 3.75V12.25C16 13.7688 14.7688 15 13.25 15H2.75C1.23122 15 0 13.7688 0 12.25V3.75ZM3.75 7.67001C4.16421 7.67001 4.5 8.0058 4.5 8.42001V10.25C4.5 10.3858 4.61421 10.5 4.75 10.5H6.58C6.99421 10.5 7.33 10.8358 7.33 11.25C7.33 11.6642 6.99421 12 6.58 12H4.75C3.78579 12 3 11.2142 3 10.25V8.42001C3 8.0058 3.33579 7.67001 3.75 7.67001ZM9.42001 4C9.0058 4 8.67001 4.33579 8.67001 4.75C8.67001 5.16421 9.0058 5.5 9.42001 5.5H11.25C11.3858 5.5 11.5 5.61421 11.5 5.75V7.58C11.5 7.99421 11.8358 8.33 12.25 8.33C12.6642 8.33 13 7.99421 13 7.58V5.75C13 4.78579 12.2142 4 11.25 4H9.42001Z"
        fill="black"
      />
    </g>
  </Svg>
);

export default Fullscreen;
