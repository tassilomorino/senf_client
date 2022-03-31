import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
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
  min-height: 100vh;
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
  /* position: relative;
  height: 300px;
  width: 500px;
  background-color: #111f30;
  margin-right: 75px;
  flex-shrink: 0; */

  height: 320px;
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
  height: 70px;
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
  top: 30px;
  height: 95%;
  z-index: 0;

  @media (min-width: 768px) {
    height: 800px;
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
      return objectWidth - width + height + width / 2; // 150 is the padding (in pixels) desired on the right side of the .cards container. This can be set to whatever your styles dictate
    }

    spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;

    // window.addEventListener("resize", () => {
    //   spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;
    // });
  }, []);

  const pages = [
    {
      title: "327 Ideen",
      subTitle: "Jede konstruktive Idee für den Stadtraum ist wertvoll! ",
      img: Ideas,
    },
    {
      title: "32 Anträge",
      subTitle:
        "Als aufgewertete Anträge schaffen wir höhere Erfolgschancen für die jewiligen Ideen",
      img: Submitted,
    },
    {
      title: "12 Stellungnahmen",
      subTitle: "Prozesse sind langwierig, aber dran bleiben ist die Devise",
      img: Statement,
    },
    {
      title: "3 Implementiert",
      subTitle: "Wir setzen alles daran, dass eure Stimmen gehört werden!",
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
          {id === "1" ? (
            <Title>
              Wir setzen uns <br />
              für euch ein!
            </Title>
          ) : (
            <Title>
              Gemeinsam für die <br />
              Stadt der Zukunft
            </Title>
          )}

          <Img src={SectionBackground} width="100%" />

          <Horizontal id={`horizontal${id}`}>
            {id === "1" ? (
              <CardsSection role="feed" class="cards">
                {pages.map(({ title, subTitle, img }) => (
                  <Article>
                    <StyledH3 textAlign="center" margin="20px 20px 0px 20px">
                      {title}
                    </StyledH3>
                    <img src={img} width="90%" style={{ marginLeft: "5%" }} />
                    <StyledText
                      textAlign="center"
                      margin="0px 20px 20px 20px"
                      marginLeft="20px"
                    >
                      {subTitle}
                    </StyledText>
                  </Article>
                ))}
              </CardsSection>
            ) : (
              <CardsSection role="feed" class="cards">
                {credits.map(({ title, subTitle, img, width }) => (
                  <Article>
                    <img
                      src={img}
                      width={width}
                      style={{
                        marginLeft: "50%",
                        transform: "translateX(-50%)",
                        marginTop: "20px",
                      }}
                    />
                    <StyledText
                      textAlign="center"
                      margin="10px 20px 20px 20px"
                      marginLeft="20px"
                    >
                      {subTitle}
                    </StyledText>
                    <StyledH3 textAlign="center" margin="20px 20px 20px 20px">
                      {title}
                    </StyledH3>
                  </Article>
                ))}
                <Article>
                  <StyledH2
                    textAlign="center"
                    margin="20px 20px 0px 20px"
                    style={{ fontSize: "25px" }}
                  >
                    &#128588; &ensp; &#128588;&ensp; &#128588;
                  </StyledH2>
                  <Flex>
                    <Logo src={Ksta} width="150px" />
                    <Logo src={Gaffel} width="70px" />
                    <Logo src={Ww} width="100px" />
                    <Logo src={Baudata} width="50px" />
                    <Logo src={Kfa} width="50px" />
                    <Logo src={MinhaGalera} width="100px" />
                    <Logo src={Jh_uh} width="100px" />
                    <Logo src={Eps} width="100px" />
                    <Logo src={Av} width="100px" />
                    <Logo src={Np} width="100px" />
                    <Logo src={Sk} width="100px" />
                  </Flex>
                </Article>
              </CardsSection>
            )}
          </Horizontal>
        </Sticky>
      </SpaceHolder>
    </Container>
  );
};

export default HorizontalScrollSection;
