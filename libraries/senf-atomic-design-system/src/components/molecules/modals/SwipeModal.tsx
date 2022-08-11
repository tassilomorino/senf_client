/** @format */

import { useSpring, animated, a, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import React, { FC, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { trapFocus } from "../../../hooks/trapFocus";
import { SwipeModalProps } from "./SwipeModal.types";

import { isMobileCustom } from "../../../hooks/customDeviceDetect";

const sheet = {
  zIndex: 100,
  width: "100%",
  position: "fixed",
  left: "0%",
  bottom: "-100px",
  touchAction: "none",

}


const Handle = styled.div<{ position: string }>`
  width: 100%;
  height: 30px;
  top: -50px;
  padding-top: 50px;
  left: 0;
  transform: translateX(-50%);
  position: absolute;
  z-index: 99;
  touch-action: none;
  &::after {
    content: '';
    cursor: pointer;
    width: 50px;
    padding: 10px;
    height: 5px;
    display: block;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
`

const DragWrapper = styled(animated.div)`
  z-index: ${({ zIndex }) => zIndex || 9};
  overscroll-behavior: contain;
  overflow-x: hidden;
  width: 100%;
  height: calc((var(--vh, 1vh) * 100) + 84px);
  left: 0;

  overflow: ${({ overflow }) => overflow || "scroll"};
  background-color: ${({ backgroundColor }) => backgroundColor || "white"};
  border-radius: ${({ theme }) => theme.radii[4]}px
    ${({ theme }) => theme.radii[4]}px 0px 0px;
  box-shadow: ${({ theme }) => theme.shadows[0]}
    ${({ theme }) => theme.colors.brown.brown20tra};

  position: fixed;


  @media (min-width: 768px) {
    top: 50%;
    left: 50%;
    max-width: 400px;
    max-height: calc(100vh - 40px);
    height: auto;
    border-radius: ${({ theme }) => theme.radii[4]}px;
    animation: none;
  }
`;

const Background = styled.div<SwipeModalProps>`
  z-index: ${({ zIndex }) => zIndex || 8};

  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  animation: opacityAndPointerEventsAnimation 0.5s;
`;

export const Header = styled(animated.div)`
  position: sticky;
  width: 100%;
  /* background-color: #fed957; */
  z-index: 25;
  height: ${({ headerComponentHeight }) => headerComponentHeight || "100px"};
  background-color: ${({ headerComponentBackgroundColor }) =>
    headerComponentBackgroundColor || undefined};

  z-index: 99;
  top:0;
`;

const SwipeModal: FC<SwipeModalProps> = ({
  HeaderComponent,
  headerComponentHeight,
  headerComponentBackgroundColor,
  // openModal,
  // setOpenModal,
  // children,
  // zIndex,
  // size,
  backgroundColor,
  // overflow,

  height = window.innerHeight,
  children,
  triggerOpen,
  onClose,
  onDrag,
  overflowing,
}) => {
  const isMobile = isMobileCustom();

  const [{ y }, api] = useSpring(() => ({ y: height }));
  const [dragged, setDragged] = useState(0);

  const swipePadding = 200
  const open = ({ canceled }) => {
    api.start({
      y: 0,
      immediate: false,
      config: canceled ? config.wobbly : config.stiff
    });

  };
  const close = (velocity = 0) => {
    onDrag(0.001)
    api.start({
      y: height + swipePadding,
      immediate: false,
      config: { ...config.stiff, velocity },
      onRest: () => onClose()
    });
  };

  const bind = useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
      canceled
    }) => {
      setDragged(my)

      if (my < -70) cancel();

      if (!last) return api.start({ y: my, immediate: true });

      if (my > height * 0.2 || (vy > 0.5 && dy > 0)) return close(vy);

      return open({ canceled });
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true
    }
  );

  const bindContainer = !overflowing && { ...bind() }
  const bindHandle = overflowing && { ...bind() }

  const display = y.to((py) => (py < height ? "block" : "none"));

  useEffect(() => {
    if (triggerOpen) open({ canceled: false });
  }, [triggerOpen]);

  useEffect(() => {
    open({ canceled: false });
  }, []);

  useEffect(() => {
    onDrag(1 - ((1 / height) * dragged));
  }, [onDrag, dragged, height]);

  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRerender(true)
    }, 50);
  }, [triggerOpen])

  return rerender && <React.Fragment>
    <Background onClick={onClose} /><DragWrapper
      backgroundColor={backgroundColor}
      {...bindContainer}
      style={{
        display,
        bottom: `calc(${height - 50}px)`,
        y,
        ...sheet
      }}
    >
      <Handle {...bindHandle} onClick={dragged < 70 && onClose || null} />


      {HeaderComponent ? (
        <React.Fragment>
          <Header
            headerComponentHeight={headerComponentHeight}
            headerComponentBackgroundColor={headerComponentBackgroundColor}
            {...bind()}
          >
            {HeaderComponent}
          </Header>
          <div
            style={{ marginTop: "-10px", top: "100px", height: "calc(100% - 100px)", width: "100%", overflow: "scroll" }}
          >
            {children}
          </div>
        </React.Fragment>
      ) : (
        <div
          style={{ height: "100%", width: "100%", overflow: "scroll" }}
          {...bind()}
        >
          {children}
        </div>
      )}
    </DragWrapper>
  </React.Fragment>

};

export default SwipeModal;
