/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { db } from "../firebase";

import { useDispatch, useSelector } from "react-redux";
// Redux stuff
import { clearErrors } from "../redux/actions/errorsActions";
import styled from "styled-components";
import { handleTopicSelectorRedux } from "../redux/actions/UiActions";

import {
  openOrganizationFunc,
  stateCreateOrganizationsFunc,
} from "../redux/actions/organizationActions";
import { useTranslation } from "react-i18next";

import setIconByOrganizationType from "../data/setIconByOrganizationType";
import Loader from "../components/atoms/Backgrounds/Loader";
import MainModal from "../components/atoms/Layout/MainModal";
import { Accordion } from "senf-atomic-design-system";
import { openLink, openMail, search, sort } from "../util/helpers";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import { OrganizationPage as OrganizationPageComponent } from "senf-atomic-design-system";

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

const CalendarWrapper = styled.div`
  position: fixed;
  padding-top: 50px;
  top: 0;
  right: 400px;
  background-color: #fed957;
  border-left: 2px solid white;
  z-index: 999;
`;

const InfoWidget = styled.div`
  width: 350px;
  max-width: calc(100% - 50px);
  height: auto; /* 72px */
  width: 348px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
  font-weight: 500;
  font-style: normal;
  font-family: "Nunito", serif;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  letter-spacing: 0px;
  line-height: 1.5;
  text-align: left;

  margin: 0px 16px 0px 24px;
  height: ${(props) => (props.infoOpen ? "auto" : "90px")};
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${(props) => (props.infoOpen ? "block" : "-webkit-box")};
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const Divider = styled.div`
  width: calc(100% - 48px);
  height: 1px;
  background-color: rgba(186, 160, 79, 0.2);
  overflow: visible;
  margin: 10px 24px 10px 24px;
`;

const MapHider = styled.div`
  width: calc(100% - 600px);
  height: 100%;
  position: fixed;
  top: 0;
  left: 600px;
  background-color: #000;
  opacity: 0.6;
  z-index: 9;
`;

const FlexBox = styled.div`
  display: flex;
  margin: 24px;
  align-items: center;
`;
const LogoWrapper = styled.div`
  margin: 20px 50% 0px 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  width: 158px;
  height: 158px;
  box-shadow: 0px 12px 18px -8px rgba(186, 160, 79, 0.2),
    0px -4px 10px 4px rgba(255, 255, 255, 0.2);
  background-color: var(--token-58c56d1c-7f62-4684-98af-05bff26e81d6, #fcfbf8);
  overflow: visible;
  border-radius: 18px;
  border: 2px solid #ffffff;
`;

const Logo = styled.div`
  width: 118px;
  height: 118px;
  overflow: visible;
  background-image: url(${(props) => (props.imgUrl ? props.imgUrl : null)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  border: 1px solid white;

  margin-left: 50%;
  margin-top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const LogoPlacer = styled.div`
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  box-shadow: 0px 6px 8px -1px rgba(186, 160, 79, 0.2),
    0px -2px 5px 2px rgba(255, 255, 255, 0.2);
  background-color: #faf8f3;
  overflow: visible;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  position: relative;
`;

const Icon = styled.div`
  margin: 5px;
`;

const Title = styled.span`
  width: auto; /* 167px */
  height: auto; /* 28px */
  overflow: visible;
  font-weight: 700;
  font-style: normal;
  font-family: "Nunito", serif;
  color: #000000;
  font-size: 20px;
  letter-spacing: 0px;
  line-height: 1.4;

  margin-left: 12px;
  text-align: left;
  width: 90%;
`;

const ListWrapper = styled.div`
  position: relative;
  background-color: rgb(249, 241, 215);
  padding-bottom: 200px;
`;

// const Divider = styled.div`
//   width: 95%;
//   height: 1px;
//   background-color: rgba(186, 160, 79, 0.2);
//   overflow: visible;
// `;

const OrganizationPage = ({
  setOpenOrganizationsPage,

  organization,
  organizations,
  handleOpenCreateOrganization,
  handleButtonOpenCard,
  user,
}) => {
  const { t } = useTranslation();
  const [infoOpen, setInfoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  const [path, setPath] = useState("");
  const [order, setOrder] = useState(1);
  const [logo, setLogo] = useState(null);

  const [
    uncompletedOrDeactivatedProjectRooms,
    setUncompletedOrDeactivatedProjectRooms,
  ] = useState([]);

  const openOrganization = useSelector((state) => state.UI.openOrganization);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.UI.loading);
  const loadingOrganization = useSelector(
    (state) => state.data.loadingOrganization
  );

  const handleEdit = () => {
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

  useEffect(() => {
    async function fetchData() {
      if (organization && user && organization?.userIds.includes(user.userId)) {
        const data = [];

        const docRef = collection(
          db,
          `organizations/${organization.organizationId}/projectRooms`
        );
        const q = query(
          docRef,
          where("status", "!=", "active"),
          orderBy("status", "desc"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setUncompletedOrDeactivatedProjectRooms([]);
        } else {
          querySnapshot.forEach((doc) => {
            data.push({
              ...doc.data(),
              projectRoomId: doc.id,
              organizationType: doc.data().organizationType,
              icon: setIconByOrganizationType(doc.data().organizationType),
            });
            setUncompletedOrDeactivatedProjectRooms(data);
          });
        }
      }
    }
    fetchData();
  }, [organization.organizationId, organization, user]);

  return !loadingOrganization ? (
    <React.Fragment>
      {ReactDOM.createPortal(
        <React.Fragment>
          {contactOpen && (
            <MainModal
              padding="0px 0px 20px"
              handleButtonClick={() => setContactOpen(false)}
            >
              <StyledH2
                fontWeight="900"
                margin="15px 0px 0px 0px"
                textAlign="center"
              >
                Kontakt
              </StyledH2>
              <br />
              {organization?.contact && (
                <React.Fragment>
                  <Divider />

                  <StyledA
                    margin="0px 24px 15px 24px"
                    onClick={() => openMail(organization?.contact)}
                  >
                    {organization?.contact}
                  </StyledA>
                </React.Fragment>
              )}
              {organization?.weblink && (
                <React.Fragment>
                  <Divider />
                  <StyledA
                    margin="0px 24px 15px 24px"
                    onClick={() => openLink(organization?.weblink)}
                  >
                    {organization?.weblink}
                  </StyledA>
                </React.Fragment>
              )}

              {organization?.address && (
                <React.Fragment>
                  <Divider />
                  <StyledA margin="0px 24px 15px 24px">
                    {organization?.address}
                  </StyledA>
                </React.Fragment>
              )}
            </MainModal>
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )}

      {ReactDOM.createPortal(
        <React.Fragment>
          {faqOpen && (
            <MainModal handleButtonClick={() => setFaqOpen(false)}>
              <StyledH2
                fontWeight="900"
                margin="15px 0px 0px 0px"
                textAlign="center"
              >
                FAQ
              </StyledH2>
              <br />
              <Divider />

              <Accordion data={organization?.faqs} />
            </MainModal>
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )}

      <OrganizationPageComponent
        user={user}
        organization={organization}
        organizations={organizations}
        handleCloseOrganizationPage={handleClose}
        handleOpenCreateOrganization={handleEdit}
        handleButtonOpenCard={handleButtonOpenCard}
      />
    </React.Fragment>
  ) : (
    <Loader left="calc(100vw - 400px)" width="400px" />
  );
};

export default OrganizationPage;
