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

const Bin: FC<SVGRProps> = ({ color = "black", transform }) => (
    <Svg
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="Bin"
        transform={transform}
    >
        <title>Bin</title>
        <g
            id="Icons"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g id="Bin" fill={color}>
                <path fillRule="evenodd" clipRule="evenodd" d="M15 2.51001H11.34V2.26001C11.34 1.02001 10.33 0.0100098 9.09 0.0100098H6.91C5.67 0.0100098 4.66 1.02001 4.66 2.26001V2.51001H1C0.45 2.51001 0 2.96001 0 3.51001C0 4.06001 0.45 4.51001 1 4.51001H1.61L2.14 13.42C2.23 14.87 3.43 16.01 4.89 16.01H11.12C12.57 16.01 13.78 14.87 13.87 13.42L14.4 4.51001H15.01C15.56 4.51001 16.01 4.06001 16.01 3.51001C16.01 2.96001 15.56 2.51001 15.01 2.51001H15ZM6.16 2.26001C6.16 1.85001 6.5 1.51001 6.91 1.51001H9.09C9.5 1.51001 9.84 1.85001 9.84 2.26001V2.51001H6.16V2.26001ZM12.36 13.33C12.32 13.99 11.77 14.51 11.11 14.51H4.89C4.23 14.51 3.68 13.99 3.64 13.33L3.12 4.51001H12.89L12.37 13.33H12.36ZM6.38 12.13C6.79 12.13 7.13 11.79 7.13 11.38V7.39001C7.13 6.98001 6.79 6.64001 6.38 6.64001C5.97001 6.64001 5.63 6.98001 5.63 7.39001V11.39C5.63 11.8 5.97001 12.14 6.38 12.14V12.13ZM10.38 11.38C10.38 11.79 10.04 12.13 9.63 12.13V12.14C9.22001 12.14 8.88 11.8 8.88 11.39V7.39001C8.88 6.98001 9.22001 6.64001 9.63 6.64001C10.04 6.64001 10.38 6.98001 10.38 7.39001V11.38Z" fill="#EB4E48"/>
            </g>
        </g>
    </Svg>
);

export default Bin;
