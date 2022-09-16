import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";


import { Typography, ImagePlaceholder, Box, Icon, Table, Button, ModalButton, Input, isMobileCustom } from "senf-atomic-design-system";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import CreateNewSurvey from "./CreateNewSurvey";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const DashBoard = () => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom()
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const getSurveys = async () => {
    try {
      const surveysRef = collection(db, "surveys");
      const q = query(
        surveysRef,
        orderBy("createdAt", "desc")
      );
      const surveysQuerySnapshot = await getDocs(q);
      const surveysData = [];

      surveysQuerySnapshot.forEach((doc) => {
        surveysData.push({
          ...doc.data(),
          surveyId: doc.id,
        });
      });
      setSurveys(surveysData);
    } catch (error) {
      throw new Error(error, "Error in Surveylist");
    }
  };

  const handleDeleteSurvey = async (surveyId) => {
    try {
      const docRef = doc(db, `surveys/${surveyId}`);
      await deleteDoc(docRef).then(() => {
        getSurveys();
      });
    } catch (error) {
      throw new Error(error, "error in deleteScreamFunc");
    }
  };

  useEffect(() => {
    getSurveys();
  }, []);

  useEffect(() => {
    setFilteredSurveys(
      surveys.filter(survey => Object.values(survey).join(' ').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
  }, [searchTerm, surveys]);


  return (
    <Wrapper>
      <Box gap="20px" flexDirection="column" margin="30px">
        <Typography variant="h2">My Surveys</Typography>
        <Box justifyContent="space-between" gap="16px" alignItems="flex-end">
          <Box width="400px">
            <Input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e?.target?.value)} />
          </Box>

          <ModalButton text="+ Create new survey" options={{
            padding: 20,
            title: t("+ Create new survey"),
            swipe: isMobile && true

          }}>
            <CreateNewSurvey getSurveys={getSurveys} navigate={navigate} />
          </ModalButton>
        </Box>
        <Table
          data={filteredSurveys}
          // checkbox={"docId"}
          // bulkEdit={<Icon icon="Search" />}
          columns={[
            { key: "title", label: t('title') },
            { key: "surveyType", label: t('surveyType') },
            { key: "createdAt", label: t('createdAt') },
          ]}
        >
          {
            (row) => (
              <Box justifyContent="space-between" onClick={() => console.log("edit survey now")}>
                <Box gap="16px">
                  {/* {!isMobile &&
                    <ImagePlaceholder
                      width="64px"
                      height="64px"
                      img="#"
                    />
                  } */}
                  <Box flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <Typography variant="h3">{row.title}</Typography>
                    {/* {row?.email && <Typography variant="bodySm">{row.email}</Typography>} */}
                  </Box>
                </Box>
                <Typography variant="bodySm">{row.surveyType}</Typography>
                <Typography variant="bodySm">{row.createdAt}</Typography>

                <Box gap="8px" marginLeft="0">
                  <Button
                    variant="white"
                    text="open TakeSurvey-Link"
                    onClick={() => alert("go to TakeSurvey-Link")}
                  />
                  <Button
                    variant="white"
                    text="edit"
                    onClick={() => alert("go to edit survey")}
                  />
                  <Button
                    variant="white"
                    text="Delete"
                    onClick={() => handleDeleteSurvey(row.surveyId)}

                  />
                </Box>
              </Box>
            )
          }
        </Table>
      </Box>
    </Wrapper>
  );
};

export default DashBoard;
