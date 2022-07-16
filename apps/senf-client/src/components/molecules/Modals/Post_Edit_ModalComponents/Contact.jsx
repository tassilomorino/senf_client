/** @format */

import React, { useState } from "react";

// REDUX Stuff
import { useTranslation } from "react-i18next";
import {
  Typography,
  Box,
  Input,
  Button,
  SwipeModal,
} from "senf-atomic-design-system";

const Contact = ({
  formik,
  onChange,
  onBlur,
  contact,
  contactTitle,
  setContact,
  setContactTitle,
  contactOpen,
  setContactOpen,
  handleCloseContact,
  handleSaveContact,
}) => {
  const [name, setName] = useState("hiii");
  const { t } = useTranslation();
  return (
    <SwipeModal
      zIndex={9999999999}
      openModal={contactOpen}
      setOpenModal={setContactOpen}
      backgroundColor="#f9f1d7"
    >
      <Box margin="20px" flexDirection="column">
        <Typography variant="h2" textAlign="center">
          Kontaktdaten öffentlich zeigen
        </Typography>

        <Box flexDirection="column" gap="20px" margin="20px 0px 100px 0px">
          <Input
            placeholder={t("add_contactTitle")}
            label={t("contactTitle")}
            onChange={(event) => console.log(event.target.value)}
            onBlur={onBlur}
            value={name}
          />
          {/* <Input
            key="contact"
            id="contact"
            name="contact"
            type="textarea"
            placeholder={t("add_contact")}
            label={t("contact-address")}
            rows={1}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            value={formik?.values.contact}
          /> */}
        </Box>
        <Box
          position="absolute"
          bottom="0px"
          width="calc(100% - 20px)"
          gap="8px"
          margin="10px"
        >
          <Button
            variant="white"
            fillWidth="max"
            onClick={handleCloseContact}
            text={
              contact !== null && contactTitle !== null
                ? t("delete")
                : t("cancel")
            }
          />
          <Button
            variant="primary"
            fillWidth="max"
            onClick={handleSaveContact}
            disabled={contact === null || contactTitle === null}
            text={t("save")}
          />
        </Box>
      </Box>
    </SwipeModal>
  );
};

export default Contact;
