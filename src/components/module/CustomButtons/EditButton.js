/** @format */

import React from "react";
import { useSelector } from "react-redux";
import AdminMenuScream from "../../modals/menuScream/AdminMenuScream";
import MenuScream from "../../modals/menuScream/MenuScream";
import ReportScream from "../../modals/ReportScream";

import MenuIcon from "../../../images/icons/menu.png";
import styled from "styled-components";

const RoundButton = styled.button`
  width: 50px;
  height: 50px;
  color: #353535;
  border-radius: 100%;
  box-shadow: ${(props) =>
    props.shadow === false ? "" : "rgb(38, 57, 77, 0.7) 0px 20px 30px -15px;"};
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  margin-top: -60px;
  margin-left: calc(100% - 60px);
`;
const EditButton = ({ screamId, userHandle }) => {
  const { authenticated, credentials } = useSelector((state) => state.user);
  const { handle, isAdmin, isModerator } = credentials;

  return (
    <RoundButton>
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
    </RoundButton>
  );
};

export default EditButton;
