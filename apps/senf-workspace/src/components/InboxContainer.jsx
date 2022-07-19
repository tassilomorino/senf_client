import React, { useState } from "react";
import styled from "styled-components";
import {
  Icon,
  Input,
  Typography,
  Box,
  Divider,
} from "senf-atomic-design-system";
import { useTranslation } from "react-i18next";
import User from "./User";

const Group = styled.div`
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.brown.brown7 : undefined};
  border-bottom: 2px solid white;
  display: flex;
  gap: 10px;
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
    <React.Fragment>
      <Box flexDirection="column" margin="10px 10px 0px 10px">
        <Input
          type="text"
          value={searchTerm}
          placeholder={t("search_for_people")}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </Box>

      {searchTerm ? (
        <div className="users_search">
          {users
            .filter((val) => {
              console.log(val);
              if (
                val.handle
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              ) {
                return val;
              } 
                return "";
              
            })
            .map((val, key) => {
              return (
                <div
                  className="found_user"
                  key={key}
                  onClick={() => selectFoundUser(val)}
                >
                  <p>{val.handle}</p>
                </div>
              );
            })}
        </div>
      ) : null}

      <br />
      {newChat ? (
        <React.Fragment>
          <User
            key={newChat.userId}
            user={newChat}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />

          <Divider zIndex={2} />
        </React.Fragment>
      ) : null}
      {users
        .filter((val) => {
          if (
            user?.interactedUsers &&
            user.interactedUsers.indexOf(val.userId) > -1
          ) {
            return val;
          } 
          return "";
        })
        .map((user) => (
          <React.Fragment>
            <User
              key={user.userId}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
            />
            <Divider zIndex={2} />
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default InboxContainer;
