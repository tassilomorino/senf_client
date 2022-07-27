import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Typography, Box, Button } from "senf-atomic-design-system";
import styled from "styled-components";
import Auth from "../components/Auth";
import { auth, db } from "../firebase";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

export const AcceptInvitation = () => {
  const { t } = useTranslation();
  const [authOpen, setAuthOpen] = useState(true);

  const user = useSelector((state) => state.user);
  const [state, setState] = useState([]);

  const invitationDocId = window.location.hash.substring(1);

  const getMembers = async () => {
    try {
      const docRef = doc(db, `exampleMail/${invitationDocId}`);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot) {
        setState(docSnapshot.data());
      }
    } catch (error) {
      throw new Error(error, "Error in Memberlist");
    }
  };

  useEffect(() => {
    console.log(invitationDocId);
    getMembers();
  }, []);

  const handleUpdateDoc = async (invitationDocData, uid) => {
    const updateDocData = {
      role: invitationDocData.role,
      organizationName: invitationDocData.organizationName,
    };
    const docRef = doc(db, `exampleUsers/${uid}`);
    await updateDoc(docRef, updateDocData);
  };
  const handleAcceptInvitation = async () => {
    // const { uid } = auth?.currentUser;
    const uid = "zWSfdDHkerK4X2gjdDSL";

    try {
      const invitationDocRef = doc(db, `exampleMail/${invitationDocId}`);
      const invitationDocSnapshot = await getDoc(invitationDocRef);
      const invitationDocData = invitationDocSnapshot.data();

      if (uid && invitationDocSnapshot.exists()) {
        handleUpdateDoc(invitationDocData, uid);
      } else {
        throw new Error("Invitation not found");
      }
    } catch (error) {
      throw new Error(error, "error in handleAcceptInvitation");
    }
  };

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
        {/* {!user.authenticated && (
          <Auth setAuthOpen={setAuthOpen} authOpen={authOpen} />
        )} */}
        <Box maxWidth="400px">
          <Typography variant="h1" textAlign="center">
            You were invitited to join the team of "{state?.organizationName}"
          </Typography>
        </Box>

        <Button
          onClick={handleAcceptInvitation}
          text={t("accept_invitation")}
        />
      </Box>
    </Wrapper>
  );
};
