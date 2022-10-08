/** @format */

import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import theme from "../../../styles/theme";
import Button from "../../atoms/buttons/Button";
import Box from "../../atoms/box/Box";
import Shape from "../../atoms/shapes/Shape";
import Typography from "../../atoms/typography/Typography";
import OrganizationCard from "../../molecules/cards/OrganizationCard";
import List from "../../molecules/list/List";
import SwipeModal from "../../molecules/modals/SwipeModal";
import SubNavbar from "../../molecules/navs/SubNavbar";
import TagSlide from "../../molecules/tagSlide/TagSlide";
import Toolbar from "../../molecules/toolbar/Toolbar";
import { StatisticsOverviewProps } from "./StatisticsOverview.types";
import Arrow from "../../../assets/icons/Arrow";
import Wave from "../../atoms/shapes/Wave";

const Wrapper = styled.div<StatisticsOverviewProps>`
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  margin-left: 10px;
  margin-top: 10px;
  width: 100%;
  height: calc(100vh - 20px);
  border-radius: 18px;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 90;
  top: 0;
  position: fixed;
  transition: 0.3s;
  box-shadow: 40px 8px 30px -12px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
  pointer-events: all;

  @media (min-width: 768px) {
    display: ${({ open }) => (open ? "block" : "none")};
    width: ${({ open }) => (open ? "calc(100vw - 20px)" : "0px")};
  }
`;

const InnerWrapper = styled.div<StatisticsOverviewProps>`
  overflow-y: scroll;
  pointer-events: all;
  height: calc(100% - 120px);
  width: 100%;
  margin-top: ${(props) => (props.isMobile ? "-10px" : "0px")};
  overflow: scroll;
  z-index: 1;
  margin-left: 50%;
  padding-bottom: 200px;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

export const SVGWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 2;
  height: ${(props) => (props.searchOpen ? "210px" : "150px")};
`;

const HeaderWrapper = styled.div`
  position: absolute;
  width: 600px;
  height: 120px;
  margin-left: 50%;
  top: 0;
  transform: translateX(-50%);
  background-color: transparent;
`;

const StatisticsOverview: FC<StatisticsOverviewProps> = ({
  openStatisticsOverview,
  setOpenStatisticsOverview,
  children,
}) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();
  const [searchOpen, setSearchOpen] = useState(false);

  return isMobile ? (
    <SwipeModal
      backgroundColor={theme.colors.primary.primary100}
      triggerOpen={openStatisticsOverview}
      onClose={() => setOpenStatisticsOverview(false)}
      onDrag={(e) => console.log(e)}
      overflowing={true}
      headerComponentHeight="102px"
      HeaderComponent={
        <React.Fragment>
          <SubNavbar
            iconLeft={<Arrow transform="rotate(90)" />}
            leftButtonClick={() => setOpenStatisticsOverview(false)}
            header={t("statistics")}
            handlebar={true}
            // trailingIcon="plus"
            // iconRightTransform="rotate(45)"
          />
        </React.Fragment>
      }
    >
      <Wave
        color={theme.colors.beige.beige20}
        top="0px"
      />

      <InnerWrapper isMobile={isMobile}>{children}</InnerWrapper>
    </SwipeModal>
  ) : (
    <Wrapper open={openStatisticsOverview}>
      <SVGWrapper searchOpen={searchOpen}>
        <Box
          position="fixed"
          margin="20px 12px"
          zIndex={2}
        >
          <Button
            variant="white"
            size="medium"
            leadingIcon="ArrowLeft"
            onClick={() => setOpenStatisticsOverview(false)}
          />
        </Box>
        <HeaderWrapper>
          <Box
            margin="20px"
            justifyContent="center"
          >
            <Typography
              variant="h2"
              // fontSize={document.body.clientWidth > 368 ? "22px" : "19px"}
              textAlign="center"
            >
              {t("statistics")}
            </Typography>
          </Box>
        </HeaderWrapper>
        <svg
          width="100%"
          height="126"
          viewBox="0 0 1100 126"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 125.5V0.5H1130.5V99C1025 143 974.588 95.9476 942.5 83C828.5 37 819 43.5 704 62.5C558 86.6217 307.5 44.5 196 99C128.785 131.854 37.1667 124.667 0 125.5Z"
            fill="#FED957"
          />
        </svg>
      </SVGWrapper>

      <InnerWrapper isMobile={isMobile}>{children} </InnerWrapper>
    </Wrapper>
  );
};

export default StatisticsOverview;
