/** @format */

import React, { FC, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";
import Button from "../../atoms/buttons/Button";
import Box from "../../atoms/box/Box";
import { SuccessProps } from "./PostIdeaSuccess.types";

import senfManCelebrating from "../../../assets/illustrations/senfManCelebrating.png";
import skewedCircle from "../../../assets/illustrations/skewedCircle.png";
import Typography from "../../atoms/typography/Typography";
import { openLink } from "../../../util/helpers";
import SocialmediaShare from "../../organisms/socialmediaShare/SocialmediaShare";
import DropdownButton from "../../atoms/contentDropdown/DropdownButton";

const SenfManCelebratingImg = styled.img`
  position: absolute;
  left: 30%;

  z-index: 1;
  pointer-events: none;
  user-select: none;
`;
const SkewedCircleImg = styled.img`
  position: absolute;
  left: 8.18%;
  top: 10%;
  z-index: 0;
  pointer-events: none;
  user-select: none;
`;

const PostIdeaSuccess: FC<SuccessProps> = ({
  navigate,
  setPostIdeaSuccessModalOpen,
  setPostIdeaOpen,
  newIdea,
  closeModal,
}) => {
  const { t } = useTranslation();
  
  const projectRoomPath = newIdea?.projectRoomId
    ? `https://senf.koeln/projectRooms/${newIdea.projectRoomId}/${newIdea.screamId}`
    : null;
  const ideaPath = newIdea?.screamId
    ? `https://senf.koeln/idea/${newIdea.screamId}`
    : null;
  return (
    <>
      <SenfManCelebratingImg
        src={senfManCelebrating}
        alt="Illustration"
      />
      <SkewedCircleImg
        src={skewedCircle}
        alt="Illustration"
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
        padding="0px 36px 24px 36px"
        justifyContent="space-evenly"
        height="100vh"
        width="100%"
        zIndex={9}
      >
        <Box
          flexDirection="column"
          paddingTop="175px"
          gap="20px"
        >
          <Typography
            variant="h1"
            textAlign="center"
            style={{ position: "relative" }}
          >
            {t("success_page_published")}
          </Typography>
        
          <DropdownButton
            size="md"
            width="max"
            variant="white"
            icon="Share"
            text={t("success_page_share_idea")}
            data={
              <SocialmediaShare
                path={projectRoomPath || ideaPath}
                // handleShareIdeaVia={handle.shareIdeaVia}
              />
            }
          /> 
        </Box>
        <Box
          gap="24px"
          flexDirection="column"
        >
          <Typography
            variant="buttonBg"
            textAlign="center"
          >
            {t("success_page_realization")}
          </Typography>
          <Box
            flexDirection="column"
            gap="16px"
          >
            <Button
              text={t("success_page_get_advice")}
              variant="white"
              width="max"
            />
          </Box>
          <Button
            text={t("success_page_create_new_idea")}
            width="max"
            variant="white"
            onClick={() => {
              setPostIdeaSuccessModalOpen(false);
              setPostIdeaOpen(true);
              closeModal();
            }}
          />
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Button
            text={t("success_page_to_your_idea")}
            variant="tertiary"
            onClick={() => {
              setPostIdeaSuccessModalOpen(false);
              setPostIdeaOpen(false);
              navigate(`/idea/${newIdea.screamId}`);
              closeModal();
            }}
          />
          <Button
            text={t("success_page_to_idea_list")}
            variant="tertiary"
            onClick={() => {
              setPostIdeaSuccessModalOpen(false);
              setPostIdeaOpen(false);
              navigate("/");
              closeModal();
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default PostIdeaSuccess;
