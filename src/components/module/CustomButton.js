/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import styled, { css, keyframes } from "styled-components";
import CloseIcon from "../../images/icons/close.png";
import ArrowLeftIcon from "../../images/icons/arrow-left.png";

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
  padding-left: 30px;
  padding-right: 30px;
  min-width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-50%);
  margin-left: 50%;

  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  bottom: ${(props) => props.bottom && props.bottom};
  top: ${(props) => props.top && props.top};
  position: ${(props) => props.position};
  z-index: ${(props) => props.zIndex};
  animation: ${(props) =>
    props.animation &&
    css`
      ${enterAnimation} 2.5s
    `};
`;

export const CustomButton = ({
  text,
  backgroundColor,
  textColor,
  position,
  bottom,
  top,
  zIndex,
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
      top={top}
      zIndex={zIndex}
      animation={animation}
    >
      {text}
    </WideButton>
  );
};

const Icons = {
  Close: CloseIcon,
  ArrowLeft: ArrowLeftIcon,
};

const IconButton = styled.button`
  width: 50px;
  height: 50px;
  color: #353535;
  border-radius: 100%;
  box-shadow: rgb(38, 57, 77, 0.7) 0px 20px 30px -15px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  position: ${(props) => props.position};
  margin-left: ${(props) => props.marginLeft};
`;

export const CustomIconButton = ({
  name,
  position,
  marginLeft,
  top,
  zIndex,
  handleButtonClick,
}) => {
  const Icon = Icons[name];
  return (
    <IconButton
      onClick={handleButtonClick}
      position={position}
      top={top}
      marginLeft={marginLeft}
      zIndex={zIndex}
    >
      <img src={Icon} width="50%" />
    </IconButton>
  );
};
