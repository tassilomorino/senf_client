/** @format */
import { useTranslation } from "react-i18next";

export function OptionsRoles() {
  const { t } = useTranslation();

  return [
    { name: "moderator", label: t("moderator") },
    { name: "editor", label: t("editor") },
    { name: "viewer", label: t("viewer") },
  ];
}
