import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";
import MainModal from "../../../atoms/Layout/MainModal";
import SettingsIcon from "../../../../images/icons/settings.png";
import ExpandButton from "../../../atoms/CustomButtons/ExpandButton";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { doc, deleteDoc } from "firebase/firestore";

const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 1;
  height: 70px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2); */
`;

const ProgressLine = styled.div`
  height: 10px;
  width: 50%;
  max-width: 400px;
  top: 10px;

  background-color: #fed957;
  border-radius: 10px;
  position: relative;
`;
const CurrentStep = styled.div`
  height: 100%;

  width: ${(props) => props.index && `${props.index}%`};
  transition: 1s;
  border-radius: 5px;
  background-color: white;
`;

export const Title = styled.h4`
  height: 30px;
  position: relative;
  text-align: center;
  width: 100%;
  top: 10px;
  margin-bottom: 5px;
`;

const SVGWrapper = styled.div`
  /* background-color: rgb(249, 241, 215); */
  height: 150px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
`;

const SVGWrapper2 = styled.div`
  /* background-color: rgb(249, 241, 215); */
  height: 150px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -2;
  margin-top: 10px;
  transition: 1s;

  clip-path: polygon(
    0 0,
    ${(props) => props.currentStep && `${props.currentStep}%`} 0,
    ${(props) => props.currentStep && `${props.currentStep}%`} 100%,
    0% 100%
  );
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.standalone ? "100px" : "50px")};
  position: relative;
  z-index: 999;
  overflow: hidden;
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: grey;
  position: relative;
`;

export const StyledIcon = styled.img`
  width: 30px;
  top: 20px;
  left: calc(100% - 60px);
  position: absolute;
  z-index: 2;
  pointer-events: all;
`;

const TopNavigation = ({ pagesData, index, title, currentStep, setClose }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { t } = useTranslation();

  const handleDelete = async () => {
    const db = firebase.firestore();

    var answer = window.confirm(
      "Bist du sicher, dass du die Organisation löschen möchtest?"
    );
    if (answer) {
      await deleteDoc(
        doc(db, "organizations", localStorage.getItem("createOrganizationId"))
      ).then(() => {
        localStorage.removeItem("createOrganizationId");
        setClose();
      });

      //some code
    } else {
      //some code
    }
  };
  return (
    <Wrapper>
      {ReactDOM.createPortal(
        <React.Fragment>
          {settingsOpen && (
            <MainModal handleButtonClick={() => setSettingsOpen(false)}>
              <StyledH2
                fontWeight="900"
                margin="15px 0px 0px 0px"
                textAlign="center"
              >
                Möchtest du diese Organisation wieder löschen?
              </StyledH2>
              <br />
              <ButtonWrapper>
                <ExpandButton handleButtonClick={handleDelete}>
                  <StyledH3 fontWeight={400}> Organisation löschen</StyledH3>
                </ExpandButton>
              </ButtonWrapper>
              <Line />
              <ButtonWrapper>
                <ExpandButton handleButtonClick={() => setSettingsOpen(false)}>
                  <StyledH3 fontWeight={400}> Abbrechen</StyledH3>
                </ExpandButton>
              </ButtonWrapper>
            </MainModal>
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )}

      {/* <ProgressLine>
        <CurrentStep index={index} />
      </ProgressLine> */}
      <Title>{title}</Title>
      <StyledH2 fontWeight="900" textAlign="center" fontSize="24px">
        {pagesData[index].title}
      </StyledH2>

      <StyledIcon
        onClick={() => setSettingsOpen(true)}
        src={SettingsIcon}
        width="100%"
        alt="project-thumbnail"
      />

      <SVGWrapper>
        <svg
          width="100%"
          height="156"
          viewBox="0 0 1100 126"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 125.5V0.5H1130.5V99C1025 143 974.588 95.9476 942.5 83C828.5 37 819 43.5 704 62.5C558 86.6217 307.5 44.5 196 99C128.785 131.854 37.1667 124.667 0 125.5Z"
            fill="#FED957"
          />
        </svg>
      </SVGWrapper>

      <SVGWrapper2 currentStep={currentStep}>
        <svg
          width="100%"
          height="156"
          viewBox="0 0 1100 126"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 125.5V0.5H1130.5V99C1025 143 974.588 95.9476 942.5 83C828.5 37 819 43.5 704 62.5C558 86.6217 307.5 44.5 196 99C128.785 131.854 37.1667 124.667 0 125.5Z"
            fill="white"
          />
        </svg>
      </SVGWrapper2>
    </Wrapper>
  );
};

export default TopNavigation;
