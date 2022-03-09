/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
//Components
import Weblink from "../../../molecules/Modals/Post_Edit_ModalComponents/Weblink";
import { CustomIconButton } from "../../../atoms/CustomButtons/CustomButton";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";

//images
import {
  ButtonsWrapper,
  ComponentInnerWrapper,
  ComponentWrapper,
  SubTitle,
  Title,
} from "../styles/sharedStyles";
import Contact from "../../../molecules/Modals/Post_Edit_ModalComponents/Contact";
//import Geocoder from "react-mapbox-gl-geocoder";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";
import InlineDatePicker from "../../../atoms/InlineDatePicker/InlineDatePicker";
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
  margin-top: 30px;
  width: 100%;
`;

const CreateOrganizationPage4 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);
  const [outsideClick, setOutsideClick] = useState(false);

  //  const [googleCalendarId, setGoogleCalendarId] = useState("");

  // const [selectedDays, setSelectedDays] = useState([]);
  // const [selectedUnix, setSelectedUnix] = useState([]);

  // const handleChangeCalendar = (selectedDays) => {
  //   const selectedUnix = [];
  //   var i;
  //   for (i = 0; i < selectedDays.length; i++) {
  //     selectedUnix[i] = selectedDays[i]["unix"];
  //   }

  //   setSelectedDays(selectedDays);
  //   setSelectedUnix(selectedUnix);
  // };

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
      const db = firebase.firestore();

      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"))
        .get();

      if (!ref.exists) {
        console.log("No such document!");
      } else {
        const data = ref.data();
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

    const db = firebase.firestore();
    if (
      formik.values.googleCalendarId &&
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        googleCalendarId: formik.values.googleCalendarId,
      };
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));
      return ref.update(updateProject).then(() => {
        setTimeout(() => {
          onClickNext();
        }, 200);
      });
    } else {
      onClickNext();
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            Kalendereinträge hinzufügen
          </StyledH2>
          <StyledH3 textAlign="center" margin="20px">
            Füge Kalendereinträge hinzu
          </StyledH3>

          <p style={{ widthh: "100%", textAlign: "center" }}>
            Zuerst Datum, dann Zeit auswählen.
          </p>

          <TextField
            id="outlined-name"
            name="googleCalendarId"
            type="googleCalendarId"
            label={t("googleCalendarId")}
            margin="normal"
            variant="outlined"
            multiline
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
            }}
            value={formik.values.googleCalendarId}
            onChange={formik.handleChange}
          />

          {/* <InlineDatePicker
            handleChangeCalendar={handleChangeCalendar}
            selectedDays={selectedDays}
          /> */}
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        disabled={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage4;
