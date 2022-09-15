/** @format */

import React from "react";
import { useModals } from "senf-atomic-design-system";
import { AuthModal } from "senf-shared";

const Auth = ({ authAddDetails }) => {
  const { closeModal } = useModals()
  return <AuthModal
    success={() => closeModal()}
    error={(err) => console.error(err)}
    handleClose={() => closeModal()}
    authAddDetails={authAddDetails}
  />
};

export default (Auth);
