/** @format */
import React from "react";
import PropTypes from "prop-types";

//REDUX
import { useDispatch, useSelector } from "react-redux";

//COMPONENTS
import LoginRegistration from "../../atoms/Auth/LoginRegistration";
import InlineInformationPage from "../../organisms/infocomponents/InlineInformationPage";
import Tabs from "../../atoms/Tabs/Tabs";
import { MenuData } from "../../../data/MenuData";

//ICONS
import Logo from "../../../images/logo.png";
import profile_yellow from "../../../images/icons/profile_yellow.png";
import Noprofile from "../../../images/noprofile.png";
import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import Info from "../../../images/icons/info.png";
import { openAccountFunc } from "../../../redux/actions/accountActions";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

const Wrapper = styled.div`
  z-index: 99;
  position: fixed;

  width: 100vw;
  /* height: 7.5em; */

  height: 90px;
  background-color: white;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);
  top: ${(props) => (props.openScream ? "-90px" : "0px")};
  transition: 1s;
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
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const openTheAccount = () => {
    dispatch(openAccountFunc(userId));
  };
  return (
    !loading &&
    isMobileCustom && (
      <Wrapper openScream={openScream}>
        <InlineInfoButtonContainer>
          <InlineInformationPage />
          <img src={Info} width="30" alt="EndImage" />
        </InlineInfoButtonContainer>

        <LogoContainer>
          <img src={Logo} width="100px"></img>
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
        <Tabs
          loading={loading}
          handleClick={handleClick}
          order={order}
          tabLabels={MenuData.map((item) => item.text)}
          marginTop={"57px"}
          marginBottom={"0px"}
        ></Tabs>
      </Wrapper>
    )
  );
};

export default Topbar;
