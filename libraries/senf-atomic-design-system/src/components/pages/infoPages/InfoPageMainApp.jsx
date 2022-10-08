/** @format */

import React, {
  Fragment,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import styled from "styled-components";
import { Box, LanguageSelect, Button } from "senf-atomic-design-system";

import Headline from "./components/Headline";

import Circle from "./components/Circle";
import LearnMoreBubbles from "./components/LearnMoreBubbles";
import HorizontalScrollSection from "./components/HorizontalScrollSection";
import UnderlinedText from "./components/UnderlinedText";

import SecondHeadline from "./components/SecondHeadline";
import Tags from "./components/Tags";

import DecideLocationImg from "../../../assets/infoPages/howItWorks/decideLocationImg.png";
import FormulateIdeaImg from "../../../assets/infoPages/howItWorks/formulateIdeaImg.png";
import WorkTogether from "../../../assets/illustrations/workTogether.png";
import OpenBook from "../../../assets/illustrations/openBook.png";
import { openMail } from "../../../util/helpers";
import FooterLinks from "./components/FooterLinks";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import Typography from "../../atoms/typography/Typography";
import { Mail } from "../../../assets/icons";

const Wrapper = styled.div`
  height: 2000px;
  width: 1000px;
`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  position: fixed;
  @media (min-width: 768px) {
  }
`;

const SelectLanguageWrapper = styled.div`
  position: absolute;
  z-index: 99999;
  right: 20px;
  top: 84px;
  z-index: 1;

  @media (min-width: 768px) {
    right: 24px;
    top: 82px;
  }
`;

const StyledContactImg = styled.img`
  width: 70px;
  position: absolute;
  top: 10px;
  right: 40px;
  transition: 0.1s;
  &:hover {
    width: 80px;
  }
`;
const LinkHeadline = styled.div`
  font-size: 16px;
  position: relative;
  z-index: 0;
  margin-top: 80px;
  margin-left: 24px;
  pointer-events: all;
  @media (min-width: 768px) {
    margin-left: 100px;
  }
`;
const InnerContainer = styled.div`
  height: 3000px;
  width: 100%;
`;

const HowToCard1 = styled.div`
  margin-bottom: 70px;

  @media (min-width: 768px) {
    margin-left: -300px;
  }
`;
const HowToCard2 = styled.div`
  margin-bottom: 70px;
  @media (min-width: 768px) {
    margin-left: 300px;
    margin-top: -250px;
  }
`;
const Card = styled.div`
  box-sizing: border-box;
  width: 250px; /* 104px */
  height: 320px;

  padding: 14px 10px 14px 10px;

  margin-left: 50%;
  transform: translateX(-50%);

  box-shadow: 0px 12px 18px -8px rgba(195, 186, 162, 0.2);
  background-color: rgba(195, 186, 162, 0.11);
  border-radius: 18px;
  border: 2px solid rgba(192, 188, 175, 0.08);
`;
const Img = styled.img`
  margin-left: 50%;
  transform: ${(props) =>
    props.visible
      ? "translateX(-50%) translateY(0px)"
      : "translateX(-40%) translateY(10px)"};
  opacity: ${(props) => (props.visible ? "1" : "0")};
  transition: 0.5s;
`;

const ImgCard = styled.img`
  margin-left: 50%;
  transform: ${(props) =>
    props.visible
      ? "translateX(-50%) translateY(0px)"
      : "translateX(-40%) translateY(10px)"};
  opacity: ${(props) => (props.visible ? "1" : "0")};
  transition: 0.5s;

  box-shadow: 0px 12px 18px -8px rgba(195, 186, 162, 0.2);
  background-color: rgba(195, 186, 162, 0.11);
  border-radius: 18px;
  border: 2px solid rgba(192, 188, 175, 0.08);
`;

const Link = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ScrollIndicator = styled.div`
  width: 30px;
  height: 50px;
  border-radius: 15px;

  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 12px 18px -8px rgba(195, 186, 162, 0.2);
  background-color: rgba(195, 186, 162, 0.11);
  overflow: visible;
  border-radius: 18px;
  border: 2px solid rgba(192, 188, 175, 0.08);
  left: 24px;
  margin-top: 30px;

  @media (min-width: 768px) {
    left: 100px;
    margin-top: 130px;
  }
`;

const ScrollIndicatorDot = styled.div`
  margin-top: 50px;
  background-color: rgba(192, 188, 175, 0.8);
  width: 5px;
  height: 5px;
  border-radius: 100%;
  animation: trackBallSlide 10s linear infinite;

  @keyframes trackBallSlide {
    0% {
      opacity: 1;
      transform: scale(1) translateY(-40px);
    }
    6% {
      opacity: 1;
      transform: scale(0.9) translateY(40px/4);
    }
    14% {
      opacity: 0;
      transform: scale(0.4) translateY(40px * 2);
    }
    15%,
    19% {
      opacity: 0;
      transform: scale(0.4) translateY(-40px);
    }
    19% {
      opacity: 0;
      transform: scale(0.4) translateY(-40px);
    }
    28%,
    29.99% {
      opacity: 1;
      transform: scale(1) translateY(-40px);
    }
    30% {
      opacity: 1;
      transform: scale(1) translateY(-40px);
    }
    36% {
      opacity: 1;
      transform: scale(0.9) translateY(40px/4);
    }
    44% {
      opacity: 0;
      transform: scale(0.4) translateY(40px * 2);
    }
    45%,
    49% {
      opacity: 0;
      transform: scale(0.4) translateY(-40px);
    }
    58%,
    59.99% {
      opacity: 1;
      transform: scale(1) translateY(-40px);
    }
    60% {
      opacity: 1;
      transform: scale(1) translateY(-40px);
    }
    66% {
      opacity: 1;
      transform: scale(0.9) translateY(40px/4);
    }
    74% {
      opacity: 0;
      transform: scale(0.4) translateY(40px * 2);
    }
    75%,
    79% {
      opacity: 0;
      transform: scale(0.4) translateY(-40px);
    }
    88%,
    100% {
      opacity: 1;
      transform: scale(1) translateY(-40px);
    }
  }
`;

const InfoPageMainApp = ({ setOrder, setOpenOrganizationsOverview }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = isMobileCustom();

  const { openInfoPage } = useSelector((state) => state.UI);

  // const handleOpen = useCallback(() => {
  //   dispatch(setInfoPageOpen());
  // }, [dispatch]);

  // const handleClose = useCallback(() => {
  //   dispatch(setInfoPageClosed());
  // }, [dispatch]);

  // const handleSetOpenProjectRoomsOverview = useCallback(() => {
  //   setOrder(2);
  //   dispatch(setInfoPageClosed());
  // }, [dispatch]);

  // const handleSetOpenOrganizationsOverview = useCallback(() => {
  //   setOpenOrganizationsOverview(true);
  //   dispatch(setInfoPageClosed());
  // }, [dispatch]);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // if (counter < 3) {
    //   setInterval(function () {
    //     setCounter(counter + 0.1);
    //   }, 100);
    // }
    const circle = document.getElementById("Circle");
    circle.style.clipPath = `circle(${4}% at 50% 50%)`;
  }, []);

  const [scrollValue, setScrollValue] = useState(0);
  const [visibleFirstHeadline, setVisibleFirstHeadline] = useState(true);

  const [visibleSecondaryHeadline1, setVisibleSecondaryHeadline1] =
    useState(false);
  const [visibleSecondaryHeadline2, setVisibleSecondaryHeadline2] =
    useState(false);
  const [visibleSecondaryHeadline3, setVisibleSecondaryHeadline3] =
    useState(false);

  const [visibleCards, setVisibleCards] = useState(false);
  const [visibleCards2, setVisibleCards2] = useState(false);

  const [visiblePartners, setVisiblePartners] = useState(false);
  const scrollingDown = useRef(false);
  const previousScrollValue = useRef(0);
  // The scroll listener
  const handleScroll = useCallback(() => {
    const el = document.getElementById("InfoPage");

    const currentScrollValue = el?.scrollTop;

    if (currentScrollValue > previousScrollValue.current) {
      // Scrolling down

      scrollingDown.current = true;
    } else {
      // Scrolling up
      scrollingDown.current = false;
    }
    previousScrollValue.current = currentScrollValue;

    const value = el?.scrollTop / 10;
    setScrollValue(value);

    console.log(value);

    // SECTION 1

    if (value > 3) {
      setVisibleFirstHeadline(false);
    } else {
      setVisibleFirstHeadline(true);
    }

    const circle = document.getElementById("Circle");
    circle.style.clipPath = `circle(${5 + value}% at 50% 50%)`;
    circle.style.transformOrigin = "bottom";

    if (isMobile) {
      if (value > 15 && value < 120) {
        setVisibleSecondaryHeadline1(true);
      } else {
        setVisibleSecondaryHeadline1(false);
      }
    } else if (value > 15 && value < 140) {
      setVisibleSecondaryHeadline1(true);
    } else {
      setVisibleSecondaryHeadline1(false);
    }

    const infoPageTopicTagScrollValue = el?.scrollTop / 10 - 30;

    const infoPageTopicTag1 = document.getElementById("infoPageTopicTag1");
    const infoPageTopicTag2 = document.getElementById("infoPageTopicTag2");
    const infoPageTopicTag3 = document.getElementById("infoPageTopicTag3");
    const infoPageTopicTag4 = document.getElementById("infoPageTopicTag4");
    const infoPageTopicTag5 = document.getElementById("infoPageTopicTag5");
    const infoPageTopicTag6 = document.getElementById("infoPageTopicTag6");
    infoPageTopicTag1.style.transform = `translateX(${
      infoPageTopicTagScrollValue * 12
    }px)`;
    infoPageTopicTag2.style.transform = `translateX(${
      -infoPageTopicTagScrollValue * 12
    }px)`;
    infoPageTopicTag3.style.transform = `translateX(${
      infoPageTopicTagScrollValue * 12
    }px)`;
    infoPageTopicTag4.style.transform = `translateX(${
      -infoPageTopicTagScrollValue * 8
    }px)`;
    infoPageTopicTag5.style.transform = `translateX(${
      infoPageTopicTagScrollValue * 10
    }px)`;
    infoPageTopicTag6.style.transform = `translateX(${
      -infoPageTopicTagScrollValue * 12
    }px)`;

    if (value > 80) {
      setVisibleCards(true);
    } else {
      setVisibleCards(false);
    }

    if (value > 132) {
      setVisibleCards2(true);
    } else {
      setVisibleCards2(false);
    }

    // HORIZONTAL SECTION: PROCESS
    const horizontal1 = document.querySelector("#horizontal1");
    const sticky1 = document.querySelector("#sticky1");
    horizontal1.style.transform = `translateX(-${sticky1.offsetTop}px)`;

    if (isMobile) {
      if (value > 15 && value < 120) {
        setVisibleSecondaryHeadline1(true);
      } else {
        setVisibleSecondaryHeadline1(false);
      }
    } else if (value > 15 && value < 140) {
      setVisibleSecondaryHeadline1(true);
    } else {
      setVisibleSecondaryHeadline1(false);
    }

    // SECTION 2
    const mobileDifferenceCircle = isMobile ? 200 : 0;
    const mobileDifferenceKeywords = isMobile ? 220 : 0;

    const circle2 = document.getElementById("Circle2");
    circle2.style.clipPath = `circle(${
      value > 558 - mobileDifferenceCircle
        ? -553 + mobileDifferenceCircle + value
        : 5
    }% at 50% 50%)`;
    circle2.style.transformOrigin = "bottom";

    if (isMobile) {
      if (value > 435 && value < 505) {
        setVisibleSecondaryHeadline2(true);
      } else {
        setVisibleSecondaryHeadline2(false);
      }
    } else if (value > 635 && value < 755) {
      setVisibleSecondaryHeadline2(true);
    } else {
      setVisibleSecondaryHeadline2(false);
    }

    const organizationTypeTag1 = document.getElementById(
      "infoPageOrganizationTypeTag1"
    );
    const organizationTypeTag2 = document.getElementById(
      "infoPageOrganizationTypeTag2"
    );
    const organizationTypeTag3 = document.getElementById(
      "infoPageOrganizationTypeTag3"
    );
    const organizationTypeTag4 = document.getElementById(
      "infoPageOrganizationTypeTag4"
    );
    const organizationTypeTag5 = document.getElementById(
      "infoPageOrganizationTypeTag5"
    );
    const organizationTypeTag6 = document.getElementById(
      "infoPageOrganizationTypeTag6"
    );

    const organizationTagScrollValue =
      el?.scrollTop / 10 - (698 - mobileDifferenceKeywords);

    organizationTypeTag1.style.transform = `translateX(${
      organizationTagScrollValue * 8
    }px)`;
    organizationTypeTag2.style.transform = `translateX(${
      -organizationTagScrollValue * 10
    }px)`;
    organizationTypeTag3.style.transform = `translateX(${
      organizationTagScrollValue * 12
    }px)`;
    organizationTypeTag4.style.transform = `translateX(${
      -organizationTagScrollValue * 10
    }px)`;
    organizationTypeTag5.style.transform = `translateX(${
      organizationTagScrollValue * 12
    }px)`;
    organizationTypeTag6.style.transform = `translateX(${
      -organizationTagScrollValue * 14
    }px)`;

    // HORIZONTAL SECTION: CREDITS
    const horizontal2 = document.querySelector("#horizontal2");
    const sticky2 = document.querySelector("#sticky2");
    horizontal2.style.transform = `translateX(-${sticky2.offsetTop}px)`;

    if (isMobile) {
      if (value > 605 && value < 825) {
        setVisiblePartners(true);
      } else {
        setVisiblePartners(false);
      }
    } else if (value > 835 && value < 1200) {
      setVisiblePartners(true);
    } else {
      setVisiblePartners(false);
    }

    // SECTION 3

    const mobileDifferenceCircle3 = isMobile ? 425 - window.innerHeight / 8 : 0;
    const mobileDifferenceBubbles = isMobile ? 435 - window.innerHeight / 8 : 0;

    const circle3 = document.getElementById("Circle3");

    circle3.style.clipPath = `circle(${
      value > 1108 - mobileDifferenceCircle3
        ? -1103 + mobileDifferenceCircle3 + value
        : 5
    }% at 50% 50%)`;

    if (isMobile) {
      if (value > 805 && value < 1205) {
        setVisibleSecondaryHeadline3(true);
      } else {
        setVisibleSecondaryHeadline3(false);
      }
    } else if (value > 1135 && value < 1555) {
      setVisibleSecondaryHeadline3(true);
    } else {
      setVisibleSecondaryHeadline3(false);
    }

    const infoPageBubblesScrollValue =
      el?.scrollTop / 10 - (1180 - mobileDifferenceBubbles);

    const infoPageBubble1 = document.getElementById("infoPageBubble1");
    const infoPageBubble2 = document.getElementById("infoPageBubble2");
    const infoPageBubble3 = document.getElementById("infoPageBubble3");
    const infoPageBubble4 = document.getElementById("infoPageBubble4");

    infoPageBubble1.style.transform = `translateX(${
      infoPageBubblesScrollValue * 8
    }px)`;
    infoPageBubble2.style.transform = `translateX(${
      -infoPageBubblesScrollValue * 12
    }px)`;
    infoPageBubble3.style.transform = `translateX(${
      infoPageBubblesScrollValue * 10
    }px)`;

    infoPageBubble4.style.transform = `translateX(${
      -infoPageBubblesScrollValue * 8
    }px)`;
    // console.log(value)
  }, []);

  useEffect(() => {
    const div = document.getElementById("InfoPage");
    div?.addEventListener("scroll", handleScroll);

    setVisibleFirstHeadline(true);
  }, [handleScroll, openInfoPage]);

  return (
    <Wrapper>
      {/* <Box
        display={
          !isMobile
            ? "flex"
            : !scrollingDown.current
              ? "absolute"
              : "none"
        }
        position="fixed"
        zIndex={999}
        margin={
          document.body.clientWidth > 768 ? "10vh 0px 0px 18vw" : "10px"
        }
      >
  
      </Box> */}
      <Container id="InfoPage">
        <SelectLanguageWrapper>
          <LanguageSelect direction="downLeft" />
        </SelectLanguageWrapper>
        <StyledContactImg
          // src={ContactImg}
          onClick={() => openMail("dein@senf.koeln")}
        />
        <Box margin="10px">
          <Button
            leadingIcon={<Mail />}
            onClick={() => openMail("dein@senf.koeln")}
          />
        </Box>
        <Headline
          visible={visibleFirstHeadline}
          textlines={[
            { text: "infopage_headline_1", color: "#939FF3" },
            { text: "infopage_headline_2", color: "#F5C098" },
            { text: "infopage_headline_3", color: "#90D8B9" },
            { text: "infopage_headline_4", color: "#E69081" },
          ]}
        />
        <LinkHeadline>
          <Button
            variant="tertiary"
            // onClick={handleClose}
          >
            {t("infopage_skip")}
          </Button>
        </LinkHeadline>
        <ScrollIndicator>
          <ScrollIndicatorDot />
        </ScrollIndicator>
        <Circle
          id="Circle"
          scrollValue={scrollValue}
          marginTop={document.body.clientWidth > 768 ? "180px" : "150px"}
        />
        <SecondHeadline
          id="addMustard"
          marginTop="-400px"
          visible={visibleSecondaryHeadline1}
          textlines={[
            { text: "infopage_addMustard_1" },
            { text: "infopage_addMustard_2" },
          ]}
        />
        <Tags type="topics" />
        <HowToCard1>
          <UnderlinedText
            visibleHeadline={visibleCards}
            textlines={[
              { text: t("infopage_howToCard1_1"), color: "#94DFF3" },
              { text: "infopage_howToCard1_2", color: "" },
              { breakBoolean: true },
              { text: "infopage_howToCard1_3", color: "" },
              { text: "infopage_howToCard1_4", color: "" },
            ]}
          />
          <ImgCard
            src={DecideLocationImg}
            width="250px"
            visible={visibleCards}
          />
        </HowToCard1>
        <HowToCard2>
          <UnderlinedText
            visibleHeadline={visibleCards2}
            textlines={[
              { text: "infopage_howToCard2_1", color: "#F5C098" },
              { text: "infopage_howToCard2_2", color: "" },
              { breakBoolean: true },
              { text: "infopage_howToCard2_3", color: "" },
              { text: "infopage_howToCard2_4", color: "#90D8B9" },
            ]}
          />
          <ImgCard
            src={FormulateIdeaImg}
            width="250px"
            visible={visibleCards2}
          />
        </HowToCard2>
        <HorizontalScrollSection id="1" />
        <Circle
          id="Circle2"
          scrollValue={scrollValue}
          marginTop={document.body.clientWidth > 768 ? "2850px" : "1300px"}
        />
        <SecondHeadline
          id="sectionOrganizationHeadline"
          marginTop="-400px"
          visible={visibleSecondaryHeadline2}
          textlines={[
            { text: "infopage_organizationsHeadline_1" },
            { text: "infopage_organizationsHeadline_2" },
          ]}
          fontSize={isMobile ? "11vw" : "50px"}
        />
        <Tags />
        <HowToCard1
        // onClick={handleSetOpenOrganizationsOverview}
        >
          <UnderlinedText
            visibleHeadline={visibleCards}
            textlines={[
              { text: t("infopage_howToCard3_1"), color: "#F8DA99" },
              { breakBoolean: true },
              { text: t("infopage_howToCard3_2"), color: "" },
            ]}
          />
          <Card>
            <Img
              src={WorkTogether}
              height="170px"
              visible={visibleCards}
            />{" "}
            <Typography
              variant="h3"
              textAlign="center"
            >
              {t("infopage_howToCard3_cardTitle")}
            </Typography>
            <Typography
              variant="bodyBg"
              textAlign="center"
              margin="10px 10px 10px 10px"
              marginLeft="10px"
            >
              {t("infopage_howToCard3_cardText")}
            </Typography>
          </Card>
        </HowToCard1>
        <HowToCard2
        // onClick={handleSetOpenProjectRoomsOverview}
        >
          <UnderlinedText
            visibleHeadline={visibleCards2}
            textlines={[
              { text: t("infopage_howToCard4_1"), color: "#90D8B9" },
              { breakBoolean: true },
              { text: t("infopage_howToCard4_2"), color: "" },
            ]}
          />
          <Card>
            <Img
              src={OpenBook}
              height="170px"
              visible={visibleCards2}
            />{" "}
            <Typography
              variant="h3"
              textAlign="center"
            >
              {t("infopage_howToCard4_cardTitle")}
            </Typography>
            <Typography
              variant="bodyBg"
              textAlign="center"
              margin="10px 10px 10px 10px"
              marginLeft="10px"
            >
              {t("infopage_howToCard4_cardText")}
            </Typography>
          </Card>
        </HowToCard2>
        <HorizontalScrollSection
          id="2"
          visiblePartners={visiblePartners}
        />
        <Circle
          id="Circle3"
          scrollValue={scrollValue}
          marginTop={document.body.clientWidth > 768 ? "1850px" : "900px"}
        />
        <SecondHeadline
          id="sectionOrganizationHeadline"
          marginTop="-400px"
          visible={visibleSecondaryHeadline3}
          textlines={[{ text: t("infopage_lastSection_1") }]}
        />
        <LearnMoreBubbles
        // handleClose={handleClose}
        />
        <FooterLinks
          color="#353535"
          position="relative"
          top={document.body.clientWidth > 768 ? "1140px" : "660px"}
        />
      </Container>
    </Wrapper>
  );
};

export default InfoPageMainApp;
