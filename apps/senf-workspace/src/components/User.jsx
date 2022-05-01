import React, { useEffect, useState } from "react";
import Img from "../images/icons/icon-192.png";
import { onSnapshot, doc } from "@firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";
import { Typography } from "senf-atomic-design-system";

const UserCard = styled.div`
  margin-top: 2px;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;

  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.brown.brown7 : undefined};
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
    <>
      <UserCard
        selected={chat.handle === user.handle}
        onClick={() => selectUser(user)}
      >
        <div className="user_info">
          <div className="user_detail">
            <img src={user.avatar || Img} alt="avatar" className="avatar" />
            <Typography variant="h3">{user.handle}</Typography>
            {data?.from !== user1 && data?.unread && (
              <small className="unread">New</small>
            )}
          </div>
          <div
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </div>
        {data && (
          <Typography variant="bodySm" className="truncate">
            <strong>{data.from === user1 ? "Me:" : null}</strong>
            {data.text}
          </Typography>
        )}
      </UserCard>
      <div
        onClick={() => selectUser(user)}
        className={`sm_container ${
          chat.handle === user.handle && "selected_user"
        }`}
      >
        <img
          src={user.avatar || Img}
          alt="avatar"
          className="avatar sm_screen"
        />
      </div>
    </>
  );
};

export default User;
