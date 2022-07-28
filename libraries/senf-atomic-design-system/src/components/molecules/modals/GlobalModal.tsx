/** @format */

import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "@react-spring/web";
import { ModalProps } from "./Modal.types";
import SwipeWrapper from "./SwipeWrapper";


const Wrapper = styled.div<{ zIndex: number}>`
  z-index: ${({ zIndex }) => zIndex || 9999};
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  animation: opacityAndPointerEventsAnimation 0.5s;
  transition: 1000ms;
`;
const Background = styled.div<{ opacity: number}>`
  position: absolute;
  background-color: rgba(0, 0, 0, ${({ opacity }) => opacity / 2 || 0.5});
  width: 100%;
  height: 100%;
  top: 0;
  z-index: -1;
  transition: 300ms;
  `;
const Content = styled.div<{ opacity: number}>`
  z-index: 10;
  position: absolute;
  margin: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(${({ opacity }) => opacity / 10 + 0.9 || 0});
  width: 100vw;
  opacity: ${({ opacity }) => opacity || 1};
  transition: 300ms;
`;
const Sheet = styled.div<ModalProps>`
  left: 50%;
  width: ${({ size }) => {
    switch (size) {
      case "xl": return "1200px";
      case "l": case "lg": return "800px";
      case "m": case "md": return "600px";
      default: return "400px";
    }
  }};
  min-height: 320px;
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

const GlobalModal: FC<ModalProps> = ({
  modal,
  onClose
}) => {
  const [ opacity, setOpacity ] = useState(1);
  const [ triggerClose, setClose ] = useState(false);
  const close = () => {
    setOpacity(0.001)
    setClose(true)
    setTimeout(() => {
      onClose();
      setOpacity(1)
      setClose(false)
    }, 300);
  }
  const { children, swipe, size, height } = modal[0]
  return (<>
    {children &&
      <Wrapper>
        { swipe &&
          <SwipeWrapper height={height} triggerClose={triggerClose} onDrag={setOpacity} onClose={onClose}>
            <Sheet size={size}>{children}</Sheet>
          </SwipeWrapper>
        }
        { !swipe &&
          <Content opacity={opacity} show={!!children}>
            <Sheet size={size}>{children}</Sheet>
          </Content>
        }
        <Background onClick={close} opacity={opacity} />
      </Wrapper>
    }
  </>);
};

export default GlobalModal;
