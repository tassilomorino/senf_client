import React from "react";
import { addDoc, collection } from "firebase/firestore";
import * as yup from "yup";
import {
  Button,
  Box,
  Dropdown,
  Input,
  ModalContext
} from "senf-atomic-design-system";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';
import { db } from "../firebase";
import { OptionsSurveys } from "../data/OptionsSurveys";



const CreateNewSurvey = ({ getSurveys }) => {
  const { handleModal } = React.useContext(ModalContext) || {};
  const { t } = useTranslation();
  const validationSchema = yup.object({
    title: yup
      .string()
      .required(t("enter_title"))
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      surveyType: null,
    },
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "surveys"), {
        title: formik.values.title,
        surveyType: formik.values.surveyType,
        createdAt: new Date().toISOString(),
      }).then((doc) => {
        getSurveys();

        const surveyId = doc.id;
        handleModal("pop")
      })

    } catch (error) {
      throw new Error(error, "Error in add exampleUser");
    }
  };

  return (
    <Box margin="0px" flexDirection="column" gap="20px">
      <Box zIndex="999">
        <Input
          name="title"
          type="text"
          placeholder={t("add_title")}
          label={t("add_title")}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values.title}
          error={formik?.touched.title && Boolean(formik?.errors.title)}
          note={formik?.touched.title && formik?.errors.title}
        />
      </Box>

      <Dropdown
        id="surveyType"
        label={t("surveyType")}
        initialValue={t("select_surveyType")}
        listItems={OptionsSurveys()}
        onChange={(event) => formik?.setFieldValue("surveyType", event?.target.value)}
      />

      <Button
        text="+ Create survey"
        onClick={handleSubmit}
        disabled={!formik.isValid}
      />
    </Box>
  );
};

export default CreateNewSurvey;
