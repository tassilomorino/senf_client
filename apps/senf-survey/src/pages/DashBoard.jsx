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

  const getSurveys = async () => {
    try {
      const surveysRef = collection(db, "exampleUsers");
      const q = query(
        surveysRef,
        orderBy("createdAt", "desc")
      );
      const surveysQuerySnapshot = await getDocs(q);
      const surveysData = [];

      surveysQuerySnapshot.forEach((doc) => {
        surveysData.push({
          ...doc.data(),
          userId: doc.id,
        });
      });
      setSurveys(surveysData);
    } catch (error) {
      throw new Error(error, "Error in Surveylist");
    }
  };

  const handleDeleteSurvey = async (userId) => {
    try {
      const docRef = doc(db, `exampleUsers/${userId}`);
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
      surveys.filter(member => Object.values(member).join(' ').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
  }, [searchTerm, surveys]);


  return (
    <Wrapper>
      <Box gap="20px" flexDirection="column" margin="30px">
        <Typography variant="h2">My Surveys</Typography>
        <Box justifyContent="space-between" gap="16px" alignItems="flex-end">
          <Box width="400px">
            <Input type="search" onChange={(e) => setSearchTerm(e?.target?.value)} />
          </Box>

          <ModalButton text="+ Create new survey" options={{
            padding: 20,
            title: t("+ Create new survey"),
            swipe: isMobile && true

          }}>
            <CreateNewSurvey />
          </ModalButton>
        </Box>
        <Table
          data={filteredSurveys}
          checkbox={"docId"}
          bulkEdit={<Icon icon="Search" />}
          columns={[
            { key: "username", label: t('username') },
            { key: "division", label: t('division') },
            { key: "role", label: t('role') },
          ]}
        >
          {
            (row) => (
              <div onClick={() => console.log("edit survey now")}>
                <Box gap="16px">
                  {!isMobile &&
                    <ImagePlaceholder
                      width="64px"
                      height="64px"
                      img="#"
                    />
                  }
                  <Box flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <Typography variant="h3">{row.handle}</Typography>
                    {row?.email && <Typography variant="bodySm">{row.email}</Typography>}
                  </Box>
                </Box>
                <Typography variant="bodySm">{row.division}</Typography>
                <Typography variant="bodySm">{row.role}</Typography>
                <Button
                  variant="white"
                  text="Delete"
                  onClick={() => handleDeleteSurvey(row.userId)}

                />
              </div>
            )
          }
        </Table>
      </Box>
    </Wrapper>
  );
};

export default DashBoard;
