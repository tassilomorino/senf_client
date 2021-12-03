/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

import NotDoneImage from "../../../../images/Not_connected.png";
import { Title } from "./styles/sharedStyles";

const CreateProjectPage0 = ({ onClickNext }) => {
  const { t } = useTranslation();

  const createProjectFormData = useSelector(
    (state) => state.formData.createProjectFormData
  );

  const handleRestart = () => {
    var answer = window.confirm(
      "Bist du sicher, dass du die Erstellung des Projektraums neustarten möchtest?"
    );
    if (answer) {
      localStorage.removeItem("createProjectRoomId");
      onClickNext();
    } else {
      //some code
    }
  };

  return (
    <div>
      <Title>
        Du bist noch dabei, deinen Projektraum{" "}
        {createProjectFormData &&
          createProjectFormData.projectRoom_name &&
          `"${createProjectFormData.projectRoom_name}"`}{" "}
        zu erstellen{" "}
      </Title>
      <br />

      <img src={NotDoneImage} width="60%" alt="NotDoneImage" />
      <SubmitButton
        text={t("continue_creation")}
        zIndex="9"
        backgroundColor="#353535"
        textColor="white"
        position="relative"
        top="50px"
        left="0"
        handleButtonClick={onClickNext}
        // disabled={!formikCreateProjectStore.isValid}
        //   keySubmitRef={keySubmitRef}
      />

      <SubmitButton
        text={t("restart")}
        zIndex="9"
        backgroundColor="rgb(255,255,255,0.5)"
        textColor="#353535"
        position="relative"
        top="70px"
        handleButtonClick={handleRestart}
        // disabled={!formikCreateProjectStore.isValid}
        //   keySubmitRef={keySubmitRef}
      />
    </div>
  );
};

export default CreateProjectPage0;
