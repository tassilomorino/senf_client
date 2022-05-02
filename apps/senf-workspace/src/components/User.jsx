import React, { useEffect, useState } from "react";
import Img from "../images/icons/icon-192.png";
import { onSnapshot, doc } from "@firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";
import { Typography, Icon, FlexWrapper } from "senf-atomic-design-system";

const UserCard = styled.div`
  margin-top: 2px;
  margin-bottom: 10px;
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
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, [user1, user2]);

  return (
    <UserCard
      selected={chat.handle === user.handle}
      onClick={() => selectUser(user)}
    >
      <FlexWrapper justifyContent="space-between" alignItems="center">
        <Avatar src={user.avatar || Img} alt="avatar" />

        <div>
          <Typography variant="h3">{user.handle}</Typography>

          {data && (
            <Typography variant="bodySm" className="truncate">
              {data.from === user1 ? <Icon icon="bulb" /> : null}

              {data.text}
            </Typography>
          )}
        </div>

        <div style={{ marginLeft: "auto" }}>
          {data?.from !== user1 && data?.unread && <Icon icon="Sonstige" />}

          {/* {user.isOnline ? <Icon icon="bulb" /> : <Icon icon="bulb" />} */}
        </div>
      </FlexWrapper>
    </UserCard>
  );
};

export default User;
