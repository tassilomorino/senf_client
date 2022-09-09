/** @format */
import { useTranslation } from "react-i18next";

export function OptionsSurveys() {
  const { t } = useTranslation();

  return [
    { name: "feedback", label: t("feedback") },
    { name: "gatherInput", label: t("gatherInput") },
    { name: "whatever", label: t("whatever") },
  ];
}
