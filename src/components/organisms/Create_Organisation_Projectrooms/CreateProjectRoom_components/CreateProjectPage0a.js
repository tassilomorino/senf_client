/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import CustomSelect from "../../../atoms/Selects/CustomSelect";
import { StyledH2, StyledH3, StyledImg } from "../../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";

const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const OrganizationCard = styled.div`
  height: 300px;
`;
const ImgWrapper = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
`;

const CreateProjectPage1 = ({ onClickNext }) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);
  const organizations = useSelector((state) => state.data.organizations);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(null);
  const [selectedOrganizationName, setSelectedOrganizationName] =
    useState(null);

  const myOrganizations = organizations.filter(({ organizationId }) =>
    organizationId.includes(organizationId)
  );

  const optionsOrganizationsArray = _.orderBy(
    myOrganizations,
    "createdAt",
    "desc"
  ).map((organization) => ({
    name: organization.organizationId,
    label: organization.title,
    img: organization.imgUrl,
  }));

  const handleDropdown = (value) => {
    setSelectedOrganizationId(value);
    const selectedOrganizationName = myOrganizations.filter(
      ({ organizationId }) => value.includes(organizationId)
    );
    setSelectedOrganizationName(selectedOrganizationName[0].title);
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
          <StyledH2 fontWeight="900" textAlign="center">
            Übersicht
          </StyledH2>
          <StyledH3 textAlign="center" margin="20px">
            Wähle einen passenden Projektnamen sowie eine
            Projektraumbeschreibung, die zum einen informiert und zum anderen
            auffordert Ideen beizutragen und sich einzubringen.
          </StyledH3>

          <SelectContainer>
            <CustomSelect
              name={"project"}
              value={selectedOrganizationId}
              initialValue={""}
              options={optionsOrganizationsArray}
              handleDropdown={handleDropdown}
            />
          </SelectContainer>

          {myOrganizations.map((organization) => (
            <OrganizationCard>
              <ImgWrapper>
                <StyledImg src={organization.imgUrl} width="100%" />
              </ImgWrapper>
              <StyledH2 fontWeight="900" textAlign="center">
                {organization.title}
              </StyledH2>
            </OrganizationCard>
          ))}
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("lets_go")}
        handleNext={handleNext}
        disabled={!selectedOrganizationId || nextClicked}
        loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage1;
