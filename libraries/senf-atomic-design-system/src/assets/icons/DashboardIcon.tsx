/** @format */
import React, { FC, SVGProps } from "react";
import styled from "styled-components";

interface SVGRProps {
  color?: string;
  transform?: string;
  filled?: boolean;
}

const Svg = styled.svg`
  transform: ${({ transform }) => transform || undefined};
`;

const DashboardIcon: FC<SVGRProps> = ({ color = "black", transform }) => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 16 17"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="DashboardIcon"
    transform={transform}
  >
    <title>DashboardIcon</title>
    <g id="DashboardIcon">
      <path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.12 10.25H2.25C1.01 10.25 0 9.24 0 8V3.5C0 2.12 1.12 1 2.5 1H5.12C6.36 1 7.37 2.01 7.37 3.25V8C7.37 9.24 6.36 10.25 5.12 10.25ZM2.5 2.5C1.95 2.5 1.5 2.95 1.5 3.5V8C1.5 8.41 1.84 8.75 2.25 8.75H5.13C5.54 8.75 5.88 8.41 5.88 8V3.25C5.88 2.84 5.54 2.5 5.13 2.5H2.5ZM10.87 6.5H13.74C14.98 6.5 15.99 5.49 15.99 4.25V3.5C15.99 2.12 14.87 1 13.49 1H10.87C9.63 1 8.62 2.01 8.62 3.25V4.25C8.62 5.49 9.63 6.5 10.87 6.5ZM10.13 3.25C10.13 2.84 10.47 2.5 10.88 2.5H10.89H13.51C14.06 2.5 14.51 2.95 14.51 3.5V4.25C14.51 4.66 14.17 5 13.76 5H10.88C10.47 5 10.13 4.66 10.13 4.25V3.25ZM10.88 17H13.5H13.51C14.89 17 16.01 15.88 16.01 14.5V10C16.01 8.76 15 7.75 13.76 7.75H10.88C9.64001 7.75 8.63 8.76 8.63 10V14.75C8.63 15.99 9.64001 17 10.88 17ZM10.13 10C10.13 9.59 10.47 9.25 10.88 9.25H13.75C14.16 9.25 14.5 9.59 14.5 10V14.5C14.5 15.05 14.05 15.5 13.5 15.5H10.88C10.47 15.5 10.13 15.16 10.13 14.75V10ZM2.5 17H5.12H5.13C6.37 17 7.38 15.99 7.38 14.75V13.75C7.38 12.51 6.37 11.5 5.13 11.5H2.25C1.01 11.5 0 12.51 0 13.75V14.5C0 15.88 1.12 17 2.5 17ZM1.49 13.75C1.49 13.34 1.83 13 2.24 13H2.25H5.11C5.52 13 5.86 13.34 5.86 13.75V14.75C5.86 15.16 5.52 15.5 5.11 15.5H2.49C1.94 15.5 1.49 15.05 1.49 14.5V13.75Z"
        fill="#231D14"
      />
    </g>
  </Svg>
);

export default DashboardIcon;
