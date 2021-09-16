/** @format */
import { useTranslation } from "react-i18next";

export function OptionsTopics() {
  const { t } = useTranslation();

  return [
    { name: "Versorgung", label: t("topics_care") },
    { name: "Verkehr", label: t("topics_traffic") },
    {
      name: "Umwelt und Grün",
      label: t("topics_ecoAndGreen"),
    },
    {
      name: "Rad",
      label: t("topics_bike"),
    },
    {
      name: "Inklusion / Soziales",
      label: t("topics_inclusionAndSocial"),
    },
    {
      name: "Sport / Freizeit",
      label: t("topics_sportsAndLeisure"),
    },
    { name: "Sonstige", label: t("topics_other") },
  ];
}
