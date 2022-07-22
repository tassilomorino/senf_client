/** @format */

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Plus from "../../../assets/icons/Plus";
import theme from "../../../styles/theme";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import RoundedButton from "../../atoms/buttons/RoundedButton";
import Wave from "../../atoms/shapes/Wave";
import SwipeModal from "../../molecules/modals/SwipeModal";
import EditIdea from "../../templates/editIdea/EditIdea";
import { EditIdeaPageProps } from "./EditIdeaPage.types";

const EditIdeaPage: FC<EditIdeaPageProps> = ({
  data,
  editOpen,
  setEditOpen,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  return (
    <SwipeModal
      openModal={editOpen}
      setOpenModal={setEditOpen}
      zIndex={9999999999}
      overflow="hidden"
      backgroundColor={theme.colors.primary.primary100}
    >
      <Wave color={theme.colors.beige.beige20} top="0px" />

      <Box position="absolute" top="0px" margin="10px" zIndex={99}>
        <RoundedButton
          icon={<Plus transform="rotate(45deg)" />}
          onClick={() => setEditOpen(false)}
        />
      </Box>
      <EditIdea />

      <Box
        position="absolute"
        bottom="0px"
        width="calc(100% - 20px)"
        gap="8px"
        margin="10px"
      >
        <Button
          variant="white"
          fillWidth="max"
          onClick={() => setEditOpen(false)}
          text={t("cancel")}
        />
        <Button
          variant="primary"
          fillWidth="max"
          onClick={handleSubmit}
          disabled={data?.title === "" || data?.body === ""}
          text={t("save")}
        />
      </Box>
    </SwipeModal>
  );
};

export default EditIdeaPage;
