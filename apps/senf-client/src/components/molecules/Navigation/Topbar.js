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
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

//ICONS
import Logo from "../../../images/logo.png";
import Profile_grey from "../../../images/icons/profile_yellow.png";
import Noprofile from "../../../images/icons/noprofile.png";

import Info from "../../../images/icons/info.png";

import { StyledH2 } from "../../../styles/GlobalStyle";

const Wrapper = styled.div`
  position: fixed;

  width: 100vw;
  /* height: 7.5em; */

  /* background-color: white;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2); */
  transition: 0.4s;
  z-index: 1;
  transform: ${(props) => (props.hide ? "scale(0.8)" : "scale(1)")};
  opacity:${(props) => (props.hide ? "0" : "1")};

  /* animation: TopbarEnterAnimation 2s;

  @keyframes TopbarEnterAnimation {
    0% {
      transform: translateY(-100%);
    }
    50% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    } */
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 10px;
  height: 50px;
  width: calc(100% - 20px);
  margin-left: 10px;
  z-index: 99;
  text-align: center;
  background-color: rgb(255, 255, 255, 0.6);
  border-radius: 18px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);
`;

const ProfileButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  width: 50px;
  left: 10px;
  top: 10px;
  height: 50px;
  font-size: 0;
  pointer-events: pointer;
  /* background-color: rgb(255, 255, 255, 0.8);
  border-radius: 100%;
  -webkit-backdrop-filter: blur(10px);
   backdrop-filter: blur(10px);
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.8); */
`;

const InlineInfoButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  width: 50px;
  right: 10px;
  top: 10px;
  height: 50px;
  font-size: 0;
  pointer-events: pointer;
  /* background-color: rgb(255, 255, 255, 0.8);
  border-radius: 100%;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.8); */
`;

const CenteredImg = styled.img`
  position: absolute;
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
        hide={
          openScream ||
          openProjectRoom ||
          openAccount ||
          openOrganization ||
          swipePosition === "top"
        }
      >
        <InlineInfoButtonContainer>
          <InlineInformationPage />
          <img src={Info} width="30" alt="EndImage" />
        </InlineInfoButtonContainer>

        <LogoContainer>
          <img
            src={Logo}
            width="100px"
            alt="logo"
            style={{ marginTop: "5px" }}
          ></img>
        </LogoContainer>

        {/* <InsightsButtonContainer onClick={() => handleClick(4)}>
          <img src={InsightsIcon} width="30" alt="profilePlaceHolderImage" />
        </InsightsButtonContainer> */}

        {!user.authenticated ? (
          <ProfileButtonContainer>
            <LoginRegistration />

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

            {/* <StyledH2 fontWeight="600" zIndex="9">
              {user?.handle?.slice(0, 1)}
            </StyledH2> */}
            <CenteredImg src={Profile_grey} width="30" alt="profileImage" />
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
