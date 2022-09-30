/** @format */

import React, { FC, SVGProps } from "react";
import styled from "styled-components";

interface SVGRProps {
  color?: string;
  transform?: string;
}

const Svg = styled.svg`
  transform: ${({ transform }) => transform || undefined};
  margin-top: -2px;
  overflow: visible;
`;

const Document: FC<SVGRProps> = ({ color = "black", transform }) => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="Document"
    transform={transform}
  >
    <title>Document</title>
    <g id="Document">
      <path
        id="Vector"
        d="M13.74 5.29L10.26 1.81C9.74001 1.29 9.05001 1 8.32001 1H4.20001C2.68001 1 1.45001 2.23 1.45001 3.75V14.25C1.45001 15.77 2.68001 17 4.20001 17H11.8C13.32 17 14.55 15.77 14.55 14.25V7.24C14.55 6.51 14.26 5.82 13.74 5.3V5.29ZM11.99 5.66H10.64C10.23 5.66 9.89001 5.32 9.89001 4.91V3.56L11.99 5.66ZM13.05 14.25C13.05 14.94 12.49 15.5 11.8 15.5H4.20001C3.51001 15.5 2.95001 14.94 2.95001 14.25V3.75C2.95001 3.06 3.51001 2.5 4.20001 2.5H7.64001C8.05001 2.5 8.39001 2.84 8.39001 3.25V4.91C8.39001 6.15 9.40001 7.16 10.64 7.16H12.3C12.71 7.16 13.05 7.5 13.05 7.91V14.25Z"
        fill="#231D14"
      />
    </g>
  </Svg>
);

export default Document;
