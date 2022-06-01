import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import {
  Icon,
  Input,
  Typography,
  Box,
  Divider,
} from "senf-atomic-design-system";
import User from "./User";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  margin-top: 0px;
  border-right: 3px solid ${({ theme }) => theme.colors.beige.beige10};
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  position: absolute;
  overflow-y: auto;
  width: 330px;
  height: 100%;
  top: 0;
  left: 70px;
`;

const Group = styled.div`
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.brown.brown7 : undefined};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WorkspaceContainer = ({
  currentWorkspace,
  searchTerm,
  setSearchTerm,
  users,
  selectFoundUser,
  newChat,
  selectUser,
  user,
  user1,
  chat,
}) => {
  const { t } = useTranslation();

  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <React.Fragment>
      <Box
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        margin="10px 10px 0px 10px"
      >
        <Typography variant="buttonBg">Organisation</Typography>
      </Box>

      <Group>
        <Icon icon="Politik" />
        <Typography variant="buttonBg"> Verantwortlichkeiten</Typography>
      </Group>
      <Group>
        <Icon icon="Presse" />
        <Typography variant="buttonBg"> To-Do List</Typography>
      </Group>

      <Divider />

      <Box
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        margin="10px 10px 0px 10px"
      >
        <Typography variant="buttonBg">Gruppen</Typography>
      </Box>

      <Group>
        <Icon icon="Initiativen" transform="scale(1)" />
        <Typography variant="buttonBg"> Allgemein</Typography>
      </Group>
      <Group>
        <Icon icon="Planungsbüros" transform="scale(1)" />
        <Typography variant="buttonBg"> Planung</Typography>
      </Group>

      <Divider />

      <Box
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        margin="10px 10px 0px 10px"
      >
        <Typography variant="buttonBg">Direktnachrichten</Typography>
      </Box>
    </React.Fragment>
  );
};

export default WorkspaceContainer;
