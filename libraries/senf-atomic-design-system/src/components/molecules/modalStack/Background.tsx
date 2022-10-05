import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { a, useTransition } from "@react-spring/web";

const Background = styled.div`
  position: fixed;
  inset: 0;
  background: black;
  z-index: 9998;
`;
const BackgroundWrapper = ({ stack, closeModal }) => {
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [pointerEvents, setPointerEvents] = useState("none");
  useEffect(() => {
    setPointerEvents(stack.length > 0 ? "auto" : "none");
  }, [stack.length]);

  const backgroundTransition = useTransition(stack.length, {
    from: { opacity: 0 },
    leave: { opacity: 0 },
    enter: { opacity: 0.5 },
    update: { opacity: backgroundOpacity || 0.5 },
  });
  return backgroundTransition((style, item) => {
    return item ? (
      <a.div
        style={{ ...style, pointerEvents }}
        onClick={closeModal}
      >
        <Background />
      </a.div>
    ) : null;
  });
};
export default BackgroundWrapper;
