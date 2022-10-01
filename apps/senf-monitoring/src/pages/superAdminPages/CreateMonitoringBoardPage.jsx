import { addDoc, collection } from "firebase/firestore";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  ExpandMap,
  Input,
  useModals,
} from "senf-atomic-design-system";
import styled from "styled-components";
import * as yup from "yup";
import { db } from "../../firebase";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.greyscale.greyscale05};
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
`;

const CreateMonitoringBoardPage = ({ getMonitoringBoards }) => {
  const { t } = useTranslation();
  const { closeModal } = useModals();
  const [statefulMap, setStatefulMap] = useState(null);
  const [selectedMunicipalities, setSelectedMunicipalities] = useState([]);

  const initialMapViewport = {
    latitude: 50.96,
    longitude: 6.95,
    zoom: 9.2,
    duration: 0,
    pitch: 0,
  };
  const validationSchema = yup.object({
    title: yup.string().required(t("enter_title")),
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
    console.log(selectedMunicipalities);
    try {
      await addDoc(collection(db, "monitoringBoards"), {
        title: formik.values.title,
        createdAt: new Date().toISOString(),
        municipalities: selectedMunicipalities[0],
      }).then((doc) => {
        getMonitoringBoards();
        closeModal();
      });
    } catch (error) {
      throw new Error(error, "Error in add exampleUser");
    }
  };
  return (
    <Wrapper>
      <Box
        margin="20px auto"
        flexDirection="column"
        maxWidth="500px"
        gap="20px">
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

        <Box
          width="100%"
          justifyContent="center">
          <ExpandMap
            initialMapViewport={initialMapViewport}
            statefulMap={statefulMap}
            setStatefulMap={setStatefulMap}
            mapType="selectMunicipalities"
            selectedMunicipalities={selectedMunicipalities}
            setSelectedMunicipalities={setSelectedMunicipalities}
          />
        </Box>

        <Button
          text="+ Add Monitoring-Board"
          onClick={handleSubmit}
          disabled={!formik.isValid}
        />
      </Box>
    </Wrapper>
  );
};

export default CreateMonitoringBoardPage;
