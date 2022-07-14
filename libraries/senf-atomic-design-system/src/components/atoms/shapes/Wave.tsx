import React, { memo } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: ${({ top }) => top && top};
  position: ${({ position }) => position || "absolute"};
  z-index: 0;
  pointer-events: none;
  transition: 2s;
`;

const Block = styled.div`
  display: block;
  width: 150%;
  height: 1570px;
  opacity: 1;
  background-color: ${({ color, theme }) =>
    color || theme.colors.beige.beige20};
`;
const Wave = ({ position, top, color }) => (
  <Wrapper position={position} top={top}>
    <div style={{ width: "500px", height: "300px" }}></div>
    <Block id="wave" color={color} />
  </Wrapper>
);

export default memo(Wave);
