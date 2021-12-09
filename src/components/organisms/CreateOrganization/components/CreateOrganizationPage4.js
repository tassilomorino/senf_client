/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";
import { Title, SubTitle, ButtonsWrapper } from "./styles/sharedStyles";
import CreateProjectTitle from "./CreateProjectTitle";
import Searchbar from "../../../atoms/Searchbar/Searchbar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchbarWrapper = styled.div`
  width: 60%;
`;

const Users = styled.div`
  width: 60%;

  height: 50px;
  border-radius: 50px;
  background-color: #353535;
  display: flex;
  align-items: center;
`;

const UserName = styled.p`
  margin-left: 20px;
  color: white;
`;

const CreateOrganizationPage4 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [authorizedUserIds, setAuthorizedUserIds] = useState(null);
  const [authorizedUserNames, setAuthorizedUserNames] = useState(null);

  const search = async (e) => {
    if (e.key === "Enter") {
    }
  };

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();
      if (
        typeof Storage !== "undefined" &&
        localStorage.getItem("createOrganizationId")
      ) {
        const ref = await db
          .collection("organizations")
          .doc(localStorage.getItem("createOrganizationId"))
          .get();

        if (!ref.exists) {
          console.log("No such document!");
        } else {
          const data = ref.data();

          if (data.userIds) {
            const refUsers = await db
              .collection("users")
              .where("userId", "in", data.userIds)
              .get();

            const authorizedUserNamesRaw = [];

            refUsers.docs.forEach((doc) =>
              authorizedUserNamesRaw.push({ ...doc.data() })
            );
            setAuthorizedUserNames(authorizedUserNamesRaw);
            setAuthorizedUserIds(data.userIds);
          }
        }
      }
    }
    fetchData();
  }, []);

  const handleNext = async () => {
    const db = firebase.firestore();

    //Remove organizationid from UserArray
    // userRef.update({
    //   organizationId: firebase.firestore.FieldValue.arrayRemove(doc.id),
    // });

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      // const updateProject = {
      //   userIds: firebase.firestore.FieldValue.arrayUnion(authorizedUserIds),
      // };
      // const ref = await db
      //   .collection("organizations")
      //   .doc(localStorage.getItem("createOrganizationId"));
      // return ref.update(updateProject).then(() => {
      //   onClickNext();
      // });
      onClickNext();
    }
  };

  return (
    <React.Fragment>
      <Wrapper>
        <CreateProjectTitle />
        <Title>Füge weitere Mitglieder deiner Organisation hinzu </Title>
        <SubTitle>sadklsdjas askjddkashd kajs</SubTitle>
        <br />
        {authorizedUserNames &&
          authorizedUserNames.map((item) => (
            <Users>
              <UserName>{item.handle}</UserName>
            </Users>
          ))}
        <br /> <br />
        <SearchbarWrapper>
          <Searchbar
            placeholder="Teammitglieder:innen hinzufügen..."
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            handleSearch={search}
            backgroundColor="#f8f8f8"
          />
        </SearchbarWrapper>
        <br /> <br />
        <SubTitle>Lade deine Teammitglieder:innen zu Senf ein</SubTitle>
        Einladungslink
        <ButtonsWrapper>
          <SubmitButton
            text={t("next")}
            zIndex="9"
            backgroundColor="white"
            textColor="#353535"
            transformX="none"
            marginLeft="0"
            left="0"
            handleButtonClick={handleNext}
            // disabled={!formikCreateProjectStore.isValid}
            // keySubmitRef={keySubmitRef}
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
    </React.Fragment>
  );
};

export default CreateOrganizationPage4;
