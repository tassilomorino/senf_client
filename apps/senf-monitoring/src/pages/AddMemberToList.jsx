import React from "react";
import { addDoc, collection } from "firebase/firestore";
import * as yup from "yup";
import {
  Button,
  Box,
  Typography,
  Modal,
  Input,
} from "senf-atomic-design-system";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { db } from "../firebase";

const AddMemberToList = ({ openModal, setOpenModal }) => {
  const { t } = useTranslation();
  const addMemberValidationSchema = yup.object({
    email: yup
      .string()
      .required(t("enter_email"))
      .email(t("enter_valid_email")),

    handle: yup
      .string()
      .required(t("enter_username"))
      .min(3, t("username_too_short"))
      .max(20, t("username_too_long"))
      .matches(/^\S*$/, t("spaces_username"))
      .matches(/^[a-zA-Z0-9\-\_\.]*$/, t("username_latin_only")),

    division: yup
      .string(),

    role: yup
      .string(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      handle: "",
      division: "",
      role: "",
    },
    validationSchema: addMemberValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => console.log("values"),
  });

  const handleAddMember = async () => {
    try {
      await addDoc(collection(db, "exampleUsers"), {
        handle: formik.values.handle,
        email: formik.values.email,
        division: formik.values.division,
        role: formik.values.role,
        createdAt: new Date().toISOString(),
      }).then(() => {
        setOpenModal(false);
      });
    } catch (error) {
      throw new Error(error, "Error in add exampleUser");
    }
  };
  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      zIndex="999999999"
      backgroundColor="beige"
      size={"m"}
    >
      <Box margin="20px" flexDirection="column" gap="20px">
        <Typography variant="h2"> Add User to List</Typography>
        <Input
          key="handle"
          id="handle"
          name="handle"
          placeholder="Moritz_müller"
          label="username"
          rows={1}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values.handle}
          error={formik?.touched.handle && Boolean(formik?.errors.handle)}
          note={formik?.touched.handle && formik?.errors.handle}
        />
        <Input
          key="email"
          id="email"
          name="email"
          placeholder="example@mail.com"
          label="email"
          rows={1}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values.email}
          error={formik?.touched.email && Boolean(formik?.errors.email)}
          note={formik?.touched.email && formik?.errors.email}
        />
        <Input
          key="division"
          id="division"
          name="division"
          placeholder="Stadtrat"
          label="division"
          rows={1}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values.division}
          error={formik?.touched.division && Boolean(formik?.errors.division)}
          note={formik?.touched.division && formik?.errors.division}
        />
        <Input
          key="role"
          id="role"
          name="role"
          placeholder="Moderator"
          label="role"
          rows={1}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values.role}
          error={formik?.touched.role && Boolean(formik?.errors.role)}
          note={formik?.touched.role && formik?.errors.role}
        />
        <Button
          text="add a member without invitation"
          onClick={handleAddMember}
          disabled={!formik.isValid}
        />
      </Box>
    </Modal>
  );
};

export default AddMemberToList;
