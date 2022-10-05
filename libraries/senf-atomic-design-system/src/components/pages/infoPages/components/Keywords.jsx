import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { StyledH3 } from "../../../styles/GlobalStyle";
import { isMobileCustom } from "../../../util/customDeviceDetect";

const Wrapper = styled.div`
  height: 250px;
  width: 100vw;
  padding-bottom: ${(props) => (props.isMobileCustom ? "500px" : "1100px")};

  z-index: 9999;
  position: sticky;
  top: 250px;
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
    font-weight: 600;
  }
`;
const Keywords = () => {
  const { t } = useTranslation();
  return (
    <Wrapper isMobileCustom={isMobileCustom}>
      <Keyword
        color="#e69081"
        id="keyword1"
        left="-340px"
        // left={document.body.clientWidth > 768 ? "-30%" : "-100%"}
      >
        <h3>{t("intuitive")}</h3>
      </Keyword>
      <Keyword
        color="#BD9BF4"
        id="keyword2"
        left={document.body.clientWidth > 768 ? "1300px" : "560px"}
      >
        <h3>{t("transparent")}</h3>
      </Keyword>
      <Keyword
        color="#90D8B9"
        id="keyword3"
        left="-750px"
      >
        <h3>{t("diverse")}</h3>
      </Keyword>
    </Wrapper>
  );
};

export default Keywords;
