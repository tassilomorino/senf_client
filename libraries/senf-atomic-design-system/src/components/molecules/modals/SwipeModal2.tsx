/** @format */

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import React, { FC, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { trapFocus } from "../../../hooks/trapFocus";
import { SwipeModalProps } from "./SwipeModal.types";

import { isMobileCustom } from "../../../hooks/customDeviceDetect";

const DragWrapper = styled(animated.div)`
  z-index: ${({ zIndex }) => zIndex || 9999};
  overscroll-behavior: contain;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  left: 0;

  overflow: ${({ overflow }) => overflow || "scroll"};
  background-color: ${({ backgroundColor }) => backgroundColor || "white"};
  border-radius: ${({ theme }) => theme.radii[4]}px
    ${({ theme }) => theme.radii[4]}px 0px 0px;
  box-shadow: ${({ theme }) => theme.shadows[0]}
    ${({ theme }) => theme.colors.brown.brown20tra};

  position: fixed;

  animation: translateYFrom100to16pxAnimation 0.5s;

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
  z-index: ${({ zIndex }) => zIndex || 9998};

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
`;

const SwipeModal: FC<SwipeModalProps> = ({
  HeaderComponent,
  headerComponentHeight,
  headerComponentBackgroundColor,
  openModal,
  setOpenModal,
  children,
  zIndex,
  size,
  backgroundColor,
  overflow,
}) => {
  const isMobile = isMobileCustom();
  // const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (openModal) {
      handleOpen();
    }
  }, []);

  const [props, set] = useSpring(() => ({
    y: 0,
    transform: isMobile ? `translateY(${16}px)` : "translate(-50%, -50%)",
    overflow: "scroll",
    touchAction: "unset",
    userSelect: "none",
  }));

  const setSpring = (transform: number, overflowType: string, touchAction: string, userSelect: string) => {
    const spring = {}
    if (transform) spring.transform = isMobile ? `translateY(${transform}px)` : "translate(-50%, -50%)"
    if (overflowType) spring.overflow = overflow
    if (touchAction) spring.touchAction = touchAction
    if (userSelect) spring.userSelect = userSelect
    set(spring);
  }

  const handleOpen = () => {
    setOpenModal(true);
    setTimeout(() => {
      setSpring(16, "scroll", "unset", "none");
      // set({
      //   transform: isMobile ? `translateY(${16}px)` : "translate(-50%, -50%)",
      //   overflow: "scroll",
      //   touchAction: "unset",
      //   userSelect: "none",
      // });
    }, 50);
  };

  const handleClose = () => {
    setSpring(window.innerHeight, null, "none", "none");

    // set({
    //   transform: `translateY(${window.innerHeight}px)`,
    //   touchAction: "none",
    // });
    setTimeout(() => {
      setOpenModal(false);
    }, 600);

    // focus modal trigger again
    // buttonRef?.current?.focus();
  };

  // const submitRef = useRef<HTMLButtonElement>(null);
  // const closeRef = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   if (submitRef?.current) {
  //     submitRef?.current.focus();
  //   }
  // }, []);

  const bind = useDrag(
    ({ last, down, movement: [, my], offset: [, y] }) => {
      const el = document.getElementById("swipeModal");

      if (last && el.scrollTop < 30 && my > 150) {
        handleClose();
      } else {
        set({
          transform: `translateY(${16}px)`,
          touchAction: "unset",
        });
      }
      set({ y: down ? my : 0 });
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
        top: -window.innerHeight / 2,
        bottom: window.innerHeight - 120,
      },
    }
  );

  return (
    openModal &&
    ReactDOM.createPortal(
      <React.Fragment>
        <Background $zIndex={zIndex - 1} onClick={handleClose} />
        <DragWrapper
          style={props}
          $zIndex={zIndex}
          $backgroundColor={backgroundColor}
          overflow={overflow}
          role="dialog"
          size={size}
          aria-labelledby="modal-header"
          id="swipeModal"
        // onKeyDown={
        //   (e) =>
        //     submitRef?.current &&
        //     closeRef?.current &&
        //     trapFocus(e, submitRef.current, closeRef.current) // ideally we would use inert but it doesn't seem to be working
        // }
        >
          {HeaderComponent ? (
            <React.Fragment>
              <Header
                headerComponentHeight={headerComponentHeight}
                headerComponentBackgroundColor={headerComponentBackgroundColor}
                {...bind()}
              >
                {HeaderComponent}
              </Header>
              {childraen}
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
      </React.Fragment>,
      document.body
      // document.getElementById(portalId) as HTMLElement
    )
  );
};

export default SwipeModal;
