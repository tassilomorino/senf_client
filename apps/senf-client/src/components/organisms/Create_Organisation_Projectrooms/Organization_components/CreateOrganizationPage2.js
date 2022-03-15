/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import * as yup from "yup";

//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
//Components
import Weblink from "../../../molecules/Modals/Post_Edit_ModalComponents/Weblink";
import { CustomIconButton } from "../../../atoms/CustomButtons/CustomButton";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//images
import {
  ButtonsWrapper,
  ComponentInnerWrapper,
  ComponentWrapper,
  SubTitle,
  Title,
} from "../styles/sharedStyles";
import Contact from "../../../molecules/Modals/Post_Edit_ModalComponents/Contact";
import Geocoder from "react-mapbox-gl-geocoder";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3, StyledText } from "../../../../styles/GlobalStyle";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";

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

      const db = firebase.firestore();
      if (
        typeof Storage !== "undefined" &&
        localStorage.getItem("createOrganizationId")
      ) {
        const ref = await db
          .collection("organizations")
          .doc(localStorage.getItem("createOrganizationId"))
          .get();

        if (!ref.exists) {
          console.log("No such document!");
        } else {
          const data = ref.data();

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
      placeholder={address ? address : "Addresse der Organisation"}
      id="geocoder"
      autocomplete="off"
    />
  );

  const geocode = (viewport) => {
    const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
    const geocodingClient = mbxGeocoding({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
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

    const db = firebase.firestore();
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        weblink: formik.values.weblink,
        contact: formik.values.contact,
        address: address,
        longitude: longitude,
        latitude: latitude,
      };
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));
      return ref.update(updateProject).then(() => {
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
            }}
            value={formik.values.contact}
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
            }}
            value={formik.values.weblink}
            onChange={formik.handleChange}
          />

          <GeocoderWrapper>
            <Geocoder
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              onSelected={geocode}
              // {...viewport}
              hideOnSelect={true}
              limit={3}
              // queryParams={queryParams}
              id="geocoder-edit"
              className="geocoder-edit"
              inputComponent={MyInput}
              updateInputOnSelect
            />
          </GeocoderWrapper>
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
