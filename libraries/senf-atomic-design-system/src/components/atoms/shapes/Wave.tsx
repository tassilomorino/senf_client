import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import lottie from 'lottie-web/build/player/lottie_svg.min.js'
import waveBeige from "../../../assets/lottieFiles/senf-wave-beige.json";
import waveSenf from "../../../assets/lottieFiles/senf-wave-senf.json";

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
  margin-top: -10px;
  opacity: 1;
  background-color: ${({ color, theme }) =>
    color || theme.colors.beige.beige20};
`;
const Wave = ({ position, top, color }) => {
  const container = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: color === "#fed957" ? waveSenf : waveBeige,
      color: "green",
    });

    return () => {
      anim.destroy();
    }
  }, []);

  return (
    <Wrapper position={position} top={top}>
      <div ref={container}></div>
      <Block id="wave" color={color} />
    </Wrapper>
  );
};

export default memo(Wave);
