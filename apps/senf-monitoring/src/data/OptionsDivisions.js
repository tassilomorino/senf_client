/** @format */
import { useTranslation } from "react-i18next";

export function OptionsDivisions() {
  const { t } = useTranslation();

  return [
    { name: "cityplanning", label: t("cityplanning") },
    { name: "greenspace", label: t("greenspace") },
    { name: "anotherCoolDepartment", label: t("anotherCoolDepartment") },
  ];
}
