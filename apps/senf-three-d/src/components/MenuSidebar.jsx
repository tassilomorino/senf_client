/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  Tag,
  RoundedButton,
  Divider,
  Plus,
  ModalButton
} from "senf-atomic-design-system";
import logo from "../../assets/logo_yellow.png";
import InfoPage from "./InfoPage";

const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 200px;
  background-color: #f8f8f8;
  left: ${({ openInfoModal }) => (openInfoModal ? "-300px" : "0px")};
  transition: left 0.3s ease-in-out;
  z-index: 2;
`;

const RoundedButtonWrapper = styled.div`
  position: relative;
  top: -110px;
  height: 0;
  transform: ${({ componentsSidebarOpen }) =>
    componentsSidebarOpen
      ? "translate(-50%, -50%) rotate(45)"
      : "translate(-50%, -50%)"};
  left: ${({ componentsSidebarOpen }) =>
    componentsSidebarOpen ? "600px" : "180px"};
  transition: 0.5s ease-out;
`;

const MenuSidebar = ({
  componentsSidebarOpen,
  setComponentsSidebarOpen,
  setOpenInfoModal,
  openInfoModal,
  restart,
  setOpenSaveModal,
}) => {
  return (
    <Wrapper openInfoModal={openInfoModal}>
      <Box
        flexDirection="column"
        width="calc(100% - 40px)"
        height="calc(100% - 40px)"
        margin="20px"
        gap="10px"
      >
        <img
          src={logo}
          width="80px"
          style={{ margin: "20px 0px 65px 0px" }}
          alt="logo"
        />

        <Box flexDirection="column" gap="10px">
          <ModalButton variant="secondary" text="Info" options={{ swipe: false, size: "lg", onBeforeOpen: () => setOpenInfoModal(true), onBeforeClose: () => setOpenInfoModal(false) }}>
            <InfoPage />
          </ModalButton>


          <Button variant="secondary" text="Neustart" onClick={restart} />
        </Box>

        <Divider margin="30px 0px 30px 0px" />

        <Box
          gap="10px"
          width="calc(100% - 20px)"
          justifyContent="flex-start"
          alignItems="center"
          flexWrap="wrap"
        >

          <RoundedButtonWrapper componentsSidebarOpen={componentsSidebarOpen}>
            <RoundedButton
              color={!componentsSidebarOpen ? "white" : "rgb(226,183,54)"}
              icon={<Plus />}
              onClick={() => setComponentsSidebarOpen(!componentsSidebarOpen)}
              size="big"
              variant={!componentsSidebarOpen ? "primary" : undefined}
            />
          </RoundedButtonWrapper>
        </Box>
        <Divider margin="30px 0px 30px 0px" />

        {/* <Button
          variant="secondary"
          size="small"
          icon={visibleMarkers ? "check" : "dot"}
          text="Marker"
          onClick={visibleMarkers ? showMarkers : hideMarkers}
        /> */}

        <div style={{ marginTop: "auto" }}>
          <Box flexDirection="column" gap="10px">
            <br />
            {/* <Button variant="secondary" text="Rückgängig" /> */}
            <Button
              variant="primary"
              text="Speichern"
              onClick={() => setOpenSaveModal(true)}
            />
          </Box>
        </div>
      </Box>
    </Wrapper>
  );
};

export default MenuSidebar;
