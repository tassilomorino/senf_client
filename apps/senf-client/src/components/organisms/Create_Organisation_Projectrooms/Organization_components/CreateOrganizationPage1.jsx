/** @format */

import React, { useState, useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
// firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Box, Input } from "senf-atomic-design-system";
import { db } from "../../../../firebase";

import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import Navigation from "../Components/Navigation";
import { StyledH3 } from "../../../../styles/GlobalStyle";

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
    async function fetchData() {
      try {
        const docSnapshot = await getDoc(
          doc(db, "organizations", localStorage.getItem("createOrganizationId"))
        );

        if (!docSnapshot.exists()) {
          console.log("No such document!");
        } else {
          const data = docSnapshot.data();
          setTitle(data.title);

          formik.setFieldValue("title", data.title);
          formik.setFieldValue("description", data.description);
        }
      } catch (error) {
        console.log(error);
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
      try {
        // UPDATING AN EXISTING PROJECTROOM
        const updateProject = {
          title: formik.values.title,
          description: formik.values.description,
        };
        const ref = doc(
          db,
          "organizations",
          localStorage.getItem("createOrganizationId")
        );
        await updateDoc(ref, updateProject).then(() => {
          setTitle(updateProject.title);
          if (localStorage.getItem("createOrganizationPostEdit") === "true") {
            set(pagesData.length - 1);
          } else {
            onClickNext();
          }
        });
      } catch (error) {
        console.log(error);
      }
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
              placeholder={t("add_title")}
              label={t("createOrganizationPage1_FieldName_Title")}
              rows={1}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.title}
              error={formik?.touched.title && Boolean(formik?.errors.title)}
              note={formik?.touched.title && formik?.errors.title}
            />

            <Input
              key="description"
              id="description"
              name="description"
              type="textarea"
              placeholder={t("add_description")}
              label={t("organizations_description")}
              rows={1}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.description}
              error={
                formik?.touched.description &&
                Boolean(formik?.errors.description)
              }
              note={formik?.touched.description && formik?.errors.description}

              // minRows="10"
              // maxRows="12"
            />
          </Box>
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
