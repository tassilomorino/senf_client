/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import Plus from "../../../assets/icons/Plus";
import theme from "../../../styles/theme";
import Box from "../../atoms/box/Box";
import RoundedButton from "../../atoms/buttons/RoundedButton";
import Wave from "../../atoms/shapes/Wave";
import Dialog from "../../molecules/dialog/Dialog";
import EditIdea from "../../templates/editIdea/EditIdea";
import { EditIdeaPageProps } from "./EditIdeaPage.types";

const InnerWrapper = styled.div<EditIdeaPageProps>`
  margin-top: 50px;
  height: calc(100% - 50px);
`;

const EditIdeaPage: FC<EditIdeaPageProps> = ({ text }) => (
  <Dialog
    openDialog={true}
    right="0px"
    backgroundColor={theme.colors.primary.primary100}
    overflow="hidden scroll"
    zIndex="999"
    boxShadow={
      document.body.clientWidth < 1350 &&
      document.body.clientWidth > 768 &&
      "-40px 8px 30px -12px rgba(0, 0, 0, 0.2)"
    }
  >
    <Wave color={theme.colors.beige.beige20} top="0px" />

    <Box position="absolute" top="0px" margin="10px">
      <RoundedButton
        icon={<Plus transform="rotate(45deg)" />}
        // onClick={ handleClose}
      />
    </Box>
    <EditIdea />
  </Dialog>
);

export default EditIdeaPage;
