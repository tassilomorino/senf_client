import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Partners from "./Partners";

import SectionBackground from "../../../../images/infoPage/shapes/sectionSticky.png";
import Ideas from "../../../../images/infoPage/howItWorks/ideas.png";
import Submitted from "../../../../images/infoPage/howItWorks/submitted.png";
import Statement from "../../../../images/infoPage/howItWorks/statement.png";
import OpenBook from "../../../../images/openBook.png";

import Klug from "../../../../images/infoPage/partnerLogos/klug.png";
import GrnKln from "../../../../images/infoPage/partnerLogos/grn_kln.png";
import Agora from "../../../../images/infoPage/partnerLogos/agora.png";

import Ksta from "../../../../images/infoPage/partnerLogos/ksta.png";
import Gaffel from "../../../../images/infoPage/partnerLogos/gaffel.png";
import Ww from "../../../../images/infoPage/partnerLogos/ww.png";
import Baudata from "../../../../images/infoPage/partnerLogos/baudata.png";
import Kfa from "../../../../images/infoPage/partnerLogos/kfa.png";
import MinhaGalera from "../../../../images/infoPage/partnerLogos/minhaGalera.png";
import Jh_uh from "../../../../images/infoPage/partnerLogos/jh_uh.png";
import Eps from "../../../../images/infoPage/partnerLogos/eps.png";
import Av from "../../../../images/infoPage/partnerLogos/av.png";
import Np from "../../../../images/infoPage/partnerLogos/np.png";
import Sk from "../../../../images/infoPage/partnerLogos/sk.png";

import { StyledH2, StyledH3, StyledText } from "../../../../styles/GlobalStyle";
const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SpaceHolder = styled.div`
  position: relative;
  width: 100%;
`;

const Sticky = styled.div`
  position: sticky;
  top: -80px;
  height: 120vh;
  width: 100%;
  overflow-x: hidden;
`;
const Horizontal = styled.div`
  position: absolute;
  height: 100%;
  will-change: transform;
`;
const CardsSection = styled.section`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const Article = styled.article`
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
  width: calc(100vw - 48px);
  margin: 24px 50px 0px 24px;

  @media (min-width: 768px) {
    width: 700px;
    margin: 50px 50px 0px 50px;
  }
`;

const Title = styled.h3`
  font-size: 30px;
  text-align: center;
  width: 90%;
  margin-left: 5%;
  color: #353535;
  z-index: 1;
  font-weight: 700;
  margin-top: 100px;
  top: 130px;
`;
const Img = styled.img`
  position: absolute;
  top: 0px;
  height: calc(100% - 50px);
  z-index: 0;

  @media (min-width: 768px) {
    top: 0px;
    height: calc(100% - 250px);
  }
`;

const Flex = styled.div`
  width: calc(100% - 20px);
  position: relative;
  display: flex;
  flex-flow: wrap;
  align-items: center;
  margin: 10px;
`;

const Logo = styled.img`
  padding: 5px 10px;
`;
const Goosefoot = styled.span`
  color: #353535;
  font-size: 150px;
  width: 100%;
  text-align: center;
`;

const HorizontalScrollSection = ({ id }) => {
  useEffect(() => {
    const spaceHolder = document.querySelector("#space-holder" + id);
    const horizontal = document.querySelector("#horizontal" + id);
    spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;

    function calcDynamicHeight(ref) {
      var element = document.getElementById("InfoPage");
      var positionInfo = element.getBoundingClientRect();
      var height = positionInfo.height;
      var width = positionInfo.width;

      const objectWidth = ref.scrollWidth;
      return objectWidth - width + height + width * 2; // 150 is the padding (in pixels) desired on the right side of the .cards container. This can be set to whatever your styles dictate
    }

    spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;

    // window.addEventListener("resize", () => {
    //   spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;
    // });
  }, []);

  const pages = [
    {
      title: "327 Ideen",
      subTitle:
        "sind auf unserer Plattform für den Stadtraum in Köln eingegangen",
      img: Ideas,
    },
    {
      title: "32 Anträge",
      subTitle:
        "wurden auf Basis der Ideen als offizielle Anträge an die Stadtverwaltung übergeben",
      img: Submitted,
    },
    {
      title: "12 Stellungnahmen",
      subTitle:
        "haben wir als Rückmeldung auf die Anträge von den verantwortlichen Ämtern erhalten",
      img: Statement,
    },
    {
      title: "3 Implementiert",
      subTitle:
        "konnten in bestehende oder neue Planungen und beschlüsse aufgenommen werden",
      img: Statement,
    },
  ];
  const credits = [
    {
      img: Klug,
      title: "Jan Pehoviak, KLuG e.V.",
      subTitle:
        "„Mit Senf gibt es eine digitale Beteiligungsplattform, die auch von Bürgern, Vereinen und Initiativen für eine Bottom-up Gestaltung vom Quartier genutzt werden kann. Beteiligung ist eines der Kernelemente unserer Arbeit und dank Senf jetzt auch einfach möglich.",
      width: "70px",
    },
    {
      img: GrnKln,
      title: "Mildred Utku, Die Grünen Köln",
      subTitle:
        "Senf.koeln stärkt mit ihrer Plattform die Bürger*innenbeteiligung und kann somit eine Grundlage schaffen um fundierte Entscheidungen zu treffen, die in Planungen und Beschlüsse mit einfließen können um mehr Akzeptanz in der Nachbarschaft herzustellen.",
      width: "50px",
    },
    {
      img: Agora,
      title: "Martin Herrndorf, AGORA Köln",
      subTitle:
        "Mithilfe von Senf.koeln haben wir bereits während unserer Veranstaltungen, wie dem „BarCamp – Nachbarschaft macht Zukunft“, die Möglichkeit, Ergebnisse festzuhalten und Ideen der Teilnehmer:innen zu sammeln.",
      width: "150px",
    },
  ];

  return (
    <Container>
      <SpaceHolder id={`space-holder${id}`}>
        <Sticky id={`sticky${id}`}>
          {/* {id === "1" ? (
            <Title>
              Wir setzen uns <br />
              für euch ein!
            </Title>
          ) : (
            <Title>
              Gemeinsam für die <br />
              Stadt der Zukunft
            </Title>
          )} */}
          <Img src={SectionBackground} width="100%" />

          <Horizontal id={`horizontal${id}`}>
            {id === "1" ? (
              <CardsSection role="feed" class="cards">
                {pages.map(({ title, subTitle, img }) => (
                  <Article>
                    <Title textAlign="center" margin="20px 20px 0px 20px">
                      {title}
                    </Title>
                    <StyledText
                      textAlign="center"
                      margin="20px 20px 40px 20px"
                      marginLeft="20px"
                    >
                      {subTitle}
                    </StyledText>
                    <img src={img} width="100%" style={{ marginLeft: "0%" }} />
                  </Article>
                ))}
              </CardsSection>
            ) : (
              <CardsSection role="feed" class="cards">
                {credits.map(({ title, subTitle, img, width }) => (
                  <Article>
                    <Goosefoot>„</Goosefoot>
                    <StyledText
                      textAlign="center"
                      margin={
                        document.body.clientWidth > 768
                          ? "10px 100px 20px 100px"
                          : "10px 20px 20px 20px"
                      }
                      marginLeft={
                        document.body.clientWidth > 768 ? "100px" : "20px"
                      }
                    >
                      {subTitle}
                    </StyledText>
                    <StyledH3 textAlign="center" margin="20px 20px 20px 20px">
                      {title}
                    </StyledH3>
                  </Article>
                ))}
              </CardsSection>
            )}
          </Horizontal>
          {id === "2" && <Partners />}
        </Sticky>
      </SpaceHolder>
    </Container>
  );
};

export default HorizontalScrollSection;
