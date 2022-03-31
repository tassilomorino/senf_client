import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import FooterShape from "../../../../images/infoPage/shapes/footer.png";
import LogoWhite from "../../../../images/logo_white.png";
import { StyledH3 } from "../../../../styles/GlobalStyle";
import NewButton from "../../../atoms/CustomButtons/NewButton";
import FooterLinks from "../../../molecules/Footer/FooterLinks";
const Wrapper = styled.div`
  margin-top: 50px;
  height: 350px;
  width: 100%;
  position: relative;
  z-index: 99999;
`;
const YellowBackground = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fed957;
  margin-top: 50px;
  position: absolute;
`;

const ContentWrapper = styled.div`
  margin: 24px;
  margin-top: 50px;
  position: absolute;
  height: calc(100% - 48px);
  width: calc(100% - 48px);
`;

const ButtonsWrapper = styled.div`
  margin: 44px;
`;
const Footer = () => {
  const { t } = useTranslation();

  const [contactOpen, setContactOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <Wrapper>
      <img
        src={FooterShape}
        width="100%"
        style={{
          position: "absolute",
        }}
      />
      <YellowBackground />
      <ContentWrapper>
        {/* <img
          src={LogoWhite}
          width="150px"
          style={{
            marginLeft: "50%",
            transform: "translateX(-50%)",
            position: "relative",
          }}
        /> */}
        <ButtonsWrapper>
          <NewButton handleButtonClick={() => setContactOpen(true)}>
            {t("showIdeas")}
          </NewButton>

          <NewButton
            margin="20px 0px"
            handleButtonClick={() => setContactOpen(true)}
          >
            {t("contact")}
          </NewButton>

          <NewButton
            margin="20px 0px"
            handleButtonClick={() => setFaqOpen(true)}
          >
            FAQ
          </NewButton>
        </ButtonsWrapper>

        {/* <StyledH3>{t("contact")}</StyledH3> */}

        <FooterLinks color="#353535" position="relative" />
      </ContentWrapper>
    </Wrapper>
  );
};

export default Footer;
