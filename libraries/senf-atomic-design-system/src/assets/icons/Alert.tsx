/** @format */

import * as React from "react";
import { SVGProps } from "react";
import styled from "styled-components";

interface SVGRProps {
  color?: string;
  transform?: string;
  filled?: boolean;
}

const Svg = styled.svg`
  transform: ${({ transform }) => (transform || undefined)};
`;

const Alert = ({
  filled,
  color = "black",
  transform,
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 16 17"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="Alert"
    transform={transform}
  >
    <title>Alert</title>
    <g id="Icons/Alert" fill={color}>
      {filled ? <path id="🎨-Icon-Color" d="M15.55 11.4199L10.85 3.26994C9.57999 1.07994 6.41999 1.07994 5.14999 3.26994L0.449988 11.4199C-0.820012 13.6099 0.769988 16.3599 3.29999 16.3599H12.7C15.23 16.3599 16.82 13.6199 15.55 11.4199ZM7.12999 6.33994C7.12999 5.86994 7.51999 5.48994 8.00999 5.48994C8.49999 5.48994 8.88999 5.86994 8.88999 6.33994V9.12994C8.88999 9.59994 8.49999 9.97994 8.00999 9.97994C7.51999 9.97994 7.12999 9.59994 7.12999 9.12994V6.33994ZM8.00999 13.4899C7.45999 13.4899 7.00999 13.0399 7.00999 12.4899C7.00999 11.9399 7.45999 11.4899 8.00999 11.4899C8.55999 11.4899 9.00999 11.9399 9.00999 12.4899C9.00999 13.0399 8.55999 13.4899 8.00999 13.4899Z" /> :
        <path fillRule="evenodd" clipRule="evenodd" d="M9.54999 4.02999C9.07999 3.22 8.30999 3.13 7.99999 3.13V3.12C7.68999 3.12 6.91999 3.21 6.44999 4.02L1.74999 12.18C1.27999 12.99 1.58999 13.7 1.74999 13.97C1.89999 14.24 2.36999 14.87 3.29999 14.87H12.7C13.63 14.87 14.09 14.24 14.25 13.97C14.41 13.7 14.72 12.99 14.25 12.18L9.54999 4.02999ZM5.14999 3.27C5.77999 2.17 6.88999 1.62 7.99999 1.62C9.10999 1.62 10.22 2.17 10.85 3.27L15.55 11.42C16.82 13.62 15.23 16.36 12.7 16.36H3.29999C0.769988 16.36 -0.820012 13.61 0.449988 11.42L5.14999 3.27ZM7.13 6.33999C7.13 5.86999 7.52001 5.48999 8.01 5.48999C8.5 5.48999 8.89001 5.86999 8.89001 6.33999V9.12999C8.89001 9.59999 8.5 9.97999 8.01 9.97999C7.52001 9.97999 7.13 9.59999 7.13 9.12999V6.33999ZM8 13.49C8.55228 13.49 9 13.0423 9 12.49C9 11.9377 8.55228 11.49 8 11.49C7.44772 11.49 7 11.9377 7 12.49C7 13.0423 7.44772 13.49 8 13.49Z" />}
    </g>
  </Svg>
);

export default Alert;
