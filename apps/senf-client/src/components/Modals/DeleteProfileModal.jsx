/** @format */

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Typography, Button, ActionModal } from "senf-atomic-design-system";
import { deleteUserFromDb } from "../../redux/actions/userActions";

const DeleteProfileModal = ({ deleteMenuOpen, setDeleteMenuOpen }) => {
  const { authenticated, isAdmin, isModerator, userId } = useSelector(
    (state) => state.user
  );

  const user = useSelector((state) => state.user);
  const [confirmMenu, setConfirmMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const goBack = () => {
    setDeleteMenuOpen(true);
    setConfirmMenuOpen(false);
  };

  const openConfirmMenu = () => setConfirmMenuOpen(true);

  const deleteAccount = () => {
    dispatch(deleteUserFromDb(userId)).then(() => {
      setDeleteMenuOpen(false);
      setConfirmMenuOpen(false);
    });
  };

  const { t } = useTranslation();
  return (
    <>
      {ReactDOM.createPortal(
        <React.Fragment>
          {!confirmMenu ? (
            <ActionModal
              title={t("contactModalTitle")}
              openModal={deleteMenuOpen}
              setOpenModal={setDeleteMenuOpen}
              handleClose={() => setDeleteMenuOpen(false)}
              cancelButtonText={t("cancel")}
            >
              <Button
                variant="secondary"
                onClick={openConfirmMenu}
                text={t("deteleAccount")}
              />
            </ActionModal>
          ) : (
            <ActionModal
              title=""
              openModal={confirmMenu}
              setOpenModal={goBack}
              handleClose={goBack}
              cancelButtonText={t("cancel")}
              saveButtonText={t("delete")}
              handleSave={deleteAccount}
            >
              <Typography variant="h3" textAlign="center">
                {t("delete_account_confirm")}
              </Typography>
            </ActionModal>
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )}
    </>
  );
};

export default DeleteProfileModal;
