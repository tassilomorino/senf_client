/** @format */

import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthProps } from "./Auth.types";

import Wave from "../../atoms/shapes/Wave";
import SenfManSquating from "../../../assets/illustrations/senfManSquatting.png";

import Box from "../../atoms/box/Box";
import Accordion from "../../molecules/accordion/Accordion";
import Button from "../../atoms/buttons/Button";

import Arrow from "../../../assets/icons/Arrow";

import AuthOptions from "../../templates/auth/AuthOptions";
import AuthEmail from "../../templates/auth/AuthEmail";
import AuthResetEmail from "../../templates/auth/AuthResetEmail";
import AuthVerifyEmail from "../../templates/auth/AuthVerifyEmail";
import AuthAddDetails from "../../templates/auth/AuthAddDetails";

import { useModals } from "../../molecules/modalStack/ModalProvider";

const Wrapper = styled.div<AuthProps>`
  position: relative;
  width: 100%;
  min-height: 700px;
  background-color: ${(props) => props.theme.colors.beige.beige20};
  overflow: hidden;
  top: 0;
`;
const Img = styled.img`
  position: absolute;
  right: 24px;
  margin-top: 91px;
  width: 126px;
  z-index: 1;
  pointer-events: none;
  user-select: none;
`;
const StyledSvg = styled.svg`
  position: absolute;
  right: -67px;
  margin-top: 193px;
  z-index: 0;
  pointer-events: none;
  user-select: none;
`;

const Auth: FC<AuthProps> = ({
  authHandler,
  user,
  errorMessage,
  dataSuccess,
  page,
  setPage,
}) => {
  const { openModal } = useModals();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = {
    email: yup
      .string()
      .required(t("enter_email"))
      .matches(/^\S*$/, t("spaces_not_allowed"))
      .email(t("enter_valid_email")),

    password: yup
      .string()
      .required(t("enter_password"))
      .matches(/^\S*$/, t("spaces_not_allowed"))
      .min(8, t("password_8characters"))
      .matches(/\d+/, t("password_with_number")),

    confirmPassword: yup
      .string()
      .required(t("confirmPassword"))
      .oneOf([yup.ref("password"), null], t("passwords_must_match")),
    handle: yup
      .string()
      .required(t("enter_username"))
      .min(3, t("username_too_short"))
      .max(20, t("username_too_long"))
      .matches(/^\S*$/, t("spaces_not_allowed"))
      .matches(/^[a-zA-Z0-9\-\_\.]*$/, t("username_latin_only")),
  };
  const emailValidationSchema = yup.object({ email: schema.email });
  const loginValidationSchema = yup.object({
    email: schema.email,
    password: schema.password,
  });
  const registerValidationSchema = yup.object({
    email: schema.email,
    password: schema.password,
    confirmPassword: schema.confirmPassword,
    handle: schema.handle,
  });

  const formikStore = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
    },
    validationSchema:
      page === "authEmail" ? loginValidationSchema : emailValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => console.log("values"),
  });
  const [isLoggedIn] = React.useState(user);

  useEffect(() => {
    if (page === "authResetEmail") {
      openModal(
        <AuthResetEmail
          setPage={setPage}
          authHandler={authHandler}
          formikStore={formikStore}
        />,
        {
          title: `${t("reset_header_1")} ${t("reset_header_2")}`,
          description: t("reset_password"),
          enterFrom: "right",
          afterClose: () => setPage("authEmail"),
        }
      );
    }
  }, [page]);

  return (
    <Wrapper>
      <Box
        margin="10px"
        position="absolute"
        zIndex={999}
      >
        {page !== "authOptions" && (
          <Button
            variant="tertiary"
            icon={<Arrow transform="rotate(180)" />}
            onClick={() => {
              setPage("authOptions");
              navigate("/");
            }}
          />
        )}
      </Box>

      <Wave
        color="#fed957"
        top="170px"
      />

      <React.Fragment>
        <Img
          src={SenfManSquating}
          alt="Illustration"
        />
        <StyledSvg
          xmlns="http://www.w3.org/2000/svg"
          width="175"
          height="69"
        >
          <g>
            <defs>
              <linearGradient
                id="idX0hbBYeIVg-1861781537"
                gradientTransform="rotate(154, 0.5, 0.5)"
              >
                <stop
                  offset="0"
                  stopColor="rgba(186, 163, 79, 0)"
                  stopOpacity="0"
                ></stop>
                <stop
                  offset="1"
                  stopColor="rgba(119, 108, 70, 0.46)"
                  stopOpacity="0.46"
                ></stop>
              </linearGradient>
            </defs>
            <path
              d="M 0.5 68.5 L 174.5 0.5 L 174.5 33.5 L 56.5 67 L 62 55.5 L 26 67 Z"
              fill="url(#idX0hbBYeIVg-1861781537)"
              stroke="hsla(0, 0%, 100%, 0)"
            ></path>
          </g>
        </StyledSvg>
      </React.Fragment>

      {(() => {
        if (isLoggedIn && page !== "authAddDetails") {
          return (
            <AuthAddDetails
              user={user}
              authHandler={authHandler}
            />
          );
          // return (<Box
          //   flexDirection="column"
          //   margin="480px 10% 0px 10%"
          //   position="relative"
          //   zIndex={9999}
          // >
          //   <Button
          //     variant="white"
          //     width="max"
          //     text="Abmelden"
          //     onClick={authHandler?.signOut}
          //   />
          // </Box>)
        }
        if (
          page === "authEmail" ||
          page === "authEmailRegister" ||
          page === "authResetEmail"
        ) {
          return (
            <AuthEmail
              setPage={setPage}
              authHandler={authHandler}
              errorMessage={errorMessage}
              formikStore={formikStore}
              variant={page === "authEmailRegister" ? "register" : "login"}
            />
          );
        }
        if (page === "authVerifyEmail") {
          return <AuthVerifyEmail />;
        }
        if (page === "authAddDetails") {
          return (
            <AuthAddDetails
              user={user}
              authHandler={authHandler}
            />
          );
        }
        return (
          <AuthOptions
            authHandler={authHandler}
            formikStore={formikStore}
            setPage={setPage}
            errorMessage={errorMessage}
          />
        );
      })()}
    </Wrapper>
  );
};

export default Auth;
