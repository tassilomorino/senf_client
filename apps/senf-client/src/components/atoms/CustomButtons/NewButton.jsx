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
  border: 1px ${(props) => (props.borderType ? props.borderType : "solid")}
    rgba(186, 160, 79, 0.35);

  margin: ${(props) => (props.margin ? props.margin : "0")};
`;
const ButtonText = styled.p`
  width: auto; /* 82px */
  height: auto; /* 18px */
  flex-shrink: 0;
  white-space: pre;
  overflow: visible;
  font-weight: 600;
  font-style: normal;
  font-family: "Nunito", serif;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  letter-spacing: 0px;
  line-height: 1.3;
  text-align: center;
`;
const NewButton = ({ handleButtonClick, children, borderType, margin }) => {
  return (
    <StyledButton
      onClick={handleButtonClick}
      borderType={borderType}
      margin={margin}
    >
      <ButtonText> {children}</ButtonText>
    </StyledButton>
  );
};

export default NewButton;
