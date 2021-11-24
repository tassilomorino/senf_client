/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import {
  BackgroundDesktop,
  BackgroundMobile,
} from "../Backgrounds/GradientBackgrounds";

const Wrapper = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  /* background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 100%
  ); */
  background-attachment: fixed;
  background-image: linear-gradient(to bottom, #ffd19b, #ffda53, #ffffff);
  background-repeat: no-repeat;
  background: -webkit-linear-gradient(to left, #ffd19b, #ffda53, #ffffff);
  animation: mainDialogAnimation 0.2s;
  opacity: 0.9;

  @keyframes mainDialogAnimation {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }

    50% {
      opacity: 0.1;
      transform: translateY(50%);
    }

    100% {
      opacity: 0.9;
      transform: translateY(0%);
    }
  }
`;

const MainDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <button onClick={() => setIsOpen(true)}>OPEN </button>
      {isOpen && <Wrapper onClick={() => setIsOpen(false)}></Wrapper>}
    </React.Fragment>
  );
};

export default MainDialog;
