/** @format */

import React, { Fragment, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import Headline from "./components/Headline";

import { useEffect } from "react";
import styled from "styled-components";
import Circle from "./components/Circle";
import Keywords from "./components/Keywords";
import Footer from "./components/Footer";
import HorizontalScrollSection from "./components/HorizontalScrollSection";
import UnderlinedText from "./components/UnderlinedText";

import SecondHeadline from "./components/SecondHeadline";
import Tags from "./components/Tags";
import InfoPageDialog from "../../atoms/Layout/InfoPageDialog";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import {
  SideBarTabs,
  StyledA,
  StyledH3,
  StyledText,
} from "../../../styles/GlobalStyle";

import {
  setInfoPageClosed,
  setInfoPageOpen,
} from "../../../redux/actions/UiActions";

import ArrowRight from "../../../images/icons/arrow-right.png";
import ContactImg from "../../../images/contact.png";

import Info from "../../../images/icons/info.png";
import DecideLocationImg from "../../../images/infoPage/howItWorks/decideLocationImg.png";
import FormulateIdeaImg from "../../../images/infoPage/howItWorks/formulateIdeaImg.png";
import WeAreHere from "../../../images/weAreHere.png";
import City from "../../../images/city.png";
import WorkTogether from "../../../images/workTogether.png";
import OpenBook from "../../../images/openBook.png";
import { openMail } from "../../../util/helpers";
import FooterLinks from "../../molecules/Footer/FooterLinks";
import SelectLanguageButton from "../../atoms/Selects/SelectLanguageButton";

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: white;
  position: fixed;
  @media (min-width: 768px) {
    width: 800px;
    height: calc(100% - 200px);
    min-height: 700px;
    margin-left: 50vw;
    margin-top: 50vh;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 18px;
  }
`;

const SelectLanguageWrapper = styled.div`
  position: absolute;
  z-index: 99999;
  left: 24px;
  bottom: 24px;
  z-index: 1;

  @media (min-width: 768px) {
    right: 29px;
    top: 152px;
    bottom: auto;
    left: auto;
  }
`;

const StyledContactImg = styled.img`
  width: 70px;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: 0.1s;
  &:hover {
    width: 80px;
  }
`;
const LinkHeadline = styled.div`
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
  box-shadow: 0px 4px 6px -2px rgba(186, 160, 79, 0.2),
    0px -2px 5px 2px rgba(255, 255, 255, 0.2);
  background-color: #faf8f3;
  overflow: visible;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-left: 50%;
  transform: translateX(-50%);
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

const Link = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const InlineInformationPage = ({ setOrder, setOpenOrganizationsPage }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { cookie_settings } = useSelector((state) => state.data);
  const { loading, openInfoPage } = useSelector((state) => state.UI);

  const handleOpen = useCallback(() => {
    dispatch(setInfoPageOpen());
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(setInfoPageClosed());
  }, [dispatch]);

  const handleSetOpenProjectRoomsOverview = useCallback(() => {
    setOrder(2);
    dispatch(setInfoPageClosed());
  }, [dispatch]);

  const handleSetOpenOrganizationsOverview = useCallback(() => {
    setOpenOrganizationsPage(true);
    dispatch(setInfoPageClosed());
  }, [dispatch]);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (openInfoPage) {
      // if (counter < 3) {
      //   setInterval(function () {
      //     setCounter(counter + 0.1);
      //   }, 100);
      // }

      const circle = document.getElementById("Circle");
      circle.style.clipPath = `circle(${4}% at 50% 50%)`;
    }
  }, [openInfoPage]);

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

  // The scroll listener
  const handleScroll = useCallback(() => {
    const el = document.getElementById("InfoPage");

    let value = el?.scrollTop / 10;
    setScrollValue(value);

    //SECTION 1

    if (value > 3) {
      setVisibleFirstHeadline(false);
    } else {
      setVisibleFirstHeadline(true);
    }

    const circle = document.getElementById("Circle");
    circle.style.clipPath = `circle(${5 + value}% at 50% 50%)`;
    circle.style.transformOrigin = "bottom";

    if (isMobileCustom) {
      if (value > 15 && value < 120) {
        setVisibleSecondaryHeadline1(true);
      } else {
        setVisibleSecondaryHeadline1(false);
      }
    } else {
      if (value > 15 && value < 140) {
        setVisibleSecondaryHeadline1(true);
      } else {
        setVisibleSecondaryHeadline1(false);
      }
    }

    let infoPageTopicTagScrollValue = el?.scrollTop / 10 - 30;

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

    //HORIZONTAL SECTION: PROCESS
    const horizontal1 = document.querySelector("#horizontal1");
    const sticky1 = document.querySelector("#sticky1");
    horizontal1.style.transform = `translateX(-${sticky1.offsetTop}px)`;

    if (isMobileCustom) {
      if (value > 15 && value < 120) {
        setVisibleSecondaryHeadline1(true);
      } else {
        setVisibleSecondaryHeadline1(false);
      }
    } else {
      if (value > 15 && value < 140) {
        setVisibleSecondaryHeadline1(true);
      } else {
        setVisibleSecondaryHeadline1(false);
      }
    }

    //SECTION 2
    const mobileDifferenceCircle = isMobileCustom ? 200 : 0;
    const mobileDifferenceKeywords = isMobileCustom ? 220 : 0;

    const circle2 = document.getElementById("Circle2");
    circle2.style.clipPath = `circle(${
      value > 608 - mobileDifferenceCircle
        ? -603 + mobileDifferenceCircle + value
        : 5
    }% at 50% 50%)`;
    circle2.style.transformOrigin = "bottom";

    if (isMobileCustom) {
      if (value > 435 && value < 505) {
        setVisibleSecondaryHeadline2(true);
      } else {
        setVisibleSecondaryHeadline2(false);
      }
    } else {
      if (value > 635 && value < 755) {
        setVisibleSecondaryHeadline2(true);
      } else {
        setVisibleSecondaryHeadline2(false);
      }
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

    let organizationTagScrollValue =
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

    //HORIZONTAL SECTION: CREDITS
    const horizontal2 = document.querySelector("#horizontal2");
    const sticky2 = document.querySelector("#sticky2");
    horizontal2.style.transform = `translateX(-${sticky2.offsetTop}px)`;

    if (isMobileCustom) {
      if (value > 605 && value < 825) {
        setVisiblePartners(true);
      } else {
        setVisiblePartners(false);
      }
    } else {
      if (value > 835 && value < 1200) {
        setVisiblePartners(true);
      } else {
        setVisiblePartners(false);
      }
    }

    // SECTION 3

    const mobileDifferenceCircle3 = isMobileCustom
      ? 425 - window.innerHeight / 8
      : 0;
    const mobileDifferenceBubbles = isMobileCustom
      ? 435 - window.innerHeight / 8
      : 0;

    console.log();

    const circle3 = document.getElementById("Circle3");

    circle3.style.clipPath = `circle(${
      value > 1108 - mobileDifferenceCircle3
        ? -1103 + mobileDifferenceCircle3 + value
        : 5
    }% at 50% 50%)`;

    if (isMobileCustom) {
      if (value > 805 && value < 1205) {
        setVisibleSecondaryHeadline3(true);
      } else {
        setVisibleSecondaryHeadline3(false);
      }
    } else {
      if (value > 1135 && value < 1555) {
        setVisibleSecondaryHeadline3(true);
      } else {
        setVisibleSecondaryHeadline3(false);
      }
    }

    let infoPageBubblesScrollValue =
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

    console.log(value);
  }, []);

  useEffect(() => {
    if (openInfoPage) {
      const div = document.getElementById("InfoPage");
      div?.addEventListener("scroll", handleScroll);

      setVisibleFirstHeadline(true);
    }
  }, [handleScroll, openInfoPage]);

  return (
    <Fragment>
      {isMobileCustom ? (
        <ExpandButton
          handleButtonClick={handleOpen}
          dataCy="InlineInfo-button"
        />
      ) : (
        <SideBarTabs fontWeight={openInfoPage ? "900" : undefined}>
          <ExpandButton handleButtonClick={handleOpen} />
          <img src={Info} width="35" alt="EndImage" />
          <span className="inlineInfoIconText"> {t("info")}</span>
        </SideBarTabs>
      )}

      <InfoPageDialog isOpen={openInfoPage} setIsOpen={handleClose}>
        <Container id="InfoPage">
          {isMobileCustom && (
            <CustomIconButton
              name="Close"
              position="absolute"
              left="0px"
              zIndex={999}
              margin={document.body.clientWidth > 768 ? "40px" : "10px"}
              handleButtonClick={handleClose}
            />
          )}

          <SelectLanguageWrapper>
            <SelectLanguageButton />
          </SelectLanguageWrapper>

          <StyledContactImg
            src={ContactImg}
            onClick={() => openMail("dein@senf.koeln")}
          />

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
            <StyledA textAlign="left" onClick={handleClose}>
              {t("infopage_skip")} <img src={ArrowRight} width="10px"></img>
            </StyledA>
          </LinkHeadline>

          {/* <StyledA >Direkt zur Plattform </StyledA> */}
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
            <Img src={DecideLocationImg} width="250px" visible={visibleCards} />
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
            <Img src={FormulateIdeaImg} width="250px" visible={visibleCards2} />
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
            fontSize={isMobileCustom ? "11vw" : "50px"}
          />

          <Tags />

          <HowToCard1 onClick={handleSetOpenOrganizationsOverview}>
            <UnderlinedText
              visibleHeadline={visibleCards}
              textlines={[
                { text: t("infopage_howToCard3_1"), color: "#F8DA99" },
                { breakBoolean: true },
                { text: t("infopage_howToCard3_2"), color: "" },
              ]}
            />
            <Card>
              <Img src={WorkTogether} height="170px" visible={visibleCards} />{" "}
              <StyledH3 textAlign="center">
                {t("infopage_howToCard3_cardTitle")}
              </StyledH3>
              <StyledText
                textAlign="center"
                margin="10px 10px 10px 10px"
                marginLeft="10px"
              >
                {t("infopage_howToCard3_cardText")}
              </StyledText>
            </Card>
          </HowToCard1>

          <HowToCard2 onClick={handleSetOpenProjectRoomsOverview}>
            <UnderlinedText
              visibleHeadline={visibleCards2}
              textlines={[
                { text: t("infopage_howToCard4_1"), color: "#90D8B9" },
                { breakBoolean: true },
                { text: t("infopage_howToCard4_2"), color: "" },
              ]}
            />
            <Card>
              <Img src={OpenBook} height="170px" visible={visibleCards2} />{" "}
              <StyledH3 textAlign="center">
                {t("infopage_howToCard4_cardTitle")}
              </StyledH3>
              <StyledText
                textAlign="center"
                margin="10px 10px 10px 10px"
                marginLeft="10px"
              >
                {t("infopage_howToCard4_cardText")}
              </StyledText>
            </Card>
          </HowToCard2>

          <HorizontalScrollSection id="2" visiblePartners={visiblePartners} />
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

          <Footer handleClose={handleClose} />

          <FooterLinks
            color="#353535"
            position="relative"
            top={document.body.clientWidth > 768 ? "1140px" : "660px"}
          />
        </Container>
      </InfoPageDialog>
    </Fragment>
  );
};

export default InlineInformationPage;
