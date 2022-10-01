/** @format */

import React, { FC, useRef, useEffect } from "react";
import styled from "styled-components";
import lottie from 'lottie-web/build/player/lottie_light.min.js'
import { LoaderProps } from "./Loader.types";
import DotLoader from "../../../assets/lottieFiles/dotLoader.json";

const StyledLoader = styled.div<LoaderProps>`
  width: ${({ width }) => (width || "100%")};
  height: ${({ height }) => (height || "100%")};
  position: relative;
  fill: ${({ color }) => color || "inherit"};
  transform: scale(3);
`;
const Loader: FC<LoaderProps> = ({ width, height, color }) => {
  const container = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: DotLoader,
    });
    return () => {
      anim.destroy();
    }
  }, []);

  return <StyledLoader height={height} width={width} color={color} ref={container} />;
};

export default Loader;
