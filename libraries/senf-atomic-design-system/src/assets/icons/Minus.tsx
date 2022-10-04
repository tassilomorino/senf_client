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

const Minus: FC<SVGRProps> = ({ color = "black", transform }) => (
    <Svg
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="Minus"
        transform={transform}
    >
        <title>Minus</title>
        <g
            id="Icons"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g id="Minus" fill={color}>
                <path fillRule="evenodd" clipRule="evenodd" d="M12.1166 7.00673C12.6138 7.06452 13 7.48736 13 8C13 8.51264 12.6138 8.93548 12.1166 8.99327L12 9H4C3.48736 9 3.06452 8.61378 3.00673 8.11658L3 8C3 7.48736 3.38622 7.06452 3.88342 7.00673L4 7H12L12.1166 7.00673Z" fill="#231D14"/>
            </g>
        </g>
    </Svg>
);

export default Minus;
