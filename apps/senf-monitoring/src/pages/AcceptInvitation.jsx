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
import { Typography, Box, Button, ModalContext, isMobileCustom, Auth } from "senf-atomic-design-system";
import styled from "styled-components";
import { auth, db } from "../firebase";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
`;

export const AcceptInvitation = () => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom()
  const { handleModal } = React.useContext(ModalContext) || {};

  const user = useSelector((state) => state.user);
  const [state, setState] = useState([]);


  const params = (new URL(document.location)).searchParams;
  const invitationId = params.get("invitationId");

  const handleSetInvitationData = async () => {
    try {
      const docRef = doc(db, `mail/${invitationId}`);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot) {
        setState(docSnapshot.data());
        console.log("inviteData", docSnapshot.data())
      }
    } catch (error) {
      throw new Error(error, "Error in Memberlist");
    }
  };

  useEffect(() => {
    handleSetInvitationData();

    console.log("User", user)
    !user?.authenticated && handleModal("push", <Auth />, { swipe: !!isMobile, size: "md", height: isMobile && window.innerHeight + 83, padding: 0 })

  }, [user]);



  // How users accept invitations
  // user clicks on link with mail-doc-id, -> user registers. on click register checck-mail-doc and check if email matches, add current userId to organizationId-doc + cloud Function  
  // Security: only admin can create mail-doc, mail-doc-id is unique and you can only read it specifically with providing its id, and user-email is equal check,  expirationdate


  const handleUpdateDoc = async (invitationDocData, uid) => {
    const updateDocData = {
      // role: invitationDocData.role,
      // organizationName: invitationDocData.organizationName,
    };
    const docRef = doc(db, `exampleUsers/${uid}`);
    await updateDoc(docRef, updateDocData);
  };
  const handleAcceptInvitation = async () => {
    // const { uid } = auth?.currentUser;
    const uid = "zWSfdDHkerK4X2gjdDSL";

    try {
      const invitationDocRef = doc(db, `exampleMail/${invitationId}`);
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
