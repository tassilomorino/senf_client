/** @format */

import React, { FC, useRef } from "react";
import styled from "styled-components";

// Components
import { ContentDropdownProps } from "./ContentDropdown.types";
import { ContentDropdownItemProps } from "../contentDropdownItem/ContentDropdownItem.types";
import ContentDropdownItem from "../contentDropdownItem/ContentDropdownItem";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { LayerWhiteFirstDefault } from "../layerStyles/LayerStyles";
import Box from "../box/Box";

const Wrapper = styled.div`
  position: relative;
`;

const DropDownListContainer = styled.div<ContentDropdownProps>`
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

const ContentDropdown: FC<ContentDropdownProps> = ({
  data,
  itemType,
  direction,
  OpenButton,
  Content,
  openButtonWidth,
  open,
  setOpen,
  size,
}) => {
  const outerRef = useRef(null);

  useOnClickOutside(outerRef, () => setOpen && setOpen(false));

  return (
    <Wrapper ref={outerRef}>
      {OpenButton && <Box width={openButtonWidth}>{OpenButton}</Box>}
      {open && (
        <DropDownListContainer direction={direction}>
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
          {Content}
        </DropDownListContainer>
      )}
    </Wrapper>
  );
};

export default ContentDropdown;
