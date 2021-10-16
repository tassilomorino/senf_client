/** @format */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const ScreamDialogSwipeCard = ({ children, loading }) => {
  const [config, setConfig] = React.useState({
    gesture: "movement",
    enabled: true,
    pointer: false,
    axis: "y",
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
      left: 0,
      right: 0,
    },
  });
  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight / 2}px)`,
    overflowY: "hidden",
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
      const el = document.querySelector(".screamDialogDrag");

      if (my < -50) {
        set({
          y: down ? my : 100,
          transform: !down ? `translateY(${0}px)` : `translateY(${0}px)`,
          touchAction: "unset",
          overflowY: "scroll",
        });
      } else if (el.scrollTop < 30 && my > 150) {
        set({
          y: down ? my : window.innerHeight - 120,
          transform: down
            ? `translateY(${0}px)`
            : `translateY(${window.innerHeight / 2}px)`,
          touchAction: "none",
          overflowY: "hidden",
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
      bounds: {
        enabled: true,
        top: -window.innerHeight + 241,
        bottom: window.innerHeight - 120,
        left: 0,
        right: 0,
      },
      rubberband: activateBounds ? rubberband : 0,
    }
  );

  return (
    <animated.div className="screamDialogDrag" {...bind()} style={props}>
      {children}
    </animated.div>
  );
};

export default ScreamDialogSwipeCard;
