import React, { useState } from "react";

import styled from "styled-components";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring, config, to } from "@react-spring/web";

import theme from "../../../styles/theme";
import ModalHandle from "../../molecules/modalStack/ModalHandle";
import ModalHeader from "../../molecules/modalStack/ModalHeader";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";


const getWidth = ({ size }: ModalOptions = { size: "full"}) => {
  switch (size) {
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
      return "384px";
		case "full":
		default:
			return "max(calc(100vw - 20px), min(983px, 100vw))";
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

interface WrapperPorps {
	ref: React.RefObject<HTMLDivElement>;
	style: React.CSSProperties;
	padding: number;
}
const Outer = styled(animated.div)<WrapperPorps>`
	position: absolute;
	background: ${() => theme.colors.palette.grey};
	border-radius: ${() => `${theme.radii[5]}px`};
	touch-action: none;
	max-width: 100vw;
	z-index: 999;
`
const Inner = styled(animated.div)<WrapperPorps>`
	position: relative;
	background-color: white;
	min-height: 120px;
	border-radius: ${() => `${theme.radii[5]}px`};
	padding: 0;
	padding-bottom: ${({paddingBottom}) => paddingBottom};
	z-index: 1;
`
const HandleWrapper = styled.div`
	position: sticky;
	top: 0;
	z-Index: 99;
`

const SwipeWrapper = ({
  item,
  index,
  style,
  closeModal,
	children
}: ModalContainerProps) => {
  const options = item?.options || {};

  const height = options?.height || 1;
  // const height = options?.height || 0.0001;
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
  // const [dragged, setDragged] = useState(0);
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

  const PADDING = options?.isMobile ? 0 : 0;
  // const PADDING = options?.isMobile ? 1000 : 0;
  const outerStyle = {
    ...style,
    y: to([y, style?.y || 0], (dragged, offset) => dragged + offset),
    width: getWidth(options),
    maxHeight: getMaxHeight(options, PADDING),
    overflow: overflowing ? "scroll" : "hidden",
    bottom: options?.isMobile ? -PADDING : "auto",
  };

  return (
    <Outer
			ref={wrapperRef}
      {...bindContainer}
      style={outerStyle}
    >
      <Inner
        ref={sheetRef}
				paddingBottom={PADDING}
				opacity={style?.shading}
      >
        <HandleWrapper {...bindHandle}><ModalHandle {...options} /></HandleWrapper>
        <ModalHeader {...options} />

        {children}
      </Inner>
    </Outer>
  );
};

export default SwipeWrapper;
