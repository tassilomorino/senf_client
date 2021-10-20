/** @format */

import React from "react";
import styled from "styled-components";
//ICONS
import lamploader from "../../../images/lamp.png";

const Wrapper = styled.div`
  z-index: 99;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  top: 0;

  background-attachment: fixed;
  background-image: linear-gradient(to bottom, #ffd19b, #ffda53, #ffffff);
  background-repeat: no-repeat;
  background: -webkit-linear-gradient(to left, #ffd19b, #ffda53, #ffffff);

  @media (min-width: 768px) {
    position: fixed;
    width: 400px;
    height: 100vh;
    top: 0;
  }
`;
const Loader = () => {
  return (
    <Wrapper>
      <img src={lamploader} className="lamploader" alt="loader-icon" />
    </Wrapper>
  );
};

export default Loader;
