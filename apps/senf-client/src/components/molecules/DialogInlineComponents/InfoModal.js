/** @format */

import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
// Images
import {
  StyledH2,
  StyledSmallText,
  StyledText,
} from "../../../styles/GlobalStyle";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import ProjectInfoSwiper from "./ProjectInfoSwiper";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
const Card = styled.div`
  position: fixed;

  z-index: 9999;
  display: flex;
  margin-top: ${(props) => (props.isMobileCustom ? " 60px" : "0px")};
  margin-left: 10px;

  width: ${(props) => (props.isMobileCustom ? " calc(100% - 20px)" : "380px")};

  border-radius: 0 0 18px 18px;
  height: ${(props) => (props.infoOpen ? "400px" : "0px")};
  max-height: 90%;
  transition: 0.5s;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.4);
  pointer-events: all;
  animation: clippathDownAnimation 0.5s;

  /* @media (min-width: 768px) {
    position: relative;
  } */
`;

const CloseTextWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
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
      title: "Worum geht's",
      text: "Mit einem mobilen, multifunktionalen und niedrigschwelligen Begegnungsort können Angebote in den öffentlichen Raum getragen werden und ermöglicht dadurch eine bewusstere Wahrnehmung und einfachere Begegnung der eigenen Nachbar:innen, Anwohner:innen des Stadtteils und der Umgebung.",

      id: 0,
    },
    {
      title: "Wie's weitergeht",
      text: "Mit einem mobilen, multifunktionalen und niedrigschwelligen Begegnungsort können Angebote in den öffentlichen Raum getragen werden und ermöglicht dadurch eine bewusstere Wahrnehmung und einfachere Begegnung der eigenen Nachbar:innen, Anwohner:innen des Stadtteils und der Umgebung.",
      id: 1,
    },
    {
      title: "Was unsere Motivation ist",
      text: "Mit einem mobilen, multifunktionalen und niedrigschwelligen Begegnungsort können Angebote in den öffentlichen Raum getragen werden und ermöglicht dadurch eine bewusstere Wahrnehmung und einfachere Begegnung der eigenen Nachbar:innen, Anwohner:innen des Stadtteils und der Umgebung.",
      id: 2,
    },
    {
      title: "Noch ein Titel",
      text: "Mit einem mobilen, multifunktionalen und niedrigschwelligen Begegnungsort können Angebote in den öffentlichen Raum getragen werden und ermöglicht dadurch eine bewusstere Wahrnehmung und einfachere Begegnung der eigenen Nachbar:innen, Anwohner:innen des Stadtteils und der Umgebung.",
      id: 3,
    },
  ];

  return (
    !loading && (
      <Card isMobileCustom={isMobileCustom} infoOpen={infoOpen}>
        <ProjectInfoSwiper setInfoOpen={setInfoOpen} pages={pages} />
        <CloseTextWrapper onClick={() => setInfoOpen(false)}>
          <StyledText margin="0px 0px 5px 0px">Schließen</StyledText>
          <StyledSmallText
            margin="0px 0px 0px 0px"
            marginLeft="20px"
            style={{ opacity: 0.5 }}
          >
            Nicht mehr anzeigen
          </StyledSmallText>
        </CloseTextWrapper>
      </Card>
    )
  );
};

export default ProjectInfo;
