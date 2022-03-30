/** @format */

import React, { Fragment, useState, useCallback, useRef } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useSpring } from "@react-spring/web";
import { useTranslation } from "react-i18next";
import MainDialog from "../../atoms/Layout/MainDialog";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";

// Redux stuff
import { Link } from "react-router-dom";

//LazyLoad
import { LazyImage } from "react-lazy-images";

//IMAGES

import Insta from "../../../images/icons/socialmedia/insta.png";
import Facebook from "../../../images/icons/socialmedia/facebook.png";

import TopPath from "../../../images/topPathNew.png";
import First from "../../../images/first.png";
import Second from "../../../images/secondImage.png";
import Third from "../../../images/letstalkbubble.png";

//IMAGES BAD
import TopPathBad from "../../../images/toppathbad.png";
import FirstBad from "../../../images/firstbad.png";

//ICON TO OPEN THE INFOMENU
import CloseIcon from "../../../images/icons/close_yellow.png";

import Logo from "../../../images/logo.png";
import {
  CustomButton,
  CustomIconButton,
} from "../../atoms/CustomButtons/CustomButton";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import MyButtonStyle from "../../atoms/CustomButtons/MyButtonStyle";
import MyButton from "../../../util/MyButton";
import Headline from "./components/Headline";

import Bubble from "./components/Bubble";
import { useEffect } from "react";
import styled from "styled-components";
import Bulb from "./components/Bulb";
import Circle from "./components/Circle";
import Cards from "./components/Cards";
import Keywords from "./components/Keywords";
import Partners from "./components/Partners";
import Footer from "./components/Footer";
import HorizontalScrollSection from "./components/HorizontalScrollSection";
import CreditsSection from "./components/CreditsSection";
import { StyledA, StyledText } from "../../../styles/GlobalStyle";
import UnderlinedText from "./components/UnderlinedText";
import DecideLocationImg from "../../../images/infoPage/howItWorks/decideLocationImg.png";
import FormulateIdeaImg from "../../../images/infoPage/howItWorks/formulateIdeaImg.png";
import SecondHeadline from "./components/SecondHeadline";

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  position: fixed;
  background-color: white;
`;

const InnerContainer = styled.div`
  height: 3000px;
  width: 100%;
`;

const HowToCard1 = styled.div`
  margin-bottom: 70px;
`;
const HowToCard2 = styled.div`
  margin-bottom: 70px;
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
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (open) {
      // if (counter < 3) {
      //   setInterval(function () {
      //     setCounter(counter + 0.1);
      //   }, 100);
      // }

      const circle = document.getElementById("Circle");
      circle.style.clipPath = `circle(${4}% at 50% 50%)`;

      const circle2 = document.getElementById("Circle2");

      circle2.style.clipPath = `circle(${0}% at 50% 50%)`;
    }
  }, [open]);

  const [scrollValue, setScrollValue] = useState(0);
  const [visibleFirstHeadline, setVisibleFirstHeadline] = useState(true);

  const [visibleSecondHeadline, setVisibleSecondHeadline] = useState(false);
  const [visibleCards, setVisibleCards] = useState(false);
  const [visibleCards2, setVisibleCards2] = useState(false);

  const [visibleCircle2, setVisibleCircle2] = useState(false);

  // The scroll listener
  const handleScroll = useCallback(() => {
    const horizontal = document.querySelector("#horizontal");
    const sticky = document.querySelector("#sticky");
    horizontal.style.transform = `translateX(-${sticky.offsetTop}px)`;

    const el = document.getElementById("InfoPage");
    const circle = document.getElementById("Circle");

    let value = el?.scrollTop / 10;

    setScrollValue(value);
    circle.style.clipPath = `circle(${4 + value}% at 50% 50%)`;
    circle.style.transformOrigin = "bottom";

    const circle2 = document.getElementById("Circle2");
    circle2.style.clipPath = `circle(${-400 + value}% at 50% 50%)`;
    circle2.style.transformOrigin = "bottom";

    const keyword1 = document.getElementById("keyword1");
    const keyword2 = document.getElementById("keyword2");
    const keyword3 = document.getElementById("keyword3");
    keyword1.style.transition = "0.1s";
    keyword2.style.transition = "0.1s";
    keyword3.style.transition = "0.1s";

    keyword1.style.transform = `translateX(${value * 8}px)`;
    keyword2.style.transform = `translateX(${-value * 6}px)`;
    keyword3.style.transform = `translateX(${value * 10}px)`;

    //  `;

    console.log(value);

    if (value > 10) {
      setVisibleFirstHeadline(false);
    } else {
      setVisibleFirstHeadline(true);
    }

    if (value > 5 && value < 135) {
      setVisibleSecondHeadline(true);
    } else {
      setVisibleSecondHeadline(false);
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

    if (value > 350) {
      setVisibleCircle2(true);
    } else {
      setVisibleCircle2(false);
    }

    // console.log(el?.scrollTop);
    // setScrollValue(el?.scrollTop);
  }, []);

  useEffect(() => {
    if (open) {
      const div = document.getElementById("InfoPage");
      div?.addEventListener("scroll", handleScroll);
    }
  }, [handleScroll, open]);

  return (
    <Fragment>
      <ExpandButton
        handleButtonClick={() => setOpen(true)}
        dataCy="InlineInfo-button"
      />

      <MainDialog isOpen={open}>
        <Container id="InfoPage">
          <CustomIconButton
            name="Close"
            position="fixed"
            left="0px"
            zIndex={999}
            margin={document.body.clientWidth > 768 ? "40px" : "10px"}
            handleButtonClick={() => setOpen(false)}
          />

          <Headline
            height="100%"
            textAlign="left"
            visible={visibleFirstHeadline}
            textlines={[
              { text: "infopage_headline_1", color: "#939FF3" },
              { text: "infopage_headline_2", color: "#F5C098" },
              { text: "infopage_headline_3", color: "#90D8B9" },
              { text: "infopage_headline_4", color: "#E69081" },
            ]}
          />

          {/* <StyledA >Direkt zur Plattform </StyledA> */}
          <Circle id="Circle" scrollValue={scrollValue} />
          <Bulb />

          <SecondHeadline visible={visibleSecondHeadline} />

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

          <HorizontalScrollSection />

          <Circle id="Circle2" scrollValue={scrollValue} top="530vh" />

          <CreditsSection />

          <Partners />
          <Footer />
        </Container>
      </MainDialog>
    </Fragment>
  );
};

export default InlineInformationPage;
