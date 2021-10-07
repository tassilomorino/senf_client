/** @format */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const Top = 141;

const SwipeCard = ({ children, loading }) => {
  const { openScream } = useSelector((state) => state.UI);

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
    transform: `translateY(${window.innerHeight - 120}px)`,
    overflow: "scroll",
    touchAction: "none",
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
      if (my < -100) {
        set({
          y: down ? my : 100,
          scale: down ? 1 : 1,
          backgroundColor: down ? "green" : "lightgreen",
          transform: down ? `translateY(${0}px)` : `translateY(${141}px)`,
          touchAction: "unset",
        });
      }
      if (my > 100) {
        set({
          y: down ? my : window.innerHeight - 100,
          scale: down ? 1 : 1,
          transform: down
            ? `translateY(${0}px)`
            : `translateY(${window.innerHeight - 120}px)`,
          touchAction: "none",
        });
      }

      if (gesture === "movement")
        set({ y: down ? my : 0, scale: down ? 1 : 1 });
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

  useEffect(() => {
    if (openScream) {
      set({
        y: 0,
        transform: `translateY(${window.innerHeight - 120}px)`,
        touchAction: "none",
      });
    }
  }, [openScream]);

  return (
    <animated.div className={!loading ? "drag" : ""} {...bind()} style={props}>
      {children}
    </animated.div>
  );
};

export default SwipeCard;
