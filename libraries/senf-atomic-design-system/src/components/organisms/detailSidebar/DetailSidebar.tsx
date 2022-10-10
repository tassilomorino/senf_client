/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import Button from "../../atoms/buttons/Button";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Arrow from "../../../assets/icons/Arrow";
import More from "../../../assets/icons/More";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import Box from "../../atoms/box/Box";
import Divider from "../../atoms/divider/Divider";
import { DetailSidebarProps } from "./DetailSidebar.types";

const Wrapper = styled.div<DetailSidebarProps>``;

const DetailSidebar: FC<DetailSidebarProps> = ({
  handleButtonClose,
  SecondButton,
  ThirdButton,
  sideDivider,
}) => {
  const isMobile = isMobileCustom();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Box
        position="fixed"
        margin={isMobile ? "10px" : "30px 22px"}
        width={isMobile ? "calc(100% - 20px)" : "36px"}
        zIndex={9999}
        flexDirection={isMobile ? "row" : "column"}
        justifyContent={isMobile ? "space-between" : "flex-start"}
        gap="8px"
      >
        <Button
          leadingIcon="ArrowLeft"
          onClick={() => navigate(-1)}
          size="medium"
          variant="white"
        />

        {!isMobile && <Divider margin="0px 8px" />}
        <Box
          gap="8px"
          flexDirection={isMobile ? "row" : "column"}
        >
          {SecondButton}
          {ThirdButton}
        </Box>
      </Box>
      {sideDivider && !isMobile && (
        <Divider
          height="calc(100% - 60px)"
          width="2px"
          margin="30px 16px 30px 80px"
          position="fixed"
          zIndex={"99"}
        />
      )}
    </Wrapper>
  );
};

export default DetailSidebar;
