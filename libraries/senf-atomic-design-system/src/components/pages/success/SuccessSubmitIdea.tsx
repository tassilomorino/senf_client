/** @format */

import React, { FC, useState } from "react";
import styled from "styled-components";
import { InlineWidget } from "react-calendly";
import Wave from "../../atoms/shapes/Wave";
import Modal from "../../molecules/modals/Modal";
import { SuccessSubmitIdeaProps } from "./SuccessSubmitIdea.types";

import SenfManCelebrating from "../../../assets/illustrations/SenfManCelebrating.png";
import Typography from "../../atoms/typography/Typography";
import Box from "../../atoms/box/Box";
import Accordion from "../../molecules/accordion/Accordion";
import Success from "../../templates/success/Success";

import RoundedButton from "../../atoms/buttons/RoundedButton";
import Plus from "../../../assets/icons/Plus";
import Button from "../../atoms/buttons/Button";
import SwipeModal from "../../molecules/modals/SwipeModal";
import theme from "../../../styles/theme";

const Wrapper = styled.div<SuccessSubmitIdeaProps>`
  height: 500px;
`;

const Img = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-80px, 0);
  top: 11px;
  width: 226px;
  z-index: 1;
  pointer-events: none;
  user-select: none;
`;

const SuccessSubmitIdea: FC<SuccessSubmitIdeaProps> = ({
  setPostIdeaSuccessModalOpen,
  setPostIdeaOpen,
  navigate,
  newIdea,
}) => {
  return (
    <SwipeModal
      openModal={true}
      zIndex="999"
      backgroundColor={theme.colors.beige.beige20}
    >
      <Box
        margin="24px"
        position="fixed"
        zIndex={9999}
        top="0"
      >
        <RoundedButton
          icon={<Plus transform="rotate(45)" />}
          onClick={() => {
            setPostIdeaSuccessModalOpen(false);
            setPostIdeaOpen(false);
          }}
          variant={"white"}
        />
      </Box>

      <Success
        setPostIdeaSuccessModalOpen={setPostIdeaSuccessModalOpen}
        setPostIdeaOpen={setPostIdeaOpen}
        navigate={navigate}
        newIdea={newIdea}
      />
    </SwipeModal>
  );
};

export default SuccessSubmitIdea;
