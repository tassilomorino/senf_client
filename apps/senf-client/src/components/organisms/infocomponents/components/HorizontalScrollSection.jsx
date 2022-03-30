import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import SectionBackground from "../../../../images/infoPage/shapes/sectionSticky.png";
import WorkTogether from "../../../../images/workTogether.png";
import OpenBook from "../../../../images/openBook.png";

import { StyledH3, StyledText } from "../../../../styles/GlobalStyle";
const Container = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const SpaceHolder = styled.div`
  position: relative;
  width: 100%;
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 120vh;
  width: 100%;
  overflow-x: hidden;
`;
const Horizontal = styled.div`
  margin-top: -100vh;
  position: absolute;
  height: 100%;
  will-change: transform;
`;
const CardsSection = styled.section`
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const Article = styled.article`
  /* position: relative;
  height: 300px;
  width: 500px;
  background-color: #111f30;
  margin-right: 75px;
  flex-shrink: 0; */

  height: auto;
  width: 400px;
  max-width: 80vw;
  flex-shrink: 0;

  margin: 50px 0px 0px 24px;

  position: relative;
  box-sizing: border-box;

  box-shadow: 0px 12px 18px -8px rgba(186, 160, 79, 0.2),
    0px -4px 10px 4px rgba(255, 255, 255, 0.2);
  background-color: ${(props) => (props.active ? "#feecab" : "#fcfbf8")};
  border-radius: 18px;
  border: 2px solid ${(props) => (props.active ? "#e8ba02" : "#ffffff")};
`;

const Title = styled.h3`
  position: sticky;
  height: 50px;
  font-size: 30px;
  text-align: center;
  width: 90vw;
  margin-left: 5vw;
  color: #353535;
  z-index: 1;
  font-weight: 700;
  margin-top: 100px;
  top: 100px;
`;
const Img = styled.img`
  margin-top: -200px;
  position: sticky;
  top: 30px;
  height: 95vh;
  z-index: 0;
`;

const pages = [
  {
    title: "327 Ideen",
    subTitle:
      "Von der Initiative bis zum Planungsbüro – erstellt euch ein eigenes Profil",
    img: WorkTogether,
  },
  {
    title: "32 Anträge",
    subTitle:
      "Sammelt Ideen für spezifische Ort und Anlässe in interaktiven Räumen",
    img: OpenBook,
  },
  {
    title: "12  Stellungnahmen",
    subTitle:
      "Von der Initiative bis zum Planungsbüro – erstellt euch ein eigenes Profil",
    img: WorkTogether,
  },
  {
    title: "3 Implementiert",
    subTitle:
      "Sammelt Ideen für spezifische Ort und Anlässe in interaktiven Räumen",
    img: OpenBook,
  },
];

const HorizontalScrollSection = () => {
  useEffect(() => {
    const spaceHolder = document.querySelector("#space-holder");
    const horizontal = document.querySelector("#horizontal");
    spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;

    function calcDynamicHeight(ref) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const objectWidth = ref.scrollWidth;
      return objectWidth - vw + vh + 170; // 150 is the padding (in pixels) desired on the right side of the .cards container. This can be set to whatever your styles dictate
    }

    window.addEventListener("resize", () => {
      spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;
    });
  }, []);

  return (
    <Container>
      <SpaceHolder id="space-holder">
        <Sticky id="sticky">
          <Title>
            Wir setzen uns <br />
            für euch ein!
          </Title>
          <Img src={SectionBackground} width="100%" />

          <Horizontal id="horizontal">
            <CardsSection role="feed" class="cards">
              {pages.map(({ title, subTitle, img }) => (
                <Article>
                  <StyledH3 textAlign="center" margin="20px 20px 0px 20px">
                    {title}
                  </StyledH3>
                  <img src={img} width="70%" style={{ marginLeft: "15%" }} />
                  <StyledText textAlign="center" margin="0px 20px 20px 20px">
                    {subTitle}
                  </StyledText>
                </Article>
              ))}
            </CardsSection>
          </Horizontal>
        </Sticky>
      </SpaceHolder>
    </Container>
  );
};

export default HorizontalScrollSection;
