/** @format */

import React, { useState, useEffect, useRef } from "react";

import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";
import {
  ComponentWrapper,
  ComponentInnerWrapper,
} from "../styles/sharedStyles";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";

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
    brief: yup
      .string()
      .required(t("enter_email"))
      .min(3, t("username_too_short"))
      .max(500, t("username_too_long")),

    description_about: yup
      .string()
      .required(t("enter_email"))
      .min(10, t("username_too_short"))
      .max(5000, t("username_too_long")),

    description_procedure: yup
      .string()
      .required(t("enter_email"))
      .min(10, t("username_too_short"))
      .max(3000, t("username_too_long")),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      brief: "",
      description_about: "",
      description_procedure: "",
      description_motivation: "",
      description_learnmore: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    formik.setFieldTouched("title", true);

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
        formik.setFieldValue("brief", data.brief);
        formik.setFieldValue("description_about", data.description_about);
        formik.setFieldValue(
          "description_procedure",
          data.description_procedure
        );
        formik.setFieldValue(
          "description_motivation",
          data.description_motivation
        );
        formik.setFieldValue(
          "description_learnmore",
          data.description_learnmore
        );
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
        brief: formik.values.brief,
        description_about: formik.values.description_about,
        description_procedure: formik.values.description_procedure,
        description_motivation: formik.values.description_motivation
          ? formik.values.description_motivation
          : null,
        description_learnmore: formik.values.description_learnmore
          ? formik.values.description_learnmore
          : null,
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
    <React.Fragment>
      <ComponentWrapper ref={outerRef}>
        <ComponentInnerWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            {title ? (
              <span>Projektinfos bearbeiten</span>
            ) : (
              <span>
                Erstelle deinen <br />
                Projektraum
              </span>
            )}
          </StyledH2>
          <StyledH3 textAlign="center" margin="20px">
            Wähle einen passenden Projektnamen sowie eine
            Projektraumbeschreibung, die zum einen informiert und zum anderen
            auffordert Ideen beizutragen und sich einzubringen.
          </StyledH3>

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
              width: "100%",
            }}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={outsideClick && Boolean(formik.errors.title)}
            helperText={outsideClick && formik.errors.title}
          />

          <TextField
            id="outlined-name"
            name="brief"
            type="brief"
            label={t("Kurzbeschreibung")}
            margin="normal"
            multiline
            minRows="4"
            maxRows="6"
            variant="outlined"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
            }}
            value={formik.values.brief}
            onChange={formik.handleChange}
            error={outsideClick && Boolean(formik.errors.brief)}
            helperText={outsideClick && formik.errors.brief}
          />
          <TextField
            id="outlined-name"
            name="description_about"
            type="description_about"
            label={t("Es geht um...")}
            margin="normal"
            multiline
            minRows="4"
            maxRows="6"
            variant="outlined"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
            }}
            value={formik.values.description_about}
            onChange={formik.handleChange}
            error={outsideClick && Boolean(formik.errors.description_about)}
            helperText={outsideClick && formik.errors.description_about}
          />
          <TextField
            id="outlined-name"
            name="description_procedure"
            type="description_procedure"
            label={t("Mit den Ideen werden wir...")}
            margin="normal"
            multiline
            minRows="4"
            maxRows="6"
            variant="outlined"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
            }}
            value={formik.values.description_procedure}
            onChange={formik.handleChange}
            error={outsideClick && Boolean(formik.errors.description_procedure)}
            helperText={outsideClick && formik.errors.description_procedure}
          />

          <TextField
            id="outlined-name"
            name="description_motivation"
            type="description_motivation"
            label={t("Unsere Motivation ist...")}
            margin="normal"
            multiline
            minRows="4"
            maxRows="6"
            variant="outlined"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
            }}
            value={formik.values.description_motivation}
            onChange={formik.handleChange}
            error={
              outsideClick && Boolean(formik.errors.description_motivation)
            }
            helperText={outsideClick && formik.errors.description_motivation}
          />

          <TextField
            id="outlined-name"
            name="description_learnmore"
            type="description_learnmore"
            label={t("Wenn du mehr erfahren willst...")}
            margin="normal"
            multiline
            minRows="4"
            maxRows="6"
            variant="outlined"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
            }}
            value={formik.values.description_learnmore}
            onChange={formik.handleChange}
          />
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        handleNext={handleNext}
        disabled={!formik.isValid || nextClicked}
        loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage1;
