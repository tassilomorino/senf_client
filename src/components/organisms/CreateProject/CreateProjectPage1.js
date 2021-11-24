/** @format */

import React from "react";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";

const CreateProjectPage1 = ({ formik, handleNext, outsideClick }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>Dein Projektraum</h2>
      <TextField
        id="outlined-name"
        name="projectRoom_name"
        type="projectRoom_name"
        label={t("projectRoom_name")}
        margin="normal"
        variant="outlined"
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
        rows="10"
        rowsMax="12"
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
        text={t("login")}
        zIndex="9"
        backgroundColor="white"
        textColor="#353535"
        position="relative"
        top={document.body.clientWidth > 768 ? "100px" : "70px"}
        left="0"
        handleButtonClick={handleNext}
        disabled={!formik.isValid}
        // keySubmitRef={keySubmitRef}
      />
    </div>
  );
};

export default CreateProjectPage1;
