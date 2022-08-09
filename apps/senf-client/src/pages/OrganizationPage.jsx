/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  OrganizationPage as OrganizationPageComponent,
} from "senf-atomic-design-system";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

// Redux stuff
import { clearErrors } from "../redux/actions/errorsActions";
import { handleTopicSelectorRedux } from "../redux/actions/UiActions";

import {
  openOrganizationFunc,
  stateCreateOrganizationsFunc,
} from "../redux/actions/organizationActions";

import setIconByOrganizationType from "../data/setIconByOrganizationType";
import MainModal from "../components/atoms/Layout/MainModal";
import { openLink, openMail, search, sort } from "../util/helpers";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 0vh;
  z-index: 996;
  top: 0;
  position: fixed;
  pointer-events: all;
  overflow-y: scroll;
  overflow-x: hidden;

  background-color: rgb(249, 241, 215);
  /* animation: OrganizationPageAnimation 0.2s; */

  @media (min-width: 768px) {
    margin-left: 0px;
    width: 400px;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    z-index: 990;
    top: 0;
    position: fixed;
    transition: 0.5s;
    left: calc(100vw - 400px);
    box-shadow: 0 8px 30px -12px rgba(0, 0, 0, 0.9);
  }

  /* @keyframes OrganizationPageAnimation {
  0% {
    left: 50vw;
    opacity: 0;
  }
  100% {
    left: 0vw;
    opacity: 1;
  }
} */
`;


const Divider = styled.div`
  width: calc(100% - 48px);
  height: 1px;
  background-color: rgba(186, 160, 79, 0.2);
  overflow: visible;
  margin: 10px 24px 10px 24px;
`;

const OrganizationPage = ({
  setOpenOrganizationsPage,

  organizations,
  handleOpenCreateOrganization,
  handleButtonOpenCard,
  user,
}) => {
  const { t } = useTranslation();
  const organization = useSelector((state) => state.data.organization);




  const [
    uncompletedOrDeactivatedProjectRooms,
    setUncompletedOrDeactivatedProjectRooms,
  ] = useState([]);

  const dispatch = useDispatch();
  const loadingOrganization = useSelector(
    (state) => state.data.loadingOrganization
  );

  const handleEditOrganization = () => {
    localStorage.setItem("createOrganizationId", organization?.organizationId);
    localStorage.setItem("createOrganizationPostEdit", true);

    dispatch(stateCreateOrganizationsFunc(true));
  };

  // useEffect(() => {
  //   dispatch(handleTopicSelectorRedux("all"));
  //   setPath(window.location.pathname);
  //   console.log(organization);
  // }, [openOrganization]);

  const handleClose = () => {
    dispatch(openOrganizationFunc(null, false));
    setOpenOrganizationsPage(true);
    dispatch(clearErrors());
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     if (organization && user && organization?.userIds.includes(user.userId)) {
  //       const data = [];

  //       const docRef = collection(
  //         db,
  //         `organizations/${organization.organizationId}/projectRooms`
  //       );
  //       const q = query(
  //         docRef,
  //         where("status", "!=", "active"),
  //         orderBy("status", "desc"),
  //         orderBy("createdAt", "desc")
  //       );
  //       const querySnapshot = await getDocs(q);
  //       if (querySnapshot.empty) {
  //         setUncompletedOrDeactivatedProjectRooms([]);
  //       } else {
  //         querySnapshot.forEach((doc) => {
  //           data.push({
  //             ...doc.data(),
  //             projectRoomId: doc.id,
  //             organizationType: doc.data().organizationType,
  //             icon: setIconByOrganizationType(doc.data().organizationType),
  //           });
  //           setUncompletedOrDeactivatedProjectRooms(data);
  //         });
  //       }
  //     }
  //   }
  //   fetchData();
  // }, [organization.organizationId, organization, user]);

  // loadingOrganization add skeletonlader
  return (
    <OrganizationPageComponent
      user={user}
      organization={organization}
      organizations={organizations}
      handleCloseOrganizationPage={handleClose}
      handleEditOrganization={handleEditOrganization}
      handleButtonOpenCard={handleButtonOpenCard}
    />
  );
};

export default OrganizationPage;
