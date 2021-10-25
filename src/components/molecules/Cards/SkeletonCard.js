/** @format */

import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: rgb(255, 255, 255, 0.5);
  width: 95%;
  position: relative;

  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  margin-bottom: 10px;
  height: 11em;
`;

const SkeletonCard = () => {
  return <Card />;
};

export default SkeletonCard;
