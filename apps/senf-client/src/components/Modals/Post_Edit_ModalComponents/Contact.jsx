/** @format */

import React, { useState } from "react";

// REDUX Stuff
import { useTranslation } from "react-i18next";
import { ActionModal, Input } from "senf-atomic-design-system";

const Contact = ({
  formik,
  contactOpen,
  setContactOpen,
  handleCloseContact,
  handleSaveContact,
}) => {
  const { t } = useTranslation();
  return (
    <ActionModal
      title={t("contactModalTitle")}
      openModal={contactOpen}
      setOpenModal={setContactOpen}
      handleClose={handleCloseContact}
      handleSave={handleSaveContact}
      disabledSaveButton={
        formik?.values.contact === null || formik?.values.contactTitle === null
      }
      cancelButtonText={
        formik?.values.contact !== null && formik?.values.contactTitle !== null
          ? t("delete")
          : t("cancel")
      }
      saveButtonText={t("save")}
    >
      <Input
        key="contactTitle"
        id="contactTitle"
        name="contactTitle"
        type="textarea"
        placeholder={t("add_contactTitle")}
        label={t("contactTitle")}
        rows={1}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        value={formik?.values.contactTitle}
      />
      <Input
        key="contact"
        id="contact"
        name="contact"
        type="textarea"
        placeholder={t("add_contact-address")}
        label={t("contact-address")}
        rows={1}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        value={formik?.values.contact}
      />
    </ActionModal>
  );
};

export default Contact;
