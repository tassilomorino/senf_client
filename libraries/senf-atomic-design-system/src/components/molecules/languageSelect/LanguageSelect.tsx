/** @format */

import React, { FC, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { LanguageSelectProps } from "./LanguageSelect.types";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import ContentDropdown from "../../atoms/contentDropdown/ContentDropdown";

const lngs = {
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
          size="small"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          text={Object.keys(lngs).map(
            (lng) => i18n.resolvedLanguage === lng && lngs[lng].shortName
          )}
        />
      }
      Content={
        <Box gap="5px" flexDirection="column">
          {Object.keys(lngs).map((lng) => (
            <Button
              key={lng}
              variant={i18n.resolvedLanguage === lng ? "primary" : "secondary"}
              size="small"
              text={lngs[lng].nativeName}
              onClick={() => handleChangeLanguage(lng)}
              // disabled={i18n.resolvedLanguage === lng}
            />
          ))}
        </Box>
      }
    />
  );
};

export default LanguageSelect;
