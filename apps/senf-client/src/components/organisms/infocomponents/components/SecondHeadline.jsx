import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Text = styled.div`
  font-size: 50px;

  color: white;
  text-align: center;
  font-weight: 1000;
  z-index: 99;
  position: sticky;
  top: 50px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;
const SecondHeadline = ({ id, visible, textlines, marginTop }) => {
  const { t } = useTranslation();
  return (
    <Text visible={visible} marginTop={marginTop} id={id}>
      {textlines.map(({ text }) => (
        <span style={{ display: "block" }}>{t(text)} </span>
      ))}
    </Text>
  );
};

export default SecondHeadline;
