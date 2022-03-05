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
import Geocoder from "react-mapbox-gl-geocoder";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";
import InlineDatePicker from "../../../atoms/InlineDatePicker/InlineDatePicker";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";

const CreateOrganizationPage5 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);
  const [formFields, setFormFields] = useState([{ question: "", answer: "" }]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const addFields = () => {
    let object = {
      question: "",
      answer: "",
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
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
          setFormFields(data.faqs);
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
        faqs: formFields[0].question !== "" ? formFields : null,
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

          <form>
            {formFields.map((form, index) => {
              return (
                <div key={index} style={{ flex: "none", marginBottom: "20px" }}>
                  <TextField
                    id="outlined-name"
                    name="question"
                    type="question"
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
                    name="answer"
                    type="answer"
                    label={t("answer")}
                    margin="normal"
                    variant="outlined"
                    multiline
                    min-rows={3}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      width: "100%",
                      marginTop: 0,
                    }}
                    value={form.answer}
                    onChange={(event) => handleFormChange(event, index)}
                  />
                  <button onClick={() => removeFields(index)}>Remove</button>
                </div>
              );
            })}
          </form>
          <button onClick={addFields}>Add More..</button>
          <br />
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
