import { useTranslation } from "react-i18next";

export function OptionsStati() {
  const { t } = useTranslation();

  return [
    {
      value: "draftResolution",
      label: t("Beschlussvorlage"),
      icon: "Document",
    },
    { value: "statement", label: t("Stellungnahme") },
    { value: "internalNote", label: t("Interne Notiz") },
  ];
}
