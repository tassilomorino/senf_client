/** @format */

import React from "react";
import styled from "styled-components";
//ICONS
import lamploader from "../../../images/lamp.png";
import Logo from "../../../images/AddPlease.png";
import { Background } from "./GradientBackgrounds";

const Wrapper = styled.div`
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;

  @media (min-width: 768px) {
    position: relative;
  }
`;

const LoaderImg = styled.img`
  z-index: 999;
  margin-top: -5vh;
  width: 150px;
  transform: scale(1);
  animation: lampAnimation 10s ease-in-out infinite;

  @keyframes lampAnimation {
    0% {
      transform: scale(1);
    }

    10% {
      transform: scale(1.3);
    }

    20% {
      transform: scale(1);
    }

    30% {
      transform: scale(1.3);
    }

    40% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.3);
    }

    60% {
      transform: scale(1);
    }

    70% {
      transform: scale(1.3);
    }

    80% {
      transform: scale(1);
    }

    90% {
      transform: scale(1.3);
    }

    100% {
      transform: scale(1);
    }
  }
`;
const Loader = () => {
  return (
    <Wrapper>
      <LoaderImg src={lamploader} alt="loader-icon" />
      <Background />
      {/* <div
        style={{
          width: "100%",
          height: "120px",
          backgroundColor: "#fed947",
          bottom: 0,
          position: "fixed",
          borderRadius: "20px 20px 0 0px",
        }}
      /> */}

      {/* <img src={lamploader} className="lamploader" alt="loader-icon" /> */}
    </Wrapper>
  );
};

export default Loader;
