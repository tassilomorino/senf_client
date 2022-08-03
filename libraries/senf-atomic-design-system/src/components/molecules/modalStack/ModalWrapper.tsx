import React from "react";
import styled from "styled-components";
import SwipeWrapper from "../modals/SwipeWrapper";
import ModalHandle from "./ModalHandle";
import { ModalContext } from "./ModalProvider";


interface SheetProps {
  index: number,
  total: number,
  swipe: boolean,
  size: string
}


const Sheet = styled.div<SheetProps>`
  /* animation: opacityAndPointerEventsAnimation 300ms; */
  /* position: fixed; */
  /* max-height: 52vh; */
  opacity: ${({ index }) => Math.min(1, index)};
  pointer-events: ${({ index }) => index === 1 ? "auto" : "none"};
  transform-origin: 0%;
  transform:
    scale(${({ index }) => 1 - (index - 1) / 10})
    translate(
      -50%,
      calc(${({ index, swipe }) => index === 0 && swipe ? "150%" : `${(index - 1) * -60}px - ${swipe ? 0 : 50}%`})
    );
  z-index: ${({ index }) => index === 1 ? 10 : index * -1};
  box-sizing: border-box;
  overflow: ${({ overflow }) => overflow || "scroll"};
  -webkit-overflow-scrolling: touch;
  background-color: ${({ theme }) => theme.colors.greyscale.greyscale100};
  border-radius: ${({ theme }) => theme.radii[4]}px;
  box-shadow: ${({ theme }) => theme.shadows[0]}
    ${({ theme }) => theme.colors.black.black30tra};
  transition: 300ms;
`;

const Content = styled.div<{ index: number }>`
  z-index: 10;
  position: fixed;
  left: 50%;
  top: 50%;
`;
const Background = styled.div<{ index: number }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;
const Toner = styled.div<{ size: string, index: number, swipe: boolean }>`
  padding: 20px;
  padding-bottom: ${({ swipe }) => swipe && "60px"};
  padding-top: ${({ swipe }) => swipe && "40px"};
  opacity: ${({ index }) => 1 / index};
  height: ${({ height }) => height ? `${height}px` : '100%'};
  max-width: 100vw;
  min-height: 320px;
  max-height: calc(100vh - 80px);
  width: ${({ size }) => {
    switch (size) {
      case "xl": return "1200px";
      case "l": case "lg": return "800px";
      case "m": case "md": return "600px";
      default: return "400px";
    }
  }};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor === "primary"
      ? theme.colors.primary.primary100
      : backgroundColor === "beige"
        ? theme.colors.beige.beige20
        : "white"};
  transition: 300ms;
  overflow-x: hidden;
`;

const ModalWrapper = ({
  size,
  swipe,
  index,
  children,
  height,
  setOpacity,
}) => {
  const [triggerOpen, setOpen] = React.useState(0);
  const { handleModal, modalStack } = React.useContext(ModalContext) || {};

  React.useEffect(() => {
    setOpen(modalStack)
  }, [modalStack])

  const close = () => {
    handleModal("pop")
  }
  const Wrapper = swipe ? SwipeWrapper : Content;
  const [innerHeight, setInnerHeight] = React.useState(null);
  const [overflowing, setOverflowing] = React.useState(null);
  const content = React.useRef(null)
  const sheet = React.useRef(null)

  React.useEffect(() => {
    setTimeout(() => {
      setInnerHeight(content.current?.scrollHeight)
      setOverflowing(sheet.current?.scrollHeight < innerHeight)
    }, 0)
  })

  return (
    <Wrapper
      height={height || innerHeight || 320}
      size={size}
      triggerOpen={triggerOpen}
      onDrag={(e) => (modalStack === 2) && setOpacity(e)}
      onClose={close}
      index={index}
      overflowing={overflowing}
    >
      <Background onClick={close} />
      <Sheet index={index} total={modalStack} swipe={swipe} ref={sheet}>
        <Toner size={size} index={index} height={innerHeight} swipe={swipe} ref={content}>
          <ModalHandle swipe={swipe} onClose={close} />
          {children}
          {index}
        </Toner>
      </Sheet>
    </Wrapper>);
};

export default ModalWrapper;