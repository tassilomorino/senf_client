/** @format */
import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const ScreamDialogSwipe = ({ children, loading }) => {
  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight / 2}px)`,
    overflowY: "hidden",
    touchAction: "none",
  }));

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

      set({ y: down ? my : 0, scale: down ? 1 : 1 });
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
        top: -window.innerHeight + 241,
        bottom: window.innerHeight - 120,
        left: 0,
        right: 0,
      },
    }
  );

  return (
    <animated.div
      className={!loading ? "screamDialogDrag" : ""}
      {...bind()}
      style={props}
    >
      {children}
    </animated.div>
  );
};

export default ScreamDialogSwipe;
