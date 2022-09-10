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
  margin-top: ${({ marginTop }) => marginTop || ""};
  margin-bottom: ${({ marginBottom }) => marginBottom || ""};
  margin-left: ${({ marginLeft }) => marginLeft || ""};
  margin-right: ${({ marginRight }) => marginRight || ""};
  margin-block: ${({ marginBlock }) => marginBlock || ""};
  margin-inline: ${({ marginInline }) => marginInline || ""};

  padding: ${({ padding }) => padding || "0"};
  padding-top: ${({ paddingTop }) => paddingTop || ""};
  padding-bottom: ${({ paddingBottom }) => paddingBottom || ""};
  padding-left: ${({ paddingLeft }) => paddingLeft || ""};
  padding-right: ${({ paddingRight }) => paddingRight || ""};
  padding-block: ${({ paddingBlock }) => paddingBlock || ""};
  padding-inline: ${({ paddingInline }) => paddingInline || ""};

  flex-direction: ${({ flexDirection }) =>
    flexDirection === "column" ? "column" : "row"};
  align-items: ${({ alignItems }) => alignItems || null};
  justify-content: ${({ justifyContent }) => justifyContent || null};
  gap: ${({ gap }) => gap || null};
  flex-wrap: ${({ flexWrap }) => flexWrap || null};
  z-index: ${({ zIndex }) => zIndex || undefined};
  transform: ${({ transform }) => transform || undefined};
  pointer-events: ${({ pointerEvents }) => pointerEvents || undefined};
  box-sizing: border-box;
  transition: ${({ transition }) => transition || undefined};
  
`;

const Box: FC<BoxProps> = ({
  children,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      {children}
    </Wrapper>
  );
};

export default Box;
