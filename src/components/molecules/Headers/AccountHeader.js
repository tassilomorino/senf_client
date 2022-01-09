/** @format */

import React, { useState, useEffect } from "react";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import Tabs from "../../atoms/Tabs/Tabs";
import { AccountTabData } from "../../../data/AccountTabData";
import { useSelector } from "react-redux";
import InfoIcon from "../../../images/icons/info_grey.png";

import {
  FixedWrapper,
  FlexWrapper,
  TitleWrapper,
  ImgWrapper,
  SVGWrapper,
  StyledIcon,
} from "./styles/sharedStyles";

const ProjectHeader = ({ loading, order, handleClose, handleClick }) => {
  const handle = useSelector((state) => state.user.handle);
  const openScream = useSelector((state) => state.UI.openScream);
  const swipePosition = useSelector((state) => state.UI.swipePosition);
  const [amount, setAmount] = useState(18);

  const userHandle = handle ? handle : "...";

  useEffect(() => {
    const amount = document.getElementById("wrapper").offsetWidth / 17;
    setAmount(amount);
  }, []);

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  return (
    <FixedWrapper moveUp={openScream || swipePosition === "top"} id="wrapper">
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

        <TitleWrapper data-cy="hey-user">
          {" "}
          {truncateString("Hey " + userHandle, amount)}
        </TitleWrapper>

        <ImgWrapper style={{ opacity: "0" }}></ImgWrapper>
      </FlexWrapper>

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
            d="M134.309 122.474C81.8027 119.66 0.673158 149.244 0 152.996V133.807V0.996681L221.976 0.996681L320.352 0.996094C361.72 0.996681 343.409 1.00004 400 0.996094V73.8655C400 105.02 392.801 119.894 356.451 122.474C289.808 127.203 220.137 127.074 134.309 122.474Z"
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
          }}
        >
          <path
            d="M147.504 159.135C107.516 120.326 49.5491 144.775 42.5064 146.432C35.4636 148.089 0 159.135 0 159.135L0.000336946 0.00484655H130.272H231.508C274.534 -0.00606456 307.028 0.00450052 400 0.007027V88.8989C400 120.046 386.083 145.385 348.964 141.025C185.973 121.881 214.386 224.045 147.504 159.135Z"
            fill="#FFF2C2"
          />
        </svg>
      </SVGWrapper>
    </FixedWrapper>
  );
};

export default ProjectHeader;
