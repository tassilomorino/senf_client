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

const styles = {};
class Topbar extends React.Component {
  render() {
    const {
      classes,
      user: { authenticated },

      order,
      handleClick,

      handleTopicSelector,
      topicsSelected,

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
          handleTopicSelector={handleTopicSelector}
          topicsSelected={topicsSelected}
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
          <div className="Tabs Topbar_Tabs">
            <div className="Tab">
              <div
                className={order === 1 ? "Tab_active" : "Tab_not_active"}
                onClick={() => handleClick(1)}
              >
                Alle Ideen{" "}
              </div>
              <div className="Tab_Line">| </div>
              <div
                className={order === 2 ? "Tab_active" : "Tab_not_active"}
                onClick={() => handleClick(2)}
              >
                Projekträume
              </div>
            </div>
          </div>
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
