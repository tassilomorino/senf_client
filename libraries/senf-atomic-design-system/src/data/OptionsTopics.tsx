/** @format */
import { useTranslation } from "react-i18next";

export function OptionsTopics() {
  const { t } = useTranslation();

  return [
    { value: "Versorgung", label: t("topics_care"), color: "#bd98f6" },
    { value: "Verkehr", label: t("topics_traffic"), color: "#91dff4" },
    {
      value: "Umwelt und Grün",
      label: t("topics_ecoAndGreen"),
      color: "#8dd9b8",
    },
    {
      value: "Rad",
      label: t("topics_bike"),
      color: "#929df6",
    },
    {
      value: "Inklusion / Soziales",
      label: t("topics_inclusionAndSocial"),
      color: "#e8907e",
    },
    {
      value: "Sport / Freizeit",
      label: t("topics_sportsAndLeisure"),
      color: "#f6c095",
    },
    { value: "Sonstige", label: t("topics_other"), color: "#f9db95" },
  ];
}
