/** @format */

import React from "react";
import { animated } from "@react-spring/web";

export const Card = (props) => {
  return (
    <animated.div
      {...props}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        flex: 1,
        backgroundImage: "linear-gradient(#4340f7, #46bfee)",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 24,
        userSelect: "none",
        color: "white",
        alignItems: "center",
        zIndex: 999,
        ...props.style,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 50,
          height: 4,
          backgroundColor: "rgba(220,220,220,0.4)",
          top: 12,
          borderRadius: 4,
          margin: "0 auto",
          left: 0,
          right: 0,
        }}
      />
      {props.children}
    </animated.div>
  );
};
