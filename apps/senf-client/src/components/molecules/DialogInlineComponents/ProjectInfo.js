/** @format */

import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
// Images
import { StyledH2, StyledText } from "../../../styles/GlobalStyle";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { isMobileCustom } from "../../../util/customDeviceDetect";

const Card = styled.div`
  position: fixed;

  z-index: 9999;
  display: flex;
  margin-top: ${(props) => (props.isMobileCustom ? " 60px" : "0px")};
  margin-left: 10px;

  width: ${(props) => (props.isMobileCustom ? " calc(100% - 20px)" : "380px")};

  border-radius: 0 0 18px 18px;
  height: auto;
  max-height: ${(props) => (props.infoOpen ? "400px" : "0px")};
  transition: 0.5s;
  overflow: scroll;
  background-color: white;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.4);
  pointer-events: all;
  animation: clippathDownAnimation 0.5s;

  @media (min-width: 768px) {
    position: relative;
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 15px;
  object-fit: cover;
  font-size: 18, 666666666666664px !important;
  line-height: 22, 666666666666664px !important;
`;

const ProjectInfo = ({
  infoOpen,
  description,
  weblink,
  contact,
  startDate,
  endDate,
  owner,
}) => {
  const loading = useSelector((state) => state.data.loading);
  const openLink = (weblink) => {
    window.open(`https://${weblink}`, "_blank");
  };
  const openMail = (contact) => {
    window.location.href = "mailto:" + contact;
  };
  const { t } = useTranslation();
  return (
    !loading && (
      <Card isMobileCustom={isMobileCustom} infoOpen={infoOpen}>
        <Content>
          <StyledH2 fontWeight="900"> {t("what_is_it_about")}</StyledH2>

          <StyledText>{description}</StyledText>

          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
          >
            {weblink && (
              <SubmitButton
                text={t("more_info")}
                zIndex="999"
                backgroundColor="#fed957"
                textColor="#353535"
                onClick={() => openLink(weblink)}
                shadow={false}
                smallSubmitButton={true}
                iconRight={true}
                name="Weblink"
                marginLeft="0"
                transformX="none"
                iconWidth="16px"
              />
            )}
            {contact && (
              <SubmitButton
                text={t("contact")}
                zIndex="999"
                backgroundColor="#fed957"
                textColor="#353535"
                onClick={() => openMail(contact)}
                shadow={false}
                smallSubmitButton={true}
                iconRight={true}
                name="Contact"
                marginLeft="10px"
                transformX="none"
                iconWidth="22px"
              />
            )}
          </div>

          <br />
          <StyledH2 fontWeight="900"> {t("period")} </StyledH2>
          <p>
            {endDate ? (
              <StyledText>
                {startDate} – {endDate}
              </StyledText>
            ) : (
              <StyledText>{startDate} </StyledText>
            )}
          </p>
          <br />

          <StyledH2 fontWeight="900">{t("Initiators")}</StyledH2>
          <StyledText>{owner}</StyledText>
          <br />
        </Content>
      </Card>
    )
  );
};

export default ProjectInfo;
