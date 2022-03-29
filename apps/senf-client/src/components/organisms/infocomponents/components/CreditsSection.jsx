import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { StyledH3, StyledText } from "../../../../styles/GlobalStyle";

const Cards = styled.article`
  width: 80vw;
  margin: -200px 10vw 100px 10vw;
`;

const Goosefoot = styled.span`
  color: #fed957;
  font-size: 150px;
  margin-left: 40%;
  transform: translateX(-50%);
`;
const creditsArray = [
  { text: "infoPage_credits_1", by: "Jan Pehoviak, KLuG e.V." },
];
const CreditsSection = () => {
  const { t } = useTranslation();
  return (
    <section>
      {creditsArray.map(({ text, by }) => (
        <Cards>
          <Goosefoot>„</Goosefoot>
          <StyledText textAlign="center">{t(text)}</StyledText>
          <StyledH3 textAlign="center" margin="20px 0px">
            {t(by)}
          </StyledH3>
        </Cards>
      ))}
    </section>
  );
};

export default CreditsSection;
