/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";
import Plus from "../../../assets/icons/Plus";
import TertiaryButton from "../../atoms/buttons/TertiaryButton";
import { CookiebannerProps } from "./Cookiebanner.types";
import Cookie from "../../../assets/other/cookies.png";
import Typography from "../../atoms/typography/Typography";
import Box from "../../atoms/box/Box";
import { LayerWhiteFirstDefault } from "../../atoms/layerStyles/LayerStyles";

const Wrapper = styled.div<CookiebannerProps>`
  z-index: 9995;
  position: fixed;
  width: auto;
  padding: 10px;
  text-align: center;
  bottom: 0;
  margin: 10px;
  border-radius: 18px;

  ${(props) => LayerWhiteFirstDefault}

  @media (min-width: 768px) {
    z-index: 9999;
    position: fixed;
    width: 300px;
    padding: 10px 10px 20px 10px;

    font-size: 13pt;

    bottom: 0px;
    right: 0px;
    left: auto;
    border-radius: 18px;
  }
`;

const Cookiebanner: FC<CookiebannerProps> = ({
  handleCookies,
  handleOpenCookiePreferences,
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Box position="absolute">
        <TertiaryButton
          iconLeft={<Plus transform="rotate(45deg)" />}
          onClick={() => handleCookies("minimum")}
        />
      </Box>

      <img
        src={Cookie}
        width={document.body.clientWidth > 768 ? "40px" : "30px"}
      />
      <Typography variant="bodyBg" textAlign="center">
        <Trans i18nKey="cookiebanner_text">
          Für die Bereitstellung einiger Funktionen und die Verbesserung dieses
          Services brauchen wir Cookies. Falls du wirklich nur die technisch
          notwendigsten Cookies akzeptieren willst, klicke{" "}
          <span className="Terms" onClick={() => handleCookies("minimum")}>
            hier
          </span>
          &nbsp;oder konfiguriere deine{" "}
          <span className="Terms" onClick={handleOpenCookiePreferences}>
            Cookie-Einstellungen
          </span>
          .
        </Trans>
      </Typography>
    </Wrapper>
  );
};

export default Cookiebanner;
