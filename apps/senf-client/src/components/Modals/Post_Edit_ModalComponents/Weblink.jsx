/** @format */

import React, { useState } from "react";

// REDUX Stuff
import { useTranslation } from "react-i18next";
import { Input, ActionModal } from "senf-atomic-design-system";

const Weblink = ({
  formik,
  weblinkOpen,
  setWeblinkOpen,
  handleCloseWeblink,
  handleSaveWeblink,
}) => {
  const { t } = useTranslation();

  return (
    <ActionModal
      title={t("weblink_Modal_Title")}
      openModal={weblinkOpen}
      setOpenModal={setWeblinkOpen}
      handleClose={handleCloseWeblink}
      handleSave={handleSaveWeblink}
      /* disabledSaveButton={
         formik?.values.weblink === null ||
        formik?.values.weblink === "" ||
        formik?.values.weblinkTitle === null ||
        formik?.values.weblinkTitle === "" 
      } */
      cancelButtonText={
        /* formik?.values.weblink !== null ||
        formik?.values.weblink !== "" ||
        formik?.values.weblinkTitle !== null ||
        formik?.values.weblinkTitle !== ""
          ? t("delete")
          : */ t("cancel")
      }
      saveButtonText={t("save")}
    >
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
    </ActionModal>
  );
};

export default Weblink;
