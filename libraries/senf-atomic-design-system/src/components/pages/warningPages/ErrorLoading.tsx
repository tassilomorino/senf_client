/** @format */

import React, { FC, memo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ErrorLoadingProps } from "./ErrorLoading.types";
import Typography from "../../atoms/typography/Typography";

const Wrapper = styled.div<ErrorLoadingProps>`
  position: fixed;
  z-index: 99999999999;
  background-color: #fed957;

  height: 100vh;
  width: 100vw;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorLoading: FC<ErrorLoadingProps> = ({}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Typography
        variant="h2"
        textAlign="center"
      >
        Ooops!
      </Typography>
      <br />
      <Typography
        variant="h3"
        textAlign="center"
      >
        {t("something_went_wrong")}
      </Typography>
    </Wrapper>
  );
};

export default ErrorLoading;
