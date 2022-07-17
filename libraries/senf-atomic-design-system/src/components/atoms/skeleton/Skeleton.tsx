/** @format */

import React, { FC } from "react";
import styled, { keyframes, css } from "styled-components";
import { SkeletonProps } from "./Skeleton.types";

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonContainer = styled.div``;

const SkeletonItem = styled.span`
  animation: ${skeletonKeyframes} ${(props) => props.duration}s ease-in-out
    infinite;
  background-color: ${(props) => props.baseColor};
  background-image: linear-gradient(
    90deg,
    ${(props) => props.baseColor},
    ${(props) => props.highlightColor},
    ${(props) => props.baseColor}
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  display: inline-block;
  position: relative;
  margin-bottom: ${(props) => props.spacing}px;
  width: ${(props) => props.width}px;
  max-width: 100%;
  height: ${(props) => props.height}px;
  user-select: none;
  border-radius: ${(props) => props.borderRadius}px;
`;

const Wrapper = styled.div<SkeletonProps>``;

const Skeleton: FC<SkeletonProps> = ({
  baseColor = "#eee",
  highlightColor = "#f5f5f5",
  count = 1,
  duration = 1.2,
  height = 20,
  spacing = 8,
  borderRadius = 2,
  width = "200",
}) => {
  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push(
      <SkeletonItem
        key={count}
        baseColor={baseColor}
        duration={duration}
        height={height}
        width={width}
        highlightColor={highlightColor}
        spacing={spacing}
        borderRadius={borderRadius}
      >
        &zwnj;
      </SkeletonItem>
    );
  }

  return <SkeletonContainer>{elements}</SkeletonContainer>;
};

export default Skeleton;
