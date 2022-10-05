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

const Locate: FC<SVGRProps> = ({ color = "black", transform }) => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="Locate"
    transform={transform}
  >
    <title>Locate</title>
    <g clipPath="url(#clip0_399_9070)">
      <path
        d="M14.57 1.09L0.599989 7.44C-0.230011 7.82 -0.170011 9.02 0.699989 9.31L5.45999 10.9C5.75999 11 5.99999 11.24 6.09999 11.54L7.68999 16.3C7.97999 17.17 9.17999 17.23 9.55999 16.4L15.9 2.42C16.28 1.57 15.41 0.699997 14.57 1.09Z"
        fill="#231D14"
      />
    </g>
    <defs>
      <clipPath id="clip0_399_9070">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0 0.98999)"
        />
      </clipPath>
    </defs>
  </Svg>
);

export default Locate;
