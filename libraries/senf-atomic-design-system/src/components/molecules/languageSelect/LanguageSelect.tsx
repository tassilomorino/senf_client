/** @format */

import React, { FC, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { LanguageSelectProps } from "./LanguageSelect.types";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import ContentDropdown from "../../atoms/contentDropdown/ContentDropdown";

const locales = {
  de: { nativeName: "🇩🇪 Deutsch", shortName: "DE" },
  en: { nativeName: "🇬🇧 English", shortName: "EN" },
};

const Wrapper = styled.div<LanguageSelectProps>``;

const LanguageSelect: FC<LanguageSelectProps> = ({ text, direction }) => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };

  return (
    <ContentDropdown
      open={dropdownOpen}
      setOpen={setDropdownOpen}
      openButtonWidth="36px"
      direction={direction}
      OpenButton={
        <Button
          variant="white"
          size="medium"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          text={Object.keys(locales).map(
            (lng) => i18n.resolvedLanguage === lng && locales[lng].shortName
          )}
        />
      }
      size="md"
      data={
        Object.keys(locales).map((locale) => ({
          checked: i18n.resolvedLanguage === locale,
          text: locales[locale].nativeName,
          onClick: () => handleChangeLanguage(locale)
        }))
      }
    />
  );
};

export default LanguageSelect;
