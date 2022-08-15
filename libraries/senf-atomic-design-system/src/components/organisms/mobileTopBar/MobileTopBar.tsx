/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import { InfoPageMainApp } from "../../..";
import Info from "../../../assets/icons/Info";
import User from "../../../assets/icons/User";
import LogoText from "../../../assets/logo/LogoText";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import ModalButton from "../../molecules/modalStack/ModalButton";
import { MobileTopBarProps } from "./MobileTopBar.types";

const Wrapper = styled.div<MobileTopBarProps>`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  margin: 16px;
  height: 50px;
  width: calc(100% - 32px);

  background: linear-gradient(
      0deg,
      rgba(134, 124, 99, 0.01),
      rgba(134, 124, 99, 0.01)
    ),
    #ffffff;
  border: 2px solid #ffffff;
  box-shadow: 0px 20px 60px rgba(134, 124, 99, 0.15),
    0px -5px 10px rgba(255, 255, 255, 0.3),
    0px 10px 20px -6px rgba(134, 124, 99, 0.1);
  border-radius: 14px;
  z-index: 1;

  transform: ${({ hide }) => (hide ? "scale(0.5)" : "scale(1)")};
  opacity: ${({ hide }) => (hide ? "0" : "1")};
  pointer-events: ${({ hide }) => (hide ? "none" : "all")};
  transition: 0.5s;
`;

const MobileTopBar: FC<MobileTopBarProps> = ({
  setShowUI,
  handleOpenMyAccount,
  hide,
}) => (
  <Wrapper hide={hide}>
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      margin="0px 10px 0px 16px"
      gap="10px"
      height="100%"
    >
      <LogoText transform="scale(1.2)" />
      <Box gap="0px" flexDirection="row">
        <Button
          variant="tertiary"
          size="small"

          onClick={() => handleOpenMyAccount(true)}
          icon={<User />}
        />


        <ModalButton
          variant="tertiary"
          size="small"
          icon={<Info />}
          options={{ swipe: true, size: "lg", height: window.innerHeight + 83, padding: 0, onBeforeOpen: () => setShowUI(false), onBeforeClose: () => setShowUI(true) }}>
          <InfoPageMainApp />
        </ModalButton>
      </Box>
    </Box>
  </Wrapper>
);

export default MobileTopBar;
