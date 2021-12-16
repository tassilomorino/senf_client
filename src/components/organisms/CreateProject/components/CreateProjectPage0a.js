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

import { SubTitle, Title } from "./styles/sharedStyles";
import CustomSelect from "../../../atoms/Selects/CustomSelect";

const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CreateProjectPage1 = ({ onClickNext }) => {
  const { t } = useTranslation();

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
    const db = firebase.firestore();

    //CREATING A NEW PROJECTROOM
    const newProject = {
      createdAt: new Date().toISOString(),
      owner: selectedOrganizationName,
      organizationId: selectedOrganizationId,
    };

    await db
      .collection("organizations")
      .doc(selectedOrganizationId)
      .collection("projectRooms")
      .add(newProject)
      .then((doc) => {
        doc.update({ projectRoomId: doc.id });
        localStorage.setItem("createProjectRoomId", doc.id);
        localStorage.setItem(
          "createProjectRoomOrganizationId",
          selectedOrganizationId
        );
      })

      .then(() => {
        onClickNext();
      });
  };

  return (
    <React.Fragment>
      <Title>Wähle die Organisation</Title>
      <SubTitle>
        Wähle einen passenden Projektnamen sowie eine Projektraumbeschreibung,
        die zum einen informiert und zum anderen auffordert Ideen beizutragen
        und sich einzubringen.
      </SubTitle>

      <SelectContainer>
        <CustomSelect
          name={"project"}
          value={selectedOrganizationId}
          initialValue={""}
          options={optionsOrganizationsArray}
          handleDropdown={handleDropdown}
        />
      </SelectContainer>

      <SubmitButton
        text={t("lets_go")}
        zIndex="9"
        backgroundColor="white"
        textColor="#353535"
        position="relative"
        top={document.body.clientWidth > 768 ? "100px" : "70px"}
        left="0"
        handleButtonClick={handleNext}
        disabled={!selectedOrganizationId}
        //   keySubmitRef={keySubmitRef}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage1;
