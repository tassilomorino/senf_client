/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//firebase
import { db } from "../../../../firebase";

import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";
import {
  ButtonsWrapper,
  ComponentInnerWrapper,
  ComponentWrapper,
  SubTitle,
  Title,
} from "../styles/sharedStyles";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3, StyledText } from "../../../../styles/GlobalStyle";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const CreateOrganizationPage1 = ({
  onClickNext,
  onClickPrev,
  set,
  setTitle,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);

  const [outsideClick, setOutsideClick] = useState(false);

  const outerRef = useRef();
  useOnClickOutside(outerRef, () => {
    setOutsideClick(true);
    setTimeout(() => {
      setOutsideClick(false);
    }, 10000);
  });

  const createProjectValidationSchema = yup.object({
    title: yup
      .string()
      .required(t("enter_organizations_name"))
      .min(3, t("orgaznizations_name_too_short"))
      .max(40, t("organizations_name_too_long")),

    description: yup
      .string()
      .required(t("enter_organizations_description"))
      .min(10, t("organizations_description_too_short"))
      .max(1000, t("organizations_description_too_long")),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: createProjectValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    formik.setFieldTouched("title", true);

    async function fetchData() {
      const ref = doc(
        db,
        "organizations",
        localStorage.getItem("createProjectRoomOrganizationId")
      );

      const docSnapshot = await getDoc(ref);

      if (!docSnapshot.exists()) {
        console.log("No such document!");
      } else {
        const data = docSnapshot.data();
        setTitle(data.title);

        formik.setFieldValue("title", data.title);
        formik.setFieldValue("description", data.description);
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
    setNextClicked(true);

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        title: formik.values.title,
        description: formik.values.description,
      };
      const ref = doc(
        db,
        "organizations",
        localStorage.getItem("createProjectRoomOrganizationId")
      );
      await updateDoc(ref, updateProject).then(() => {
        setTitle(updateProject.title);
        if (localStorage.getItem("createOrganizationPostEdit") === "true") {
          set(pagesData.length - 1);
        } else {
          onClickNext();
        }
      });
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper ref={outerRef}>
        <ComponentInnerWrapper>
          <StyledH3 textAlign="center" margin="20px">
            {pagesData[index].subTitle}
          </StyledH3>

          <TextField
            id="outlined-name"
            name="title"
            type="title"
            label={t("createOrganizationPage1_FieldName_Title")}
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
            name="description"
            type="description"
            label={t("organizations_description")}
            margin="normal"
            multiline
            minRows="10"
            maxRows="12"
            variant="outlined"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
            }}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={outsideClick && Boolean(formik.errors.description)}
            helperText={outsideClick && formik.errors.description}
          />
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        set={set}
        index={index}
        pagesData={pagesData}
        disabled={!formik.isValid || nextClicked}
        loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage1;
