import { StyledH2 } from "apps/senf-client/src/styles/GlobalStyle";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

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

const TopNavigation = ({ index, title, currentStep }) => {
  const { t } = useTranslation();

  const pageTitle = () => {
    let title;

    switch (index) {
      case 2:
        title = "Organisationstyp";
        break;
      case 3:
        title = "Infos";
        break;
      case 4:
        title = "Kontakt";
        break;
      case 5:
        title = "Logo";
        break;
      case 6:
        title = "Kalender";
        break;
      case 7:
        title = "FAQ";
        break;

      case 8:
        title = "Teammitglieder";
        break;
      case 9:
        title = "Übersicht";
        break;
      default:
        title = "#f9db95";
    }
    return title;
  };
  return (
    <Wrapper>
      {/* <ProgressLine>
        <CurrentStep index={index} />
      </ProgressLine> */}
      <Title>{title}</Title>
      <StyledH2 fontWeight="900" textAlign="center">
        {pageTitle()}
      </StyledH2>
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
