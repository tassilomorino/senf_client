import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import {
  Typography,
  ImagePlaceholder,
  Box,
  User,
  Tabs,
  Icon,
  Table,
  Button,
  ModalButton,
  Input,
  isMobileCustom,
  TableTemplate,
} from "senf-atomic-design-system";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import AddNewDivison from "./AddNewDivision";

const Wrapper = styled.div`
  top: 0;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const DivisionsBoard = () => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();
  const navigate = useNavigate();

  const [order, setOrder] = useState(1);

  const [divisions, setDivisons] = useState([]);
  const [filteredDivisons, setFilteredDivisons] = useState([]);

  const currentMonitoringBoard = useSelector(
    (state) => state.data.currentMonitoringBoard
  );

  console.log(currentMonitoringBoard);

  const [searchTerm, setSearchTerm] = useState("");

  const getDivisions = async () => {
    try {
      const divisionsRef = collection(
        db,
        `monitoringBoards/${currentMonitoringBoard.monitoringBoardId}/divisions`
      );
      const q = query(divisionsRef);
      const divisionsQuerySnapshot = await getDocs(q);
      const divisionsData = [];

      divisionsQuerySnapshot.forEach((doc) => {
        divisionsData.push({
          ...doc.data(),
          divisionId: doc.id,
        });
      });
      setDivisons(divisionsData);
      console.log(divisionsData);
    } catch (error) {
      throw new Error(error, "Error in Memberlist");
    }
  };

  const handleDeleteDivision = async (event, divisionId) => {
    event.stopPropagation();
    try {
      const docRef = doc(
        db,
        `monitoringBoards/${currentMonitoringBoard.monitoringBoardId}/divisions/${divisionId}`
      );
      await deleteDoc(docRef).then(() => {
        getDivisions();
      });
    } catch (error) {
      throw new Error(error, "error in deleteScreamFunc");
    }
  };

  useEffect(() => {
    if (currentMonitoringBoard) {
      getDivisions();
    }
  }, [currentMonitoringBoard]);

  useEffect(() => {
    if (order === 1) {
      setFilteredDivisons(
        divisions.filter(
          (member) =>
            Object.values(member)
              .join(" ")
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
        )
      );
    }
  }, [searchTerm, divisions, order]);

  const onRowClick = (division) => {
    console.log(division);
    navigate(`/divisions/${division.divisionId}`);
  };

  return (
    <React.Fragment>
      <Wrapper>
        <Box
          gap="20px"
          flexDirection="column"
          margin="30px"
        >
          <Typography variant="h2">Divisions</Typography>
          <Box
            justifyContent="space-between"
            gap="16px"
            alignItems="flex-end"
          >
            <ModalButton
              text="Add Division"
              options={{
                padding: 20,
                title: t("add_division"),
                swipe: isMobile && true,
              }}
            >
              <AddNewDivison getDivisions={getDivisions} />
            </ModalButton>
          </Box>

          <TableTemplate
            variant=""
            buttons
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            data={filteredDivisons}
            onRowClick={onRowClick}
            columns={[
              { key: "title", label: t("division") },
              // { key: "division", label: t('division') },
              // { key: "role", label: t('role') },
            ]}
          >
            {(row) => (
              <>
                <Box gap="16px">
                  {!isMobile && (
                    <ImagePlaceholder
                      width="64"
                      height="64"
                      img="#"
                    />
                  )}
                  <Box
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Typography variant="h3">{row.title}</Typography>
                    {/* {row?.email && <Typography variant="bodySm">{row.email}</Typography>} */}
                  </Box>
                </Box>
                <Typography variant="bodySm">{row.division}</Typography>
                <Typography variant="bodySm">{row.role}</Typography>
                <Button
                  variant="white"
                  text="Delete"
                  onClick={(event) =>
                    handleDeleteDivision(event, row.divisionId)
                  }
                />
              </>
            )}
          </TableTemplate>
        </Box>
      </Wrapper>
    </React.Fragment>
  );
};

export default DivisionsBoard;
