/** @format */
import React from "react";
import PropTypes from "prop-types";

//REDUX
import { useSelector } from "react-redux";

//COMPONENTS
import SignNote from "../profile/SignNote";
import Account from "../profile/Account";
import InlineInformationPage from "../infocomponents/InlineInformationPage";
import ScrollTabs from "../module/Tabs/ScrollTabs";
import { MenuData } from "../../data/MenuData";

//ICONS
import Logo from "../../images/logo.png";
import profile_yellow from "../../images/icons/profile_yellow.png";
import Noprofile from "../../images/noprofile.png";

const Topbar = ({
  order,
  handleClick,
  handleTopicSelector,
  topicsSelected,
  deleteAccount,
  handleLogout,
}) => {
  const { loading } = useSelector((state) => state.data);
  const { authenticated } = useSelector((state) => state.user);

  return (
    !loading && (
      <div className="TopNav">
        <InlineInformationPage />

        {!authenticated ? (
          <div className="profile">
            <SignNote />
            <img src={Noprofile} width="30" alt="profilePlaceHolderImage" />
          </div>
        ) : (
          <div className="profile">
            <Account
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
              deleteAccount={deleteAccount}
              handleLogout={handleLogout}
            />
            <img src={profile_yellow} width="30" alt="profileImage" />
          </div>
        )}
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
    )
  );
};
Topbar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Topbar;
