/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import _ from "lodash";

export function OptionsStatus() {
  const { t } = useTranslation();

  return [
    { name: "None", label: "Offen" },
    { name: "Submitted", label: "Eingereicht" },
    {
      name: "Implemented",
      label: t("Bereits umgesetzt"),
    },
  ];
}
