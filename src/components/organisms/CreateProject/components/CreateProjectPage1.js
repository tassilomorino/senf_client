/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { createProjectSaveData } from "../../../../redux/actions/formDataActions";

const Title = styled.h2`
  font-family: PlayfairDisplay-Bold;
  font-size: 22px;
  font-weight: 100;
  color: #353535;
  align-self: center;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const CreateProjectPage1 = ({ outsideClick, onClickNext }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.user.organization);

  const [projectRoom_name, setProjectRoom_name] = useState(null);

  const createProjectFormData = useSelector(
    (state) => state.formData.createProjectFormData
  );

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

  const formik = useFormik({
    initialValues: {
      projectRoom_name: "",
      projectRoom_description: "",
    },
    validationSchema: createProjectValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    if (createProjectFormData) {
      setProjectRoom_name(createProjectFormData.projectRoom_name);

      formik.setFieldValue(
        "projectRoom_name",
        createProjectFormData.projectRoom_name
      );
      formik.setFieldValue(
        "projectRoom_description",
        createProjectFormData.projectRoom_description
      );
    }
  }, []);

  const handleNext = () => {
    var createProjectFormDataPage1 = {
      ...createProjectFormData,
      projectRoom_name: formik.values.projectRoom_name,
      projectRoom_description: formik.values.projectRoom_description,
    };

    // if (
    //   createProjectFormData &&
    //   createProjectFormData.projectRoom_name &&
    //   createProjectFormData.imgUrl
    // ) {
    //   console.log("ddownloaf image");
    //   const underscoreProjectNameOld = createProjectFormData.projectRoom_name
    //     .split(" ")
    //     .join("_");
    //   const fileNameOld = organization + ":_" + underscoreProjectNameOld;

    //   const storageRef = firebase.storage().ref();
    //   storageRef
    //     .child(`projectRoomThumbnails/${fileNameOld}/thumbnail`)
    //     .getDownloadURL()
    //     .then(onResolve, onReject);

    //   function onResolve(foundURL) {
    //     dispatch(createProjectSaveData(createProjectFormDataPage1));

    //     const underscoreProjectNameNew =
    //       createProjectFormDataPage1.projectRoom_name.split(" ").join("_");
    //     const fileNameNew = organization + ":_" + underscoreProjectNameNew;

    //     storageRef
    //       .child(`projectRoomThumbnails/${fileNameNew}/thumbnail`)
    //       .put(foundURL)
    //       .then(() => {
    //         console.log("upload image", fileNameOld, fileNameNew);
    //         onClickNext();
    //       });
    //   }

    //   function onReject(error) {
    //     dispatch(createProjectSaveData(createProjectFormDataPage1));

    //     console.log(error.code);
    //     //No Photo specified
    //     onClickNext();
    //   }
    // }

    onClickNext();
  };

  return (
    <div>
      <Title>
        {projectRoom_name ? (
          <span>Infos zu "{projectRoom_name}" bearbeiten</span>
        ) : (
          <span>
            Erstelle deinen <br />
            Projektraum
          </span>
        )}
      </Title>
      <TextField
        id="outlined-name"
        name="projectRoom_name"
        type="projectRoom_name"
        label={t("projectRoom_name")}
        margin="normal"
        variant="outlined"
        multiline
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "80%",
        }}
        value={formik.values.projectRoom_name}
        onChange={formik.handleChange}
        error={outsideClick && Boolean(formik.errors.projectRoom_name)}
        helperText={outsideClick && formik.errors.projectRoom_name}
      />
      <TextField
        id="outlined-name"
        name="projectRoom_description"
        type="projectRoom_description"
        label={t("projectRoom_description")}
        margin="normal"
        multiline
        minRows="10"
        maxRows="12"
        variant="outlined"
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "80%",
        }}
        value={formik.values.projectRoom_description}
        onChange={formik.handleChange}
        error={outsideClick && Boolean(formik.errors.projectRoom_description)}
        helperText={outsideClick && formik.errors.projectRoom_description}
      />

      <SubmitButton
        text={t("next")}
        zIndex="9"
        backgroundColor="white"
        textColor="#353535"
        position="relative"
        top={document.body.clientWidth > 768 ? "100px" : "70px"}
        left="0"
        handleButtonClick={handleNext}
        // disabled={!formikCreateProjectStore.isValid}
        //   keySubmitRef={keySubmitRef}
      />
    </div>
  );
};

export default CreateProjectPage1;
