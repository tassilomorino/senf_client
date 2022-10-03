/** @format */

import React, { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";

// Components
import { DropdownListContainerProps } from "./ContentDropdown.types";
import { ContentDropdownItemProps } from "../contentDropdown/ContentDropdownItem.types";
import ContentDropdownItem from "../contentDropdown/ContentDropdownItem";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { LayerWhiteFirstDefault } from "../layerStyles/LayerStyles";
import Button from "../buttons/Button";

const Wrapper = styled.div`
  position: relative;
`;

const DropDownListContainer = styled.div<DropdownListContainerProps>`
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  z-index: 99;
  position: fixed;
  margin-top: -40px;
  width: auto;
  min-width: max-content;
  height: auto;
  padding: ${({ theme }) => theme.space[2]};
  gap: ${({ theme }) => theme.space[2]};
  border-radius: 12px;
  transform: ${(props) =>
    props.direction === "downLeft"
      ? "translateY(45px) translateX(calc(-100% + 50px))"
      : props.direction === "downRight"
      ? "translateY(45px)"
      : props.direction === "upLeft"
      ? "translateY(calc(-100% - 10px)) translateX(calc(-100% + 50px))"
      : props.direction === "upRight"
      ? "translateY(calc(-100% - 10px))"
      : "translateY(45px)"};

  ${() => LayerWhiteFirstDefault}
  box-shadow: ${({ theme }) => theme.shadows[0]}${({ theme }) =>
    theme.colors.greyscale.greyscale20tra};
  @media (min-width: 768px) {
  }
`;

const ContentDropdown: FC<DropdownListContainerProps> = ({
  data,
  itemType,
  button,
  openButton,
  content,
  open = false,
  setOpen,
  size,
  ...props
}) => {
  const outerRef = useRef(null);
  const [openState, setOpenState] = useState(open);

  const CustomButton = button || Button;
  useOnClickOutside(outerRef, () => setOpenState(false));

  useEffect(() => {
    setOpen?.(openState);
  }, [openState]);

  useEffect(() => {
    setOpenState(open);
  }, [open]);
  return (
    <Wrapper>
      {openButton && (
        <CustomButton
          onClick={() => setOpenState(!openState)}
          {...props}
        />
      )}
      {openState && (
        <DropDownListContainer ref={outerRef}>
          {data?.length &&
            data.length > 0 &&
            data.map((item: ContentDropdownItemProps, key: number) => (
              <ContentDropdownItem
                key={key}
                {...item}
                type={itemType || item.type}
                size={size}
              />
            ))}
          {content}
        </DropDownListContainer>
      )}
    </Wrapper>
  );
};

export default ContentDropdown;
