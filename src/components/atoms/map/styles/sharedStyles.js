/** @format */

import styled from "styled-components";

export const PatternBackground = styled.div`
  background-color: #e9e9e9;
  opacity: 1;
  background-image: linear-gradient(#e5e5e5 2.6px, transparent 2.6px),
    linear-gradient(90deg, #e5e5e5 2.6px, transparent 2.6px),
    linear-gradient(#e5e5e5 1.3px, transparent 1.3px),
    linear-gradient(90deg, #e5e5e5 1.3px, #e9e9e9 1.3px);
  background-size: 65px 65px, 65px 65px, 13px 13px, 13px 13px;
  background-position: -2.6px -2.6px, -2.6px -2.6px, -1.3px -1.3px,
    -1.3px -1.3px;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
`;
