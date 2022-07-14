import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import wave from "../../../assets/lottieFiles/senf-wave.json";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  overflow: hidden;
  top: ${({ top }) => top && top};
  position: ${({ position }) => position || "absolute"};
  z-index: 0;
  pointer-events: none;
  transition: 2s;
`;

const Block = styled.div`
  display: block;
  position: relative;
  width: 150%;
  height: 1570px;
  opacity: 1;
  background-color: ${({ color, theme }) =>
    color || theme.colors.beige.beige20};
`;
const Wave = ({ position, top, color }) => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: wave,
      color: "green",
    });
  }, []);

  return (
    <Wrapper position={position} top={top}>
      <div
        style={{
          width: "500px",
          height: "200px",
          position: "absolute",
          top: "-60px",
          zIndex: 99999,
        }}
        ref={container}
      ></div>
      <Block id="wave" color={color} />
    </Wrapper>
  );
};

export default memo(Wave);
