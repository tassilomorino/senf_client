/** @format */

import React, { FC, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuthContext } from "senf-shared";
import Button from "../../atoms/buttons/Button";
import Box from "../../atoms/box/Box";
import { AuthResetEmailProps } from "./AuthResetEmail.types";
import Typography from "../../atoms/typography/Typography";
import Form from "../../molecules/form/Form";
import theme from "../../../styles/theme";
import ModalActionButtons from "../../molecules/modalStack/ModalActionButtons";
import { useModals } from "../../molecules/modalStack/ModalProvider";

const AuthResetEmail: FC<AuthResetEmailProps> = ({
  setPage,
  authHandler,
  formikStore: formikStoreInitial,
}) => {
  const { t } = useTranslation();
  const { sendPasswordResetEmail, loadingAuth } = authHandler;
  const { loading } = useAuthContext();
  const { closeModal } = useModals();
  useEffect(() => {
    console.log(authHandler);
  }, [authHandler]);

  const inputItems = [{ name: "email", type: "email", placeholder: "E-Mail" }];

  const validationSchema = yup.object({
    email: yup
      .string()
      .required(t("enter_email"))
      .email(t("enter_valid_email")),
  });

  const formikStore = useFormik({
    initialValues: formikStoreInitial.values,
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => console.log("values"),
  });

  const options = {
    submitText: t("reset"),
    submitDisabled: !formikStore.isValid,
    submitLoading: loading === "reset",
    onSubmit: () =>
      sendPasswordResetEmail(formikStore.values.email).then(closeModal),
  };

  return (
    <Box
      flexDirection="column"
      // margin="180px 10% 0px 10%"
      position="relative"
      zIndex={9999}
    >
      {/* <Typography variant="h1" style={{ position: "relative" }}>
        {t("reset_header_1")}
      </Typography>
      <Typography variant="h1" style={{ position: "relative" }}>
        {t("reset_header_2")}
      </Typography>
      <Box margin="25px 0px 24px 0px">
        <Typography variant="bodyBg" style={{ position: "relative" }}>
          {t("reset_password")}
        </Typography>
      </Box> */}
      <Box
        gap="16px"
        flexDirection="column"
        width="100%"
        padding="20px"
      >
        <Form
          width="100%"
          inputItems={inputItems}
          formik={formikStore}
        />

        {/* {dataSuccess && (
          <Typography variant="bodySm" color={theme.colors.signal.greenDark}>
            {dataSuccess}
          </Typography>
        )} */}

        {/* <Button
          variant="white"
          width="max"
          text={t("reset")}
          loading={resetLoading}
          onClick={() => handleSubmitResetEmail(formikStore)}
          disabled={!formikStore?.isValid}
        /> */}
      </Box>
      <ModalActionButtons {...options} />
    </Box>
  );
};

export default AuthResetEmail;
