import {
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, isMobileCustom, } from "senf-atomic-design-system";
import styled from "styled-components";
import { db } from "../firebase";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  height: 100%;
`;

const TakeSurvey = () => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom()
  const [state, setState] = useState([]);
  const params = (new URL(document.location)).searchParams;
  const surveyId = params.get("surveyId");

  // THIS FORMAT SHOULD WORK TO RETRIEVE THE DATA `.../surveys?surveyId=${surveyId}`;

  const handleSetSurveyData = async () => {
    try {
      const docRef = doc(db, `surveys/${surveyId}`);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot) {
        setState(docSnapshot.data());
        console.log("surveyData", docSnapshot.data())
      }
    } catch (error) {
      throw new Error(error, "Error in TakeSurvey");
    }
  };

  useEffect(() => {
    handleSetSurveyData();
  }, []);

  return (
    <Wrapper>
      <Box
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="70%"
        flexDirection="column"
        gap="50px"
      >
        {state && state}
      </Box>
    </Wrapper>
  );
};

export default TakeSurvey;