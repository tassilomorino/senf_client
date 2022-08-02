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

const Pin: FC<SVGRProps> = ({ color = "black", transform }) => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="Pin"
    transform={transform}
  >
    <title>Pin</title>
    <g id="Needle">
      <path
        id="Vector"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.75 3.495C5.75 4.116 6.254 4.62 6.875 4.62C7.496 4.62 8 4.116 8 3.495C8 2.874 7.496 2.37 6.875 2.37C6.254 2.37 5.75 2.874 5.75 3.495ZM4.375 4.62C4.375 2.618 5.998 0.994995 8 0.994995C10.002 0.994995 11.625 2.618 11.625 4.62C11.625 6.62199 10.002 8.245 8 8.245C5.998 8.245 4.375 6.62199 4.375 4.62ZM7.2496 16.2449C7.2496 16.6589 7.5856 16.9949 7.9996 16.9949C8.4136 16.9949 8.7496 16.6589 8.7496 16.2449V9.99489C8.7496 9.5809 8.4136 9.24489 7.9996 9.24489C7.5856 9.24489 7.2496 9.5809 7.2496 9.99489V16.2449Z"
        fill="#231D14"
      />
    </g>
  </Svg>
);

export default Pin;
