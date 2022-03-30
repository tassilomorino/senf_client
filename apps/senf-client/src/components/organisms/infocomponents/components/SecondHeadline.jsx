import React from "react";
import styled from "styled-components";

const Text = styled.div`
  font-size: 40px;
  color: white;
  text-align: center;
  font-weight: 700;
  z-index: 99;
  position: sticky;
  top: 50px;
  margin-top: -70px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;
const SecondHeadline = ({ visible }) => {
  return (
    <Text visible={visible}>
      Gib deinen <br /> Senf dazu!
    </Text>
  );
};

export default SecondHeadline;
