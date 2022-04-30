import React from "react";
import styled from "styled-components";
import Attachment from "./svg/Attachment";
import { Icon, Button, Input } from "senf-atomic-design-system";
const Form = styled.form`
  position: sticky;
  height: 60px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  bottom: -1px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 5px;
  flex-grow: 1;
`;
const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Button variant="secondary">
        <label htmlFor="img">
          <Attachment />
        </label>
      </Button>
      <input
        onChange={(e) => setImg(e.target.files[0])}
        type="file"
        id="img"
        accept="image/*"
        style={{ display: "none" }}
      />

      <div style={{ width: "inherit" }}>
        <Input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <Button variant="primary">Send</Button>
    </Form>
  );
};

export default MessageForm;
