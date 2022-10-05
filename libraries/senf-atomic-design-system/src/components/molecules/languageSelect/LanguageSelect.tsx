/** @format */

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelectProps } from "./LanguageSelect.types";
import DropdownButton from "../../atoms/contentDropdown/DropdownButton";

const locales = {
  de: { nativeName: "🇩🇪 Deutsch", shortName: "DE" },
  en: { nativeName: "🇬🇧 English", shortName: "EN" },
};

const LanguageSelect: FC<LanguageSelectProps> = ({ direction }) => {
  const { i18n } = useTranslation();

  return (
    <DropdownButton
      variant="white"
      size="medium"
      width="height"
      text={locales[i18n.resolvedLanguage].shortName}
      options={{ direction, size: "md", closeOnSelect: true }}
      data={Object.keys(locales).map((locale) => ({
        checked: i18n.resolvedLanguage === locale,
        text: locales[locale].nativeName,
        onClick: () => i18n.changeLanguage(locale),
      }))}
    />
  );
};

export default LanguageSelect;
