/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const NoMore = styled.div`
  color: rgb(87, 87, 87);
  position: absolute;
  font-size: 20pt;
  margin-top: 0vh;
  margin-left: 0vw;
  width: 100%;
  text-align: center;
  font-family: Playfair Display;
`;

const NoContent = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
  z-index: 10;
`;

export const NoMoreMainContent = ({ dataFinal }) => {
  const { t } = useTranslation();

  return dataFinal.length > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreIdeas")} <br />
    </NoMore>
  ) : (
    <NoContent>{t("noContentIdeas")}</NoContent>
  );
};

export const NoMoreMyContent = ({ MyDataFinal, myScreams, loading }) => {
  const { t } = useTranslation();

  return !loading && MyDataFinal.length > 0 ? (
    <div className="ende">
      ... <br /> Keine weiteren Ideen <br />
    </div>
  ) : myScreams === undefined ? (
    <div className="no-ideas-yet">
      Du hast bisher noch keine Idee geteilt. Es gibt noch so viele Ideen da
      draußen & du bist kreativ! Teile deine Ideen!
    </div>
  ) : (
    <div className="no-ideas-yet">
       Zu den ausgewählten Filtern hast du noch keine Ideen geteilt.
    </div>
  );
};

export const NoMoreProjectsContent = ({
  dataFinalChannel,
  loading,
  projectScreams,
}) => {
  const { t } = useTranslation();

  return !loading && dataFinalChannel.length > 0 ? (
    <div className="ende">
      ... <br /> Keine weiteren Ideen <br />
    </div>
  ) : !loading && dataFinalChannel.length !== projectScreams.length ? (
    <div className="no-ideas-yet">
      Mit den ausgewählten Filtern findest du noch keine Ideen.
    </div>
  ) : (
    <div className="no-ideas-yet">
      Zu diesem Projektraum wurde bisher noch keine Idee geteilt. Sei die/der
      erste und teile deine Idee!
    </div>
  );
};
