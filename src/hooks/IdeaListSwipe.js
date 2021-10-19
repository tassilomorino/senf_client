/** @format */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const IdeaListSwipe = ({ children, loading }) => {
  const openScream = useSelector((state) => state.UI.openScream);

  const [position, setPosition] = useState("bottom");
  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight - 120}px)`,
    overflow: "scroll",
    touchAction: "none",
  }));

  const bind = useDrag(
    ({ down, movement: [, my], offset: [, y] }) => {
      if (my < -100) {
        set({
          y: down ? my : 100,
          transform:
            !down && position !== "bottom"
              ? `translateY(${141}px)`
              : `translateY(${0}px)`,
          touchAction: "unset",
        });
        setPosition("top");
      }
      if (my > 150) {
        set({
          y: down ? my : window.innerHeight - 120,
          transform: down
            ? `translateY(${0}px)`
            : `translateY(${window.innerHeight - 120}px)`,
          touchAction: "none",
        });
        setPosition("bottom");
      }

      set({ y: down ? my : 0 });
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
        top: -window.innerHeight + 341,
        bottom: window.innerHeight - 120,
      },
    }
  );

  useEffect(() => {
    if (openScream) {
      set({
        y: 0,
        transform: `translateY(${window.innerHeight - 120}px)`,
        touchAction: "none",
      });
      setPosition("bottom");
    }
  }, [openScream]);

  return (
    <animated.div className={!loading ? "drag" : ""} {...bind()} style={props}>
      {children}
    </animated.div>
  );
};

export default IdeaListSwipe;
