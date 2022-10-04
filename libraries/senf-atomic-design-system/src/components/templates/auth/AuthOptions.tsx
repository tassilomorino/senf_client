/** @format */

import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";

import { useFormik } from "formik";
import * as yup from "yup";

import Button from "../../atoms/buttons/Button";
import Input from "../../atoms/inputs/Input";
import Form from "../../molecules/form/Form";
import Box from "../../atoms/box/Box";
import { AuthOptionsProps } from "./AuthOptions.types";

import Typography from "../../atoms/typography/Typography";
import { openLink } from "../../../util/helpers";
import Mail from "../../../assets/icons/Mail";
import Google from "../../../assets/icons/Google";
import Apple from "../../../assets/icons/Apple";
import Facebook from "../../../assets/icons/Facebook";
import Arrow from "../../../assets/icons/Arrow";

import theme from "../../../styles/theme";
import { useModals } from "../../molecules/modalStack/ModalProvider";

const Divider = styled.div`
  padding-block: 1rem;
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.black.black60tra};
  &:before,
  &:after {
    content: "";
    height: ${({ theme }) => `${theme.borderWidths[1]}px`};
    width: 100%;
    background: currentColor;
    opacity: 0.5;
  }
`;

const AuthOptions: FC<AuthOptionsProps> = ({
  authHandler,
  setPage,
  errorMessage,
  formikStore,
}) => {
  const { t } = useTranslation();
  const { closeModal } = useModals();
  const submitEmail = async () => {
    try {
      const response = await authHandler.userExists(formikStore);
      if (response.userId) {
        return closeModal();
      }
      if (response.length && response.includes("password")) {
        setPage("authEmail");
      } else {
        setPage("authEmailRegister");
      }
      return response;
    } catch (error) {
      throw new Error("error");
    }
  };
  return (
    <Box
      flexDirection="column"
      margin="180px 10% 0px 10%"
      position="relative"
      zIndex={9999}
    >
      <Typography
        variant="h1"
        style={{ position: "relative" }}
      >
        {t("infopage_addMustard_1")}
      </Typography>
      <Typography
        variant="h1"
        style={{ position: "relative" }}
      >
        {t("infopage_addMustard_2")}
      </Typography>

      <Box margin="25px 0px 24px 0px">
        <Typography
          variant="bodyBg"
          style={{ position: "relative" }}
        >
          {t("auth_subheadline")}
        </Typography>
      </Box>
      <Box
        gap="16px"
        flexDirection="column"
      >
        <Button
          variant="white"
          width="max"
          text="Mit Google anmelden"
          icon={<Google />}
          loading={!!authHandler?.loading.google}
          onClick={authHandler?.signIn.google}
        />

        <Button
          variant="white"
          width="max"
          text="Mit Facebook anmelden"
          loading={!!authHandler?.loading.facebook}
          icon={<Facebook />}
          onClick={authHandler?.signIn.facebook}
        />
        {errorMessage && (
          <Typography
            variant="bodySm"
            color={theme.colors.signal.redDark}
          >
            {errorMessage.message}
          </Typography>
        )}
      </Box>
      <Divider>oder</Divider>
      <Box
        gap="16px"
        flexDirection="column"
      >
        <Input
          name="email"
          type="email"
          placeholder="E-Mail"
          onChange={formikStore?.handleChange}
          onBlur={formikStore?.handleBlur}
          value={formikStore?.values.email}
          error={
            formikStore?.touched.email && Boolean(formikStore?.errors.email)
          }
          leadingIcon="Mail"
          trailingIcon={
            formikStore.isValid ? (
              authHandler.loading.email ? (
                "Loading"
              ) : (
                <Arrow />
              )
            ) : undefined
          }
          trailingIconLabel={t("next")}
          onSubmit={submitEmail}
          trailingIconClick={submitEmail}
        />
        <Input
          name="password"
          type="password"
          hidden={true}
          onChange={formikStore?.handleChange}
          onBlur={formikStore?.handleBlur}
          value={formikStore?.values.password}
        />
      </Box>

      <Box margin="24px 0px">
        <Typography variant="bodySm">
          <Trans i18nKey="register_agb">
            ...
            <span
              style={{ textDecoration: "underline", fontWeight: "700" }}
              onClick={() => openLink("senf.koeln/agb")}
            >
              ...
            </span>
            ...
            <span
              style={{ textDecoration: "underline", fontWeight: "700" }}
              onClick={() => openLink("senf.koeln/datenschutz")}
            >
              ...
            </span>
            ...
          </Trans>
        </Typography>
      </Box>

      {/* <Box
          flexDirection="row"
          gap="10px"
          alignItems="center"
          margin="20px 0 0 0 "
        >
          {variantState === "login" ? (
            <React.Fragment>
              <Typography variant="bodyBg" style={{ position: "relative" }}>
                {t("auth_login_user_redirection_question")}
              </Typography>{" "}
              <a
                style={{ position: "relative" }}
                onClick={() => setVariantState("register")}
              >
                {t("register_now")}
              </a>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography variant="bodyBg" style={{ position: "relative" }}>
                {t("auth_register_user_redirection_question")}
              </Typography>
              <a
                style={{ position: "relative" }}
                onClick={() => setVariantState("login")}
              >
                {t("login_now")}
              </a>
            </React.Fragment>
          )}
        </Box> */}

      {/* <Form
          margin="24px 0 0 0"
          width="100%"
          inputItems={
            variantState === "register" ? inputItemsRegister : inputItemsLogin
          }
          formik={
            variantState === "register" ? formikRegisterStore : formikLoginStore
          }
        /> */}

      {/* <Box
          flexDirection="row"
          gap="10px"
          alignItems="center"
          margin="14px 0 36px 0"
        >
          {variantState === "login" ? (
            <React.Fragment>
              <p style={{ position: "relative" }}> {t("forgot_password")}</p>{" "}
              <a style={{ position: "relative" }}>{t("reset")}</a>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography variant="bodySm" style={{ position: "relative" }}>
                <Trans i18nKey="register_agb">
                  ...
                  <span
                    style={{ textDecoration: "underline" }}
                    onClick={() => openLink("senf.koeln/agb")}
                  >
                    ...
                  </span>
                  ...
                  <span
                    style={{ textDecoration: "underline" }}
                    onClick={() => openLink("senf.koeln/datenschutz")}
                  >
                    ...
                  </span>
                  ...
                </Trans>
              </Typography>
            </React.Fragment>
          )}
        </Box> */}
      {/* <Button
          variant="white"
          width="max"
          text="Anmelden"
          loading={loading}
          onClick={
            variantState === "register"
              ? () => handleSubmitRegister(formikRegisterStore)
              : () => handleSubmitLogin(formikLoginStore)
          }
          disabled={
            variantState === "register"
              ? !formikRegisterStore?.isValid
              : !formikLoginStore?.isValid
          }
        /> */}
    </Box>
  );
};

export default AuthOptions;
