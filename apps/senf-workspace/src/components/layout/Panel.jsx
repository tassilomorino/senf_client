import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import {
  Icon,
  Input,
  Typography,
  FlexWrapper,
} from "senf-atomic-design-system";
import { useTranslation } from "react-i18next";
import InboxContainer from "../InboxContainer";
import WorkspaceContainer from "../WorkspaceContainer";

const Wrapper = styled.div`
  margin-top: 0px;
  border-right: 2px solid ${({ theme }) => theme.colors.beige.beige10};
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  position: absolute;
  overflow-y: auto;
  width: 330px;
  height: 100%;
  top: 0;
  left: 70px;
`;

const Panel = ({
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
  return (
    <Wrapper>
      <Navbar currentWorkspace={currentWorkspace} />
      {currentWorkspace !== "Meine Nachrichten" && (
        <WorkspaceContainer
          currentWorkspace={currentWorkspace}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          users={users}
          selectFoundUser={selectFoundUser}
          newChat={newChat}
          selectUser={selectUser}
          user={user}
          user1={user1}
          chat={chat}
        />
      )}
      <InboxContainer
        currentWorkspace={currentWorkspace}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        users={users}
        selectFoundUser={selectFoundUser}
        newChat={newChat}
        selectUser={selectUser}
        user={user}
        user1={user1}
        chat={chat}
      />
    </Wrapper>
  );
};

export default Panel;
