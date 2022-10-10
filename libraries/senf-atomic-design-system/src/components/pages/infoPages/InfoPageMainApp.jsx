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
  height: 700px;
  width: 100%;
`;

const InfoPageMainApp = ({}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = isMobileCustom();

  return (
    <Wrapper>
      <Box
        width="100%"
        justifyContent="center"
      >
        <Typography
          variant="h1"
          textAlign="center"
        >
          Gib deinen Senf dazu
        </Typography>
      </Box>
    </Wrapper>
  );
};

export default InfoPageMainApp;
