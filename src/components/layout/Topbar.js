/** @format */

import React from "react";
import PropTypes from "prop-types";

//COMPONENTS
import InlineInformationPage from "../infocomponents/InlineInformationPage";

//REDUX
import { connect } from "react-redux";

//COMPONENTS
import SignNote from "../profile/SignNote";
import Account from "../profile/Account";

//ICONS
import profile_yellow from "../../images/icons/profile_yellow.png";
import Noprofile from "../../images/noprofile.png";

import Logo from "../../images/logo.png";
import Tabs from "../module/Tabs";

import { MenuData } from "../../data/MenuData";
import ScrollTabs from "../module/ScrollTabs";

class Topbar extends React.Component {
  render() {
    const {
      user: { authenticated },
      order,
      handleClick,
      handleTopicSelector,
      topicsSelected,
      deleteAccount,
      handleLogout,
    } = this.props;
    const { loading } = this.props.data;

    const sign = !authenticated ? (
      <div className="profile">
        <SignNote />
        <img src={Noprofile} width="35" alt="profilePlaceHolderImage" />
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
        />
        <img src={profile_yellow} width="35" alt="profileImage" />
      </div>
    );

    const menu =
      order === 1 || (order === 2 && !loading) ? (
        <div className="TopNav">
          <InlineInformationPage />

          {sign}
          <h1 className="logo1">
            <img src={Logo} width="100px"></img>
          </h1>
          <ScrollTabs
            loading={loading}
            handleClick={handleClick}
            order={order}
            tabLabels={MenuData.map((item) => item.text)}
            marginTop={"67px"}
            marginBottom={"0px"}
            lineColor={"#c9c9c9"}
          ></ScrollTabs>
        </div>
      ) : null;

    return menu;
  }
}
Topbar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapActionsToProps = {};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, mapActionsToProps)(Topbar);
