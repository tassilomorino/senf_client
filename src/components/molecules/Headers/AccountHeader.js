/** @format */

import React, { useState, useEffect } from "react";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import Tabs from "../../atoms/Tabs/Tabs";
import { AccountTabData } from "../../../data/AccountTabData";
import { useSelector } from "react-redux";
import SettingsIcon from "../../../images/icons/settings.png";

import {
  FixedWrapper,
  FlexWrapper,
  TitleWrapper,
  ImgWrapper,
  SVGWrapper,
  StyledIcon,
  InnerWrapper,
} from "./styles/sharedStyles";
import { StyledH2 } from "../../../styles/GlobalStyle";
import { truncateString } from "../../../hooks/truncateString";

const AccountHeader = ({ loading, order, handleClose, handleClick }) => {
  const handle = useSelector((state) => state.user.handle);
  const openScream = useSelector((state) => state.UI.openScream);
  const swipePosition = useSelector((state) => state.UI.swipePosition);
  const [amount, setAmount] = useState(18);

  const userHandle = handle ? handle : "...";

  return (
    <FixedWrapper moveUp={openScream || swipePosition === "top"}>
      <InnerWrapper order={order} isMobileCustom={isMobileCustom}>
        <StyledIcon
          onClick={() => handleClick(0)}
          src={SettingsIcon}
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
          <StyledH2 fontWeight="900">
            {truncateString("Hey " + userHandle, amount)}
          </StyledH2>

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
              zIndex: 3,
              filter:
                order === 0
                  ? "drop-shadow( 0px 8px 40px rgba(0, 0, 0, .2))"
                  : "none",
              transition: "0.7s",
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
          </svg>
        </SVGWrapper>
      </InnerWrapper>
    </FixedWrapper>
  );
};

export default AccountHeader;
