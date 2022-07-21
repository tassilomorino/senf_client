/** @format */

import React, { FC, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { trapFocus } from "../../../hooks/trapFocus";
import { LayerWhiteFirstDefault } from "../../atoms/layerStyles/LayerStyles";
import SubNavbar from "../navs/SubNavbar";
import { ModalProps } from "./Modal.types";
import Button from "../../atoms/buttons/Button";
import Box from "../../atoms/box/Box";


const Wrapper = styled.div<ModalProps>`
  z-index: ${({ zIndex }) => zIndex || 999999999};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: ${({ size }) =>
    size === "xl"
      ? "1200px"
      : size === "l"
      ? "800px"
      : size === "m"
      ? "600px"
      : "400px"};
  max-height: calc(100vh - 40px);
  overflow: ${({ overflow }) => overflow || "scroll"};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor === "primary"
      ? theme.colors.primary.primary100
      : backgroundColor === "beige"
      ? theme.colors.beige.beige20
      : "white"};
  border-radius: ${({ theme }) => theme.radii[4]}px;

  box-shadow: ${({ theme }) => theme.shadows[0]}
    ${({ theme }) => theme.colors.brown.brown20tra};
  transition: 0.2s;
`;
const ModalContainer = styled.div`
  z-index: ${({ zIndex }) => zIndex || 9998};
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;
const Background = styled.div<ModalProps>`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  `;
const Content = styled.div<ModalProps>`
  z-index: 10;
  position: absolute;
  margin: 50px;
`;

const GlobalModal: FC<ModalProps> = ({
  modal,
  onClose,
  swipeable
}) => {
  return (<>
    {modal &&
      <ModalContainer>
        <Content>{modal}</Content>
        <Background onClick={onClose} />
      </ModalContainer>
    }
  </>);
};

export default GlobalModal;
