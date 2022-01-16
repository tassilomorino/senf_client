/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";
import {
  Title,
  SubTitle,
  ButtonsWrapper,
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import Searchbar from "../../../atoms/Searchbar/Searchbar";
import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchbarWrapper = styled.div`
  width: 100%;
`;

const Users = styled.div`
  width: 100%;

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
  const [nextClicked, setNextClicked] = useState(false);

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
    setNextClicked(true);

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
      setTimeout(() => {
        onClickNext();
      }, 200);
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            Füge weitere Mitglieder deiner Organisation hinzu
          </StyledH2>
          <StyledH3 textAlign="center" margin="20px">
            sadklsdjas askjddkashd kajs
          </StyledH3>
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
          <StyledH2 textAlign="center" fontWeight="900">
            Lade deine Teammitglieder:innen zu Senf ein
          </StyledH2>
          <StyledH3 textAlign="center" margin="20px">
            https://dummy-einladungslink.app
          </StyledH3>
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        // disabled={!data || nextClicked}
        // loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage4;
