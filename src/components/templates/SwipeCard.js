/** @format */
import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const Top = 141;

const SwipeCard = ({ children }) => {
  const [config, setConfig] = React.useState({
    gesture: "movement",
    enabled: true,
    pointer: false,
    axis: undefined,
    delay: 0,
    fliterTaps: true,
    threshold: 10,
    swipeDist: 100,
    swipeVel: 0.5,
    activateBounds: false,
    rubberband: 0.15,
    bounds: {
      enabled: false,
      top: -100,
      bottom: 100,
      left: -100,
      right: 100,
    },
  });
  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight - 150}px)`,
    overflow: "scroll",
  }));

  const {
    gesture,
    threshold,
    swipeDist,
    swipeVel,
    pointer,
    activateBounds,
    bounds,
    rubberband,
    ...rest
  } = config;

  const bind = useDrag(
    ({ down, movement: [, my], offset: [, y] }) => {
      if (my < -200) {
        set({
          y: down ? my : 100,
          scale: down ? 0.98 : 1,
          backgroundColor: down ? "green" : "lightgreen",
          transform: down ? `translateY(${0}px)` : `translateY(${141}px)`,
          touchAction: "none",
        });
      }
      if (my > 200) {
        set({
          y: down ? my : window.innerHeight - 100,
          scale: down ? 0.98 : 1,
          transform: down
            ? `translateY(${0}px)`
            : `translateY(${window.innerHeight - 150}px)`,
          touchAction: "all",
        });
      }

      if (gesture === "movement")
        set({ y: down ? my : 0, scale: down ? 0.98 : 1 });
    },
    {
      pointer: { touch: true },
      ...rest,
      eventOptions: { pointer },
      threshold: threshold < 0 ? undefined : [threshold, threshold],
      bounds: activateBounds ? bounds : undefined,
      rubberband: activateBounds ? rubberband : 0,
    }
  );

  return (
    <animated.div className="drag" {...bind()} style={props}>
      {children}
    </animated.div>
  );
};

export default SwipeCard;
