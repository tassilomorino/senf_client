/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {
  logoutUser,
  deleteUserFromDb,
} from "../../../redux/actions/userActions";

// Images
import {
  StyledH2,
  StyledH3,
  StyledImg,
  StyledSmallText,
  StyledText,
} from "../../../styles/GlobalStyle";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import ProjectInfoSwiper from "./ProjectInfoSwiper";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import { ModalBackground } from "../../atoms/Backgrounds/ModalBackground";
import { openLink, openMail } from "../../../util/helpers";

const Card = styled.div`
  position: fixed;

  z-index: 997;

  margin-top: ${(props) => (props.isMobileCustom ? " 10px" : "-50px")};
  margin-left: 10px;

  width: ${(props) => (props.isMobileCustom ? " calc(100% - 20px)" : "380px")};

  border-radius: 18px;
  height: auto;
  /* height: ${(props) =>
    props.openAccount
      ? "500px"
      : props.weblink && props.contact
      ? "700px"
      : props.contact || props.weblink
      ? "650px"
      : "600px"}; */
  max-height: ${(props) => (props.infoOpen ? "calc(100% - 20px)" : "0px")};
  transition: 0.5s;
  overflow: scroll;
  background-color: rgb(255, 255, 255, 0.6);
  backdrop-filter: ${(props) => (props.infoOpen ? "blur(10px)" : "none")};
  /* box-shadow: 0 8px 40px -35px rgba(0, 0, 0, 0.4); */
  pointer-events: all;
  animation: clippathDownAnimation 0.5s;

  /* @media (min-width: 768px) {
    position: relative;
  } */
`;
const CardInnerWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #fff7dd;
  /* box-shadow: inset 0 -10px 10px -10px #000000; */
  position: relative;
`;

const FixedButtonWrapper = styled.div`
  height: 0px;
  position: sticky;
  bottom: 0;
  transform: translateY(-50px);
`;
const LowerWrapper = styled.div`
  position: relative;
  background-color: #fed957;
  margin-top: 100px;
  height: ${(props) =>
    props.openAccount
      ? "250px"
      : props.weblink && props.contact
      ? "320px"
      : props.weblink || props.contact
      ? "250px"
      : "200px"};
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: ${(props) =>
    props.openAccount
      ? "170px"
      : props.weblink && props.contact
      ? "250px"
      : !props.contact || !props.weblink
      ? "230px"
      : "150px"};
  z-index: 9;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const Gradient = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 9;
  bottom: 0px;
  width: 100%;
  height: 100px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  @media screen and (max-height: 668px) {
  }
`;
const OwnerWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 140px;

  width: calc(100% - 40px);
  margin-left: 20px;
`;
const OrganizationLogoWrapper = styled.div`
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 100%;
  overflow: hidden;
`;
const CloseTextWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  bottom: 0px;
  height: 50px;

  width: 100%;
  padding: 5px 10px 0px 5px;
  margin-left: 0px;
`;

const DeleteButton = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
  text-decoration: underline;
  position: relative;
  cursor: pointer;
`;

const InfoModal = ({
  infoOpen,
  setInfoOpen,
  description_about,
  description_motivation,
  description_procedure,
  description_learnmore,
  weblink,
  contact,
  ownerImg,
  organizationId,
}) => {
  const cardOrganizationId = organizationId;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.data.loading);
  const userId = useSelector((state) => state.user.userId);
  const organizations = useSelector((state) => state.data.organizations);

  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);
  const openScream = useSelector((state) => state.UI.openScream);

  const openAccount = useSelector((state) => state.UI.openAccount);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const deleteAccount = () => {
    dispatch(deleteUserFromDb(userId));
  };

  const pages = [
    {
      title: "Es geht um ",
      text: description_about,

      id: 0,
    },
    {
      title: "Mit den Ideen werden wir ",
      text: description_procedure,
      id: 1,
    },
  ];

  if (description_motivation) {
    pages.push({
      title: "Unsere Motivation ist ",
      text: description_motivation,
      id: 2,
    });
  }

  if (description_learnmore) {
    pages.push({
      title: "Wenn du mehr erfahren willst, ",
      text: description_learnmore,
      id: 3,
    });
  }

  const organizationCardData = [];

  if (organizations) {
    organizations.forEach(({ organizationId, userIds, title }) => {
      if (cardOrganizationId === organizationId) {
        organizationCardData.push(userIds, title);
      }
    });
  }

  return (
    !loading && (
      <React.Fragment>
        {infoOpen && !openScream && (
          <ModalBackground onClick={() => setInfoOpen(false)} />
        )}
        <Card
          isMobileCustom={isMobileCustom}
          infoOpen={infoOpen}
          weblink={weblink}
          contact={contact}
          openProjectRoom={openProjectRoom}
          openAccount={openAccount}
        >
          <CardInnerWrapper id="SwiperOuterWrapper">
            {openProjectRoom && (
              <ProjectInfoSwiper setInfoOpen={setInfoOpen} pages={pages} />
            )}
            {openAccount && (
              <StyledText
                textAlign="center"
                margin="80px 20px 20px 20px "
                marginLeft="20px"
              >
                {t("account_contact")}
                <br />
                <br />
                {t("your")} Senf.koeln-Team
                <br />
              </StyledText>
            )}

            <LowerWrapper
              weblink={weblink}
              contact={contact}
              openProjectRoom={openProjectRoom}
              openAccount={openAccount}
            >
              <ButtonsWrapper>
                {weblink && (
                  <SubmitButton
                    text={t("more_info")}
                    zIndex="999"
                    backgroundColor="white"
                    textColor="#353535"
                    handleButtonClick={() => openLink(weblink)}
                    shadow={false}
                    smallSubmitButton={true}
                    iconLeft={true}
                    name="Weblink"
                    iconWidth="16px"
                    margin="50px 0px 0px 0px"
                  />
                )}
                {contact && (
                  <SubmitButton
                    text={t("contact")}
                    zIndex="999"
                    backgroundColor="white"
                    textColor="#353535"
                    handleButtonClick={() => openMail(contact)}
                    shadow={false}
                    smallSubmitButton={true}
                    iconLeft={true}
                    name="Contact"
                    iconWidth="22px"
                    margin="5px 0px 0px 0px"
                  />
                )}
              </ButtonsWrapper>

              <svg
                width="100%"
                height="256px"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginTop: "-100px", zIndex: -1 }}
              >
                <path
                  d="M171.395 45.7513C70.8434 16.0674 15.2351 51.7064 0 73.2365V278H402V10.8039C348.815 -13.383 323.357 8.61124 311.822 22.7511C292.936 45.9001 271.947 75.4353 171.395 45.7513Z"
                  fill="#fed957"
                />
              </svg>
              {openProjectRoom && (
                <OwnerWrapper>
                  <OrganizationLogoWrapper>
                    <StyledImg
                      src={ownerImg}
                      width="100%"
                      alt="organizationIcon"
                    />
                  </OrganizationLogoWrapper>
                  <div style={{ marginLeft: "10px" }}>
                    <StyledText>{t("projectroom_of")}</StyledText>
                    <StyledH3 fontWeight="900">
                      {organizationCardData[1]}
                    </StyledH3>
                  </div>
                </OwnerWrapper>
              )}
              {openAccount && (
                <ButtonsWrapper openAccount={openAccount}>
                  <SubmitButton
                    text={t("logout")}
                    zIndex="999"
                    backgroundColor="white"
                    textColor="#353535"
                    handleButtonClick={handleLogout}
                    shadow={false}
                    smallSubmitButton={true}
                    iconLeft={true}
                    name="Logout"
                    iconWidth="22px"
                    margin="5px 0px 0px 0px"
                  />

                  <DeleteButton onClick={deleteAccount}>
                    {t("deteleAccount")}
                  </DeleteButton>
                </ButtonsWrapper>
              )}
            </LowerWrapper>
            {/* <Gradient /> */}
          </CardInnerWrapper>
          {infoOpen && (
            <FixedButtonWrapper>
              <SubmitButton
                text={
                  openProjectRoom ? t("show_projectroom") : t("show_profile")
                }
                handleButtonClick={() => setInfoOpen(false)}
                zIndex="999"
                position="relative"
                bottom="10px"
                backgroundColor="#353535"
                textColor="white"
                margin="0 0 0 0"
              />
            </FixedButtonWrapper>
          )}
        </Card>
      </React.Fragment>
    )
  );
};

export default InfoModal;
