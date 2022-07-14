/** @format */

import React, { useState, useEffect, useRef } from "react";

import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Input } from "senf-atomic-design-system";
import { db } from "../../../../firebase";

import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";
import {
  ComponentWrapper,
  ComponentInnerWrapper,
} from "../styles/sharedStyles";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";

const CreateProjectPage1 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
  setTitle,
}) => {
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
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    formik.setFieldTouched("title", true);

    async function fetchData() {
      const ref = doc(
        db,
        "organizations",
        localStorage.getItem("createProjectRoomOrganizationId"),
        "projectRooms",
        localStorage.getItem("createProjectRoomId")
      );
      const docSnapshot = await getDoc(ref);
      if (!docSnapshot.exists()) {
        console.log("No such document!");
      } else {
        const data = docSnapshot.data();

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

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      // UPDATING AN EXISTING PROJECTROOM
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

      const ref = doc(
        db,
        `organizations/${localStorage.getItem(
          "createProjectRoomOrganizationId"
        )}/projectRooms/${localStorage.getItem("createProjectRoomId")}`
      );

      await updateDoc(ref, updateProject).then(() => {
        setTimeout(() => {
          if (localStorage.getItem("createProjectRoomPostEdit") === "true") {
            set(pagesData.length - 1);
          } else {
            onClickNext();
          }
        }, 200);
      });
    } else {
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper ref={outerRef}>
        <ComponentInnerWrapper>
          <StyledH3 textAlign="center" margin="20px">
            {pagesData[index].subTitle}
          </StyledH3>

          <Input
            key="title"
            id="title"
            name="title"
            type="textarea"
            placeholder={t("add_description")}
            label={t("projectRoom_title")}
            rows={1}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            value={formik?.values.title}
            error={formik?.touched.title && Boolean(formik?.errors.title)}
            note={formik?.touched.title && formik?.errors.title}
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
        handlePrev={
          localStorage.getItem("createProjectRoomPostEdit") === "true"
        }
        prevLabel={localStorage.getItem("createProjectRoomPostEdit") === "true"}
        nextLabel={t("next")}
        handleNext={handleNext}
        set={set}
        disabled={!formik.isValid || nextClicked}
        loading={nextClicked}
        pagesData={pagesData}
        index={index}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage1;
