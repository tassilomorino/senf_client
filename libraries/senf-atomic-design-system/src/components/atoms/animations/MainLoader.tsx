/** @format */

import React, { FC, useRef, useEffect } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import { MainLoaderProps } from "./MainLoader.types";
import mainLoader from "../../../assets/lottieFiles/senf-Loader-v01.json";

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: transparent;
  z-index: 9999999999999;
`;
const MainLoader: FC<MainLoaderProps> = () => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: mainLoader,

      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });
  }, []);

  return <StyledLoader ref={container} />;
};

export default MainLoader;
