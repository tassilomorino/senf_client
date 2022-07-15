/** @format */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import * as yup from "yup";

// firebase
import { useFormik } from "formik";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Box, Input } from "senf-atomic-design-system";
import { db } from "../../../../firebase";
// Components

// images
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
// import Geocoder from "react-mapbox-gl-geocoder";
import Navigation from "../Components/Navigation";
import { StyledH3 } from "../../../../styles/GlobalStyle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButttonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const GeocoderWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const CreateOrganizationPage2 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);

  const [address, setAddress] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

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
      weblink: "",
    },
    validationSchema: createProjectValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    async function fetchData() {
      formik.setFieldTouched("contact", true);

      if (
        typeof Storage !== "undefined" &&
        localStorage.getItem("createOrganizationId")
      ) {
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

          if (data.contact) {
            formik.setFieldValue("contact", data.contact);
          }
          if (data.weblink) {
            formik.setFieldValue("weblink", data.weblink);
          }

          if (data.address) {
            setAddress(data.address);
          }
        }
      }
    }
    fetchData();
  }, []);

  const MyInput = (props) => (
    <input
      {...props}
      placeholder={address || "Addresse der Organisation"}
      id="geocoder"
      autoComplete="off"
    />
  );

  const geocode = (viewport) => {
    const geocodingClient = mbxGeocoding({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    });
    geocodingClient
      .reverseGeocode({
        query: [viewport.longitude, viewport.latitude],
        limit: 1,
      })
      .send()
      .then((response) => {
        const match = response.body;
        setAddress(match.features[0].place_name);
        setLongitude(match.features[0].center[0]);
        setLatitude(match.features[0].center[1]);
      });
  };

  const handleNext = async () => {
    setNextClicked(true);

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      // UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        weblink: formik.values.weblink,
        contact: formik.values.contact,
        address,
        longitude,
        latitude,
      };

      const ref = doc(
        db,
        "organizations",
        localStorage.getItem("createOrganizationId")
      );
      await updateDoc(ref, updateProject).then(() => {
        setTimeout(() => {
          if (localStorage.getItem("createOrganizationPostEdit") === "true") {
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

          <Box flexDirection="column" gap="20px">
            <Input
              key="contact"
              id="contact"
              name="contact"
              type="text"
              placeholder={t("contact-address")}
              label={t("contact-address")}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.contact}
              error={formik?.touched.contact && Boolean(formik?.errors.contact)}
              note={formik?.touched.contact && formik?.errors.contact}
            />

            <Input
              key="weblink"
              id="weblink"
              name="weblink"
              type="text"
              placeholder={t("external-link")}
              label={t("external-link")}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.weblink}
              error={formik?.touched.weblink && Boolean(formik?.errors.weblink)}
              note={formik?.touched.weblink && formik?.errors.weblink}
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
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage2;
