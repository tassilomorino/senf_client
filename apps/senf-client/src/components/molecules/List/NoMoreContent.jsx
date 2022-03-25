/** @format */

import { StyledText } from "../../../styles/GlobalStyle";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NoContent, NoMore } from "./styles/sharedStyles";

export const NoMoreMainContent = ({ dataFinalLength }) => {
  const { t } = useTranslation();

  return dataFinalLength && dataFinalLength > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreIdeas")} <br />
    </NoMore>
  ) : (
    <StyledText marginLeft="24px">{t("noContentIdeas")}</StyledText>
  );
};

export const NoMoreProjectRooms = ({ dataFinalLength }) => {
  const { t } = useTranslation();
  const openOrganization = useSelector((state) => state.UI.openOrganization);
  return dataFinalLength && dataFinalLength > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreProjectRooms")} <br />
    </NoMore>
  ) : openOrganization ? (
    <StyledText marginLeft="24px" margin="0px 24px">
      {t("noOrganizationProjectRooms")}
    </StyledText>
  ) : (
    <StyledText marginLeft="24px" margin="0px 24px">
      {t("noProjectRooms")}
    </StyledText>
  );
};

export const NoMoreMyContent = ({ dataFinalLength, loading }) => {
  const myScreams = useSelector((state) => state.data.myScreams);

  const { t } = useTranslation();

  return !loading && dataFinalLength && dataFinalLength > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreIdeas")} <br />
    </NoMore>
  ) : myScreams === undefined || myScreams === 0 ? (
    <StyledText marginLeft="24px">{t("noSharedIdeas")}</StyledText>
  ) : (
    <StyledText marginLeft="24px"> {t("noIdeasWithFilter")}</StyledText>
  );
};

export const NoMoreProjectsContent = ({ dataFinalLength, loading }) => {
  const project = useSelector((state) => state.data.project);

  const { t } = useTranslation();

  return !loading && dataFinalLength && dataFinalLength > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreIdeas")} <br />
    </NoMore>
  ) : !loading &&
    (project?.screams === undefined || project?.screams?.length === 0) ? (
    <StyledText marginLeft="24px">{t("noProjectIdeas")}</StyledText>
  ) : (
    <StyledText marginLeft="24px">{t("noContentIdeas")}</StyledText>
  );
};
