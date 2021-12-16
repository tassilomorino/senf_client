/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

//Components
import Weblink from "../../../molecules/Modals/Post_Edit_ModalComponents/Weblink";
import { CustomIconButton } from "../../../atoms/CustomButtons/CustomButton";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//images
import { ButtonsWrapper, SubTitle, Title } from "./styles/sharedStyles";
import CreateProjectTitle from "./CreateProjectTitle";
import Contact from "../../../molecules/Modals/Post_Edit_ModalComponents/Contact";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButttonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const CreateProjectPage2 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const createProjectFormData = useSelector(
    (state) => state.formData.createProjectFormData
  );

  const [weblinkOpen, setWeblinkOpen] = useState(false);
  const [weblink, setWeblink] = useState(null);
  const [weblinkTitle, setWeblinkTitle] = useState(null);

  const [contactOpen, setContactOpen] = useState(false);
  const [contact, setContact] = useState(null);
  const [contactTitle, setContactTitle] = useState(null);

  const handleCloseWeblink = () => {
    setWeblinkOpen(false);
    setWeblink(null);
    setWeblinkTitle(null);
  };
  const handleSaveWeblink = () => {
    setWeblinkOpen(false);
  };

  const handleCloseContact = () => {
    setContactOpen(false);
    setContact(null);
    setContactTitle(null);
  };
  const handleSaveContact = () => {
    setContactOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();
      if (
        typeof Storage !== "undefined" &&
        localStorage.getItem("createProjectRoomId")
      ) {
        const ref = await db
          .collection("organizations")
          .doc(localStorage.getItem("createProjectRoomOrganizationId"))
          .collection("projectRooms")
          .doc(localStorage.getItem("createProjectRoomId"))
          .get();

        if (!ref.exists) {
          console.log("No such document!");
        } else {
          const data = ref.data();

          if (data.contact) {
            setContact(data.contact);
            setContactTitle(data.contactTitle);
          }
          if (data.weblink) {
            setWeblink(data.weblink);
            setWeblinkTitle(data.weblinkTitle);
          }
        }
      }
    }
    fetchData();
  }, []);

  const handleNext = async () => {
    const db = firebase.firestore();
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        weblinkTitle: weblinkTitle,
        weblink: weblink,
        contactTitle: contactTitle,
        contact: contact,
      };
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createProjectRoomOrganizationId"))
        .collection("projectRooms")
        .doc(localStorage.getItem("createProjectRoomId"));
      return ref.update(updateProject).then(() => {
        onClickNext();
      });
    }
  };

  return (
    <Wrapper>
      {ReactDOM.createPortal(
        <React.Fragment>
          {weblinkOpen && (
            <Weblink
              handleCloseWeblink={handleCloseWeblink}
              handleSaveWeblink={handleSaveWeblink}
              weblinkTitle={weblinkTitle}
              weblink={weblink}
              setWeblinkTitle={setWeblinkTitle}
              setWeblink={setWeblink}
              setWeblinkOpen={setWeblinkOpen}
            />
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )}

      {ReactDOM.createPortal(
        <React.Fragment>
          {contactOpen && (
            <Contact
              handleCloseContact={handleCloseContact}
              handleSaveContact={handleSaveContact}
              contactTitle={contactTitle}
              contact={contact}
              setContactTitle={setContactTitle}
              setContact={setContact}
              setContactOpen={setContactOpen}
            />
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )}

      <CreateProjectTitle />
      <Title> Kontaktdaten hinzufügen</Title>

      <SubTitle>
        Füge deine Kontaktdaten (E-mail, Link) hinzu, um erreichbar zu sein und
        deine .
      </SubTitle>

      <ButttonsWrapper>
        <CustomIconButton
          name="Weblink"
          position="relative"
          iconWidth="80%"
          backgroundColor={
            weblink !== null && weblinkTitle !== null ? "#fed957" : "white"
          }
          handleButtonClick={() => setWeblinkOpen(true)}
        />

        <CustomIconButton
          name="Contact"
          position="relative"
          marginLeft="20px"
          iconWidth="80%"
          zIndex={0}
          backgroundColor={
            contact !== null && contactTitle !== null ? "#fed957" : "white"
          }
          handleButtonClick={() => setContactOpen(true)}
        />
      </ButttonsWrapper>

      <ButtonsWrapper>
        <SubmitButton
          text={t("next")}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          top={document.body.clientWidth > 768 ? "100px" : "70px"}
          left="0"
          handleButtonClick={handleNext}
          //   keySubmitRef={keySubmitRef}
        />
        <SubmitButton
          text={t("back")}
          zIndex="9"
          backgroundColor="transparent"
          shadow={false}
          textColor="#353535"
          left="0"
          handleButtonClick={onClickPrev}
          //   keySubmitRef={keySubmitRef}
        />
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default CreateProjectPage2;
