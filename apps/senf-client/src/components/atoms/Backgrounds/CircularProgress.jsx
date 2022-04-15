import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
from {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
to {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
}

`;
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const StyledDiv = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: transparent;
  border-width: 4px;
  border-style: solid;
  border-color: rgb(0, 150, 136) rgb(34, 34, 34) rgb(34, 34, 34);
  border-image: initial;
  animation: ${rotate} 1s linear 0s infinite normal none running;
`;

export function CircularProgress() {
  return (
    <StyledWrapper>
      <StyledDiv />
    </StyledWrapper>
  );
}
export default CircularProgress;
