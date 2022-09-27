/** @format */

import React, { FC, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";
import Button from "../../atoms/buttons/Button";
import Box from "../../atoms/box/Box";
import { SuccessProps } from "./Success.types";

import SenfManCelebrating from "../../../assets/illustrations/SenfManCelebrating.png";
import SkewedCircle from "../../../assets/illustrations/SkewedCircle.png";
import Typography from "../../atoms/typography/Typography";
import { openLink } from "../../../util/helpers";
import Wave from "../../atoms/shapes/Wave";
import Mail from "../../../assets/icons/Mail";
import Google from "../../../assets/icons/Google";
import Apple from "../../../assets/icons/Apple";
import Arrow from "../../../assets/icons/Arrow";
import Bulb from "../../../assets/icons/Bulb";
import RoundedButton from "../../atoms/buttons/RoundedButton";
import Plus from "../../../assets/icons/Plus";
import Divider from "../../atoms/divider/Divider";
import TertiaryButton from "../../atoms/buttons/TertiaryButton";
import theme from "../../../styles/theme";

const Wrapper = styled.div<SuccessProps>`
  position: relative;
  width: 100%;
  /* max-width: 400px; */
  min-height: 100vh;
  overflow: hidden;
`;

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

const Success: FC<SuccessProps> = ({ variant, loading, setOrder }) => {
  const { t } = useTranslation();

  return (
    <>
      <SenfManCelebratingImg
        src={SenfManCelebrating}
        alt="Illustration"
      />
      <SkewedCircleImg
        src={SkewedCircle}
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
        zIndex={999}
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
          <Button
            text="Idee auf Social Media teilen"
            variant="white"
            fillWidth="max"
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
            Du möchtest die Umsetzung deiner Idee selbst in die Hand nehmen und
            weißt nicht wie du anfangen sollst?
          </Typography>
          <Box
            flexDirection="column"
            gap="16px"
          >
            <Button
              text="Lasse dich beraten"
              variant="white"
              fillWidth="max"
            />
          </Box>
          <Button
            text="Neue Idee erstellen"
            fillWidth="max"
            variant="white"
          />
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Button
            text="Zu deiner Idee"
            variant="tertiary"
          />
          <Button
            text="Zur Startseite"
            variant="tertiary"
          />
        </Box>

        {/*  <Typography variant="h1" style={{ position: "relative" }}>
          Super,
        </Typography>

        <Typography variant="h2" style={{ position: "relative" }}>
          Markus_123
        </Typography>

        <Box margin="25px 0px 24px 0px">
          <Typography variant="bodyBg" style={{ position: "relative" }}>
            {t("Success_subheadline")}
          </Typography>
        </Box>
        <Box gap="16px" flexDirection="column">
          <Button
            variant="white"
            fillWidth="max"
            text="Über Socialmedia teilen"
            iconLeft={<Bulb />}
            iconRight={<Arrow />}
            // loading={googleLoading}
            // onClick={() => setGoogleLoading(true)}
          />

          <Button
            variant="white"
            fillWidth="max"
            text="Beraten lassen"
            iconRight={<Arrow />}
            loading={loading}
            // icon={<Apple />}
            onClick={() => setOrder(2)}
          />
          <TertiaryButton
            variant="white"
            text="Zu deiner Idee"
            iconRight={<Arrow />}
            // loading={googleLoading}
            // onClick={() => setGoogleLoading(true)}
          />
          <Divider />
          <Button
            variant="white"
            fillWidth="max"
            text="Neue Idee teilen"
            icon={<Bulb />}
            // loading={googleLoading}
            // onClick={() => setGoogleLoading(true)}
          />
          <TertiaryButton
            variant="white"
            text="Zur Startseite"
            iconRight={<Arrow />}
            // loading={googleLoading}
            // onClick={() => setGoogleLoading(true)}
          />
        </Box> */}
      </Box>
    </>
  );
};

export default Success;
