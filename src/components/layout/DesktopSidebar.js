/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logo from "../../images/logo.png";
import InlineInformationPageDesktop from "../infocomponents/InlineInformationPageDesktop";

import SignNote from "../profile/SignNote";
import PostScream from "../postScream/PostScream";

//ICONS
import Insta from "../../images/icons/socialmedia/insta.png";
import Facebook from "../../images/icons/socialmedia/facebook.png";

import profile_yellow from "../../images/icons/profile_yellow.png";
import profile_grey from "../../images/icons/profile_grey.png";

import Noprofile from "../../images/noprofile.png";

import Themenfilter from "./Themenfilter";
import Account from "../profile/Account";
import PostScreamDesktop from "../postScream/PostScreamDesktop";
import { MenuItem } from "./MenuItem";
import { MenuData } from "./MenuData";
const styles = {};

export class DesktopSidebar extends Component {
  render() {
    const {
      loading,
      authenticated,
      classes,
      order,
      handleClick,
      handleLegend,
      handleLegend1,
      handleLegend2,
      handleLegend3,
      handleLegend4,
      handleLegend5,
      handleLegend6,
      handleLegend7,
      checked,
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
      checked7,

      openInfoPageDesktop,
      handleOpenInfoPageDesktop,
      handleCloseInfoPageDesktop,
      cookiesSetDesktop,
      handleOpenCookiePreferences,
      handleCookiesDesktop,
      handleMinimumCookies,

      deleteAccount,
      handleLogout,
      loadingProjects,
      projectsData,
    } = this.props;
    //

    const sign = !authenticated ? (
      <div className="profile">
        <SignNote />
        <img
          src={Noprofile}
          width="35"
          alt="EndImage"
          style={{ paddingRight: "10px" }}
        />
        Anmelden
      </div>
    ) : (
      <div
        className="profile"
      // onClick={() => handleClick(4)}
      >
        <Account
          handleLegend={this.handleLegend}
          handleLegend1={this.handleLegend1}
          handleLegend2={this.handleLegend2}
          handleLegend3={this.handleLegend3}
          handleLegend4={this.handleLegend4}
          handleLegend5={this.handleLegend5}
          handleLegend6={this.handleLegend6}
          handleLegend7={this.handleLegend7}
          checked={checked}
          checked1={checked1}
          checked2={checked2}
          checked3={checked3}
          checked4={checked4}
          checked5={checked5}
          checked6={checked6}
          checked7={checked7}
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
        Profil
      </div>
    );

    return (
      <div
        className={
          openInfoPageDesktop ? "FilterComponent_hide" : "FilterComponent"
        }
      >
        <h1 className="logoWeb">
          <img src={Logo} width="100px"></img>
        </h1>
        <InlineInformationPageDesktop
          openInfoPageDesktop={openInfoPageDesktop}
          cookiesSetDesktop={cookiesSetDesktop}
          handleOpenInfoPageDesktop={handleOpenInfoPageDesktop}
          handleCloseInfoPageDesktop={handleCloseInfoPageDesktop}
          handleCookiesDesktop={handleCookiesDesktop}
          handleOpenCookiePreferences={handleOpenCookiePreferences}
          handleMinimumCookies={handleMinimumCookies}
          loading={loading}
          classes={classes}
        />

        {sign}
        <PostScreamDesktop
          openInfoPageDesktop={openInfoPageDesktop}
          loadingProjects={loadingProjects}
          projectsData={projectsData}
        />



        {MenuData.map((item, i) =>
          <MenuItem
            order={order}
            index={i + 1}
            isSelectedIcon={item.isSelectedIcon}
            isNotSelectedIcon={item.isNotSelectedIcon}
            text={item.text}
            handleClick={handleClick}>
          </MenuItem>)}

        {/* <div
          className="profile_indented"
          onClick={() => handleClick(1)}
          style={
            order === 1
              ? { textDecoration: "underline" }
              : { textDecoration: "none" }
          }
        >
          Alle Ideen
        </div>
        <div
          className="profile_indented"
          onClick={() => handleClick(1)}
          style={
            order === 2
              ? { textDecoration: "underline" }
              : { textDecoration: "none" }
          }
        >
          Projekträume
        </div> */}

        {/* <div className="profile" onClick={() => handleClick(2)}>
          <img
            src={order === 2 ? List_grey : List_yellow}
            width="35"
            alt="EndImage"
            style={{ paddingRight: "10px" }}
          />
          Channels
        </div> */}

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
        ></div> */}

        

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

        <Themenfilter
          handlers={
            [handleLegend, handleLegend1, handleLegend2, handleLegend3,
              handleLegend4, handleLegend5, handleLegend6, handleLegend7]
          }
          checks={[checked, checked1, checked2, checked3, checked4, checked5, checked6, checked7]}
        ></Themenfilter>

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
  }
}
DesktopSidebar.propTypes = {};

const mapActionsToProps = {};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(DesktopSidebar));
