/** @format */
import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const SwipeCard = () => {
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
  const [props, set] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));

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
    ({
      tap,
      swipe: [swipeX, swipeY],
      down,
      movement: [mx, my],
      offset: [x, y],
    }) => {
      if (tap) console("Tap!");
      if (swipeX) console(`Swipe ${swipeX > 0 ? "Right" : "Left"}`);
      if (swipeY) console(`Swipe ${swipeY > 0 ? "Bottom" : "Top"}`);
      if (gesture === "movement")
        set({ x: down ? mx : 0, y: down ? my : 0, scale: down ? 1.2 : 1 });
      else set({ x, y, scale: down ? 1.2 : 1 });
    },
    {
      ...rest,
      eventOptions: { pointer },
      threshold: threshold < 0 ? undefined : [threshold, threshold],
      bounds: activateBounds ? bounds : undefined,
      rubberband: activateBounds ? rubberband : 0,
    }
  );

  return (
    <>
      <div className="container">
        {activateBounds && (
          <div
            className="bounds"
            style={{
              width: bounds.right - bounds.left,
              height: bounds.bottom - bounds.top,
              transform: `translate3d(${bounds.left}, ${bounds.top})`,
            }}
          />
        )}
        <animated.div className="drag" {...bind()} style={props} />
      </div>
    </>
  );
};

export default SwipeCard;
