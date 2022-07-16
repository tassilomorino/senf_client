/** @format */

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Arrow from "../../../assets/icons/Arrow";
import Plus from "../../../assets/icons/Plus";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import SwipeModal from "../../molecules/modals/SwipeModal";
import SubNavbar from "../../molecules/navs/SubNavbar";
import { ActionModalProps } from "./ActionModal.types";

const Wrapper = styled.div<ActionModalProps>``;

const ActionModal: FC<ActionModalProps> = ({
  children,
  title,
  openModal,
  setOpenModal,
  handleClose,
  handleSave,
  disabledSaveButton,
  cancelButtonText,
  saveButtonText,
}) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();
  return (
    <SwipeModal
      zIndex={9999999999}
      openModal={openModal}
      setOpenModal={setOpenModal}
      backgroundColor="#f9f1d7"
    >
      <SubNavbar
        iconLeft={
          isMobile ? (
            <Arrow transform="rotate(90deg)" />
          ) : (
            <Plus transform="rotate(45deg)" />
          )
        }
        leftButtonClick={handleClose}
        header={title}
        handlebar={true}
      />
      <Box margin="0px 20px" flexDirection="column">
        <Box flexDirection="column" gap="20px" margin="20px 0px 100px 0px">
          {children}
        </Box>
        <Box
          position="absolute"
          bottom="0px"
          width="100%"
          gap="8px"
          margin="20px 0px"
        >
          <Button
            variant="white"
            fillWidth="max"
            onClick={handleClose}
            text={cancelButtonText}
          />
          {saveButtonText && (
            <Button
              variant="primary"
              fillWidth="max"
              onClick={handleSave}
              disabled={disabledSaveButton}
              text={saveButtonText}
            />
          )}
        </Box>
      </Box>
    </SwipeModal>
  );
};

export default ActionModal;
