/** @format */

import React, { useState, useEffect, useRef } from "react";
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
import { SubTitle, Title, ButtonsWrapper } from "./styles/sharedStyles";
import CustomSelect from "../../../atoms/Selects/CustomSelect";

const CreateProjectPage1 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();
  const [outsideClick, setOutsideClick] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);

  const outerRef = useRef();
  useOnClickOutside(outerRef, () => {
    setOutsideClick(true);
    setTimeout(() => {
      setOutsideClick(false);
    }, 10000);
  });

  const [title, setTitle] = useState(null);

  const validationSchema = yup.object({
    title: yup
      .string()
      .required(t("enter_email"))
      .min(3, t("username_too_short"))
      .max(40, t("username_too_long")),

    description: yup
      .string()
      .required(t("enter_email"))
      .min(10, t("username_too_short"))
      .max(3000, t("username_too_long")),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

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
        setTitle(data.title);
        formik.setFieldValue("title", data.title);
        formik.setFieldValue("description", data.description);
        setTimeout(() => {
          formik.setFieldTouched("title", true);
        }, 1);
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

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        title: formik.values.title,
        description: formik.values.description,
      };

      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createProjectRoomOrganizationId"))
        .collection("projectRooms")
        .doc(localStorage.getItem("createProjectRoomId"));

      return ref.update(updateProject).then(() => {
        setTimeout(() => {
          onClickNext();
        }, 200);
      });
    } else {
    }
  };

  return (
    <div ref={outerRef}>
      <Title>
        {title ? (
          <span>Projektinfos bearbeiten</span>
        ) : (
          <span>
            Erstelle deinen <br />
            Projektraum
          </span>
        )}
      </Title>
      <SubTitle>
        Wähle einen passenden Projektnamen sowie eine Projektraumbeschreibung,
        die zum einen informiert und zum anderen auffordert Ideen beizutragen
        und sich einzubringen.
      </SubTitle>

      <TextField
        id="outlined-name"
        name="title"
        type="title"
        label={t("projectRoom_title")}
        margin="normal"
        variant="outlined"
        multiline
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "80%",
        }}
        value={formik.values.title}
        onChange={formik.handleChange}
        error={outsideClick && Boolean(formik.errors.title)}
        helperText={outsideClick && formik.errors.title}
      />
      <TextField
        id="outlined-name"
        name="description"
        type="description"
        label={t("projectRoom_description")}
        margin="normal"
        multiline
        minRows="10"
        maxRows="12"
        variant="outlined"
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "80%",
        }}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={outsideClick && Boolean(formik.errors.description)}
        helperText={outsideClick && formik.errors.description}
      />

      <ButtonsWrapper>
        <SubmitButton
          text={t("next")}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          top={document.body.clientWidth > 768 ? "100px" : "70px"}
          left="0"
          handleButtonClick={handleNext}
          disabled={!formik.isValid || nextClicked}
          loading={nextClicked}
          //   keySubmitRef={keySubmitRef}
        />
      </ButtonsWrapper>
    </div>
  );
};

export default CreateProjectPage1;
