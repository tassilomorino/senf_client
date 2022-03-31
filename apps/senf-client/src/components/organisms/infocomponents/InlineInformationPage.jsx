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
import DecideLocationImg from "../../../images/infoPage/howItWorks/decideLocationImg.png";
import FormulateIdeaImg from "../../../images/infoPage/howItWorks/formulateIdeaImg.png";
import SecondHeadline from "./components/SecondHeadline";
import Tags from "./components/Tags";
import InfoPageDialog from "../../atoms/Layout/InfoPageDialog";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { SideBarTabs } from "../../../styles/GlobalStyle";
import Info from "../../../images/icons/info.png";
import {
  setInfoPageClosed,
  setInfoPageOpen,
} from "../../../redux/actions/UiActions";

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
    margin-left: 50vw;
    margin-top: 50vh;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 18px;
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

const Img = styled.img`
  margin-left: 50%;
  transform: ${(props) =>
    props.visible
      ? "translateX(-50%) translateY(0px)"
      : "translateX(-40%) translateY(10px)"};
  opacity: ${(props) => (props.visible ? "1" : "0")};
  transition: 0.5s;
`;

const InlineInformationPage = ({}) => {
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

  const [visibleCards, setVisibleCards] = useState(false);
  const [visibleCards2, setVisibleCards2] = useState(false);

  const [visibleCircle2, setVisibleCircle2] = useState(false);

  // The scroll listener
  const handleScroll = useCallback(() => {
    //HORIZONTAL SECTION 1
    const horizontal1 = document.querySelector("#horizontal1");
    const sticky1 = document.querySelector("#sticky1");
    horizontal1.style.transform = `translateX(-${sticky1.offsetTop}px)`;

    //HORIZONTAL SECTION 2
    const horizontal2 = document.querySelector("#horizontal2");
    const sticky2 = document.querySelector("#sticky2");
    horizontal2.style.transform = `translateX(-${sticky2.offsetTop}px)`;

    const el = document.getElementById("InfoPage");
    const addMustard = document.getElementById("addMustard");
    const sectionOrganizationHeadline = document.getElementById(
      "sectionOrganizationHeadline"
    );

    let value = el?.scrollTop / 10;

    setScrollValue(value);
    const circle = document.getElementById("Circle");
    circle.style.clipPath = `circle(${4 + value}% at 50% 50%)`;
    circle.style.transformOrigin = "bottom";

    const circle2 = document.getElementById("Circle2");
    circle2.style.clipPath = `circle(${
      value > 408 ? -404 + value : 4
    }% at 50% 50%)`;
    circle2.style.transformOrigin = "bottom";

    const circle3 = document.getElementById("Circle3");
    circle3.style.clipPath = `circle(${
      value > 828 ? -824 + value : 4
    }% at 50% 50%)`;
    circle3.style.transformOrigin = "bottom";

    if (value < 120) {
      addMustard.style.opacity = `${-5 + value / 3}`;
    } else {
      addMustard.style.opacity = `${2.2 - value / 100}%`;
    }

    if (value < 480) {
      sectionOrganizationHeadline.style.opacity = `${-128 + value / 3}`;
      console.log("Heree", -140 + value / 3);
    } else {
      sectionOrganizationHeadline.style.opacity = `${2.2 - value / 100}%`;
    }

    const keyword1 = document.getElementById("keyword1");
    const keyword2 = document.getElementById("keyword2");
    const keyword3 = document.getElementById("keyword3");
    keyword1.style.transition = "0.1s";
    keyword2.style.transition = "0.1s";
    keyword3.style.transition = "0.1s";

    keyword1.style.transform = `translateX(${value * 8}px)`;
    keyword2.style.transform = `translateX(${-value * 10}px)`;
    keyword3.style.transform = `translateX(${value * 12}px)`;

    const tag1 = document.getElementById("tag1");
    const tag2 = document.getElementById("tag2");
    const tag3 = document.getElementById("tag3");
    const tag4 = document.getElementById("tag4");
    const tag5 = document.getElementById("tag5");
    const tag6 = document.getElementById("tag6");
    tag1.style.transition = "0.1s";
    tag2.style.transition = "0.1s";
    tag3.style.transition = "0.1s";
    tag4.style.transition = "0.1s";
    tag5.style.transition = "0.1s";
    tag6.style.transition = "0.1s";

    let secondValue = el?.scrollTop / 10 - 480;

    tag1.style.transform = `translateX(${secondValue * 8}px)`;
    tag2.style.transform = `translateX(${-secondValue * 10}px)`;
    tag3.style.transform = `translateX(${secondValue * 12}px)`;
    tag4.style.transform = `translateX(${-secondValue * 8}px)`;
    tag5.style.transform = `translateX(${secondValue * 12}px)`;
    tag6.style.transform = `translateX(${-secondValue * 14}px)`;

    console.log(value);

    if (value > 10) {
      setVisibleFirstHeadline(false);
    } else {
      setVisibleFirstHeadline(true);
    }

    if (value > 5 && value < 135) {
      setVisibleSecondaryHeadline1(true);
    } else {
      setVisibleSecondaryHeadline1(false);
    }

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
    if (value > 355 && value < 535) {
      setVisibleSecondaryHeadline2(true);
    } else {
      setVisibleSecondaryHeadline2(false);
    }

    // if (value > 350) {
    //   setVisibleCircle2(true);
    // } else {
    //   setVisibleCircle2(false);
    // }

    // console.log(el?.scrollTop);
    // setScrollValue(el?.scrollTop);
  }, []);

  useEffect(() => {
    if (openInfoPage) {
      const div = document.getElementById("InfoPage");
      div?.addEventListener("scroll", handleScroll);
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

      <InfoPageDialog isOpen={openInfoPage}>
        <Container id="InfoPage">
          <CustomIconButton
            name="Close"
            position="relative"
            left="0px"
            zIndex={999}
            margin={document.body.clientWidth > 768 ? "40px" : "10px"}
            handleButtonClick={handleClose}
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

          {/* <StyledA >Direkt zur Plattform </StyledA> */}
          <Circle id="Circle" scrollValue={scrollValue} marginTop="150px" />

          <SecondHeadline
            id="addMustard"
            marginTop="-70px"
            visible={visibleSecondaryHeadline1}
            textlines={[
              { text: "infopage_addMustard_1" },
              { text: "infopage_addMustard_2" },
            ]}
          />

          <Keywords />

          <HowToCard1>
            <UnderlinedText
              visibleHeadline={visibleCards}
              textlines={[
                { text: "Einfach", color: "#94DFF3" },
                { text: "den", color: "" },
                { breakBoolean: true },
                { text: "Ort", color: "" },
                { text: "auswählen", color: "" },
              ]}
            />
            <Img src={DecideLocationImg} width="250px" visible={visibleCards} />
          </HowToCard1>

          <HowToCard2>
            <UnderlinedText
              visibleHeadline={visibleCards2}
              textlines={[
                { text: "Idee", color: "#F5C098" },
                { text: "formulieren", color: "" },
                { breakBoolean: true },
                { text: "und", color: "" },
                { text: "teilen", color: "#90D8B9" },
              ]}
            />
            <Img src={FormulateIdeaImg} width="250px" visible={visibleCards2} />
          </HowToCard2>

          <HorizontalScrollSection id="1" />

          <Circle id="Circle2" scrollValue={scrollValue} marginTop="-150px" />
          <SecondHeadline
            id="sectionOrganizationHeadline"
            marginTop="-410px"
            visible={visibleSecondaryHeadline2}
            textlines={[
              { text: "infopage_organizationsHeadline_1" },
              { text: "infopage_organizationsHeadline_2" },
            ]}
          />

          <Tags />

          <HowToCard1>
            <UnderlinedText
              visibleHeadline={visibleCards}
              textlines={[
                { text: "Profile", color: "" },
                { text: "für", color: "" },
                { breakBoolean: true },
                { text: "Organisationen", color: "#90D8B9" },
              ]}
            />
            <Img src={DecideLocationImg} width="250px" visible={visibleCards} />
          </HowToCard1>

          <HowToCard2>
            <UnderlinedText
              visibleHeadline={visibleCards2}
              textlines={[
                { text: "Individuelle", color: "" },
                { breakBoolean: true },
                { text: "Projekträume", color: "#94DFF3" },
              ]}
            />
            <Img src={FormulateIdeaImg} width="250px" visible={visibleCards2} />
          </HowToCard2>

          <HorizontalScrollSection id="2" />
          <Circle id="Circle3" scrollValue={scrollValue} marginTop="-250px" />

          {/* <CreditsSection />

          <Partners /> */}
          <Footer />
        </Container>
      </InfoPageDialog>
    </Fragment>
  );
};

export default InlineInformationPage;
