import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { StyledH3 } from "../../../../styles/GlobalStyle";
const Wrapper = styled.div`
  height: 300px;
  width: 100vw;
  padding-bottom: 250px;

  z-index: 9999;
  position: relative;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Keyword = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: max-content;
  padding: 0px 20px;
  background-color: ${(props) => props.color};
  border-radius: 25px;
  left: ${(props) => props.left};
  position: relative;

  h3 {
    font-size: 30px;
    color: white;
  }
`;
const Keywords = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Keyword color="#e69081" id="keyword1" left="-100%">
        <h3>{t("intuitive")}</h3>
      </Keyword>
      <Keyword color="#BD9BF4" id="keyword2" left="150%">
        <h3>{t("transparent")}</h3>
      </Keyword>
      <Keyword color="#90D8B9" id="keyword3" left="-200%">
        <h3>{t("diverse")}</h3>
      </Keyword>
    </Wrapper>
  );
};

export default Keywords;
