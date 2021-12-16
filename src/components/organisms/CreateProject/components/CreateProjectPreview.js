/** @format */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//redux

//Components
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//images
import { ButtonsWrapper, Title } from "./styles/sharedStyles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FrameWrapper = styled.div`
  width: calc(100vw - 50px);
  height: calc(100vh - 160px);
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0.5);
  border: 10px solid white;
  max-width: 1200px;

  @media (min-width: 768px) {
    box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0.2);

    width: calc(100vw - 60px);
    height: calc(100vh - 260px);
  }
`;

const CreateProjectPagePreview = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Title> Vorschau</Title>

      <FrameWrapper>
        <iframe
          src="http://localhost:3000/Agora_BarCamp:_Nachbarschaft_macht_Zukunft"
          height="100%"
          width="100%"
          frameBorder="0"
        />
      </FrameWrapper>

      <ButtonsWrapper>
        <SubmitButton
          text={t("Fertigstellen")}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          top={document.body.clientWidth > 768 ? "100px" : "70px"}
          left="0"
          handleButtonClick={onClickNext}
          /*  disabled={!data} */
          //   keySubmitRef={keySubmitRef}
        />
        <SubmitButton
          text={t("back")}
          zIndex="9"
          backgroundColor="transparent"
          shadow={false}
          textColor="#353535"
          left="0"
          handleButtonClick={onClickPrev}
          //   keySubmitRef={keySubmitRef}
        />
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default CreateProjectPagePreview;
