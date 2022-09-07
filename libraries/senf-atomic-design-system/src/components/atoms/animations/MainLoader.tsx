/** @format */

import React, { FC, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import lottie from 'lottie-web/build/player/lottie_svg.min.js'
import { MainLoaderProps } from "./MainLoader.types";
import mainLoader from "../../../assets/lottieFiles/senf-Loader-v012.json";
import Typography from "../typography/Typography";
import Box from "../box/Box";
import LogoText from "../../../assets/logo/LogoText";

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: transparent;
  z-index: 9999999999999;
`;
const MainLoader: FC<MainLoaderProps> = () => {
  const container = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
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
    }, 1500);
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          position: "fixed",
          height: "100%",
          width: "100%",
          backgroundColor: loading ? "#fed957" : "transparent",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          zIndex: 999999999,
        }}
      >
        {loading && (
          <Box gap="30px" flexDirection="column" top="-100px">
            <Box justifyContent="center">
              <LogoText transform="scale(3)" color="white" />
            </Box>
            <Typography
              variant="h2"
              color="white"
              fontSize="30px"
              textAlign="center"
            >
              Ideen für Städte
            </Typography>
          </Box>
        )}
      </div>

      <StyledLoader ref={container} />
    </React.Fragment>
  );
};

export default MainLoader;
