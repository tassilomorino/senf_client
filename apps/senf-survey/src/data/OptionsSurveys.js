/** @format */
import { useTranslation } from "react-i18next";

export function OptionsSurveys() {
  const { t } = useTranslation();

  return [
    { value: "feedback", label: t("feedback") },
    { value: "gatherInput", label: t("gatherInput") },
    { value: "whatever", label: t("whatever") },
  ];
}
