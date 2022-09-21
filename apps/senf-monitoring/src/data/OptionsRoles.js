/** @format */
import { useTranslation } from "react-i18next";

export function OptionsRoles() {
  const { t } = useTranslation();

  return [
    { value: "moderator", label: t("moderator") },
    { value: "editor", label: t("editor") },
    { value: "viewer", label: t("viewer") },
  ];
}
