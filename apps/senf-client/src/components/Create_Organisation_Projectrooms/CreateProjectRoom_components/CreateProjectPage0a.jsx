/** @format */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";

// firebase

import Navigation from "../Components/Navigation";
import { StyledH3 } from "../../../styles/GlobalStyle";
import ProjectroomPricingsSwiper from "../Components/ProjectroomPricingsSwiper";

const CreateProjectPage0a = ({
  onClickNext,
  onClickPrev,
  pagesData,
  index,
}) => {
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
          <StyledH3
            textAlign="center"
            margin="0"
          >
            {pagesData[index].subTitle}
          </StyledH3>

          <br />

          {/* <InfoSwiper /> */}

          <ProjectroomPricingsSwiper />

          {/* <CheckBoxWrapper>
            <CheckBox
              selected={checkBox3}
              type="checkbox"
              handleInputChange={() => setCheckBox3(!checkBox3)}
            />
            <CheckBoxLabel>
              <StyledText>
                Ich verstehe, dass dies eine kostenpflichtige Angelegenhiet ist
                und die Veröffentlichung an Kosten verknüpft ist.
              </StyledText>
            </CheckBoxLabel>
          </CheckBoxWrapper> */}
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("lets_go")}
        handleNext={handleNext}
        disabled={
          // !checkBox1 || !checkBox2 || !checkBox3 ||
          nextClicked
        }
        loading={nextClicked}
        pagesData={pagesData}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage0a;
