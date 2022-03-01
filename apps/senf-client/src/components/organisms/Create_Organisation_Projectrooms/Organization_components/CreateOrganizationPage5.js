/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

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
import Geocoder from "react-mapbox-gl-geocoder";
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

const CreateOrganizationPage5 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);
  const [outsideClick, setOutsideClick] = useState(false);
  const [faqs, setFaqs] = useState([{ questionn: "", answer: "" }]);

  const handleAddQaA = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);

    console.log(faqs);
  };

  const handleRemoveQaA = (index) => {
    let data = [...faqs];
    data.splice(index, 1);
    setFaqs(data);
  };

  const handleFormChange = (event, index) => {
    let data = [...faqs];
    console.log(data);
    data[index][event.target.name] = event.target.value;
    setFaqs(data);
  };

  useEffect(() => {
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
        if (data.faqs) {
          setFaqs(data.faqs);
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
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        faqs: faqs,
      };
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));
      return ref.update(updateProject).then(() => {
        setTimeout(() => {
          onClickNext();
        }, 200);
      });
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            FAQ's hinzufügen
          </StyledH2>
          <StyledH3 textAlign="center" margin="20px">
            Füge FAQ's hinzu, um den Nutzer:innen einen schnellen Einblick zu
            gewähren.
          </StyledH3>
          <div style={{ zIndex: 99 }}>
            {faqs &&
              faqs.map((form, index) => (
                <React.Fragment>
                  <TextField
                    id="outlined-name"
                    name={form.question}
                    type={form.question}
                    label={t("question")}
                    margin="normal"
                    variant="outlined"
                    multiline
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                    value={form.question}
                    onChange={(event) => handleFormChange(event, index)}
                  />
                  <TextField
                    id="outlined-name"
                    name={form.answer}
                    type={form.answer}
                    label={t("answer")}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={3}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      width: "100%",
                      marginTop: 0,
                    }}
                    value={form.answer}
                    onChange={(event) => handleFormChange(event, index)}
                  />
                </React.Fragment>
              ))}
            <button onClick={handleAddQaA}> + </button>
            <button onClick={handleRemoveQaA}> - </button>
          </div>
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

export default CreateOrganizationPage5;
