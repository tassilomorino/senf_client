/** @format */

import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setCookies } from "../../../redux/actions/cookiesActions";
import { setInfoPageClosed } from "../../../redux/actions/UiActions";
import { StyledH2, StyledText } from "../../../styles/GlobalStyle";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";

import Cookie from "../../../images/cookies.png";

const Wrapper = styled.div`
  z-index: 9995;
  position: fixed;
  width: calc(95% - 24px);
  padding: 10px;
  color: white;
  text-align: center;
  background-color: white;
  bottom: 10px;
  left: 2.5%;
  border-radius: 18px;
  border: 2px solid #ffffff;
  box-shadow: 0px 2px 18px -7px rgba(186, 160, 79, 1);
  background-color: #fcfbf8;

  @media (min-width: 768px) {
    z-index: 9999;
    position: fixed;
    width: 300px;
    height: 100px;
    color: #353535;
    text-align: center;

    font-size: 13pt;

    bottom: 10px;
    right: 10px;
    left: auto;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

const Cookiebanner = () => {
  const cookie_settings = useSelector((state) => state.data.cookie_settings);
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleOpenCookiePreferences = () => {
    window.open("/cookieConfigurator", "_blank");
  };

  const handleCookies = (cookie_settings) => {
    dispatch(setCookies(cookie_settings));

    if (window.location.pathname !== "/") {
      dispatch(setInfoPageClosed());
    }
  };

  return (
    cookie_settings !== "all" &&
    cookie_settings !== "minimum" && (
      <Wrapper>
        <CustomIconButton
          name="Close"
          position="absolute"
          margin="0px"
          left="0"
          top="0"
          backgroundColor="transparent"
          shadow={false}
          handleButtonClick={() => handleCookies("minimum")}
        />

        {/* <StyledH2 fontWeight="900" textAlign="center">
          {t("cookiebanner_title")}
        </StyledH2> */}
        <img
          src={Cookie}
          width={document.body.clientWidth > 768 ? "40px" : "30px"}
        />
        <StyledText textAlign="center">
          <Trans i18nKey="cookiebanner_text">
            Für die Bereitstellung einiger Funktionen und die Verbesserung
            dieses Services brauchen wir Cookies. Falls du wirklich nur die
            technisch notwendigsten Cookies akzeptieren willst, klicke{" "}
            <span className="Terms" onClick={() => handleCookies("minimum")}>
              hier
            </span>
            &nbsp;oder konfiguriere deine{" "}
            <span className="Terms" onClick={handleOpenCookiePreferences}>
              Cookie-Einstellungen
            </span>
            .
          </Trans>
        </StyledText>
      </Wrapper>
    )
  );
};

export default Cookiebanner;
