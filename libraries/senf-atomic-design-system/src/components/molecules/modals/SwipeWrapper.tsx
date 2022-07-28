/** @format */

import React, { FC, useEffect, useRef, useState } from "react";
import { useDrag } from "@use-gesture/react";
import { a, useSpring, config } from "@react-spring/web";
import styled from "styled-components";
import { ModalProps } from "./Modal.types";



const sheet = {
  zIndex: 100,
  position: "fixed",
  left: "50%",
  top: '50%',
  transform: "translateX(-50%)",
  marginInline: "auto",
  height: "calc(100vh + 100px)",
  display: "flex",
  touchAction: "none",
}

interface SwipeWrapperProps {
  height: number
  children: React.ReactNode
  triggerClose: boolean
  onClose: () => void
  onDrag: (delta: number) => void
}

const SwipeWrapper: FC<SwipeWrapperProps> = ({height = 550, children, triggerClose, onClose, onDrag}) => {
  const [{ y }, api] = useSpring(() => ({ y: height }));
  const [dragged, setDragged] = useState(0);

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
      y: height + 200,
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

      if (my > height * 0.5 || (vy > 0.5 && dy > 0)) return close(vy);

      return open({ canceled });
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true
    }
  );

  const display = y.to((py) => (py < height ? "block" : "none"));

  useEffect(() => {
    if (triggerClose) close()
  }, [triggerClose]);

  useEffect(() => {
    open({ canceled: false });
  }, []);

  useEffect(() => {
    onDrag(1 - ((1 / height) * dragged));
  }, [onDrag, dragged, height]);

  return (
    <a.div
      {...bind()}
      style={{ 
        display, bottom: `calc(-100vh + ${height - 100}px)`, y, ...sheet
      }}
    >
      {children}
    </a.div>
  );
};

export default SwipeWrapper;
