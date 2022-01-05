/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

import { ButtonsWrapper, SubTitle, Title } from "./styles/sharedStyles";
import styled from "styled-components";
import CheckBox from "../../../atoms/CheckBox/CheckBox";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const Header = styled.h3`
  font-size: 18px;
  color: #353535;
  font-weight: 100;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`;

const StyledUL = styled.ol`
  width: calc(90% - 40px);
  margin-left: 5%;
`;
const StyledLi = styled.li`
  text-align: left;
  font-size: 18px;
  color: #353535;
  font-weight: 100;
  margin-top: 10px;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;
const CheckBoxWrapper = styled.div`
  margin-top: 50px;
  width: 80%;
  margin-left: 10%;
  text-align: left;
  display: flex;
  align-items: center;
`;
const CheckBoxLabel = styled.label`
  font-size: 18px;
  color: #353535;
  font-weight: 100;
  margin-left: 20px;
`;
const CreateOrganizationPage0 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      setSelected(true);
    }
  }, []);

  return (
    <div>
      <Title>Organisationsprofil erstellen</Title>
      <br />
      <SubTitle>
        {" "}
        Von dem Nachbarschaftsverein über Planungsbüros bis zu politischen
        Parteien – Hier könnt ihr ein Organisationsprofil für euer Vorhaben
        erstellen.{" "}
      </SubTitle>
      <Header> Vorteile von einem Organisationprofil:</Header>

      <StyledUL>
        <StyledLi>
          Werdet sichtbar – beschreibt euer Vorhaben und informiert interssierte
          Personen
        </StyledLi>{" "}
        <StyledLi>
          Werdet sichtbar – beschreibt euer Vorhaben und informiert interssierte
          Personen
        </StyledLi>{" "}
        <StyledLi>
          Verbessert eure Erreichbarkeit durch das Hinterlegen eurer
          Kontaktdaten
        </StyledLi>{" "}
        <StyledLi>
          Mitmachen! Vernetzt euch mit anderen, plant eure Projekte und tauscht
          euch aus{" "}
        </StyledLi>
      </StyledUL>
      <CheckBoxWrapper>
        <CheckBox
          selected={selected}
          name="CheckBox"
          handleInputChange={() => setSelected(!selected)}
        />
        <CheckBoxLabel>
          Bestätige, dass du Teil einer Organisation bist und berechtigt eine
          Profilseite zu erstellen.
        </CheckBoxLabel>
      </CheckBoxWrapper>

      <ButtonsWrapper>
        <SubmitButton
          text={t("start")}
          zIndex="9"
          backgroundColor="#353535"
          textColor="white"
          top="50px"
          left="0"
          handleButtonClick={onClickNext}
          disabled={!selected}
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
    </div>
  );
};

export default CreateOrganizationPage0;
