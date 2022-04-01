/** @format */

import { useTranslation } from "react-i18next";

export function OptionsStatus() {
  const { t } = useTranslation();

  return [
    { name: "None", label: t("none") },
    { name: "Unprocessed", label: t("unprocessed") },
    { name: "Accepted", label: t("accepted") },
    {
      name: "Planning",
      label: t("planning"),
    },
    {
      name: "Implemented",
      label: t("implemented"),
    },
    {
      name: "Rejected",
      label: t("rejected"),
    },
  ];
}
