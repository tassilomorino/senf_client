import React from "react";
import styled from "styled-components";
import { Typography, TertiaryButton } from "senf-atomic-design-system";
import Message from "../Message";

import MessageForm from "../MessageForm";
import { isMobileCustom } from "../../util/customDeviceDetect";

const MessagesUserHeader = styled.div`
  padding: 10px;
  height: 70px;
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.white.white100};
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.primary.primary75};
  display: flex;
  align-items: center;
  gap: 10px;
`;
const CurrentMessageContainer = styled.div`
  position: sticky;
  top: 70px;
  width: 100%;
  height: calc(100% - 130px);
  background-color: ${({ theme }) => theme.colors.beige.beige10};
  overflow: scroll;
`;

const Messages = styled.div`
  padding: 70px 15px 70px 50px;
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = ({
  chat,
  selectUser,
  msgs,
  user1,
  handleSubmit,
  text,
  setText,
  setImg,
}) => {
  return (
    <React.Fragment>
      <MessagesUserHeader>
        {isMobileCustom && (
          <TertiaryButton
            iconLeft="arrow"
            iconLeftTransform="rotate(90)"
            onClick={() => selectUser(null)}
          />
        )}
        <Typography variant="h3">{chat.handle}</Typography>
      </MessagesUserHeader>
      <CurrentMessageContainer>
        <Messages>
          {msgs.length
            ? msgs.map((msg, i) => (
                <Message
                  key={i}
                  msg={msg}
                  user1={user1}
                />
              ))
            : null}
        </Messages>
      </CurrentMessageContainer>
      <MessageForm
        handleSubmit={handleSubmit}
        text={text}
        setText={setText}
        setImg={setImg}
      />
    </React.Fragment>
  );
};

export default MessagesContainer;
