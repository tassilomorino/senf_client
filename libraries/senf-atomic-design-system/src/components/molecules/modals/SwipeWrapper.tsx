/** @format */

import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useDrag } from "@use-gesture/react";
import { a, useSpring, config } from "@react-spring/web";
import ModalHandle from "../modalStack/ModalHandle";

const sheet = {
  zIndex: 100,
  position: "fixed",
  left: "50%",
  bottom: "-40px",
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

interface SwipeWrapperProps {
  height: number
  children: React.ReactNode
  triggerClose: boolean
  onClose: () => void
  onDrag: (delta: number) => void
}

const SwipeWrapper: FC<SwipeWrapperProps> = ({
  height = 320,
  children,
  triggerOpen,
  onClose,
  onDrag,
  overflowing
}) => {
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

  return (
    <a.div
      {...bindContainer}
      style={{
        display,
        bottom: `calc(${height - 50}px)`,
        y,
        ...sheet
      }}
    >
      <Handle {...bindHandle} onClick={dragged < 70 && onClose || null} />
      {children}
    </a.div>
  );
};

export default SwipeWrapper;
