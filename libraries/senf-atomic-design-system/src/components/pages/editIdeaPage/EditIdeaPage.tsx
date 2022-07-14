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
import Dialog from "../../molecules/dialog/Dialog";
import SwipeModal from "../../molecules/modals/SwipeModal";
import EditIdea from "../../templates/editIdea/EditIdea";
import { EditIdeaPageProps } from "./EditIdeaPage.types";

const Wrapper = styled.div<EditIdeaPageProps>`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const InnerWrapper = styled.div<EditIdeaPageProps>`
  top: 0px;
  position: sticky;
  width: 100%;
  height: calc(100% - 400px);
  overflow: hidden;
`;

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
    >
      <Wrapper>
        <Wave color={theme.colors.beige.beige20} top="0px" />

        <Box position="absolute" top="0px" margin="10px">
          <RoundedButton
            icon={<Plus transform="rotate(45deg)" />}
            // onClick={ handleClose}
          />
        </Box>
        <InnerWrapper>
          <EditIdea />
        </InnerWrapper>

        <Box position="absolute" bottom="0px" gap="8px" margin="10px">
          <Button
            variant="white"
            onClick={() => setEditOpen(false)}
            text={t("cancel")}
          />
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={data?.title === "" || data?.body === ""}
            text={t("save")}
          />
        </Box>
      </Wrapper>
    </SwipeModal>
  );
};

export default EditIdeaPage;
