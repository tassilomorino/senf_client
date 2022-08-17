import React, { useEffect, useState } from "react";
import { onSnapshot, doc } from "@firebase/firestore";
import styled from "styled-components";
import { Check, User as UserIcon, Typography, Icon, Box, Button } from "senf-atomic-design-system";
import { db } from "../firebase";
import Img from "../images/icons/icon-192.png";

const UserCard = styled.div`
  padding: 10px;
  cursor: pointer;

  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.beige.beige10 : undefined};
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;
const User = ({ user1, user, selectUser, chat }) => {
  const user2 = user?.userId;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const unsub = onSnapshot(
      doc(db, "workspace", "generalMessages", "lastMsg", id),
      (doc) => {
        setData(doc.data());
      }
    );
    return () => unsub();
  }, [user1, user2]);

  return (
    <UserCard
      selected={chat.handle === user.handle}
      onClick={() => selectUser(user)}
    >
      <Box justifyContent="space-between" alignItems="center">
        {/* <Avatar src={user.avatar || Img} alt="avatar" /> */}
        <Button variant="secondary" icon={<UserIcon />} />
        <Box margin="10px" flexDirection="column">
          <Typography variant="h3">{user.handle}</Typography>

          {data && (
            <Box gap="3px">
              {data.from === user1 ? (
                <Icon icon={<Check />} transform="scale(0.7)" />
              ) : null}
              <Typography variant="bodySm" className="truncate">
                {data.text}
              </Typography>
            </Box>
          )}
        </Box>
        <div style={{ marginLeft: "auto" }}>
          {data?.from !== user1 && data?.unread && <Icon icon="Sonstige" />}

          {/* {user.isOnline ? <Icon icon="bulb" /> : <Icon icon="bulb" />} */}
        </div>
      </Box>
    </UserCard>
  );
};

export default User;
