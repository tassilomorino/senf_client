/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { deleteScream } from "../../../redux/actions/screamActions";

import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import MainModal from "../../atoms/Layout/MainModal";
import EditIdeaModal from "../../../pages/EditIdeaPage";
import { StyledH3, StyledH4 } from "../../../styles/GlobalStyle";

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
const MenuModal = ({ setMenuOpen, screamId, screamUserId }) => {
  const { authenticated, isAdmin, isModerator, userId } = useSelector(
    (state) => state.user
  );

  const { scream } = useSelector((state) => state.data);
  const [editOpen, setEditOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const deleteTheScream = () => {
    const answer = window.confirm(
      "Bist du sicher, dass du die Idee löschen möchtest?"
    );
    if (answer) {
      dispatch(deleteScream(screamId, userId, isAdmin, isModerator));

      // some code
    } else {
      // some code
    }
  };

  const reportScream = () => {
    const thisPath = `/users/${screamUserId}/scream/${screamId}`;
    const siteLink = `senf.koeln${thisPath}`;

    const link =
      `mailto:dein@senf.koeln` +
      `?subject=${escape(
        "Meldung: Beitrag beinhaltet unangebrachten Inhalt "
      )}&body=${escape(
        `Dieser Beitrag beinhaltet unangebrachten Inhalt:` +
          `\n` +
          `\n${siteLink}`
      )}`;
    window.location.href = link;
  };
  const { t } = useTranslation();
  return (
    <React.Fragment>
      {editOpen && (
        <EditIdeaModal
          scream={scream}
          isAdmin={isAdmin}
          isModerator={isModerator}
          isUser={screamUserId === userId}
          setEditOpen={setEditOpen}
          setMenuOpen={setMenuOpen}
          editOpen={editOpen}
        />
      )}

      {!editOpen && (
        <MainModal handleButtonClick={() => setMenuOpen(false)}>
          {authenticated &&
            (isAdmin === true ||
              isModerator === true ||
              screamUserId === userId) && (
              <React.Fragment>
                <ButtonWrapper>
                  <ExpandButton handleButtonClick={() => setEditOpen(true)}>
                    <StyledH3 fontWeight={400}> {t("edit_idea")}</StyledH3>
                  </ExpandButton>
                </ButtonWrapper>
                <ButtonWrapper>
                  <ExpandButton handleButtonClick={deleteTheScream}>
                    <StyledH3 fontWeight={400}> {t("delete_idea")}</StyledH3>
                  </ExpandButton>
                </ButtonWrapper>
              </React.Fragment>
            )}

          <ButtonWrapper
            standalone={
              !(
                (authenticated && screamUserId === userId) ||
                isAdmin ||
                isModerator
              )
            }
          >
            <ExpandButton handleButtonClick={reportScream}>
              <StyledH3 fontWeight={400}>{t("report")}</StyledH3>
            </ExpandButton>
          </ButtonWrapper>
          <Line />
          <ButtonWrapper>
            <ExpandButton handleButtonClick={() => setMenuOpen(false)}>
              <StyledH3 fontWeight={400}> {t("cancel")}</StyledH3>
            </ExpandButton>
          </ButtonWrapper>
        </MainModal>
      )}
    </React.Fragment>
  );
};

export default MenuModal;
