import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import City from "../../../../images/city.png";
import LogoWhite from "../../../../images/logo_white.png";
import Contact from "../../../../images/infoPage/lastSection/contact.png";
import Faq from "../../../../images/infoPage/lastSection/faq.png";
import Insta from "../../../../images/infoPage/lastSection/insta.png";
import Bulb from "../../../../images/infoPage/lastSection/bulb.png";

import { StyledH3 } from "../../../../styles/GlobalStyle";
import NewButton from "../../../atoms/CustomButtons/NewButton";
import FooterLinks from "../../../molecules/Footer/FooterLinks";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";
const Wrapper = styled.div`
  width: 100%;

  z-index: 9999;
  position: sticky;
  top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 400px;
`;
const InnerWrapper = styled.div`
  position: sticky;
  top: 50px;

  height: 70%;
  width: 100%;
`;
const Bubble = styled.div`
  height: 100px;
  width: 100px;
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
      <Bubble color="#BD9BF4" id="infoPageBubble1" left="10%">
        <img src={Faq} width="100%" />
      </Bubble>
      <Bubble color="#90D8B9" id="infoPageBubble2" left="95%">
        <img src={Contact} width="100%" />
      </Bubble>

      <Bubble color="#90D8B9" id="infoPageBubble3" left="-0%">
        <img src={Insta} width="100%" />
      </Bubble>

      <Bubble color="#90D8B9" id="infoPageBubble4" left="78%">
        <img src={Bulb} width="100%" />
      </Bubble>
    </Wrapper>
  );
};

export default Footer;
