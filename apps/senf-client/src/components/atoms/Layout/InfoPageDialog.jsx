/** @format */

import React, { useState } from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
/* import {
  BackgroundDesktop,
  BackgroundMobile,
} from "../Backgrounds/GradientBackgrounds";
 */
const portalRoot = document.getElementById("portal-root-dialog");

const OuterWrapper = styled.div`
  position: fixed;
  z-index: 997;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;
const InfoPageDialog = ({ isOpen, setIsOpen, children }) => {
  return ReactDOM.createPortal(
    isOpen && (
      <OuterWrapper>
        {children}
        <Background onClick={() => setIsOpen(false)} />
      </OuterWrapper>
    ),
    portalRoot
  );
};

export default InfoPageDialog;
