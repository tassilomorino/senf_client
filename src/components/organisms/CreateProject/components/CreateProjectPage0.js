/** @format */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";
import {
  retrievedData,
  startedCreatingProject,
} from "../functions/CreateProjectFunctions";

import NotDoneImage from "../../../../images/Not_connected.png";

const Title = styled.h2`
  font-family: PlayfairDisplay-Bold;
  font-size: 22px;
  font-weight: 100;
  color: #353535;
  align-self: center;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const CreateProjectPage0 = ({ outsideClick, onClickNext }) => {
  const { t } = useTranslation();

  const [projectRoom_name, setProjectRoom_name] = useState(null);

  useEffect(() => {
    if (
      startedCreatingProject &&
      retrievedData &&
      retrievedData.projectRoom_name
    ) {
      setProjectRoom_name(retrievedData.projectRoom_name);
    }
  }, []);

  const handleRestart = () => {
    localStorage.removeItem("createProjectData");
    onClickNext();
  };

  return (
    <div>
      <Title>
        Du bist noch dabei, deinen Projektraum{" "}
        {projectRoom_name && `"${projectRoom_name}"`} zu erstellen{" "}
      </Title>

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
