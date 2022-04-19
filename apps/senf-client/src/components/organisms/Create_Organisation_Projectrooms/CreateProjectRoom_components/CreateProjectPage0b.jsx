/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import { StyledH2, StyledH3, StyledImg } from "../../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";
import { InlineOrganizationCard } from "../Components/InlineOrganizationCard";

const CoverWrapper = styled.div`
  left: 0;
  width: 100vw;
  height: 100%;
  position: absolute;
  height: auto;
  padding-bottom: 200px;
  display: block;

  @media (min-width: 768px) {
    position: relative;

    margin-left: 10%;
    width: 80%;
    padding-top: 20px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px 20px;
    grid-template-areas:
      ". ."
      ". .";
  }
`;

const CreateProjectPage1 = ({ onClickNext, pagesData, index }) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);
  const organizations = useSelector((state) => state.data.organizations);
  const user = useSelector((state) => state.user);

  const [selectedOrganizationId, setSelectedOrganizationId] = useState(null);
  const [selectedOrganizationName, setSelectedOrganizationName] =
    useState(null);
  const [selectedOrganizationType, setSelectedOrganizationType] =
    useState(null);

    const userOrganizationIds = useSelector((state) => state.user.organizationId);
    const myOrganizations = organizations.filter(({ organizationId }) =>
      userOrganizationIds.includes(organizationId)
    );

  
  const handleDropdown = (value) => {
    setSelectedOrganizationId(value);
    const selectedOrganizationName = myOrganizations.filter(
      ({ organizationId }) => value.includes(organizationId)
    );
    setSelectedOrganizationName(selectedOrganizationName[0].title);
    setSelectedOrganizationType(selectedOrganizationName[0].organizationType);
  };

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();

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
        setSelectedOrganizationId(data.owner);
      }
    }

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      fetchData();
    }
  }, []);

  const handleNext = async () => {
    setNextClicked(true);

    const db = firebase.firestore();

    //CREATING A NEW PROJECTROOM
    const newProject = {
      createdAt: new Date().toISOString(),
      owner: selectedOrganizationName,
      organizationId: selectedOrganizationId,
      organizationType: selectedOrganizationType,
      status: "uncompleted",
    };

    await db
      .collection("organizations")
      .doc(selectedOrganizationId)
      .collection("projectRooms")
      .add(newProject)
      .then((doc) => {
        doc.update({ projectRoomId: doc.id });
        localStorage.setItem(
          "createProjectRoomOrganizationId",
          selectedOrganizationId
        );
        localStorage.setItem("createProjectRoomId", doc.id);
      })

      .then(() => {
        setTimeout(() => {
          onClickNext();
        }, 200);
      });
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH3 textAlign="center" margin="20px">
            {pagesData[index].subTitle}
          </StyledH3>
          <CoverWrapper>
            {myOrganizations?.map(
              ({ organizationId, title, organizationType }) => (
                <InlineOrganizationCard
                  organizationId={organizationId}
                  title={title}
                  organizationType={organizationType}
                  handleDropdown={handleDropdown}
                  selectedOrganizationId={selectedOrganizationId}
                />
              )
            )}
          </CoverWrapper>
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("lets_go")}
        handleNext={handleNext}
        disabled={!selectedOrganizationId || nextClicked}
        loading={nextClicked}
        pagesData={pagesData}
        index={index}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage1;
