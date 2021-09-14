/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import styled, { css, keyframes } from "styled-components";

const enterAnimation = keyframes`
    0% {
      opacity: 0;
      transform: scale(0.7) translateX(-50%);
    }
  
    80% {
      opacity: 0;
      transform: scale(0.7) translateX(-50%);
    }
  
    90% {
      opacity: 1;
      transform: scale(1.1) translateX(-50%);
    }
  
    100% {
      opacity: 1;
      transform: scale(1) translateX(-50%);
    }
    `;

const WideButton = styled.button`
  border-radius: 30px;
  text-transform: none;
  font-size: 14pt;
  height: 50px;
  font-family: Futura PT W01 Book;
  box-shadow: rgb(38, 57, 77, 0.7) 0px 20px 30px -15px;
  padding-left: 20px;
  padding-right: 20px;
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-50%);
  margin-left: 50%;

  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  bottom: ${(props) => (props.bottom ? props.bottom : null)};
  position: ${(props) => props.position};
  animation: ${(props) =>
    props.animation &&
    css`
      ${enterAnimation} 2.5s
    `};
`;

const CustomButton = ({
  text,
  backgroundColor,
  textColor,
  position,
  bottom,
  animation,
  handleButtonClick,
}) => {
  const { t } = useTranslation();
  return (
    <WideButton
      onClick={handleButtonClick}
      backgroundColor={backgroundColor}
      textColor={textColor}
      position={position}
      bottom={bottom}
      animation={animation}
    >
      {text}
    </WideButton>
  );
};

export default CustomButton;
