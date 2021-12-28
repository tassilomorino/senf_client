/** @format */
import React, { useEffect } from "react";
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
import profile_yellow from "../../../images/icons/profile_yellow.png";
import Noprofile from "../../../images/noprofile.png";
import Info from "../../../images/icons/info.png";

const Wrapper = styled.div`
  z-index: 99;
  position: fixed;

  width: 100vw;
  /* height: 7.5em; */

  height: 60px;
  background-color: white;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);
  top: ${(props) => (props.moveUp ? "-90px" : "0px")};
  transition: 1s;
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
  z-index: 999;
  width: 30px;
  right: 20px;
  top: 18px;
  height: 30px;
  font-size: 0;
  pointer-events: pointer;
`;

const InlineInfoButtonContainer = styled.div`
  position: absolute;
  z-index: 999;
  width: 30px;
  left: 20px;
  top: 18px;
  height: 30px;
  font-size: 0;
  pointer-events: pointer;
`;

const Topbar = ({ order, handleClick }) => {
  const loading = useSelector((state) => state.data.loading);
  const authenticated = useSelector((state) => state.user.authenticated);
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
        <InlineInfoButtonContainer>
          <InlineInformationPage />
          <img src={Info} width="30" alt="EndImage" />
        </InlineInfoButtonContainer>

        <LogoContainer>
          <img src={Logo} width="100px" alt="logo"></img>
        </LogoContainer>

        {!authenticated ? (
          <ProfileButtonContainer>
            <LoginRegistration />
            <img src={Noprofile} width="30" alt="profilePlaceHolderImage" />
          </ProfileButtonContainer>
        ) : (
          <ProfileButtonContainer>
            <ExpandButton
              handleButtonClick={openTheAccount}
              dataCy="profile-button"
            />
            <img src={profile_yellow} width="30" alt="profileImage" />
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

export default Topbar;
