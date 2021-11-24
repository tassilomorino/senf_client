/** @format */

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import MainDialog from "../../atoms/Layout/MainDialog";
import CreateProjectPage1 from "./CreateProjectPage1";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

const InnerWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const CreateProjectDialog = ({
  setCreateProjectDialogIsOpen,
  isCreateProjectDialogIsOpen,
}) => {
  const { t } = useTranslation();
  const [outsideClick, setOutsideClick] = useState(false);

  const outerRef = useRef();
  useOnClickOutside(outerRef, () => {
    setOutsideClick(true);
  });

  const createProjectValidationSchema = yup.object({
    projectRoom_name: yup
      .string()
      .required(t("enter_email"))
      .min(3, t("username_too_short"))
      .max(20, t("username_too_long")),

    projectRoom_description: yup
      .string()
      .required(t("enter_email"))
      .min(100, t("username_too_short"))
      .max(1000, t("username_too_long")),
  });

  const formikCreateProjectStore = useFormik({
    initialValues: {
      projectRoom_name: "",
      password: "",
    },
    validationSchema: createProjectValidationSchema,
    isInitialValid: false,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <div ref={outerRef}>
      <MainDialog
        setIsOpen={setCreateProjectDialogIsOpen}
        isOpen={isCreateProjectDialogIsOpen}
      >
        <CustomIconButton
          name="Close"
          position="fixed"
          margin={document.body.clientWidth > 768 ? "40px" : "10px"}
          left="0"
          handleButtonClick={() => setCreateProjectDialogIsOpen(false)}
        />
        <InnerWrapper>
          <CreateProjectPage1
            formik={formikCreateProjectStore}
            outsideClick={outsideClick}
            setOutsideClick={setOutsideClick}
          />
        </InnerWrapper>
      </MainDialog>
    </div>
  );
};

export default CreateProjectDialog;
