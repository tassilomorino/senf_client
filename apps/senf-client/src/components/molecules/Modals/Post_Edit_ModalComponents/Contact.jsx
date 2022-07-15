/** @format */

import React from "react";

// REDUX Stuff
import { useTranslation } from "react-i18next";
import {
  Typography,
  Box,
  Input,
  Button,
  Modal,
} from "senf-atomic-design-system";

const Contact = ({
  contact,
  contactTitle,
  setContact,
  setContactTitle,
  contactOpen,
  setContactOpen,
  handleCloseContact,
  handleSaveContact,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      zIndex={9999999999}
      openModal={contactOpen}
      setOpenModal={setContactOpen}
      backgroundColor="#f9f1d7"
    >
      <Box margin="10px" flexDirection="column">
        <Typography variant="h2" textAlign="center">
          Kontaktdaten öffentlich zeigen
        </Typography>

        <Box flexDirection="column" gap="20px" margin="20px 0px 100px 0px">
          <Input
            key="contactTitle"
            id="contactTitle"
            name="contactTitle"
            type="textarea"
            placeholder={t("add_contactTitle")}
            label={t("contactTitle")}
            rows={1}
            onChange={(event) => setContactTitle(event.target.value)}
            value={contactTitle}
          />
          <Input
            key="contact"
            id="contact"
            name="contact"
            type="textarea"
            placeholder={t("add_contact")}
            label={t("contact-address")}
            rows={1}
            onChange={(event) => setContact(event.target.value)}
            value={contact}
          />
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
    </Modal>
  );
};

export default Contact;
