/** @format */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { Input, ModalButton, Box, Typography } from "senf-atomic-design-system";
import { db } from "../../../firebase";

// images
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
// import Geocoder from "react-mapbox-gl-geocoder";
import Navigation from "../Components/Navigation";

const CreateOrganizationPage4 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();

  const [nextClicked, setNextClicked] = useState(false);

  const formik = useFormik({
    initialValues: {
      googleCalendarId: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    formik.setFieldTouched("googleCalendarId", true);

    async function fetchData() {
      const ref = doc(
        db,
        "organizations",
        localStorage.getItem("createOrganizationId")
      );
      const docSnapshot = await getDoc(ref);

      if (!docSnapshot.exists()) {
        console.log("No such document!");
      } else {
        const data = docSnapshot.data();
        // setGoogleCalendarId(data.title);
        if (data.googleCalendarId) {
          formik.setFieldValue("googleCalendarId", data.googleCalendarId);
        }
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
      formik.values.googleCalendarId &&
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      // UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        googleCalendarId: formik.values.googleCalendarId,
      };
      const ref = doc(
        db,
        "organizations",
        localStorage.getItem("createOrganizationId")
      );
      await updateDoc(ref, updateProject).then(() => {
        if (localStorage.getItem("createOrganizationPostEdit") === "true") {
          set(pagesData.length - 1);
        } else {
          onClickNext();
        }
      });
    } else if (localStorage.getItem("createOrganizationPostEdit") === "true") {
      set(pagesData.length - 1);
    } else {
      onClickNext();
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <Typography
            variant="h3"
            textAlign="center"
            margin="20px"
          >
            {pagesData[index].subTitle}
          </Typography>

          <Input
            name="googleCalendarId"
            type="text"
            placeholder={t("googleCalendarId")}
            label={t("googleCalendarId")}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            value={formik?.values.googleCalendarId}
            error={
              formik?.touched.googleCalendarId &&
              Boolean(formik?.errors.googleCalendarId)
            }
            note={
              formik?.touched.googleCalendarId &&
              formik?.errors.googleCalendarId
            }
          />

          <Box
            width="100%"
            marginTop="20px"
            justifyContent="center"
          >
            <ModalButton
              variant="tertiary"
              size="medium"
              text={t("how_to_find_google_calendar_id")}
              options={{ swipe: false, size: "xl", padding: 0 }}
            >
              <div style={{ height: "1000px", maxHeight: "80vh" }}>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/odjaLVz6ft8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </ModalButton>
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
        disabled={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage4;
