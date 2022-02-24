import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 10px 14px 10px;
  background-color: rgba(186, 160, 79, 0.1);
  overflow: visible;
  border-radius: 10px;
  border: 1px dashed rgba(186, 160, 79, 0.35);
`;
const DashedButton = ({ handleButtonClick, children }) => {
  return <StyledButton onClick={handleButtonClick}>{children}</StyledButton>;
};

export default DashedButton;
