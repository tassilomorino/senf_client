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

import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";
import { ButtonsWrapper, SubTitle, Title } from "./styles/sharedStyles";
import AgegroupsCover from "../../../../images/insightsCovers/agegroups-cover.jpg";

const CoverWrapper = styled.div`
  margin-left: 10%;
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    ". ."
    ". .";
`;
const Covers = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9;
  float: left;
  position: relative;
  animation: ${(props) => props.animation};
  overflow: hidden;
  border-radius: 25px;
  background-color: white;
  margin: 0;
  padding: 0;
  outline: ${(props) =>
    props.selectedOrganization ? "3px solid #353535 " : ""};

  outline-offset: -3px;
`;
const CoverImg = styled.img`
  width: 100%;
  height: 100%;
`;
const CoverTitle = styled.span`
  font-size: 18px;
  /* font-family: PlayfairDisplay-Bold; */
  font-family: Futura PT W01-Bold;
  color: #353535;
  text-align: center;
  width: 100%;
  position: absolute;
  top: 30px;
`;

const CreateOrganizationPage1 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();
  const [organizationType, setOrganizationType] = useState(null);

  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();

      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"))
        .get();

      if (!ref.exists) {
        console.log("No such document!");
      } else {
        const data = ref.data();
        setOrganizationType(data.organizationType);
      }
    }

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      fetchData();
    }
  }, []);

  const handleNext = async () => {
    const db = firebase.firestore();

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        organizationType: organizationType,
      };

      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));

      return ref.update(updateProject).then(() => {
        onClickNext();
      });
    } else {
      //CREATING A NEW PROJECTROOM
      const newProject = {
        organizationType: organizationType,
        userIds: [userId],
        startedCreating: true,
      };

      const userRef = await db.collection("users").doc(userId);
      const organizatinRef = await db.collection("organizations");

      organizatinRef
        .add(newProject)
        .then((doc) => {
          localStorage.setItem("createOrganizationId", doc.id);

          userRef.update({
            organizationId: firebase.firestore.FieldValue.arrayUnion(doc.id),
          });
        })

        .then(() => {
          onClickNext();
        });
    }
  };

  return (
    <div>
      <Title>Welche Art von Organisation seid ihr?</Title>
      <SubTitle>sdjhaskjdhas jkhashda skjdh asjkdhaskjdhs shjajkdsh</SubTitle>

      <CoverWrapper>
        <Covers
          animation="coverAnimation 0.5s ease-in-out"
          onClick={() => setOrganizationType(1)}
          selectedOrganization={organizationType === 1}
        >
          <CoverTitle>{t("Bürgerinitiative")}</CoverTitle>
          <CoverImg src={AgegroupsCover} alt="insights-topic-cover" />
        </Covers>

        <Covers
          animation="coverAnimation 0.75s ease-in-out"
          onClick={() => setOrganizationType(2)}
          selectedOrganization={organizationType === 2}
        >
          <CoverTitle>{t("Verein")}</CoverTitle>
          <CoverImg src={AgegroupsCover} alt="insights-districts-cover" />
        </Covers>

        <Covers
          animation="coverAnimation 1.25s ease-in-out"
          onClick={() => setOrganizationType(3)}
          selectedOrganization={organizationType === 3}
        >
          <CoverTitle>{t("Planungsbüro")}</CoverTitle>
          <CoverImg src={AgegroupsCover} alt="insights-agegroups-cover" />
        </Covers>
        <Covers
          animation="coverAnimation 1s ease-in-out"
          onClick={() => setOrganizationType(4)}
          selectedOrganization={organizationType === 4}
        >
          <CoverTitle>{t("toolbox")}</CoverTitle>
          <CoverImg src={AgegroupsCover} alt="insights-keywords-cover" />{" "}
          {/* <WordcloudDialog /> */}
        </Covers>
      </CoverWrapper>

      <ButtonsWrapper>
        <SubmitButton
          text={t("next")}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          top={document.body.clientWidth > 768 ? "100px" : "70px"}
          left="0"
          handleButtonClick={handleNext}
          disabled={!organizationType}
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
    </div>
  );
};

export default CreateOrganizationPage1;
