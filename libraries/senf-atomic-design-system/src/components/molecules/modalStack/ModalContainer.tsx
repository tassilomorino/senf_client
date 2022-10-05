import React, { useState } from "react";

import styled from "styled-components";
import { useDrag } from "@use-gesture/react";
import { a, useSpring, config, to } from "@react-spring/web";

import theme from "../../../styles/theme";
import ModalHandle from "./ModalHandle";
import ModalActionButtons from "./ModalActionButtons";
import ModalHeader from "./ModalHeader";
import { ModalContainerProps, ModalOptions } from "./ModalStack.types";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";

const ClickEventBlocker = styled.div`
  position: absolute;
  inset: 0;
`;

const getWidth = ({ size }: ModalOptions = {}) => {
  switch (size) {
    case "full":
      return "max(calc(100vw - 20px), min(983px, 100vw))";
    case "xl":
      return "983px";
    case "l":
    case "lg":
      return "614px";
    case "s":
    case "sm":
      return "240px";
    case "m":
    case "md":
    default:
      return "384px";
  }
};
const getMaxHeight = (
  { size, maxHeight, isMobile }: ModalOptions = {},
  padding = 0
) => {
  if (maxHeight) return `${maxHeight}px`;
  if (size === "full" || isMobile) return `calc(100vh - 20px + ${padding}px)`;
  return `calc(100vh - 80px + ${padding}px)`;
};

const sheet = {
  position: "relative",
  backgroundColor: "white",
  minHeight: "120px",
  borderRadius: `${theme.radii[5]}px`,
  padding: 0,
};
const toner = {
  position: "absolute",
  background: "hsl(45deg 13% 33%)",
  // background: theme.colors.greyscale.greyscale100,
  borderRadius: `${theme.radii[5]}px`,
  touchAction: "none",
};

const ModalContainer = ({
  item,
  index,
  style,
  closeModal,
}: ModalContainerProps) => {
  const { type: ModalComponent, props } = item;
  const options = item.options || {};

  const height = options?.height || 0.0001;
  const realHeight = 500;

  options.onClose = closeModal;
  options.isMobile = isMobileCustom();

  const [innerHeight, setInnerHeight] = React.useState(0);
  const [outerHeight, setOuterHeight] = React.useState(0);
  const [overflowing, setOverflowing] = React.useState(options?.swipe);
  const wrapperRef = React.useRef<HTMLElement>(null);
  const sheetRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      setInnerHeight(sheetRef.current?.offsetHeight || 0);
      setOuterHeight(wrapperRef.current?.offsetHeight || 0);
      setOverflowing(outerHeight < innerHeight);
    }, 0);
  }, [innerHeight, outerHeight]);

  // if swipe
  const [{ y }, api] = useSpring(() => ({ y: height }));
  const [dragged, setDragged] = useState(0);
  const swipePadding = 1000;
  const open = ({ canceled }) => {
    api.start({
      y: 0,
      immediate: false,
      config: canceled ? config.wobbly : config.stiff,
    });
  };
  const close = (velocity = 0) => {
    // onDrag(0.001)
    api.start({
      y: height + swipePadding,
      immediate: false,
      config: { ...config.stiff, velocity },
      onRest: () => closeModal(),
    });
  };

  const bind = useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
      canceled,
    }) => {
      setDragged(my);

      if (my < -70) cancel();
      if (!last) return api.start({ y: my, immediate: true });
      if (my > realHeight * 0.2 || (vy > 0.5 && dy > 0)) return close(vy);

      return open({ canceled });
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  const bindContainer = !overflowing && { ...bind() };
  const bindHandle = overflowing && { ...bind() };

  const PADDING = options?.isMobile ? 100 : 0;
  const outerStyle = {
    ...style,
    ...toner,
    y: to([y, style?.y || 0], (dragged, offset) => dragged + offset),
    width: getWidth(options),
    maxWidth: "100vw",
    maxHeight: getMaxHeight(options, PADDING),
    overflow: overflowing ? "scroll" : "hidden",
    bottom: options?.isMobile ? -PADDING : "auto",
  };
  const innerStyle = {
    ...sheet,
    opacity: style?.shading,
    paddingBottom: options?.isMobile ? PADDING : sheet.padding,
  };
  // console.log(ModalComponent, typeof ModalComponent)
  // if (typeof ModalComponent !== "string") return null
  return (
    <a.div
      {...bindContainer}
      style={outerStyle}
      ref={wrapperRef}
    >
      <a.div
        style={innerStyle}
        ref={sheetRef}
      >
        <div
          {...bindHandle}
          style={{ position: "sticky", top: 0, zIndex: 99 }}
        >
          <ModalHandle {...options} />
        </div>
        <ModalHeader {...options} />

        {options?.style ? (
          <div style={{ ...options?.style }}>
            <ModalComponent {...props} />
          </div>
        ) : (
          <ModalComponent {...props} />
        )}
        <ModalActionButtons {...options} />
        {index > 0 && <ClickEventBlocker onClick={closeModal} />}
      </a.div>
    </a.div>
  );
};

export default ModalContainer;
