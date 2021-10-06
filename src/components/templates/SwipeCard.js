/** @format */

import React, { useState, useEffect } from "react";

import { useGesture } from "@use-gesture/react";
import { a, useSpring, config } from "@react-spring/web";
import clamp from "lodash-es/clamp";
const getY = (height, mode) => {
  if (mode === "collapsed") {
    return height * 1 - 100;
  }
  return 75;
};
const SwipeCard = ({ defaultMode, height, children }) => {
  const [mode, setMode] = useState(defaultMode);
  const [{ y }, set] = useSpring(() => ({
    y: getY(height, mode),
    config: config.gentle,
  }));
  const collapsedY = getY(height, "collapsed");
  const expandedY = getY(height, "expanded");

  useEffect(() => {
    set({ y: mode === "collapsed" ? collapsedY : expandedY });
  }, [mode, collapsedY, expandedY, set]);

  const calculateNextY = (down, currentY, deltaY, velocity) => {
    if (down) {
      return currentY + deltaY;
    }

    const threshold = 100 / velocity;

    if (mode === "expanded") {
      return deltaY > threshold ? collapsedY : expandedY;
    }

    if (mode === "collapsed") {
      return deltaY < -threshold ? expandedY : collapsedY;
    }

    return getY(height, mode);
  };
  const bind = useGesture({
    onDrag: ({
      down,
      movement: [, my],
      delta: [_, deltaY],
      velocity,
      temp = y.get(),
    }) => {
      velocity = clamp(velocity, 1, 8);

      if (!down) {
        if (mode === "expanded" && my > 70) {
          setMode("collapsed");
        } else if (mode === "collapsed" && my < -70) {
          setMode("expanded");
        }
      }

      const nextY = calculateNextY(down, temp, deltaY, velocity);

      set({
        y: nextY,
      });

      return temp;
    },
    // onHover: ({ hovering }) => {
    //   if (mode === "collapsed") {
    //     set({
    //       y: hovering ? getY(height, mode) - 10 : getY(height, mode)
    //     });
    //   }
    // }
  });

  return (
    <a.div
      {...bind()}
      style={{
        height,
        pointerEvents: "all",
        zIndex: 999,
        width: "100%",
        bottom: 0,
        position: "fixed",
        transform: y.interpolate((y) => `translateY(calc(${y}px))`),
      }}
    >
      {children}
    </a.div>
  );
};

export default SwipeCard;
