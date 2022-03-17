/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

//Components
import Weblink from "../../../molecules/Modals/Post_Edit_ModalComponents/Weblink";
import { CustomIconButton } from "../../../atoms/CustomButtons/CustomButton";

//images
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import Contact from "../../../molecules/Modals/Post_Edit_ModalComponents/Contact";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";

const ButttonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CreateProjectPage2 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);

  const createProjectValidationSchema = yup.object({
    title: yup
      .string()
      .required(t("enter_email"))
      .min(3, t("username_too_short"))
      .max(40, t("username_too_long")),

    description: yup
      .string()
      .required(t("enter_email"))
      .min(10, t("username_too_short"))
      .max(1000, t("username_too_long")),
  });

  const formik = useFormik({
    initialValues: {
      contact: "",
      contactTitle: "Kontakt",
      weblink: "",
      weblinkTitle: "Website",
    },
    validationSchema: createProjectValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();
      if (
        typeof Storage !== "undefined" &&
        localStorage.getItem("createProjectRoomId")
      ) {
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

          if (data.contact) {
            formik.setFieldValue("contact", data.contact);
          }
          if (data.contactTitle) {
            formik.setFieldValue("contactTitle", data.contactTitle);
          }
          if (data.weblink) {
            formik.setFieldValue("weblink", data.weblink);
          }
          if (data.weblinkTitle) {
            formik.setFieldValue("weblinkTitle", data.weblinkTitle);
          }
        }
      }
    }
    fetchData();
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
        weblinkTitle: formik.values.weblinkTitle,
        weblink: formik.values.weblink,
        contactTitle: formik.values.contactTitle,
        contact: formik.values.contact,
      };
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createProjectRoomOrganizationId"))
        .collection("projectRooms")
        .doc(localStorage.getItem("createProjectRoomId"));
      return ref.update(updateProject).then(() => {
        setTimeout(() => {
          if (localStorage.getItem("createProjectRoomPostEdit") === "true") {
            set(pagesData.length - 1);
          } else {
            onClickNext();
          }
        }, 200);
      });
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH3 textAlign="center" margin="20px">
            {pagesData[index].subTitle}
          </StyledH3>

          <TextField
            id="outlined-name"
            name="contactTitle"
            type="contactTitle"
            label={t("Kontakt-Titel")}
            margin="normal"
            variant="outlined"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
            }}
            value={formik.values.contactTitle}
            onChange={formik.handleChange}
          />

          <TextField
            id="outlined-name"
            name="contact"
            type="contact"
            label={t("contact-address")}
            margin="normal"
            variant="outlined"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
              marginTop: "5px",
            }}
            value={formik.values.contact}
            onChange={formik.handleChange}
          />

          <TextField
            id="outlined-name"
            name="weblinkTitle"
            type="weblinkTitle"
            label={t("Link-Titel")}
            margin="normal"
            variant="outlined"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
              marginTop: "30px",
            }}
            value={formik.values.weblinkTitle}
            onChange={formik.handleChange}
          />

          <TextField
            id="outlined-name"
            name="weblink"
            type="weblink"
            label={t("external-link")}
            margin="normal"
            variant="outlined"
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
              marginTop: "5px",
            }}
            value={formik.values.weblink}
            onChange={formik.handleChange}
          />
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        set={set}
        disabled={nextClicked}
        loading={nextClicked}
        pagesData={pagesData}
        index={index}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage2;
