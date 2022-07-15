import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

// firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { Input } from "senf-atomic-design-system";
import { db } from "../../../../firebase";

// images
import {
  ButtonsWrapper,
  ComponentInnerWrapper,
  ComponentWrapper,
  SubTitle,
  Title,
} from "../styles/sharedStyles";
import Contact from "../../../molecules/Modals/Post_Edit_ModalComponents/Contact";
// import Geocoder from "react-mapbox-gl-geocoder";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3, StyledText } from "../../../../styles/GlobalStyle";
import InlineDatePicker from "../../../atoms/InlineDatePicker/InlineDatePicker";

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
    const data = [...formFields];
    // data[index][event.target.name] = event.target.value;
    data[index][event.target.attributes.id.nodeValue] = event.target.value;

    setFormFields(data);

    console.log(formFields);
  };

  const addFields = () => {
    const object = {
      question: "",
      answer: "",
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    const data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  useEffect(() => {
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

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      // UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        faqs: formFields[0].question !== "" ? formFields : null,
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
            {formFields.map((form, index) => (
              <div key={index} style={{ flex: "none", marginBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                  <Input
                    key="question"
                    id="question"
                    name="question"
                    type="textarea"
                    placeholder={t("question")}
                    label={t("question")}
                    rows={1}
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

                <Input
                  key="answer"
                  id="answer"
                  name="answer"
                  type="textarea"
                  placeholder={t("answer")}
                  label={t("answer")}
                  rows={1}
                  value={form.answer}
                  onChange={(event) => handleFormChange(event, index)}

                  // minRows="3"
                />
              </div>
            ))}
          </form>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AddButton onClick={addFields}>
              <StyledText textAlign="center">
                + Weitere FAQ hinzufügeen
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
