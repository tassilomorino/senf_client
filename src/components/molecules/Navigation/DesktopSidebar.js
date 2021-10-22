/** @format */

import React from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { openAccountFunc } from "../../../redux/actions/accountActions";

//Components
import RegistrationAndLogin from "../../atoms/Auth/LoginRegistration";
import InlineInformationPageDesktop from "../../organisms/infocomponents/InlineInformationPageDesktop";
import TopicFilter from "../../atoms/Filters/TopicFilter";
import Account from "../../organisms/Account/Account";
import { MenuItem } from "./MenuItem";
import { MenuData } from "../../../data/MenuData";

//ICONS
import Logo from "../../../images/logo.png";
import Insta from "../../../images/icons/socialmedia/insta.png";
import Facebook from "../../../images/icons/socialmedia/facebook.png";
import profile_yellow from "../../../images/icons/profile_yellow.png";
import profile_grey from "../../../images/icons/profile_grey.png";
import Noprofile from "../../../images/noprofile.png";
import PostScream from "../../organisms/PostIdea/PostScream";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

const DesktopSidebar = ({
  loading,
  classes,
  order,
  handleClick,
  handleTopicSelector,
  topicsSelected,
  loadingProjects,
  projectsData,
  dataFinalMap,
}) => {
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const authenticated = useSelector((state) => state.user.authenticated);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openTheAccount = () => {
    dispatch(openAccountFunc(userId));
  };

  return (
    !isMobileCustom && (
      <div className={openInfoPage ? "sideBar_hide" : "sideBar"}>
        <h1 className="logoWeb">
          <img src={Logo} width="100px" alt="logoWeb"></img>
        </h1>
        <InlineInformationPageDesktop loading={loading} classes={classes} />

        {!authenticated ? (
          <div className="profile">
            <RegistrationAndLogin />
            <img
              src={Noprofile}
              width="35"
              alt="EndImage"
              style={{ paddingRight: "10px" }}
            />
            {t("login")}
          </div>
        ) : (
          <div className="profile">
            <ExpandButton
              handleButtonClick={openTheAccount}
              dataCy="profile-button"
            />
            <img
              src={order === 4 ? profile_grey : profile_yellow}
              width="35"
              alt="EndImage"
              style={{ paddingRight: "10px" }}
            />
            {t("profile")}
          </div>
        )}
        <PostScream
          loadingProjects={loadingProjects}
          projectsData={projectsData}
        />

        {MenuData.map((item, i) => (
          <MenuItem
            key={i}
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

export default DesktopSidebar;
