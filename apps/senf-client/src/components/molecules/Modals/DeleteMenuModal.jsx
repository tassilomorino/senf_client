/** @format */

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import MainModal from "../../atoms/Layout/MainModal";
import { StyledH3 } from "../../../styles/GlobalStyle";
import { deleteUserFromDb } from "../../../redux/actions/userActions";

const ButtonWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.standalone ? "100px" : "50px")};
  position: relative;
  z-index: 999;
  overflow: hidden;
  white-space: nowrap;
  background-color: ${(props) =>
    props.warning ? "rgba(232, 144, 126, 0.4)" : "none"};
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: grey;
  position: relative;
`;
const Headline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 12pt;
`;

const DeleteMenuModal = ({ setDeleteMenuOpen }) => {
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
            <MainModal
              handleButtonClick={() => setDeleteMenuOpen(false)}
              zIndex={99999}
              padding="15px 0px"
            >
              <ButtonWrapper>
                <ExpandButton handleButtonClick={openConfirmMenu}>
                  <StyledH3 fontWeight={400}>{t("deteleAccount")}</StyledH3>
                </ExpandButton>
              </ButtonWrapper>
              <ButtonWrapper>
                <ExpandButton
                  handleButtonClick={() => setDeleteMenuOpen(false)}
                >
                  <StyledH3 fontWeight={400}> {t("cancel")}</StyledH3>
                </ExpandButton>
              </ButtonWrapper>
            </MainModal>
          ) : (
            <MainModal handleButtonClick={goBack} zIndex={99999}>
              <Headline>{t("delete_account_confirm")}</Headline>

              <Line />
              <ButtonWrapper warning>
                <ExpandButton handleButtonClick={deleteAccount}>
                  <StyledH3 fontWeight={400}>{t("delete")}</StyledH3>
                </ExpandButton>
              </ButtonWrapper>
              <ButtonWrapper>
                <ExpandButton handleButtonClick={goBack}>
                  <StyledH3 fontWeight={400}> {t("cancel")}</StyledH3>
                </ExpandButton>
              </ButtonWrapper>
            </MainModal>
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )}
    </>
  );
};

export default DeleteMenuModal;
