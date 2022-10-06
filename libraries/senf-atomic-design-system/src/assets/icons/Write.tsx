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

const Write: FC<SVGRProps> = ({ color = "black", transform }) => (
    <Svg
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="Write"
        transform={transform}
    >
        <title>Write</title>
        <g
            id="Icons"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g id="Write" fill={color}>
                <path fillRule="evenodd" clipRule="evenodd" d="M14.5884 0.989624C14.9654 0.989624 15.3194 1.13562 15.5874 1.40062C16.1374 1.95362 16.1374 2.85162 15.5874 3.40162L8.8354 10.1526C8.5804 10.4076 8.2904 10.6236 7.9724 10.7926L5.8614 11.9196C5.7734 11.9666 5.6804 11.9896 5.5844 11.9896C5.3814 11.9896 5.1894 11.8796 5.0824 11.7016C4.9774 11.5256 4.9724 11.3116 5.0704 11.1286L6.1954 9.01862C6.3654 8.69962 6.5804 8.40862 6.8364 8.15362L13.5884 1.40162C13.8554 1.13662 14.2104 0.989624 14.5884 0.989624ZM2.4337 16.9899H11.5657C12.9087 16.9899 14.0007 15.8979 14.0007 14.5559V8.97292C14.0007 8.55892 13.6647 8.22292 13.2507 8.22292C12.8367 8.22292 12.5007 8.55892 12.5007 8.97292V14.5559C12.5007 15.0709 12.0817 15.4899 11.5657 15.4899H2.4337C1.9197 15.4899 1.5007 15.0709 1.5007 14.5559V4.42392C1.5007 3.90892 1.9197 3.48992 2.4337 3.48992H9.0167C9.4307 3.48992 9.7667 3.15392 9.7667 2.73992C9.7667 2.32592 9.4307 1.98992 9.0167 1.98992H2.4337C1.0917 1.98992 0.000701904 3.08192 0.000701904 4.42392V14.5559C0.000701904 15.8979 1.0917 16.9899 2.4337 16.9899Z" fill="#231D14" />
            </g>
        </g>
    </Svg>

);

export default Write;
