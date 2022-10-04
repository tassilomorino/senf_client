/** @format */

import React, { FC, SVGProps } from "react";
import styled from "styled-components";

interface SVGRProps {
    color?: string;
    transform?: string;
}

const Svg = styled.svg`
  transform: ${({ transform }) => (transform || undefined)};
`;

const Eye: FC<SVGRProps> = ({ color = "black", transform }) => (
    <Svg
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="Eye"
        transform={transform}
    >
        <title>Eye</title>
        <g
            id="Icons"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g id="Eye" fill={color}>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.00043 2.12C12.2404 2.12 14.8204 5.42 15.5104 6.43C16.1604 7.38 16.1604 8.65 15.5104 9.6C14.8204 10.61 12.2404 13.91 8.00043 13.91C3.76043 13.91 1.18043 10.61 0.49043 9.6C-0.15957 8.65 -0.15957 7.38 0.49043 6.43C1.18043 5.42 3.76043 2.12 8.00043 2.12ZM8.00043 12.4C11.5004 12.4 13.6804 9.61 14.2704 8.75V8.74C14.5704 8.29999 14.5704 7.71 14.2704 7.27C13.6904 6.42 11.5004 3.62 8.00043 3.62C4.50043 3.62 2.32043 6.41 1.73043 7.27C1.43043 7.72 1.43043 8.31 1.73043 8.75C2.31043 9.6 4.50043 12.4 8.00043 12.4ZM10.7504 8.01001C10.7504 9.52879 9.51921 10.76 8.00043 10.76C6.48164 10.76 5.25043 9.52879 5.25043 8.01001C5.25043 6.49123 6.48164 5.26001 8.00043 5.26001C9.51921 5.26001 10.7504 6.49123 10.7504 8.01001Z" fill="#231D14"/>
            </g>
        </g>
    </Svg>
);

export default Eye;
