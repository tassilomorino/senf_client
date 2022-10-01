/** @format */

import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useModals } from "senf-atomic-design-system";
import { AuthModal, useAuthContext } from "senf-shared";

const Auth = ({ ...props }) => {
  const { closeModal, setModal } = useModals();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
      closeModal();
    }
  }, [user]);

  const Modal = (
    <AuthModal
      success={() => {
        navigate("/");
        closeModal();
      }}
      error={(err) => console.error(err)}
      handleClose={() => closeModal()}
      {...props}
    />
  );

  useEffect(() => {
    const timeoutID = setTimeout(() => !user && setModal(Modal), 500);
    return () => clearTimeout(timeoutID);
  }, [user]);

  return null;
};

export default memo(Auth);
