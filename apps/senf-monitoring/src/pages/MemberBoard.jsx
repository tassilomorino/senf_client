import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";


import { Typography, ImagePlaceholder, Box, User, Tabs, Icon, Table, Button, ModalButton, Input, isMobileCustom } from "senf-atomic-design-system";
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
import { db } from "../firebase";
import InviteMember from "./InviteMember";





const UserBoard = ({ division }) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom()

  const [order, setOrder] = useState(1)
  const [searchTerm, setSearchTerm] = useState("");

  const [divisionUsers, setDivisionUsers] = useState([]);
  const [pendingDivisionUsers, setPendingDivisionUsers] = useState([]);

  const [filteredDivisionUsers, setFilteredDivisionUsers] = useState([]);
  const [filteredPendingDivisionUsers, setFilteredPendingDivisionUsers] = useState([]);

  const currentMonitoringBoard = useSelector(state => state.data.currentMonitoringBoard)


  const getDivisionUsers = async () => {
    try {
      const divisionUsersRef = collection(db, `monitoringBoards/${currentMonitoringBoard.monitoringBoardId}/divisions/${division.divisionId}/divisionUsers`);
      const q = query(
        divisionUsersRef,
        // where("userId", "in", currentMonitoringBoard.userIds),
      );
      const divisionUsersQuerySnapshot = await getDocs(q);
      const divisionUsersData = [];
      divisionUsersQuerySnapshot.forEach((doc) => {
        divisionUsersData.push({
          ...doc.data(),
          userId: doc.id,
        });
      });

      // const usersRef = collection(db, "users");
      // const q = query(usersRef, where("userId", "==", doc.data().userId));
      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   divisionUsersData.push({ ...doc.data() });

      // });


      setDivisionUsers(divisionUsersData);
    } catch (error) {
      throw new Error(error, "Error in Userlist");
    }
  };

  const getPendingDivisionUsers = async () => {
    // filter by organization and division
    try {
      const pendingDivisionUsersRef = collection(db, "mail");
      const q = query(
        pendingDivisionUsersRef,
        where("monitoringBoardId", "==", currentMonitoringBoard.monitoringBoardId),
        where("division", "==", division.divisionId),
        orderBy("createdAt", "desc")
      );
      const pendingDivisionUsersQuerySnapshot = await getDocs(q);
      const divisionUsersData = [];

      pendingDivisionUsersQuerySnapshot.forEach((doc) => {
        if (
          // organizationId === doc.data().organizationId && 
          doc.data().pending === true) {
          divisionUsersData.push({
            ...doc.data(),
            docId: doc.id,
          });
        }

      });
      setPendingDivisionUsers(divisionUsersData);
    } catch (error) {
      throw new Error(error, "Error in Userlist");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const docRef = doc(db, `exampleUsers/${userId}`);
      await deleteDoc(docRef).then(() => {
        getDivisionUsers();
      });
    } catch (error) {
      throw new Error(error, "error in deleteScreamFunc");
    }
  };

  const handleDeletePendingUser = async (docId) => {
    try {
      const docRef = doc(db, `mail/${docId}`);
      await deleteDoc(docRef).then(() => {
        getPendingDivisionUsers();
      });
    } catch (error) {
      throw new Error(error, "error in deleteScreamFunc");
    }
  };

  useEffect(() => {
    if (currentMonitoringBoard && division) {
      getDivisionUsers();
      getPendingDivisionUsers()
    }
  }, [currentMonitoringBoard, division]);

  useEffect(() => {
    if (order === 1) {
      setFilteredDivisionUsers(
        divisionUsers.filter(user => Object.values(user).join(' ').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
    }
  }, [searchTerm, divisionUsers, order]);


  useEffect(() => {
    if (order === 2) {
      setFilteredPendingDivisionUsers(
        pendingDivisionUsers.filter(pendingUser => Object.values(pendingUser).join(' ').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
      );
    }
  }, [searchTerm, pendingDivisionUsers, order]);

  return (
    <React.Fragment>
      <Box gap="20px" flexDirection="column" margin="0px">
        <Box justifyContent="space-between" gap="16px" alignItems="flex-end">
          <Box margin="0px 24px 0px 0px" gap="10px" width="500px">
            <Tabs
              fontSize="buttonSm"
              order={order}
              setOrder={setOrder}
              tabs={[
                { icon: <User />, text: `Users (${divisionUsers.length})` },
                { icon: <User />, text: `Pending Users (${pendingDivisionUsers.length})` },
                // { icon: <Info />, text: "Interaktionen" },
              ]}
            />
          </Box>
          <Box width="400px">
            <Input type="search" onChange={(e) => setSearchTerm(e?.target?.value)} />
          </Box>

          <ModalButton text="Add user" options={{
            padding: 20,
            title: t("add_user"),
            swipe: isMobile && true

          }}>
            <InviteMember getPendingDivisionUsers={getPendingDivisionUsers} division={division} />
          </ModalButton>
        </Box>




        <Table
          data={order === 1 ? filteredDivisionUsers : filteredPendingDivisionUsers}
          checkbox={order === 1 ? "userId" : "docId"}
          bulkEdit={<Icon icon="Search" />}
          columns={
            order === 1 ? [
              { key: "username", label: t('username') },
              { key: "role", label: t('role') },
            ] : [
              { key: "email", label: t('email') },
              { key: "role", label: t('role') },
            ]}
        >
          {
            (row) => (
              <>
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
                <Typography variant="bodySm">{row.role}</Typography>
                <Button
                  variant="white"
                  text="Delete"
                  onClick={() => { order === 1 ? handleDeleteUser(row.userId) : handleDeletePendingUser(row.docId) }}
                />
              </>
            )
          }
        </Table>

      </Box>
    </React.Fragment>
  );
};

export default UserBoard;
