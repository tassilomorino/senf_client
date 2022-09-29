import React from "react";
import { LayerWhiteFirstDefault } from "senf-atomic-design-system";
import styled from "styled-components";

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  overflow: scroll;
`;
const StatusLog = () => {
  return (
    <Wrapper>
      Item <br /> <br /> <br /> <br /> <br /> Item <br /> <br /> <br /> <br />{" "}
      <br /> Item <br /> <br /> <br /> <br /> <br /> Item <br /> <br /> <br />{" "}
      <br /> <br /> Item <br /> <br /> <br /> <br /> <br /> Item <br /> Item{" "}
      <br /> <br /> <br /> <br /> <br /> Item
      <br /> <br /> <br /> <br /> <br /> Item <br /> <br /> <br /> <br /> <br />{" "}
      Item <br /> <br /> <br /> <br /> <br /> Item <br /> <br /> <br /> <br />{" "}
      <br /> Item <br /> Item <br /> <br /> <br /> <br /> <br /> Item <br />{" "}
      <br /> <br /> <br /> <br /> Item <br /> <br /> <br /> <br /> <br /> Item{" "}
      <br /> <br /> <br /> <br /> <br /> Item <br /> <br /> <br /> <br /> <br />{" "}
      Item <br /> Item <br />
    </Wrapper>
  );
};

export default StatusLog;
