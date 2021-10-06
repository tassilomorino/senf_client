/** @format */
import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const Top = 141;

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
  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight - 150}px)`,
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
    ({ tap, swipe: [, swipeY], down, movement: [, my], offset: [, y] }) => {
      console.log();
      if (my < -200) {
        set({
          y: down ? my : 100,
          scale: down ? 0.9 : 1,
          backgroundColor: down ? "green" : "lightgreen",
          transform: down ? `translateY(${0}px)` : `translateY(${141}px)`,
        });
      }
      if (my > 200) {
        set({
          y: down ? my : window.innerHeight - 100,
          scale: down ? 0.9 : 1,
          transform: down
            ? `translateY(${0}px)`
            : `translateY(${window.innerHeight - 150}px)`,
        });
      }
      //   if (tap) console("Tap!");
      //   if (swipeY) console(`Swipe ${swipeY > 0 ? "Bottom" : "Top"}`);

      if (gesture === "movement")
        set({ y: down ? my : 0, scale: down ? 0.9 : 1 });
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
      <div className="Swipecontainer">
        <animated.div className="drag" {...bind()} style={props} />
      </div>
    </>
  );
};

export default SwipeCard;
