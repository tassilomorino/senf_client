/** @format */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Input, Box } from "senf-atomic-design-system";
import { db } from "../../../firebase";
// images
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3 } from "../../../styles/GlobalStyle";

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
      if (
        typeof Storage !== "undefined" &&
        localStorage.getItem("createProjectRoomId")
      ) {
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

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      // UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        weblinkTitle: formik.values.weblinkTitle,
        weblink: formik.values.weblink,
        contactTitle: formik.values.contactTitle,
        contact: formik.values.contact,
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
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH3
            textAlign="center"
            margin="20px"
          >
            {pagesData[index].subTitle}
          </StyledH3>

          <Box
            flexDirection="column"
            gap="20px"
          >
            <Input
              name="contactTitle"
              type="text"
              placeholder={t("add_contactTitle")}
              label={t("contactTitle")}
              rows={1}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.contactTitle}
            />
            <Input
              name="contact"
              type="text"
              placeholder={t("add_contact-address")}
              label={t("contact-address")}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.contact}
            />

            <Input
              name="weblinkTitle"
              type="text"
              placeholder={t("add_weblinkTitle")}
              label={t("weblinkTitle")}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.weblinkTitle}
            />

            <Input
              name="weblink"
              type="text"
              placeholder={t("add_weblink")}
              label={t("weblink")}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.weblink}
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
        disabled={nextClicked}
        loading={nextClicked}
        pagesData={pagesData}
        index={index}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage2;
