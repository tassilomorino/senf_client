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

const IdeaPin: FC<SVGRProps> = ({ color = "black", transform }) => (
  <Svg
    width="43" height="51" viewBox="0 0 43 51" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="IdeaPin"
    transform={transform}
  >
    <title>IdeaPin</title>
    <g filter="url(#filter0_ddd_1129_15128)">
      <circle cx="21.5" cy="40.0283" r="1.97167" fill="black" fillOpacity="0.01" shapeRendering="crispEdges" />
    </g>
    <g filter="url(#filter1_f_1129_15128)">
      <path fillRule="evenodd" clipRule="evenodd" d="M18.5 40L35.5 26.5L23.5 42.5C22 44.5 18.5 42.7223 18.5 40Z" fill="#867C63" fillOpacity="0.5" />
    </g>
    <mask id="path-3Inside-1_1129_15128" fill="white">
      <path fillRule="evenodd" clipRule="evenodd" d="M21.5 0C16.2447 0 11.9844 4.26037 11.9844 9.51562C11.9844 14.7709 16.2447 19.0312 21.5 19.0312C26.7552 19.0312 31.0156 14.7709 31.0156 9.51562C31.0156 4.26037 26.7552 0 21.5 0Z" />
    </mask>
    <path fillRule="evenodd" clipRule="evenodd" d="M21.5 0C16.2447 0 11.9844 4.26037 11.9844 9.51562C11.9844 14.7709 16.2447 19.0312 21.5 19.0312C26.7552 19.0312 31.0156 14.7709 31.0156 9.51562C31.0156 4.26037 26.7552 0 21.5 0Z" fill={color} />
    <path d="M21.5 -1.5C15.4163 -1.5 10.4844 3.43195 10.4844 9.51562H13.4844C13.4844 5.0888 17.0732 1.5 21.5 1.5V-1.5ZM10.4844 9.51562C10.4844 15.5993 15.4163 20.5312 21.5 20.5312V17.5312C17.0732 17.5312 13.4844 13.9424 13.4844 9.51562H10.4844ZM21.5 20.5312C27.5837 20.5312 32.5156 15.5993 32.5156 9.51562H29.5156C29.5156 13.9424 25.9268 17.5312 21.5 17.5312V20.5312ZM32.5156 9.51562C32.5156 3.43195 27.5837 -1.5 21.5 -1.5V1.5C25.9268 1.5 29.5156 5.0888 29.5156 9.51562H32.5156Z" fill="black" fillOpacity="0.08" mask="url(#path-3Inside-1_1129_15128)" />
    <path fillRule="evenodd" clipRule="evenodd" d="M19.2031 9.84375C17.573 9.84375 16.25 8.52075 16.25 6.89062C16.25 5.2605 17.573 3.9375 19.2031 3.9375C20.8333 3.9375 22.1562 5.2605 22.1562 6.89062C22.1562 8.52075 20.8333 9.84375 19.2031 9.84375Z" fill="white" fillOpacity="0.75" />
    <path fillRule="evenodd" clipRule="evenodd" d="M21.499 41.9998C20.4123 41.9998 19.5303 41.1178 19.5303 40.031V23.6248C19.5303 22.538 20.4123 21.656 21.499 21.656C22.5858 21.656 23.4678 22.538 23.4678 23.6248V40.031C23.4678 41.1178 22.5858 41.9998 21.499 41.9998Z" fill="#867C63" />
    <path fillRule="evenodd" clipRule="evenodd" d="M21.499 41.9998C20.4123 41.9998 19.5303 41.1178 19.5303 40.031V23.6248C19.5303 22.538 20.4123 21.656 21.499 21.656C22.5858 21.656 23.4678 22.538 23.4678 23.6248V40.031C23.4678 41.1178 22.5858 41.9998 21.499 41.9998Z" fill="white" fillOpacity="0.5" />
    <path fillRule="evenodd" clipRule="evenodd" d="M21.499 41.9998C20.4123 41.9998 19.5303 41.1178 19.5303 40.031V23.6248C19.5303 22.538 20.4123 21.656 21.499 21.656C22.5858 21.656 23.4678 22.538 23.4678 23.6248V40.031C23.4678 41.1178 22.5858 41.9998 21.499 41.9998Z" stroke="#867C63" strokeWidth="1.5" />
    <path fillRule="evenodd" clipRule="evenodd" d="M21.499 41.9998C20.4123 41.9998 19.5303 41.1178 19.5303 40.031V23.6248C19.5303 22.538 20.4123 21.656 21.499 21.656C22.5858 21.656 23.4678 22.538 23.4678 23.6248V40.031C23.4678 41.1178 22.5858 41.9998 21.499 41.9998Z" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
    <defs>
      <filter id="filter0_ddd_1129_15128" x="10.5283" y="29.0566" width="21.9434" height="21.9434" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="4.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.266667 0 0 0 0 0.249524 0 0 0 0 0.206667 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1129_15128" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="2.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.266667 0 0 0 0 0.249524 0 0 0 0 0.206667 0 0 0 0.4 0" />
        <feBlend mode="normal" in2="effect1_dropShadow_1129_15128" result="effect2_dropShadow_1129_15128" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.266667 0 0 0 0 0.249524 0 0 0 0 0.206667 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="effect2_dropShadow_1129_15128" result="effect3_dropShadow_1129_15128" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_1129_15128" result="shape" />
      </filter>
      <filter id="filter1_f_1129_15128" x="13.5" y="21.5" width="27" height="26.8566" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur_1129_15128" />
      </filter>
    </defs>
  </Svg>
);

export default IdeaPin;
