/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import TertiaryButton from "../../atoms/buttons/TertiaryButton";
import Typography from "../../atoms/typography/Typography";
import { SubNavbarProps } from "./SubNavbar.types";

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
`;

const HandleBar = styled.div`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  width: 50px;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.primary.primary120};
  border-radius: 5px;
`;

const LeftWrapper = styled.div<SubNavbarProps>`
  position: absolute;
  top: 8px;
  left: 12px;
  display: flex;
  height: 100%;
  align-items: center;
`;
const CenterWrapper = styled.div<SubNavbarProps>`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  height: 100%;
  align-items: center;
`;
const RightWrapper = styled.div<SubNavbarProps>`
  position: absolute;
  top: 8px;
  right: 12px;
  display: flex;
  height: 100%;
  align-items: center;
`;
const SubNavbar: FC<SubNavbarProps> = ({
  leadingIcon,
  textLeft,
  leftButtonClick,
  header,
  textRight,
  trailingIcon,
  handlebar,
}) => {
  const isMobile = isMobileCustom();
  return (
    <Wrapper>
      {handlebar && isMobile && <HandleBar />}
      <LeftWrapper onClick={leftButtonClick}>
        <TertiaryButton
          iconLeft={leadingIcon}
          text={textLeft}
        />
      </LeftWrapper>

      <CenterWrapper>
        <Typography variant="h3">{header}</Typography>
      </CenterWrapper>

      <RightWrapper>
        {textRight || trailingIcon ? (
          <TertiaryButton
            trailingIcon={trailingIcon}
            text={textRight}
          />
        ) : (
          <div />
        )}
      </RightWrapper>
    </Wrapper>
  );
};

export default SubNavbar;
