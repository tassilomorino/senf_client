/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import ShareModal from "../Modals/ShareModal";
import { StyledH2, StyledText } from "../../../styles/GlobalStyle";
import InfoIcon from "../../../images/icons/info_grey.png";
import SettingsIcon from "../../../images/icons/settings.png";

import {
  FixedWrapper,
  FlexWrapper,
  TitleWrapper,
  ImgWrapper,
  StyledImg,
  StyledIcon,
  InnerWrapper,
} from "./styles/sharedStyles";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { truncateString } from "../../../hooks/truncateString";
import { CircularProgress } from "@material-ui/core";

const Header = ({
  type,
  infoOpen,
  setInfoOpen,
  imgUrl,
  title,
  calendar,
  order,
  handleClose,
  handleClick,
  path,
  owner,
}) => {
  const loading = useSelector((state) => state.UI.loading);

  const handle = useSelector((state) => state.user.handle);
  const userHandle = handle ? handle : "...";

  const openScream = useSelector((state) => state.UI.openScream);
  const swipePosition = useSelector((state) => state.UI.swipePosition);
  // const [shareOpen, setShareOpen] = useState(false);
  const [amount, setAmount] = useState(34);

  console.log(
    7.95 +
      45.29 +
      12.09 +
      3.18 +
      16.39 +
      6.15 +
      4.07 +
      3.37 +
      14.24 +
      2.69 +
      166.0 +
      4.5 +
      3.91 +
      0.84 +
      3.4 +
      2.51 +
      10.76 +
      14.31 +
      2.96 +
      5.92 +
      11.52 +
      6.58 +
      15.79 +
      399.0 +
      245.0
  );
  useEffect(() => {
    if (isMobileCustom) {
      const amount = order !== 0 ? 26 : 32;

      // document.getElementById("wrapper").offsetWidth / 14
      setAmount(amount);
    } else {
      if (order !== 0) {
        setAmount(29);
      } else {
        setAmount(34);
      }
    }
  }, [order]);

  // const handleShare = () => {
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: `Senf.koeln – ${title}`,
  //         url: path,
  //       })
  //       .then(() => {
  //         console.log("Thanks for sharing!");
  //       })
  //       .catch(console.error);
  //   } else {
  //     setShareOpen(true);
  //   }
  // };

  return (
    <FixedWrapper moveUp={(openScream || swipePosition === "top") && !infoOpen}>
      <InnerWrapper
        order={order}
        isMobileCustom={isMobileCustom}
        id="wrapper"
        infoOpen={infoOpen}
      >
        {loading && (
          <CircularProgress
            size={30}
            style={{
              marginLeft: "calc(50% - 15px)",
              marginTop: " 10px",
              position: "absolute",
            }}
          />
        )}
        <FlexWrapper>
          <CustomIconButton
            name="ArrowLeft"
            top="10px"
            shadow={false}
            backgroundColor="transparent"
            handleButtonClick={handleClose}
          />
          <StyledH2 fontWeight="900">
            {type === "account"
              ? truncateString("Hey " + userHandle, amount)
              : title && truncateString(title, amount)}
          </StyledH2>

          {/* <ImgWrapper order={order}>
            {imgUrl && (
              <StyledImg src={imgUrl} width="100%" alt="project-thumbnail" />
            )}
          </ImgWrapper> */}
        </FlexWrapper>

        {!infoOpen && (
          <StyledIcon
            onClick={() => setInfoOpen(!infoOpen)}
            src={type === "account" ? SettingsIcon : InfoIcon}
            width="100%"
            alt="project-thumbnail"
          />
        )}

        {/* {order === 0 && <StyledText marginLeft="50px">{owner}</StyledText>} */}
      </InnerWrapper>
    </FixedWrapper>
  );
};

export default Header;
