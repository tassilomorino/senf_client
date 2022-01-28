/** @format */

import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
// Images
import {
  StyledH2,
  StyledH3,
  StyledImg,
  StyledSmallText,
  StyledText,
} from "../../../styles/GlobalStyle";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import ProjectInfoSwiper from "./ProjectInfoSwiper";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import { ModalBackground } from "../../atoms/Backgrounds/ModalBackground";
const Card = styled.div`
  position: fixed;

  z-index: 9999;

  margin-top: ${(props) => (props.isMobileCustom ? " 60px" : "0px")};
  margin-left: 10px;

  width: ${(props) => (props.isMobileCustom ? " calc(100% - 20px)" : "380px")};

  border-radius: 0 0 18px 18px;
  height: ${(props) => (props.infoOpen ? "1400px" : "0px")};
  max-height: calc(100% - 70px);
  transition: 0.5s;
  overflow: hidden;
  background-color: rgb(255, 255, 255, 0.6);
  backdrop-filter: ${(props) => (props.infoOpen ? "blur(10px)" : "none")};
  box-shadow: 0 8px 40px -32px rgba(0, 0, 0, 0.4);
  pointer-events: all;
  animation: clippathDownAnimation 0.5s;

  /* @media (min-width: 768px) {
    position: relative;
  } */
`;
const CardInnerWrapper = styled.div`
  height: calc(100% - 0px);
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #fff7dd;
  /* box-shadow: inset 0 -10px 10px -10px #000000; */
`;
const LowerWrapper = styled.div`
  position: relative;
  background-color: #fed957;
  height: 30vh;
  margin-top: 100px;
  padding-bottom: 100px;
`;

const Gradient = styled.div`
  @media screen and (max-height: 668px) {
    position: absolute;
    pointer-events: none;
    z-index: 9;
    bottom: 0px;
    width: 100%;
    height: 100px;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;
const OwnerWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 160px;

  width: calc(100% - 40px);
  margin-left: 20px;
`;
const OrganizationLogoWrapper = styled.div`
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 100%;
  overflow: hidden;
`;
const CloseTextWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  bottom: 0px;
  height: 50px;

  width: 100%;
  padding: 5px 10px 0px 5px;
  margin-left: 0px;
`;

const ProjectInfo = ({
  infoOpen,
  setInfoOpen,
  description,
  weblink,
  contact,
  startDate,
  endDate,
  owner,
  ownerImg,
}) => {
  const { t } = useTranslation();
  const loading = useSelector((state) => state.UI.loading);
  const openLink = (weblink) => {
    window.open(`https://${weblink}`, "_blank");
  };
  const openMail = (contact) => {
    window.location.href = "mailto:" + contact;
  };

  const pages = [
    {
      title: "Es geht um ",
      text: "einen mobilen, multifunktionalen und niedrigschwelligen Begegnungsort können Angebote in den öffentlichen Raum getragen werden und ermöglicht dadurch eine bewusstere Wahrnehmung und einfachere Begegnung der eigenen Nachbar:innen, Anwohner:innen des Stadtteils und der Umgebung.",

      id: 0,
    },
    {
      title: "Mit den Ideen werden wir ",
      text: "einen mobilen, multifunktionalen und niedrigschwelligen Begegnungsort können Angebote in den öffentlichen Raum getragen werden und ermöglicht dadurch eine bewusstere Wahrnehmung und einfachere Begegnung der eigenen Nachbar:innen, Anwohner:innen des Stadtteils und der Umgebung.",
      id: 1,
    },
    {
      title: "Unsere Motivation ist ",
      text: "ein mobiles, multifunktionalen und niedrigschwelligen Begegnungsort können Angebote in den öffentlichen Raum getragen werden und ermöglicht dadurch eine bewusstere Wahrnehmung und einfachere Begegnung der eigenen Nachbar:innen, Anwohner:innen des Stadtteils und der Umgebung.",
      id: 2,
    },
    {
      title: "Wenn du mehr erfahren willst, ",
      text: "kannst du einem mobilen, multifunktionalen und niedrigschwelligen Begegnungsort können Angebote in den öffentlichen Raum getragen werden und ermöglicht dadurch eine bewusstere Wahrnehmung und einfachere Begegnung der eigenen Nachbar:innen, Anwohner:innen des Stadtteils und der Umgebung.",
      id: 3,
    },
  ];
  return (
    !loading && (
      <React.Fragment>
        {infoOpen && <ModalBackground onClick={() => setInfoOpen(false)} />}
        <Card isMobileCustom={isMobileCustom} infoOpen={infoOpen}>
          <CardInnerWrapper>
            <ProjectInfoSwiper setInfoOpen={setInfoOpen} pages={pages} />
            {/* <StyledH3 textAlign="center" margin="0px 0px 5px 0px">
          Kontakt
        </StyledH3> */}

            <LowerWrapper>
              <div
                style={{
                  position: "absolute",
                  bottom: "250px",
                  zIndex: 9,
                  marginLeft: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {weblink && (
                  <SubmitButton
                    text={t("more_info")}
                    zIndex="999"
                    backgroundColor="white"
                    textColor="#353535"
                    onClick={() => openLink(weblink)}
                    shadow={false}
                    smallSubmitButton={true}
                    iconLeft={true}
                    name="Weblink"
                    iconWidth="16px"
                    margin="50px 0px 0px 0px"
                  />
                )}
                {contact && (
                  <SubmitButton
                    text={t("contact")}
                    zIndex="999"
                    backgroundColor="white"
                    textColor="#353535"
                    onClick={() => openMail(contact)}
                    shadow={false}
                    smallSubmitButton={true}
                    iconLeft={true}
                    name="Contact"
                    iconWidth="22px"
                    margin="5px 0px 0px 0px"
                  />
                )}
              </div>

              <svg
                width="100%"
                height="256px"
                preserveAspectRatio="none"
                viewBox="0 0 100% 100%"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginTop: "-100px", zIndex: -1 }}
              >
                <path
                  d="M171.395 45.7513C70.8434 16.0674 15.2351 51.7064 0 73.2365V278H402V10.8039C348.815 -13.383 323.357 8.61124 311.822 22.7511C292.936 45.9001 271.947 75.4353 171.395 45.7513Z"
                  fill="#fed957"
                />
              </svg>

              <OwnerWrapper>
                <OrganizationLogoWrapper>
                  <StyledImg
                    src={ownerImg}
                    width="100%"
                    alt="organizationIcon"
                  />
                </OrganizationLogoWrapper>
                <div style={{ marginLeft: "10px" }}>
                  <StyledText>Ein Projektraum von:</StyledText>
                  <StyledH3 fontWeight="900">{owner}</StyledH3>
                </div>
              </OwnerWrapper>
            </LowerWrapper>
            <Gradient />
          </CardInnerWrapper>
          <SubmitButton
            text={t("Schließen")}
            handleButtonClick={() => setInfoOpen(false)}
            zIndex="999"
            position={"absolute"}
            bottom="10px"
            backgroundColor="white"
            textColor="#353535"
            shadow={false}
            margin="0 0 0 0"
          />
          {/* <CloseTextWrapper onClick={() => setInfoOpen(false)}>
          <StyledSmallText style={{ opacity: 0.5 }}>
            Nicht mehr anzeigen
          </StyledSmallText>
          <SubmitButton
            text={t("close")}
            zIndex="999"
            backgroundColor="white"
            textColor="#353535"
            shadow={false}
            margin="0 0 0 0"
          />
        </CloseTextWrapper> */}
        </Card>
      </React.Fragment>
    )
  );
};

export default ProjectInfo;
