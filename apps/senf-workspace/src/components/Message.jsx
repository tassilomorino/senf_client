import React, { useRef, useEffect } from "react";
import styled from "styled-components";
//import Moment from 'react-moment'
import { Typography } from "senf-atomic-design-system";
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.primary100};
  width: max-content;
  margin-top: 5px;
  padding: 10px;
  border-radius: ${({ theme }) => theme.radii[1]}px;
  align-self: ${({ own }) => (own ? "flex-end" : "flex-start")};

  img {
    width: 100%;
    border-radius: 5px;
  }
`;
const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  return (
    <Wrapper own={msg.from === user1} ref={scrollRef}>
      <Typography variant="bodyBg">
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        {msg.text}
        <br />
        <small>
          {/*    <Moment fromNow>{msg.createdAt.toDate()}</Moment> */}
        </small>
      </Typography>
    </Wrapper>
  );
};

export default Message;
