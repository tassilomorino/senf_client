import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";


import { Typography, ImagePlaceholder, Box, Table, Button, ModalButton, Input } from "senf-atomic-design-system";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import AddMemberToList from "./AddMemberToList";
import { db } from "../firebase";


const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const MemberBoard = () => {

  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { t } = useTranslation();

  const getMembers = async () => {
    try {
      const membersRef = collection(db, "exampleUsers");
      const q = query(
        membersRef,
        // where("variable", ">", parameter),
        orderBy("createdAt", "desc")
      );
      const membersQuerySnapshot = await getDocs(q);
      const membersData = [];

      membersQuerySnapshot.forEach((doc) => {
        membersData.push({
          ...doc.data(),
          userId: doc.id,
        });
      });
      setMembers(membersData);
    } catch (error) {
      throw new Error(error, "Error in Memberlist");
    }
  };
  const handleDeleteMember = async (userId) => {
    try {
      const docRef = doc(db, `exampleUsers/${userId}`);
      await deleteDoc(docRef).then(() => {
        getMembers();
      });
    } catch (error) {
      throw new Error(error, "error in deleteScreamFunc");
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    setFilteredMembers(members.filter(e => Object.values(e).join(' ').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
  }, [searchTerm, members]);
  return (
    <React.Fragment>
      <Wrapper>
        <Box gap="20px" flexDirection="column" margin="30px">
          <Typography variant="h2">MemberBoard</Typography>
          <Box justifyContent="between" gap="16px">
            <Box>
              <Input type="search" setSearchTerm={setSearchTerm} />
            </Box>
            <Box margin="0 0 0 auto">
              <ModalButton text="1">
                <ModalButton text="2">
                  <span>asd</span>
                </ModalButton>
              </ModalButton>
            </Box>
          </Box>

          {filteredMembers && (
            <Table data={filteredMembers} checkbox={true} columns={[
                t('username'),
                t('division'),
                t('roles'),
              ]}>
              {
                (row) => (
                  <>
                    <Box gap="16px">
                      <ImagePlaceholder
                        width="64px"
                        height="64px"
                        img="#"
                      />
                      <Box flexDirection="column" justifyContent="center" alignItems="flex-start">
                        <Typography variant="h3">{row.handle}</Typography>
                        { row?.email && <Typography variant="bodySm">{row.email}</Typography> }
                      </Box>
                    </Box>
                    <Typography variant="bodySm">{row.division}</Typography>
                    <Typography variant="bodySm">{row.role}</Typography>
                    <Button
                      variant="white"
                      text="Delete"
                      onClick={() => handleDeleteMember(row.userId)}
                    />
                  </>
                )
              }
            </Table>
          )}
        </Box>
      </Wrapper>
    </React.Fragment>
  );
};

export default MemberBoard;
