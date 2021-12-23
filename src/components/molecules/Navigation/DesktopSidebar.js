/** @format */

import React, { useEffect, memo } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";

import {
  openAccountFunc,
  getMyScreams,
} from "../../../redux/actions/accountActions";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";
//Components
import RegistrationAndLogin from "../../organisms/Auth/LoginRegistration";
import InlineInformationPageDesktop from "../../organisms/infocomponents/InlineInformationPageDesktop";
import SelectLanguageButton from "../../atoms/CustomButtons/SelectLanguageButton";
import TopicFilter from "../Filters/TopicFilter";
import { MenuItem } from "./MenuItem";
import { MenuData } from "../../../data/MenuData";

//ICONS
import LogoImg from "../../../images/logo.png";
import Insta from "../../../images/icons/socialmedia/insta.png";
import Facebook from "../../../images/icons/socialmedia/facebook.png";
import profile_yellow from "../../../images/icons/profile_yellow.png";
import profile_grey from "../../../images/icons/profile_grey.png";
import Noprofile from "../../../images/noprofile.png";
import PostScream from "../../organisms/PostIdea/PostScream";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { closeScream } from "../../../redux/actions/screamActions";
import {
  closeProject,
  openProjectRoomFunc,
} from "../../../redux/actions/projectActions";
import { Logo, Tabs } from "./styles/sharedStyles";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";
import styled from "styled-components";
import { OrganizationTypeFilter } from "../Filters/OrganizationTypeFilter";

const FilterWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: auto;
  max-height: ${(props) => (props.active ? "1000px" : "0px")};
  left: 30px;
  top: 70px;
`;
const DesktopSidebar = ({
  loading,
  classes,
  order,
  handleClick,
  loadingProjects,
  projectsData,
  setChangeLocationModalOpen,
}) => {
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);

  const authenticated = useSelector((state) => state.user.authenticated);
  const userId = useSelector((state) => state.user.userId);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openTheAccount = () => {
    dispatch(openAccountFunc(userId));

    dispatch(closeScream());
    dispatch(openProjectRoomFunc(null, false));

    dispatch(handleTopicSelectorRedux("all"));
  };
  useEffect(() => {
    if (userId && openAccount) {
      if (userId) {
        dispatch(getMyScreams(userId));
      }
    }
  }, [openAccount, userId]);

  return (
    !isMobileCustom && (
      <div className={openInfoPage ? "sideBar_hide" : "sideBar"}>
        <Logo>
          <img src={LogoImg} width="100px" alt="logoWeb"></img>
        </Logo>
        <SelectLanguageButton />
        <InlineInformationPageDesktop loading={loading} classes={classes} />
        {!authenticated ? (
          <Tabs>
            <RegistrationAndLogin />
            <img
              src={Noprofile}
              width="35"
              alt="EndImage"
              style={{ paddingRight: "10px" }}
            />
            {t("login")}
          </Tabs>
        ) : (
          <Tabs>
            <ExpandButton
              handleButtonClick={openTheAccount}
              dataCy="profile-button"
            />
            <img
              src={openAccount ? profile_grey : profile_yellow}
              width="35"
              alt="EndImage"
              style={{ paddingRight: "10px" }}
            />
            {t("profile")}
          </Tabs>
        )}
        <FilterWrapper active={openAccount}>
          <TopicFilter />
        </FilterWrapper>
        <PostScream
          loadingProjects={loadingProjects}
          projectsData={projectsData}
        />
        <MenuItem
          key={1}
          order={order}
          index={1}
          isSelectedIcon={MenuData[0].isSelectedIcon}
          isNotSelectedIcon={MenuData[0].isNotSelectedIcon}
          text={MenuData[0].text}
          handleClick={handleClick}
          openAccount={openAccount}
        />
        {/* <div
          style={{
            position: "relative",
            left: "20px",
            width: "160px",
            height: "1px",
            backgroundColor: "lightgrey",
            top: "90px",
            marginBottom: "30px",
          }}
        /> */}
        <FilterWrapper active={order === 1 && !loading && !openAccount}>
          <TopicFilter column />
        </FilterWrapper>
        <MenuItem
          key={2}
          order={order}
          index={2}
          isSelectedIcon={MenuData[1].isSelectedIcon}
          isNotSelectedIcon={MenuData[1].isNotSelectedIcon}
          text={MenuData[1].text}
          handleClick={handleClick}
          openAccount={openAccount}
        />
        <FilterWrapper active={order === 2 && !openProjectRoom}>
          <OrganizationTypeFilter column />
        </FilterWrapper>
        <FilterWrapper active={openProjectRoom}>
          <TopicFilter column />
        </FilterWrapper>
        <MenuItem
          key={3}
          order={order}
          index={3}
          isSelectedIcon={MenuData[2].isSelectedIcon}
          isNotSelectedIcon={MenuData[2].isNotSelectedIcon}
          text={MenuData[2].text}
          handleClick={handleClick}
          openAccount={openAccount}
        />
        <MenuItem
          key={4}
          order={order}
          index={4}
          isSelectedIcon={MenuData[3].isSelectedIcon}
          isNotSelectedIcon={MenuData[3].isNotSelectedIcon}
          text={MenuData[3].text}
          handleClick={handleClick}
          openAccount={openAccount}
        />
        <div
          style={{
            position: "relative",
            left: "20px",
            width: "160px",
            height: "100px",
          }}
        ></div>{" "}
        {/* {process.env.REACT_APP_INTERNATIONAL &&
          process.env.REACT_APP_INTERNATIONAL === "true" && (
            <CustomButton handleButtonClick={setChangeLocationModalOpen}>
              Stadt ändern
            </CustomButton>
          )} */}
        <a
          href="https://www.facebook.com/senf.koeln/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div
            className="facebook"
            style={openInfoPage ? { left: "-200px" } : null}
          >
            <img src={Facebook} width="25" alt="EndImage" />
          </div>
        </a>
        <a
          href="https://www.instagram.com/senf.koeln/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div
            className="insta"
            style={openInfoPage ? { left: "-200px" } : null}
          >
            <img src={Insta} width="25" alt="EndImage" />
          </div>{" "}
        </a>
      </div>
    )
  );
};

export default memo(DesktopSidebar);
