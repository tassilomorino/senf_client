/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import ShareModal from "../../molecules/Modals/ShareModal";
import Tabs from "../../atoms/Tabs/Tabs";
import { ProjectTabData } from "../../../data/ProjectRoomTabData";
import { StyledH2, StyledText } from "../../../styles/GlobalStyle";
import InfoIcon from "../../../images/icons/info_grey.png";
import {
  FixedWrapper,
  FlexWrapper,
  TitleWrapper,
  ImgWrapper,
  StyledImg,
  StyledIcon,
  SVGWrapper,
  InnerWrapper,
} from "./styles/sharedStyles";
import { isMobileCustom } from "../../../util/customDeviceDetect";

const ProjectHeader = ({
  imgUrl,
  title,
  loading,
  calendar,
  order,
  handleClose,
  handleClick,
  path,
  owner,
}) => {
  const openScream = useSelector((state) => state.UI.openScream);
  const swipePosition = useSelector((state) => state.UI.swipePosition);
  // const [shareOpen, setShareOpen] = useState(false);
  const [amount, setAmount] = useState(18);

  useEffect(() => {
    const amount = document.getElementById("wrapper").offsetWidth / 17;
    setAmount(amount);
  }, []);

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
    <FixedWrapper moveUp={openScream || swipePosition === "top"} id="wrapper">
      <InnerWrapper order={order} isMobileCustom={isMobileCustom}>
        <StyledIcon
          onClick={() => handleClick(0)}
          src={InfoIcon}
          width="100%"
          alt="project-thumbnail"
          style={{ opacity: order === 0 ? 0 : 1 }}
        />

        <FlexWrapper>
          <CustomIconButton
            name="ArrowLeft"
            top="10px"
            shadow={false}
            handleButtonClick={handleClose}
          />
          <StyledH2 fontWeight="900">{title}</StyledH2>
          <ImgWrapper order={order}>
            {imgUrl && (
              <StyledImg src={imgUrl} width="100%" alt="project-thumbnail" />
            )}
          </ImgWrapper>
        </FlexWrapper>

        {order === 0 && <StyledText marginLeft="50px">{owner}</StyledText>}

        <SVGWrapper>
          <svg
            width="100%"
            viewBox="0 0  400 200"
            style={{
              position: "absolute",
              top: "0",
              left: 0,
              zIndex: -1,
              filter:
                order === 0
                  ? "drop-shadow( 0px 8px 40px rgba(0, 0, 0, .2))"
                  : "none",
            }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M49.5 69C6.54013 71.8429 0.551521 91.6797 0 94V82.1332V0.000363337L181.866 0.000363337L262.466 0C296.359 0.000363337 305.635 0.00280277 352 0.000363337C334.276 0.00112858 334.276 16.2926 334.276 35.5592C334.276 54.8258 321.824 73.5293 292.042 75.1245C237.441 78.0491 117.5 64.5 49.5 69Z"
              fill="white"
            />
          </svg>

          <svg
            width="100%"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              top: "0",
              left: 0,
              zIndex: -2,
              filter: "drop-shadow( 0px 8px 40px rgba(0, 0, 0, .2))",
              opacity: order === 0 ? 0 : 1,
              transition: "0.7s",
            }}
          >
            <path
              d="M194 78.5C141.605 76.8632 104 73 60 73C16 73 0 98 0 98L0.000319178 0.00340184H123.402H219.3C260.056 -0.00331751 311.931 0.00172418 400 0.00328005V37.5C400 69.5747 379 80.6712 335 80.6712C281.099 80.6712 263.5 80.6712 194 78.5Z"
              fill="#FFF2C2"
            />

            {/* {isMobileCustom ? (
              <path
                d="M147.504 159.135C107.516 120.326 49.5491 144.775 42.5064 146.432C35.4636 148.089 0 159.135 0 159.135L0.000336946 0.00484655H130.272H231.508C274.534 -0.00606456 307.028 0.00450052 400 0.007027V88.8989C400 120.046 386.083 145.385 348.964 141.025C185.973 121.881 214.386 224.045 147.504 159.135Z"
                fill="#FFF2C2"
              />
            ) : (
              <path
                d="M159 131C104.497 119.397 49.5491 144.779 42.5064 146.436C35.4636 148.093 0 159.139 0 159.139L0.000336946 0.0087528H130.272H231.508C274.534 -0.00215831 307.028 0.00840677 400 0.0109333V88.9028C400 120.05 389.5 221 324 159.139C279.066 116.701 231.508 146.436 159 131Z"
                fill="#FFF2C2"
              />
            )} */}
          </svg>
        </SVGWrapper>
      </InnerWrapper>
    </FixedWrapper>
  );
};

export default ProjectHeader;
