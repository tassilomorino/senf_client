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
import { StyledH2, StyledH3, StyledText } from "../../../../styles/GlobalStyle";
import InlineDatePicker from "../../../atoms/InlineDatePicker/InlineDatePicker";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";

const RemoveButton = styled.button`
  margin-top: 15px;
  margin-left: 5px;
  box-sizing: border-box;
  width: 57px;
  height: 57px;
  background-color: rgba(186, 160, 79, 0.1);
  border-radius: 10px;
  border: 2px solid rgba(186, 160, 79, 0.1);
  text-align: center;
  color: rgba(186, 160, 79, 0.8);
  display: block;
`;

const AddButton = styled.button`
  margin-top: 15px;
  margin-left: 5px;
  box-sizing: border-box;
  width: auto;
  height: 57px;
  background-color: rgba(186, 160, 79, 0.1);
  border-radius: 10px;
  border: 2px solid rgba(186, 160, 79, 0.1);
  text-align: center;
  display: block;
  padding: 0px 20px;
`;
const CreateOrganizationPage5 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
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

          <form>
            {formFields.map((form, index) => {
              return (
                <div key={index} style={{ flex: "none", marginBottom: "20px" }}>
                  <div style={{ display: "flex" }}>
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
                        borderRadius: "8px",
                        width: "calc(100% - 60px)",
                      }}
                      value={form.question}
                      onChange={(event) => handleFormChange(event, index)}
                    />
                    <RemoveButton onClick={() => removeFields(index)}>
                      <StyledH2
                        fontSize="22px"
                        fontWeight="900"
                        textAlign="center"
                      >
                        {" "}
                        –
                      </StyledH2>
                    </RemoveButton>
                  </div>
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
                      borderRadius: "8px",
                      width: "100%",
                      marginTop: 0,
                    }}
                    value={form.answer}
                    onChange={(event) => handleFormChange(event, index)}
                  />
                </div>
              );
            })}
          </form>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AddButton onClick={addFields}>
              <StyledText textAlign="center">
                + Weitere FAQ's hinzufügeen
              </StyledText>
            </AddButton>
          </div>

          <br />
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

export default CreateOrganizationPage5;
