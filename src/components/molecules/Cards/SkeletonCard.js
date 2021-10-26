/** @format */

import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: rgb(255, 255, 255, 0);
  width: 95%;
  position: relative;

  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  margin-bottom: 10px;
  height: 11em;
  opacity: 0;
  animation: animation 0.8s;

  @keyframes animation {
    0% {
      opacity: 0;
      transform: translateY(50%) translateX(20%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%) translateX(0%);
    }
  }
`;

const SkeletonCard = () => {
  return <Card />;
};

export default SkeletonCard;
