/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import styled from "styled-components";

// firebase
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { OrganizationCard } from "senf-atomic-design-system";
import { db } from "../../../firebase";
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import { StyledH3 } from "../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";

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

  const myOrganizations = useSelector((state) => state.user.myOrganizations);
  const myActiveOrganizations = myOrganizations?.filter(
    (organization) => organization.status === "active"
  );

  const handleSelect = (x, y, value) => {
    setSelectedOrganizationId(value);
    const selectedOrganizationName = myActiveOrganizations.filter(
      ({ organizationId }) => value.includes(organizationId)
    );
    setSelectedOrganizationName(selectedOrganizationName[0].title);
    setSelectedOrganizationType(selectedOrganizationName[0].organizationType);
  };

  useEffect(() => {
    async function fetchData() {
      const ref = doc(
        db,
        `organizations/${localStorage.getItem(
          "createProjectRoomOrganizationId"
        )}/projectRooms/${localStorage.getItem("createProjectRoomId")}`
      );

      const docSnapshot = await getDoc(ref);
      if (!docSnapshot.exists) {
        console.log("No such document!");
      } else {
        const data = docSnapshot.data();
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

    // CREATING A NEW PROJECTROOM
    const newProject = {
      createdAt: new Date().toISOString(),
      owner: selectedOrganizationName,
      organizationId: selectedOrganizationId,
      organizationType: selectedOrganizationType,
      status: "uncompleted",
    };

    const ref = collection(
      db,
      `organizations/${selectedOrganizationId}/projectRooms`
    );
    await addDoc(ref, newProject)
      .then((doc) => {
        updateDoc(doc, { projectRoomId: doc.id });
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
          <StyledH3
            textAlign="center"
            margin="20px"
          >
            {pagesData[index].subTitle}
          </StyledH3>
          <CoverWrapper>
            {myActiveOrganizations?.map(
              ({ organizationId, title, organizationType, logoURL }) => (
                <OrganizationCard
                  data={{ organizationId, title, organizationType, logoURL }}
                  organization={{ organizationId: selectedOrganizationId }}
                  handleButtonOpenCard={handleSelect}
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
