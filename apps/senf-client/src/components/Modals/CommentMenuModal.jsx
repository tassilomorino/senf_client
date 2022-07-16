/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Typography, Button, ActionModal } from "senf-atomic-design-system";
import ExpandButton from "../atoms/CustomButtons/ExpandButton";
import MainModal from "../atoms/Layout/MainModal";
import { deleteComment } from "../../redux/actions/commentActions";
import { StyledH3 } from "../../styles/GlobalStyle";

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

const CommentMenuModal = ({
  commentMenuOpen,
  setCommentMenuOpen,
  commentId,
  screamId,
  commentUserId,
}) => {
  const { authenticated, isAdmin, isModerator, userId } = useSelector(
    (state) => state.user
  );

  const user = useSelector((state) => state.user);
  const [confirmMenu, setConfirmMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const goBack = () => {
    setCommentMenuOpen(true);
    setConfirmMenuOpen(false);
  };

  const openConfirmMenu = () => setConfirmMenuOpen(true);

  const deleteTheComment = () => {
    dispatch(
      deleteComment(commentId, user, screamId, isAdmin, isModerator)
    ).then(() => {
      setCommentMenuOpen(false);
      setConfirmMenuOpen(false);
    });
  };

  const reportComment = () => {
    const thisPath = `/users/${commentUserId}/scream/${screamId}`;
    const siteLink = `senf.koeln${thisPath}`;

    const link =
      `mailto:dein@senf.koeln` +
      `?subject=${escape(
        "Meldung: Beitrag beinhaltet unangebrachten Kommentar "
      )}&body=${escape(
        `Dieser Beitrag beinhaltet einen unangebrachten Kommentar:` +
          `\n` +
          `\n${siteLink}\n` +
          `\n` +
          `Kommentar-ID:` +
          `\n` +
          `\n${commentId}`
      )}`;
    window.location.href = link;
  };
  const { t } = useTranslation();
  return (
    <React.Fragment>
      {!confirmMenu ? (
        <ActionModal
          title={t("contactModalTitle")}
          openModal={commentMenuOpen}
          setOpenModal={setCommentMenuOpen}
          handleClose={() => setCommentMenuOpen(false)}
          cancelButtonText={t("cancel")}
        >
          {authenticated && commentUserId === userId ? (
            <Button
              variant="secondary"
              onClick={openConfirmMenu}
              text={t("delete_comment")}
            />
          ) : (
            authenticated &&
            (isAdmin === true || isModerator === true) && (
              <Button
                variant="secondary"
                onClick={openConfirmMenu}
                text={t("delete_comment_admin")}
              />
            )
          )}

          <Button
            variant="secondary"
            onClick={reportComment}
            text={t("report")}
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
          handleSave={deleteTheComment}
        >
          <Typography variant="h3" textAlign="center">
            {t("delete_comment_confirm")}
          </Typography>
        </ActionModal>
      )}
    </React.Fragment>
  );
};

export default CommentMenuModal;
