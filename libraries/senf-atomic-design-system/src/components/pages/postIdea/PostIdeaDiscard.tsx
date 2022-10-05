import React from "react";
import { useTranslation } from "react-i18next";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import Typography from "../../atoms/typography/Typography";

export default function PostIdeaDiscard() {
  const { t } = useTranslation();
  return (
    <Box
      height="auto"
      flexDirection="column"
      margin="16px 20px 20px 16px"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        flexDirection="column"
        gap="8px"
        marginTop="16px"
        alignItems="center"
      >
        <Typography variant="buttonBg">{t("postIdeaDiscard_title")}</Typography>

        <Typography variant="bodySm">
          {t("postIdeaDiscard_inputDiscarted")}.
        </Typography>
      </Box>
      <Box
        marginTop="20px"
        flexDirection="column"
      >
        <Button
          variant="white"
          width="max"
        >
          {t("cancel")}
        </Button>
        <Button
          variant="tertiary"
          width="max"
        >
          {t("exit_and_discard")}
        </Button>
      </Box>
    </Box>
  );
}
