import React from "react";
import { addDoc, collection } from "firebase/firestore";
import * as yup from "yup";
import {
  Button,
  Box,
  Dropdown,
  Input,
  useModals
} from "senf-atomic-design-system";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { db } from "../../firebase";




const AddNewDivison = ({ getDivisions, navigate }) => {
  const { closeModal } = useModals();
  const { t } = useTranslation();
  const currentMonitoringBoard = useSelector(state => state.data.currentMonitoringBoard)
  const validationSchema = yup.object({
    title: yup
      .string()
      .required(t("enter_title"))
  });

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, `monitoringBoards/${currentMonitoringBoard.monitoringBoardId}/divisions`), {
        title: formik.values.title,
        createdAt: new Date().toISOString(),
      }).then((doc) => {
        getDivisions();

        const surveyId = doc.id;
        navigate(`edit/${surveyId}`)
        closeModal()
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


      <Button
        text="+ Add diviosion"
        onClick={handleSubmit}
        disabled={!formik.isValid}
      />
    </Box>
  );
};

export default AddNewDivison;
