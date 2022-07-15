/** @format */

import React, { useState, useEffect, useRef } from "react";

import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Box, Input } from "senf-atomic-design-system";
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

          <Box flexDirection="column" gap="20px">
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

            <Input
              key="brief"
              id="brief"
              name="brief"
              type="textarea"
              placeholder={t("add_brief")}
              label={t("brief")}
              rows={1}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.brief}
              error={formik?.touched.brief && Boolean(formik?.errors.brief)}
              note={formik?.touched.brief && formik?.errors.brief}
              // minRows="4"
              // maxRows="6"
            />

            <Input
              key="description_about"
              id="description_about"
              name="description_about"
              type="textarea"
              placeholder={t("add_description_about")}
              label={t("description_about")}
              rows={1}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.description_about}
              error={
                formik?.touched.description_about &&
                Boolean(formik?.errors.description_about)
              }
              note={
                formik?.touched.description_about &&
                formik?.errors.description_about
              }
              // minRows="4"
              // maxRows="6"
            />

            <Input
              key="description_procedure"
              id="description_procedure"
              name="description_procedure"
              type="textarea"
              placeholder={t("add_description_procedure")}
              label={t("description_procedure")}
              rows={1}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.description_procedure}
              error={
                formik?.touched.description_procedure &&
                Boolean(formik?.errors.description_procedure)
              }
              note={
                formik?.touched.description_procedure &&
                formik?.errors.description_procedure
              }
              // minRows="4"
              // maxRows="6"
            />

            <Input
              key="description_motivation"
              id="description_motivation"
              name="description_motivation"
              type="textarea"
              placeholder={t("add_description_motivation")}
              label={t("description_motivation")}
              rows={1}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.description_motivation}
              error={
                formik?.touched.description_motivation &&
                Boolean(formik?.errors.description_motivation)
              }
              note={
                formik?.touched.description_motivation &&
                formik?.errors.description_motivation
              }
              // minRows="4"
              // maxRows="6"
            />

            <Input
              key="description_learnmore"
              id="description_learnmore"
              name="description_learnmore"
              type="textarea"
              placeholder={t("add_description_learnmore")}
              label={t("description_learnmore")}
              rows={1}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.description_learnmore}
              error={
                formik?.touched.description_learnmore &&
                Boolean(formik?.errors.description_learnmore)
              }
              note={
                formik?.touched.description_learnmore &&
                formik?.errors.description_learnmore
              }
              // minRows="4"
              // maxRows="6"
            />
          </Box>
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
