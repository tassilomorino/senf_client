/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../images/logo.png";

import SignNote from "../profile/SignNote";

//ICONS
import Insta from "../../images/icons/socialmedia/insta.png";
import Facebook from "../../images/icons/socialmedia/facebook.png";

import Insights_yellow from "../../images/icons/insights_yellow.png";
import Insights_grey from "../../images/icons/insights_grey.png";

import profile_yellow from "../../images/icons/profile_yellow.png";
import profile_grey from "../../images/icons/profile_grey.png";

import Noprofile from "../../images/noprofile.png";
import Arrow from "../../images/icons/arrow_yellow.png";

import TopicFilter from "./TopicFilter";
import Account from "../profile/Account";

export class MonitoringDesktopSidebar extends Component {
  state = {
    project: "",
  };

  render() {
    const {
      authenticated,

      order,
      handleClick,
      handleTopicSelector,
      topicsSelected,

      openInfoPageDesktop,

      deleteAccount,
      handleLogout,
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
        <div className="profile" onClick={() => handleClick(3)}>
          {/* <Insights /> */}
          <div style={{ width: "45px" }}>
            <img
              src={order === 3 ? Arrow : Arrow}
              width="25"
              alt="EndImage"
              style={{
                paddingRight: "10px",
                transform: "rotate(90deg) translateX(5px)",
              }}
            />
          </div>
          Zur Startseite
        </div>

        {sign}

        <div className="profile" onClick={() => handleClick(3)}>
          {/* <Insights /> */}
          <img
            src={order === 3 ? Insights_grey : Insights_yellow}
            width="35"
            alt="EndImage"
            style={{ paddingRight: "10px" }}
          />
          Insights
        </div>

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
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(MonitoringDesktopSidebar);
