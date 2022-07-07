import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import City from "../../../../images/city.png";
import LogoWhite from "../../../../images/logo_white.png";
import Contact from "../../../../images/infoPage/lastSection/contact.png";
import Faq from "../../../../images/infoPage/lastSection/faq.png";
import Insta from "../../../../images/infoPage/lastSection/insta.png";
import Bulb from "../../../../images/infoPage/lastSection/bulb.png";

import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";
import { isMobileCustom } from "../../../../util/customDeviceDetect";
import { openMail } from "../../../../util/helpers";
import MainModal from "../../../atoms/Layout/MainModal";
import { Accordion } from "senf-atomic-design-system";

const faqData = [
  { question: "hey?", answer: "hoo" },
  { question: "hey?", answer: "hoo" },
];
const Wrapper = styled.div`
  width: 100%;

  z-index: 9999;
  position: sticky;
  top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 320px;

  @media (min-width: 768px) {
    top: 200px;
    height: 400px;
  }
`;

const Bubble = styled.div`
  height: 80px;
  width: 80px;
  left: ${(props) => props.left};
  position: relative;
  transition: 0.2s;

  &:hover {
    width: 90px;
  }

  @media (min-width: 768px) {
    height: 100px;
    width: 100px;

    &:hover {
      width: 110px;
    }
  }
`;

const Divider = styled.div`
  width: calc(100% - 48px);
  height: 1px;
  background-color: rgba(186, 160, 79, 0.2);
  overflow: visible;
  margin: 10px 24px 10px 24px;
`;

const Footer = ({ handleClose }) => {
  const { t } = useTranslation();
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <Wrapper>
      {ReactDOM.createPortal(
        <React.Fragment>
          {faqOpen && (
            <MainModal handleButtonClick={() => setFaqOpen(false)}>
              <StyledH2
                fontWeight="900"
                margin="15px 0px 0px 0px"
                textAlign="center"
              >
                FAQ
              </StyledH2>
              <br />
              <Divider />

              <Accordion data={faqData} />
            </MainModal>
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )}

      <Bubble
        color="#BD9BF4"
        id="infoPageBubble1"
        left={isMobileCustom ? "50px" : "-3%"}
        onClick={() => setFaqOpen(true)}
      >
        <img src={Faq} width="100%" />
      </Bubble>
      <Bubble
        color="#90D8B9"
        id="infoPageBubble2"
        left={isMobileCustom ? "270px" : "105%"}
        onClick={() => openMail("dein@senf.koeln")}
      >
        <img src={Contact} width="100%" />
      </Bubble>

      <Bubble
        color="#90D8B9"
        id="infoPageBubble3"
        left={isMobileCustom ? "30px" : "-5%"}
        onClick={() =>
          window.open("https://www.instagram.com/senf.koeln/", "_blank")
        }
      >
        <img src={Insta} width="100%" />
      </Bubble>

      <Bubble
        color="#90D8B9"
        id="infoPageBubble4"
        left={isMobileCustom ? "220px" : "90%"}
        onClick={handleClose}
      >
        <img src={Bulb} width="100%" />
      </Bubble>
    </Wrapper>
  );
};

export default Footer;
