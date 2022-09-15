/** @format */

import React, { useEffect, memo } from "react";
import { useModals, Button } from "senf-atomic-design-system";
import {
  AuthModal,
  useAuthContext,
} from "senf-shared";

const Auth = () => {
  const { closeModal, setModal } = useModals();
  const { user, signOut } = useAuthContext();

  const Modal = <AuthModal
    success={() => closeModal()}
    error={(err) => console.error(err)}
    handleClose={() => closeModal()}
  />

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (!user) setModal(Modal)
    }, 800);
    return () => clearTimeout(timeoutID);
  }, [user])

  return (user ? <Button onClick={signOut}>Signout</Button> : null);
};

export default memo(Auth);
