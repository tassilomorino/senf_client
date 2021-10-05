/** @format */

import React from "react";
import { useSelector } from "react-redux";
import AdminMenuScream from "../../modals/menuScream/AdminMenuScream";
import MenuScream from "../../modals/menuScream/MenuScream";
import ReportScream from "../../modals/ReportScream";

import MenuIcon from "../../../images/icons/menu.png";

const EditButton = ({ screamId, userHandle }) => {
  const { authenticated, credentials } = useSelector((state) => state.user);
  const { handle, isAdmin, isModerator } = credentials;

  return (
    <button className="buttonRound buttonEdit">
      {!authenticated ? (
        <ReportScream screamId={screamId} userHandle={userHandle} />
      ) : authenticated & (userHandle !== handle) ? (
        <ReportScream screamId={screamId} userHandle={userHandle} />
      ) : null}
      {authenticated && (isAdmin === true || isModerator === true) ? (
        <AdminMenuScream
          screamId={screamId}
          userHandle={userHandle}
          scream={this.props.scream}
          isModerator={isModerator}
          isAdmin={isAdmin}
        />
      ) : authenticated && userHandle === handle ? (
        <MenuScream
          screamId={screamId}
          userHandle={userHandle}
          scream={this.props.scream}
        />
      ) : null}

      <img src={MenuIcon} width="25" alt="editIcon" />
    </button>
  );
};

export default EditButton;
