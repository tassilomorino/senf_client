import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import {
  Typography,
  ImagePlaceholder,
  Box,
  Icon,
  Table,
  Button,
  ModalButton,
  Input,
  isMobileCustom,
  ExpandMap,
} from "senf-atomic-design-system";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import CreateMonitoringBoardPage from "./CreateMonitoringBoardPage";
import { db } from "../../firebase";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white.white100};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  z-index: 0;
`;

const SuperAdminBoard = () => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();
  const [monitoringBoards, setMonitoringBoards] = useState([]);
  const [filteredMonitoringBoards, setFilteredMonitoringBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const getMonitoringBoards = async () => {
    try {
      const monitoringBoardsRef = collection(db, "monitoringBoards");
      const q = query(monitoringBoardsRef, orderBy("createdAt", "desc"));
      const monitoringBoardsQuerySnapshot = await getDocs(q);
      const monitoringBoardsData = [];

      monitoringBoardsQuerySnapshot.forEach((doc) => {
        monitoringBoardsData.push({
          ...doc.data(),
          monitoringBoardId: doc.id,
        });
      });
      setMonitoringBoards(monitoringBoardsData);
      console.log(monitoringBoardsData);
    } catch (error) {
      throw new Error(error, "Error in Surveylist");
    }
  };

  const handleDeleteSurvey = async (monitoringBoardId) => {
    try {
      const docRef = doc(db, `monitoringBoards/${monitoringBoardId}`);
      await deleteDoc(docRef).then(() => {
        getMonitoringBoards();
      });
    } catch (error) {
      throw new Error(error, "error in deleteScreamFunc");
    }
  };

  useEffect(() => {
    getMonitoringBoards();
  }, []);

  useEffect(() => {
    setFilteredMonitoringBoards(
      monitoringBoards.filter(
        (monitoringBoard) =>
          Object.values(monitoringBoard)
            .join(" ")
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) > -1
      )
    );
  }, [searchTerm, monitoringBoards]);

  return (
    <Wrapper>
      <Box
        gap="20px"
        flexDirection="column"
        margin="30px"
      >
        <Typography variant="h2">My MonitoringBoards</Typography>
        <Box
          justifyContent="space-between"
          gap="16px"
          alignItems="flex-end"
        >
          <Box width="400px">
            <Input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </Box>

          <ModalButton
            text="+ Create new monitoringBoard"
            options={{
              padding: 20,
              title: t("+ Create new monitoringBoard"),
              swipe: isMobile && true,
              size: "xl",
            }}
          >
            <CreateMonitoringBoardPage
              getMonitoringBoards={getMonitoringBoards}
            />
          </ModalButton>
        </Box>
        <Table
          data={filteredMonitoringBoards}
          // checkbox={"docId"}
          // bulkEdit={<Icon icon="Search" />}
          columns={[
            { key: "title", label: t("title") },
            { key: "municipalities", label: t("mmunicipalities") },
            { key: "createdAt", label: t("createdAt") },
          ]}
        >
          {(row) => (
            <Box
              justifyContent="space-between"
              onClick={() => console.log("edit monitoringBoard now")}
            >
              <Box gap="16px">
                <Box
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Typography variant="h3">{row.title}</Typography>
                  {/* {row?.email && <Typography variant="bodySm">{row.email}</Typography>} */}
                </Box>
              </Box>
              <Typography variant="bodySm">
                {row.municipalities?.map((municipality) => `${municipality}, `)}
              </Typography>
              <Typography variant="bodySm">{row.createdAt}</Typography>

              <Box
                gap="8px"
                marginLeft="0"
              >
                <Button
                  variant="white"
                  text="edit"
                  onClick={() => alert("go to edit monitoringBoard")}
                />
                <Button
                  variant="white"
                  text="Delete"
                  onClick={() => handleDeleteSurvey(row.monitoringBoardId)}
                />
              </Box>
            </Box>
          )}
        </Table>
      </Box>
    </Wrapper>
  );
};

export default SuperAdminBoard;
