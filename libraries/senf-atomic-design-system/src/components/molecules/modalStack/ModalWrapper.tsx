import React from "react";
import styled from "styled-components";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { ModalContext } from "./ModalProvider";
import SwipeWrapper from "../modals/SwipeWrapper";

import RoundedButton from "../../atoms/buttons/RoundedButton";
import { Plus } from "../../../assets/icons";

interface SheetProps {
  index: number,
  total: number
}

const Sheet = styled.div<SheetProps>`
  animation: opacityAndPointerEventsAnimation 0.5s;
  position: absolute;
  opacity: ${({index}) => 1 / (index * 2)};
  transform: scale(${({index}) => 1 - index / 10}) translate(calc(${({index}) => index * -5}% - 50%), calc(${({index}) => index * -60}px - 200px));
  z-index: ${({index}) => index * -1};
  transition: 3000ms;
  /* top: 50%; */
  padding: 20px;
  box-sizing: border-box;
  /* left: 50%; */
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

const Content = styled.div<{ opacity: number}>`
  z-index: 10;
  position: absolute;
  margin: 50px;
  /* top: 50%; */
  left: 50%;
  transform: scale(${({ opacity }) => opacity / -10 + 1.1 || 0});
  transform-origin: 0% 50%;
  width: 100vw;
  opacity: ${({ opacity }) => opacity || 1};
  transition: 300ms;
`;

const ModalWrapper = ({
  size,
  triggerClose: trigger,
  onClose,
  onTransitionEnd,
  swipe,
  index,
  total,
  children,
  height,
  setOpacity,
}) => {
  const [ triggerClose, setClose ] = React.useState(trigger);
  // React.useEffect(() => {
  //   setBgOpacity(1);
    
  const open = () => {
    setBgOpacity(0.001)
    setTimeout(() => {
      setBgOpacity(1)
    }, 300);
  }
  const close = () => {
    if (modalComponents.current.length === 1) {
      setClose(true)
      setBgOpacity(0.001)
    }
    setTimeout(() => {
      onTransitionEnd()
      setBgOpacity(1)
      setClose(false)
    }, 300);
  }

  return (<>
    { swipe &&
      <SwipeWrapper height={height} triggerClose={triggerClose} onDrag={setOpacity} onClose={onTransitionEnd}>
        <Sheet size={size} index={index} total={total}>{children}</Sheet>
      </SwipeWrapper>
    }
    { !swipe &&
      <Content opacity={1} show={!!children}>
        <Sheet size={size} index={index} total={total}>{children}
        <RoundedButton
          style={{position: "absolute", top: "5px", right: "5px", zIndex: 100}}
          icon={<Plus transform="rotate(45deg)" />}
          onClick={() => close}
        /></Sheet>
      </Content>
    }
  </>);
};

export default ModalWrapper;