/** @format */
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { CircularProgress } from "@material-ui/core";

const enterAnimation = keyframes`
       0% {
  opacity: 0;
  transform: translateY(10%) translateX(-50%);
}
50% {
  opacity: 0;
  transform: translateY(10%) translateX(-50%);
}

100% {
  opacity: 0.6;
  transform: translateY(0%) translateX(-50%); 
}
    `;

const WideButton = styled.button`
  border-radius: 30px;
  text-transform: none;
  white-space: nowrap;
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

  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "50%")};

  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  bottom: ${(props) => props.bottom && props.bottom};
  top: ${(props) => props.top && props.top};

  position: ${(props) => props.position};
  z-index: ${(props) => props.zIndex};
  animation: ${(props) =>
    props.animation &&
    css`
      ${enterAnimation} 2s
    `};
`;

const LoaderWrapper = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const SubmitButton = ({
  text,
  backgroundColor,
  textColor,
  position,
  bottom,
  top,
  marginLeft,
  zIndex,
  animation,
  loading,
  disabled,

  handleButtonClick,
}) => {
  return (
    <WideButton
      type="submit"
      backgroundColor={backgroundColor}
      textColor={textColor}
      position={position}
      bottom={bottom}
      top={top}
      marginLeft={marginLeft}
      zIndex={zIndex}
      animation={animation}
      loading={loading}
      disabled={disabled}
      onClick={handleButtonClick}
    >
      {text}
      {loading && (
        <LoaderWrapper>
          <CircularProgress size={30} />{" "}
        </LoaderWrapper>
      )}
    </WideButton>
  );
};
