/** @format */

import React from "react";
import { useTranslation } from "react-i18next";

//Components
import SignNote from "../profile/SignNote";
import InlineInformationPageDesktop from "../infocomponents/InlineInformationPageDesktop";
import TopicFilter from "./TopicFilter";
import Account from "../profile/Account";
import { MenuItem } from "./MenuItem";
import { MenuData } from "./MenuData";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";

//ICONS
import Logo from "../../images/logo.png";
import Insta from "../../images/icons/socialmedia/insta.png";
import Facebook from "../../images/icons/socialmedia/facebook.png";
import profile_yellow from "../../images/icons/profile_yellow.png";
import profile_grey from "../../images/icons/profile_grey.png";
import Noprofile from "../../images/noprofile.png";
import PostScream from "../postScream/PostScream";

const styles = {};

const DesktopSidebar = ({
  loading,
  authenticated,
  classes,
  order,
  handleClick,
  handleTopicSelector,
  topicsSelected,

  openInfoPageDesktop,
  handleOpenInfoPageDesktop,
  handleCloseInfoPageDesktop,
  cookiesSetDesktop,
  handleCookies,
  deleteAccount,
  handleLogout,
  loadingProjects,
  projectsData,
}) => {
  const { t } = useTranslation();

  const sign = !authenticated ? (
    <div className="profile">
      <SignNote />
      <img
        src={Noprofile}
        width="35"
        alt="EndImage"
        style={{ paddingRight: "10px" }}
      />
      {t("login")}
    </div>
  ) : (
    <div
      className="profile"
      // onClick={() => handleClick(4)}
    >
      <Account
        handleTopicSelector={handleTopicSelector}
        topicsSelected={topicsSelected}
        deleteAccount={deleteAccount}
        handleLogout={handleLogout}
        openInfoPageDesktop={openInfoPageDesktop}
      />
      <img
        src={order === 4 ? profile_grey : profile_yellow}
        width="35"
        alt="EndImage"
        style={{ paddingRight: "10px" }}
      />
      {t("profile")}
    </div>
  );

  return (
    <div className={openInfoPageDesktop ? "sideBar_hide" : "sideBar"}>
      <h1 className="logoWeb">
        <img src={Logo} width="100px"></img>
      </h1>
      <InlineInformationPageDesktop
        openInfoPageDesktop={openInfoPageDesktop}
        cookiesSetDesktop={cookiesSetDesktop}
        handleOpenInfoPageDesktop={handleOpenInfoPageDesktop}
        handleCloseInfoPageDesktop={handleCloseInfoPageDesktop}
        handleCookies={handleCookies}
        loading={loading}
        classes={classes}
      />

      {sign}
      <PostScream
        openInfoPageDesktop={openInfoPageDesktop}
        loadingProjects={loadingProjects}
        projectsData={projectsData}
      />

      {MenuData.map((item, i) => (
        <MenuItem
          order={order}
          index={i + 1}
          isSelectedIcon={item.isSelectedIcon}
          isNotSelectedIcon={item.isNotSelectedIcon}
          text={item.text}
          handleClick={handleClick}
        ></MenuItem>
      ))}

      <div
        style={{
          position: "relative",
          left: "20px",
          width: "160px",
          height: "1px",
          backgroundColor: "lightgrey",
          top: "90px",
          marginBottom: "30px",
        }}
      ></div>

      <TopicFilter
        handleTopicSelector={handleTopicSelector}
        topicsSelected={topicsSelected}
      ></TopicFilter>

      <div
        style={{
          position: "relative",
          left: "20px",
          width: "160px",
          height: "100px",
        }}
      ></div>

      <a
        href="https://www.facebook.com/senf.koeln/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div
          className="facebook"
          style={openInfoPageDesktop ? { left: "-200px" } : null}
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
          style={openInfoPageDesktop ? { left: "-200px" } : null}
        >
          <img src={Insta} width="25" alt="EndImage" />
        </div>{" "}
      </a>
    </div>
  );
};

export default withStyles(styles)(DesktopSidebar);
