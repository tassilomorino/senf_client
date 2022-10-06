import React from "react";
import { useTranslation } from "react-i18next";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import Typography from "../../atoms/typography/Typography";

export default function PostIdeaDiscard({ closeModal, setPostIdeaOpen }) {
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

        <Typography
          variant="bodySm"
          textAlign="center"
        >
          {t("postIdeaDiscard_inputDiscarted")}.
        </Typography>
      </Box>
      <Box
        margin="20px 20px"
        flexDirection="column"
        width="100%"
        gap="8px"
      >
        <Button
          variant="secondary"
          width="max"
          size="medium"
          onClick={() => closeModal()}
        >
          {t("cancel")}
        </Button>
        <Button
          variant="primary" // @TODO: add variant "danger"
          width="max"
          size="medium"
          onClick={() => {
            closeModal();
            setPostIdeaOpen(false);
          }}
        >
          {t("exit_and_discard")}
        </Button>
      </Box>
    </Box>
  );
}
