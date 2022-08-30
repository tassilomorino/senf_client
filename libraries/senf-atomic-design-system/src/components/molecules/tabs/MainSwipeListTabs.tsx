/** @format */

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import Box from "../../atoms/box/Box";
import Typography from "../../atoms/typography/Typography";
import { MainSwipeListTabsProps } from "./MainSwipeListTabs.types";

const Wrapper = styled.div<MainSwipeListTabsProps>`
  margin-top: ${({ isMobile }) => !isMobile && "8px"};
`;

const Tab = styled.div<MainSwipeListTabsProps>`
  cursor: pointer;
  margin: ${({ isMobile }) => (isMobile ? "2px 10px" : "0px 10px 5px 10px")};
  color: ${({ active, theme }) =>
    active ? "black" : theme.colors.primary.primary160};

  &:hover {
    color: ${({ active }) => (active ? "black" : "#c79f00")};
  }
`;

const MainSwipeListTabs: FC<MainSwipeListTabsProps> = ({
  handleSwipeUp,
  order,
  setOrder,
  ideasDataLength,
  projectroomsDataLength,
}) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();

  const handleClickTab = (clickedOrder) => {
    if (
      isMobile &&
      ((order === "ideas" && clickedOrder === 1) ||
        (order === "projectrooms" && clickedOrder === 2))
    ) {
      handleSwipeUp();
    } else {
      setOrder(clickedOrder);
    }
  };

  return (
    <Wrapper isMobile={isMobile}>
      <Box margin={"22px 14px 6px 14px"} flexDirection={"column"}>
        <Tab
          onClick={() => handleClickTab(1)}
          isMobile={isMobile}
          active={order === "ideas"}
        >
          <Typography
            variant="h3"
            // color={order === "ideas" ? "black" : "#d6ab00"}
            color="inherit"
            fontWeight={900}
            fontSize="22px"

          >
            {ideasDataLength} {t("ideas")}
          </Typography>
        </Tab>
        <Tab
          onClick={() => handleClickTab(2)}
          isMobile={isMobile}
          active={order === "projectrooms"}
        >
          <Typography
            variant="h3"
            color="inherit"
            // color={order !== "ideas" ? "black" : "#d6ab00"}
            fontWeight={900}
            fontSize="22px"
          >
            {projectroomsDataLength} {t("menuData_projectrooms")}
          </Typography>
        </Tab>
      </Box>
    </Wrapper>
  );
};

export default MainSwipeListTabs;
