/** @format */

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

//COMPONENTS
import InlineInformationPage from "../infocomponents/InlineInformationPage";

//LOADER ICON

//REDUX
import { connect } from "react-redux";

//COMPONENTS
import SignNote from "../profile/SignNote";
import Account from "../profile/Account";

//ICONS

import Insights_yellow from "../../images/icons/insights_yellow.png";

import profile_yellow from "../../images/icons/profile_yellow.png";
import profile_grey from "../../images/icons/profile_grey.png";
import Noprofile from "../../images/noprofile.png";

import Logo from "../../images/logo.png";
import Tabs from "../module/Tabs";

import { MenuData } from "../../data/MenuData";
import ScrollTabs from "../module/ScrollTabs";

const styles = {};
class Topbar extends React.Component {
  render() {
    const {
      classes,
      user: { authenticated },

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
          handleLegend={handleLegend}
          handleLegend1={handleLegend1}
          handleLegend2={handleLegend2}
          handleLegend3={handleLegend3}
          handleLegend4={handleLegend4}
          handleLegend5={handleLegend5}
          handleLegend6={handleLegend6}
          handleLegend7={handleLegend7}
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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Topbar));
