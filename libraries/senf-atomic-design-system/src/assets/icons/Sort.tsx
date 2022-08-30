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

const Sort = ({
  filled,
  transform,
  topFill,
  bottomFill
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 16 17"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="Sort"
    transform={transform}
  >
    <title>Sort</title>
    <g id="Sort, Size=Small">
      <path id="Vector" fillRule="evenodd" clipRule="evenodd" d="M3.29297 11.713C2.90234 12.1036 2.90234 12.7359 3.29297 13.1265L6.58597 16.4195C6.96544 16.799 7.47305 17.0048 7.99975 17.0048C8.52645 17.0048 9.03406 16.799 9.41353 16.4195L12.7065 13.1265C13.0972 12.7359 13.0972 12.1036 12.7065 11.713C12.3159 11.3224 11.6836 11.3224 11.293 11.713L7.99862 15.0051L4.70653 11.713C4.3159 11.3224 3.6836 11.3224 3.29297 11.713Z" fill={topFill} />
      <path id="Vector_2" fillRule="evenodd" clipRule="evenodd" d="M12.7065 6.28701C13.0971 5.89638 13.0971 5.26409 12.7065 4.87346L9.41351 1.58046C9.03404 1.20099 8.52643 0.995236 7.99973 0.995236C7.47303 0.995236 6.96542 1.20099 6.58595 1.58046L3.29295 4.87346C2.90232 5.26409 2.90232 5.89638 3.29295 6.28701C3.68359 6.67764 4.31588 6.67764 4.70651 6.28701L8.00086 2.99492L11.293 6.28701C11.6836 6.67764 12.3159 6.67764 12.7065 6.28701Z" fill={bottomFill} />
    </g>
  </Svg>
);

export default Sort;
