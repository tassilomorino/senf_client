/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ExpandButton from "../CustomButtons/ExpandButton";
import MainModal from "./MainModal";
import { deleteComment } from "../../../redux/actions/commentActions";

const ButtonWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.standalone ? "100px" : "50px")};
  position: relative;
  z-index: 999;
  overflow: hidden;
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: grey;
  position: relative;
`;
const CommentMenuModal = ({
  setCommentMenuOpen,
  commentId,
  screamId,
  userHandle,
}) => {
  console.log(commentId, userHandle);
  const { authenticated, credentials } = useSelector((state) => state.user);
  const { handle, isAdmin, isModerator } = credentials;
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const deleteTheComment = () => {
    var answer = window.confirm(
      "Bist du sicher, dass du den Kommentar löschen möchtest?"
    );
    if (answer) {
      dispatch(deleteComment(commentId, user, screamId));

      //some code
    } else {
      //some code
    }
  };

  const reportComment = () => {
    const thisPath = `/users/${userHandle}/scream/${screamId}`;
    const siteLink = "senf.koeln" + thisPath;

    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Meldung: Beitrag beinhaltet unangebrachten Kommentar ") +
      "&body=" +
      escape(
        "Dieser Beitrag beinhaltet einen unangebrachten Kommentar:" +
          "\n" +
          "\n" +
          siteLink +
          "\n" +
          "\n" +
          "Kommentar-ID:" +
          "\n" +
          "\n" +
          commentId
      );
    window.location.href = link;
  };

  return (
    <React.Fragment>
      <MainModal handleButtonClick={() => setCommentMenuOpen(false)}>
        {authenticated && userHandle === handle && (
          <ButtonWrapper>
            <ExpandButton handleButtonClick={deleteTheComment}>
              Kommentar löschen
            </ExpandButton>
          </ButtonWrapper>
        )}

        <ButtonWrapper
          standalone={
            (authenticated && userHandle === handle) || isAdmin || isModerator
              ? false
              : true
          }
        >
          <ExpandButton handleButtonClick={reportComment}>Melden</ExpandButton>
        </ButtonWrapper>
        <Line />
        <ButtonWrapper>
          <ExpandButton handleButtonClick={() => setCommentMenuOpen(false)}>
            Abbrechen
          </ExpandButton>
        </ButtonWrapper>
      </MainModal>
    </React.Fragment>
  );
};

export default CommentMenuModal;
