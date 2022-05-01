import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import { Input, Typography } from "senf-atomic-design-system";
import User from "../User";
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
  border-bottom: 2px solid white;
`;

const InboxContainer = ({
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
    <Wrapper>
      <Navbar currentWorkspace={currentWorkspace} />
      <Typography variant="buttonBg">Gruppen</Typography>

      <Group>
        <Typography variant="buttonBg"> # Allgemein</Typography>
      </Group>
      <Group>
        <Typography variant="buttonBg"># Planung</Typography>
      </Group>
      <Typography variant="buttonBg">Direktnachrichten</Typography>

      {searchOpen && (
        <Input
          type="text"
          value={searchTerm}
          placeholder={t("search_for_people")}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      )}
      {searchTerm ? (
        <div className="users_search">
          {users
            .filter((val) => {
              if (
                val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
              ) {
                return val;
              } else {
                return "";
              }
            })
            .map((val, key) => {
              return (
                <div
                  className="found_user"
                  key={key}
                  onClick={() => selectFoundUser(val)}
                >
                  <p>{val.name}</p>
                </div>
              );
            })}
        </div>
      ) : null}
      {newChat ? (
        <User
          key={newChat.userId}
          user={newChat}
          selectUser={selectUser}
          user1={user1}
          chat={chat}
        />
      ) : null}
      {users
        .filter((val) => {
          if (
            user.interactedUsers &&
            user.interactedUsers.indexOf(val.userId) > -1
          ) {
            return val;
          } else {
            return "";
          }
        })
        .map((user) => (
          <User
            key={user.userId}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
    </Wrapper>
  );
};

export default InboxContainer;
