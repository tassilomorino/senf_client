/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import { BoxProps } from "./Box.types";

const Wrapper = styled.div<BoxProps>`
  display: ${({ display }) => display || "flex"};

  position: ${({ position }) => position || "relative"};
  top: ${({ top }) => top || undefined};
  bottom: ${({ bottom }) => bottom || undefined};

  left: ${({ left }) => left || undefined};
  right: ${({ right }) => right || undefined};
  height: ${({ height }) => height || "auto"};
  width: ${({ width }) => width || "auto"};
  max-width: ${({ maxWidth }) => maxWidth || "auto"};

  margin: ${({ margin }) => margin || "0"};
  flex-direction: ${({ flexDirection }) =>
    flexDirection === "column" ? "column" : "row"};
  align-items: ${({ alignItems }) => alignItems || null};
  justify-content: ${({ justifyContent }) => justifyContent || null};
  gap: ${({ gap }) => gap || null};
  flex-wrap: ${({ flexWrap }) => flexWrap || null};
  z-index: ${({ zIndex }) => zIndex || undefined};
  transform: ${({ transform }) => transform || undefined};
  pointer-events: ${({ pointerEvents }) => pointerEvents || undefined};
`;

const Box: FC<BoxProps> = ({
  children,
  display,
  position,
  flexDirection,
  gap,
  margin,
  width,
  maxWidth,
  top,
  bottom,
  left,
  right,
  transform,
  zIndex,
  alignItems,
  justifyContent,
  height,
  flexWrap,
  pointerEvents,
}) => {
  return (
    <Wrapper
      display={display}
      position={position}
      flexDirection={flexDirection}
      gap={gap}
      margin={margin}
      height={height}
      width={width}
      maxWidth={maxWidth}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      transform={transform}
      zIndex={zIndex}
      alignItems={alignItems}
      justifyContent={justifyContent}
      flexWrap={flexWrap}
      pointerEvents={pointerEvents}
    >
      {children}
    </Wrapper>
  );
};

export default Box;
