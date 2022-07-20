import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Box, Button } from "senf-atomic-design-system";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
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
  const [openModal, setOpenModal] = useState(false);
  const [members, setMembers] = useState([]);

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
  useEffect(() => {
    getMembers();
  }, [openModal]);
  return (
    <React.Fragment>
      {openModal && (
        <AddMemberToList openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <Wrapper>
        <Box gap="20px" flexDirection="column" margin="30px">
          <Typography variant="h2">MemberBoard</Typography>
          <Box justifyContent="flex-end">
            <Button onClick={() => setOpenModal(true)} text="Add Member" />
          </Box>

          {members && (
            <Box gap="8px" flexDirection="column">
              {members.map((member) => (
                <Box key={member.userId} gap="10px">
                  <Typography variant="h3">{member.name}</Typography>
                  <Typography variant="h4">{member.email}</Typography>
                  <Typography variant="h4">{member.createdAt}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Wrapper>
    </React.Fragment>
  );
};

export default MemberBoard;
