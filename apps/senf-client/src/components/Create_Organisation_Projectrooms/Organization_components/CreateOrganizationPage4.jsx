/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

// firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { Input } from "senf-atomic-design-system";
import { db } from "../../../firebase";

// images
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
// import Geocoder from "react-mapbox-gl-geocoder";
import Navigation from "../Components/Navigation";
import {
  StyledA,
  StyledH2,
  StyledH3,
  StyledText,
} from "../../../styles/GlobalStyle";
import MainModal from "../../atoms/Layout/MainModal";

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

const CreateOrganizationPage4 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();

  const [nextClicked, setNextClicked] = useState(false);
  const [outsideClick, setOutsideClick] = useState(false);
  const [infovideoOpen, setInfovideoOpen] = useState(false);

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
      {ReactDOM.createPortal(
        <React.Fragment>
          {infovideoOpen && (
            <MainModal
              handleButtonClick={() => setInfovideoOpen(false)}
              autoWidth={true}
            >
              <div
                style={{ width: "800px", height: "500px", maxWidth: "100%" }}
              >
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
            </MainModal>
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )}

      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH3 textAlign="center" margin="20px">
            {pagesData[index].subTitle}
          </StyledH3>

          <Input
            key="googleCalendarId"
            id="googleCalendarId"
            name="googleCalendarId"
            type="textarea"
            placeholder={t("googleCalendarId")}
            label={t("googleCalendarId")}
            rows={1}
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

          <div
            style={{
              width: "100%",
              display: "flex",
              marginTop: "20px",
              justifyContent: "center",
            }}
          >
            <StyledA textAlign="center" onClick={() => setInfovideoOpen(true)}>
              {t("how_to_find_google_calendar_id")}
            </StyledA>
          </div>

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
        set={set}
        index={index}
        pagesData={pagesData}
        disabled={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage4;
