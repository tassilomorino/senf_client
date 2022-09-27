/** @format */

import React, { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { useTransition, animated } from "@react-spring/web";
import { DropdownListContainerProps } from "./ContentDropdown.types";
import DropdownList from "./DropdownList";
import { LayerWhiteFirstDefault } from "../layerStyles/LayerStyles";
import { useVisibility } from "../../../hooks/useIntersection";

const Container = styled(animated.div) <DropdownListContainerProps>`
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: absolute;
  width: auto;
  min-width: max-content;
  height: auto;
  padding: ${({ theme }) => theme.space[2]};
  gap: ${({ theme }) => theme.space[2]};
  border-radius:  ${({ theme }) => `${theme.radii[2]}px`};

  top: ${({ options, theme }) => options?.y === "down" ? `calc(100% + ${theme.space[2]})` : null};
  bottom: ${({ options, theme }) => options?.y === "up" ? `calc(100% + ${theme.space[2]})` : null};
  left: ${({ options }) => options?.x === "right" ? 0 : null};
  right: ${({ options }) => options?.x === "left" ? 0 : null};

  transform-origin: ${({ options }) => `${options?.y === "up" ? "bottom" : "top"} ${options?.x === "left" ? "right" : "left"}`};

  ${() => LayerWhiteFirstDefault}
  box-shadow: ${({ theme }) => theme.shadows[0]}${({ theme }) =>
    theme.colors.greyscale.greyscale20tra
  };
`;
const DropdownListContainer: FC<DropdownListContainerProps> = ({
  data,
  options,
}) => {
  const [open, setOpen] = useState(!!options?.open)
  const [isVisible, container] = useVisibility()
  const [x, setX] = useState<string | undefined>("right")
  const [y, setY] = useState<string | undefined>("down")

  const transitions = useTransition(open, {
    from: { opacity: 0, scaleX: 0.9, scaleY: 0.7 },
    enter: { opacity: 1, scaleX: 1, scaleY: 1 },
    leave: { opacity: 0, scaleX: 0.9, scaleY: 0.7 },
    config: { tension: 1000, friction: 40 },
  })

  const tries = useRef(0)
  useEffect(() => {
    if (typeof isVisible !== "string" || tries.current > 9) return
    if (["left", "right"].includes(isVisible)) setX(isVisible)
    if (["up", "down"].includes(isVisible)) setY(isVisible)
    tries.current++
  }, [isVisible])
  useEffect(() => {
    setOpen(!!options?.open)
  }, [options])
  useEffect(() => {
    options?.setOpen?.(open)
  }, [open])
  return transitions(
    (styles, item) => item &&
      <Container style={{ ...styles, zIndex: 9999 }} options={{ x, y, ...options }} ref={container}><DropdownList data={data} options={options} />
      </Container>
  )
};

export default DropdownListContainer;
