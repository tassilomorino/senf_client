import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import City from "../../../../images/city.png";
import LogoWhite from "../../../../images/logo_white.png";
import ContactBubble from "../../../../images/contact.png";
import FaqBubble from "../../../../images/faqBubble.png";
import InstaBubble from "../../../../images/instaBubble.png";

import { StyledH3 } from "../../../../styles/GlobalStyle";
import NewButton from "../../../atoms/CustomButtons/NewButton";
import FooterLinks from "../../../molecules/Footer/FooterLinks";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";
const Wrapper = styled.div`
  height: calc(100vh - 420px);
  width: 100%;

  z-index: 9999;
  position: sticky;
  top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const InnerWrapper = styled.div`
  height: 60%;
  width: 100%;
`;
const Bubble = styled.div`
  height: 100px;
  width: 100px;
  margin-top: 10px;
  left: ${(props) => props.left};
  position: relative;
`;

const Footer = ({ handleClose }) => {
  const { t } = useTranslation();

  const [contactOpen, setContactOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <Wrapper>
      <InnerWrapper>
        <Bubble color="#BD9BF4" id="infoPageBubble1" left="10%">
          <img src={FaqBubble} width="100%" />
        </Bubble>
        <Bubble color="#90D8B9" id="infoPageBubble2" left="95%">
          <img src={ContactBubble} width="100%" />
        </Bubble>

        <Bubble color="#90D8B9" id="infoPageBubble3" left="-8%">
          <img src={InstaBubble} width="100%" />
        </Bubble>
      </InnerWrapper>

      <SubmitButton
        text={t("showIdeas")}
        zIndex="999"
        backgroundColor="white"
        textColor="#353535"
        handleButtonClick={handleClose}
        position="absolute"
        bottom="50px"
      />

      <FooterLinks color="#353535" position="relative" />
    </Wrapper>
  );
};

export default Footer;
