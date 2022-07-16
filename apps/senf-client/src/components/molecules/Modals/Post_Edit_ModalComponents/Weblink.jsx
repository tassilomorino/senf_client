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

const Weblink = ({
  formik,
  weblinkOpen,
  setWeblinkOpen,
  handleCloseWeblink,
  handleSaveWeblink,
}) => {
  const { t } = useTranslation();
  return (
    <SwipeModal
      zIndex={9999999999}
      openModal={weblinkOpen}
      setOpenModal={setWeblinkOpen}
      backgroundColor="#f9f1d7"
    >
      <Box margin="20px" flexDirection="column">
        <Typography variant="h2" textAlign="center">
          Kontaktdaten öffentlich zeigen
        </Typography>

        <Box flexDirection="column" gap="20px" margin="20px 0px 100px 0px">
          <Input
            key="weblinkTitle"
            id="weblinkTitle"
            name="weblinkTitle"
            type="textarea"
            placeholder={t("add_weblinkTitle")} // https://www...
            label={t("weblinkTitle")}
            rows={1}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            value={formik?.values.weblinkTitle}
          />
          <Input
            key="weblink"
            id="weblink"
            name="weblink"
            type="textarea"
            placeholder={t("add_weblink")}
            label={t("weblink")}
            rows={1}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            value={formik?.values.weblink}
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
            onClick={handleCloseWeblink}
            text={
              formik?.values.weblink !== null &&
              formik?.values.weblinkTitle !== null
                ? t("delete")
                : t("cancel")
            }
          />
          <Button
            variant="primary"
            fillWidth="max"
            onClick={handleSaveWeblink}
            disabled={
              formik?.values.weblink === null ||
              formik?.values.weblinkTitle === null
            }
            text={t("save")}
          />
        </Box>
      </Box>
    </SwipeModal>
  );
};

export default Weblink;
