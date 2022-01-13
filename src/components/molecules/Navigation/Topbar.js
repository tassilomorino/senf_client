/** @format */
import React, { useEffect, memo } from "react";
import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { useDispatch, useSelector } from "react-redux";

//REDUX
import {
  openAccountFunc,
  getMyScreams,
} from "../../../redux/actions/accountActions";

//COMPONENTS
import LoginRegistration from "../../organisms/Auth/LoginRegistration";
import InlineInformationPage from "../../organisms/infocomponents/InlineInformationPage";
import ScrollTabs from "../../atoms/Tabs/ScrollTabs";
import { MenuData } from "../../../data/MenuData";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

//ICONS
import Logo from "../../../images/logo.png";
import profile_yellow from "../../../images/icons/profile_grey.png";
import Noprofile from "../../../images/icons/profile_grey.png";
import ProfileShape from "../../../images/shapes/profileShape.png";

import Info from "../../../images/icons/info_grey.png";
import InsightsIcon from "../../../images/icons/insights_yellow.png";
import Circle_grey from "../../../images/icons/circle_grey.png";

import Header from "../../../images/header.png";
import { StyledH2 } from "../../../styles/GlobalStyle";

const Wrapper = styled.div`
  position: fixed;

  width: 100vw;
  /* height: 7.5em; */

  height: 60px;
  /* background-color: white;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2); */
  top: ${(props) => (props.moveUp ? "-90px" : "0px")};
  transition: 0.4s;
  z-index: 1;
  animation: TopbarEnterAnimation 2s;

  @keyframes TopbarEnterAnimation {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    50% {
      opacity: 1;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  z-index: 99;
  text-align: center;
`;

const ProfileButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  width: 50px;
  right: 10px;
  top: 8px;
  height: 50px;
  font-size: 0;
  pointer-events: pointer;
  filter: drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.2));
`;

const CenteredImg = styled.img`
  position: absolute;
`;

const InsightsButtonContainer = styled.div`
  position: absolute;
  z-index: 999;
  width: 30px;
  right: 60px;
  top: 18px;
  height: 30px;
  font-size: 0;
  pointer-events: pointer;
`;

const InlineInfoButtonContainer = styled.div`
  position: absolute;
  z-index: 999;
  width: 30px;
  left: 110px;
  top: 18px;
  height: 30px;
  font-size: 0;
  pointer-events: pointer;
`;

const Topbar = ({ order, handleClick }) => {
  const loading = useSelector((state) => state.data.loading);
  const user = useSelector((state) => state.user);
  const openScream = useSelector((state) => state.UI.openScream);
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const openOrganization = useSelector((state) => state.UI.openOrganization);
  const swipePosition = useSelector((state) => state.UI.swipePosition);

  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const openTheAccount = () => {
    dispatch(openAccountFunc(userId));
  };

  useEffect(() => {
    if (userId && openAccount) {
      if (userId) {
        dispatch(getMyScreams(userId));
      }
    }
  }, [openAccount, userId]);
  return (
    !loading &&
    isMobileCustom && (
      <Wrapper
        moveUp={
          openScream ||
          openProjectRoom ||
          openAccount ||
          openOrganization ||
          swipePosition === "top"
        }
      >
        <img src={Header} width="200px" style={{ pointerEvents: "none" }} />
        <img
          src={Logo}
          width="90px"
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "5px",
            borderRadius: "15px",

            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "white",
          }}
        />
        <InlineInfoButtonContainer>
          <InlineInformationPage />
          <img src={Info} width="30" alt="EndImage" />
        </InlineInfoButtonContainer>

        {/* <LogoContainer>
          <img src={Logo} width="100px" alt="logo"></img>
        </LogoContainer> */}

        {/* <InsightsButtonContainer onClick={() => handleClick(4)}>
          <img src={InsightsIcon} width="30" alt="profilePlaceHolderImage" />
        </InsightsButtonContainer> */}

        {!user.authenticated ? (
          <ProfileButtonContainer>
            <LoginRegistration />
            <CenteredImg
              src={ProfileShape}
              width="50"
              alt="profilePlaceHolderImage"
            />
            <CenteredImg
              src={Noprofile}
              width="30"
              alt="profilePlaceHolderImage"
            />
          </ProfileButtonContainer>
        ) : (
          <ProfileButtonContainer>
            <ExpandButton
              handleButtonClick={openTheAccount}
              dataCy="profile-button"
            />
            <CenteredImg
              src={ProfileShape}
              width="50"
              alt="profilePlaceHolderImage"
            />
            <StyledH2 fontWeight="600" zIndex="9">
              {user?.handle?.slice(0, 1)}
            </StyledH2>
            <CenteredImg src={Circle_grey} width="30" alt="profileImage" />
          </ProfileButtonContainer>
        )}
        {/* <ScrollTabs
          loading={loading}
          handleClick={handleClick}
          order={order}
          tabLabels={MenuData.map((item) => item.text)}
          marginTop={"57px"}
          marginBottom={"0px"}
        ></ScrollTabs> */}
      </Wrapper>
    )
  );
};

export default memo(Topbar);
