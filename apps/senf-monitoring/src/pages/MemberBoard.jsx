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
} from "firebase/firestore";
import { db } from "../firebase";
import InviteMember from "./InviteMember";



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
  const isMobile = isMobileCustom()

  const [order, setOrder] = useState(1)
  const organizationId = 12345678

  const [members, setMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);

  const [filteredMembers, setFilteredMembers] = useState([]);
  const [filteredPendingMembers, setFilteredPendingMembers] = useState([]);


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

  const getPendingMembers = async () => {
    try {
      const pendingMembersRef = collection(db, "mail");
      const q = query(
        pendingMembersRef,
        // where("variable", ">", parameter),
        orderBy("createdAt", "desc")
      );
      const pendingMembersQuerySnapshot = await getDocs(q);
      const pendingMembersData = [];

      pendingMembersQuerySnapshot.forEach((doc) => {
        if (
          // organizationId === doc.data().organizationId && 
          doc.data().pending === true) {
          pendingMembersData.push({
            ...doc.data(),
            docId: doc.id,
          });
        }

      });
      setPendingMembers(pendingMembersData);
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

  const handleDeletePendingMember = async (docId) => {
    try {
      const docRef = doc(db, `mail/${docId}`);
      await deleteDoc(docRef).then(() => {
        getPendingMembers();
      });
    } catch (error) {
      throw new Error(error, "error in deleteScreamFunc");
    }
  };

  useEffect(() => {
    getMembers();
    getPendingMembers()
  }, []);

  useEffect(() => {
    if (order === 1) {
      setFilteredMembers(
        members.filter(member => Object.values(member).join(' ').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
    }
  }, [searchTerm, members, order]);


  useEffect(() => {
    if (order === 2) {
      setFilteredPendingMembers(
        pendingMembers.filter(pendingMember => Object.values(pendingMember).join(' ').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
      );
    }
  }, [searchTerm, pendingMembers, order]);



  return (
    <React.Fragment>
      <Wrapper>
        <Box gap="20px" flexDirection="column" margin="30px">
          <Typography variant="h2">MemberBoard</Typography>

          <Box justifyContent="space-between" gap="16px" alignItems="flex-end">
            <Box margin="0px 24px 0px 0px" gap="10px" width="500px">
              <Tabs
                fontSize="buttonSm"
                order={order}
                setOrder={setOrder}
                tabs={[
                  { icon: <User />, text: `Members (${members.length})` },
                  { icon: <User />, text: `Pending Members (${pendingMembers.length})` },
                  // { icon: <Info />, text: "Interaktionen" },
                ]}
              />
            </Box>
            <Box width="400px">
              <Input type="search" setSearchTerm={setSearchTerm} />
            </Box>
            <ModalButton text="Add member" options={{ swipe: false }}>
              <InviteMember getPendingMembers={getPendingMembers} />
            </ModalButton>
          </Box>




          <Table
            data={order === 1 ? filteredMembers : filteredPendingMembers}
            checkbox="userId"
            bulkEdit={<Icon icon="Search" />}
            // this could be an alternative structure
            // template={(member) => ([{
            //     header: t("username"),
            //     value: <Box gap="16px">
            //       <ImagePlaceholder
            //         width="64px"
            //         height="64px"
            //         img="#"
            //       />
            //       <Box flexDirection="column" justifyContent="center" alignItems="flex-start">
            //         <Typography variant="h3">{member?.handle}</Typography>
            //         { member?.email && <Typography variant="bodySm">{member.email}</Typography> }
            //       </Box>
            //     </Box>
            //   },
            //   {
            //     header: t("division"),
            //     value: <Typography variant="bodySm">{member?.division}</Typography>
            //   },
            //   {
            //     header: t("role"),
            //     value: <Typography variant="bodySm">{member?.roles}</Typography>
            //   },
            //   {
            //     header: 'actions',
            //     value: <Button
            //       variant="white"
            //       text="Delete"
            //       onClick={() => handleDeleteMember(member?.userId)}
            //     />
            //   },
            // ])}
            columns={[
              t('username'),
              t('division'),
              t('roles'),
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
                  <Typography variant="bodySm">{row.division}</Typography>
                  <Typography variant="bodySm">{row.role}</Typography>
                  <Button
                    variant="white"
                    text="Delete"
                    onClick={() => { order === 1 ? handleDeleteMember(row.userId) : handleDeletePendingMember(row.docId) }}
                  />
                </>
              )
            }
          </Table>

        </Box>
      </Wrapper>
    </React.Fragment>
  );
};

export default MemberBoard;
