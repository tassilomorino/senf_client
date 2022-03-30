import React from "react";
import { useTranslation } from "react-i18next";
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
const SecondHeadline = ({ visible, textlines }) => {
  const { t } = useTranslation();
  return (
    <Text visible={visible}>
      {textlines.map(({ text }) => (
        <span style={{ display: "block" }}>{t(text)} </span>
      ))}
    </Text>
  );
};

export default SecondHeadline;
