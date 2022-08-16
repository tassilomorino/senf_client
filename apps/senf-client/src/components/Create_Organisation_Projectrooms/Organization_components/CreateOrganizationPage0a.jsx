/** @format */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ToggleInput, InfoSwiper } from "senf-atomic-design-system";
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";

import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3, StyledText } from "../../../styles/GlobalStyle";

const CheckBoxWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  margin-left: 0%;
  text-align: left;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    width: 80%;
    margin-left: 10%;
  }
`;
const CheckBoxLabel = styled.label`
  font-size: 18px;
  color: #353535;
  font-weight: 100;
  margin-left: 20px;
`;
const CreateOrganizationPage0 = ({ onClickNext, pagesData, index }) => {
  const { t } = useTranslation();
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);

  const [nextClicked, setNextClicked] = useState(false);

  useEffect(() => {
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      setCheckBox1(true);
      setCheckBox2(true);
      setCheckBox3(true);
    }
  }, []);

  const handleNext = () => {
    setNextClicked(true);

    setTimeout(() => {
      onClickNext();
    }, 200);
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH3 textAlign="center" margin="0">
            {pagesData[index].subTitle}
          </StyledH3>

          <br />

          <InfoSwiper />

          <CheckBoxWrapper>
            <ToggleInput
              checked={checkBox1}
              type="checkbox"
              receiveValue={() => setCheckBox1(!checkBox1)}
            />
            <CheckBoxLabel>
              <StyledText>
                Ich möchte eine Organisation eintragen, die sich mit der
                Stadtentwicklung in Köln beschäftigt.
              </StyledText>
            </CheckBoxLabel>
          </CheckBoxWrapper>

          <CheckBoxWrapper>
            <ToggleInput
              checked={checkBox2}
              type="checkbox"
              receiveValue={() => setCheckBox2(!checkBox2)}
            />
            <CheckBoxLabel>
              <StyledText>
                Ich bestätige, dass ich Teil dieser Organisation und berechtigt
                bin, eine Profilseite für diese Organisation zu erstellen.
              </StyledText>
            </CheckBoxLabel>
          </CheckBoxWrapper>

          <CheckBoxWrapper>
            <ToggleInput
              checked={checkBox3}
              type="checkbox"
              receiveValue={() => setCheckBox3(!checkBox3)}
            />
            <CheckBoxLabel>
              <StyledText>
                Ich verstehe, dass dies eine Beteiligungsplattform ist und
                verpflichte mich, diese Plattform nicht für reine Werbezwecke zu
                verwenden.
              </StyledText>
            </CheckBoxLabel>
          </CheckBoxWrapper>
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("lets_go")}
        handleNext={handleNext}
        disabled={!checkBox1 || !checkBox2 || !checkBox3 || nextClicked}
        loading={nextClicked}
        pagesData={pagesData}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage0;
