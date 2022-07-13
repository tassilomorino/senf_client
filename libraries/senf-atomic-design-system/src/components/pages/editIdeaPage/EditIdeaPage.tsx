/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import Dialog from "../../molecules/dialog/Dialog";
import EditIdea from "../../templates/editIdea/EditIdea";
import { EditIdeaPageProps } from "./EditIdeaPage.types";

const Wrapper = styled.div<EditIdeaPageProps>``;

const EditIdeaPage: FC<EditIdeaPageProps> = ({ text }) => (
  <Dialog
    openDialog={true}
    right="0px"
    backgroundColor={theme.colors.beige.beige20}
    overflow="hidden scroll"
    zIndex="999"
    boxShadow={
      document.body.clientWidth < 1350 &&
      document.body.clientWidth > 768 &&
      "-40px 8px 30px -12px rgba(0, 0, 0, 0.2)"
    }
  >
    <EditIdea />
  </Dialog>
);

export default EditIdeaPage;
