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
}) => {
  const handle = useSelector((state) => state.user.handle);
  const userHandle = handle ? handle : "...";

  const openScream = useSelector((state) => state.UI.openScream);
  const swipePosition = useSelector((state) => state.UI.swipePosition);
  // const [shareOpen, setShareOpen] = useState(false);
  const [amount, setAmount] = useState(34);

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
        {/* {loading && (
          <CircularProgress
            size={30}
            style={{
              marginLeft: "calc(50% - 15px)",
              marginTop: " 10px",
              position: "absolute",
            }}
          />
        )} */}
        <FlexWrapper>
          <CustomIconButton
            name="ArrowLeft"
            top="0px"
            shadow={false}
            backgroundColor="transparent"
            handleButtonClick={handleClose}
          />
          <StyledH2
            fontWeight="900"
            textAlign="center"
            margin="13px 0px"
            style={
              infoOpen
                ? { width: "90%", transition: "1.5s", whiteSpace: "normal" }
                : { width: "90%", transition: "1.5s" }
            }
          >
            {type === "account"
              ? truncateString("Hey " + userHandle, amount)
              : infoOpen
              ? title && title
              : title &&
                truncateString(
                  title,
                  document.body.clientWidth < 350
                    ? 19
                    : document.body.clientWidth < 380
                    ? 25
                    : 29
                )}
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
      </InnerWrapper>
    </FixedWrapper>
  );
};

export default Header;
