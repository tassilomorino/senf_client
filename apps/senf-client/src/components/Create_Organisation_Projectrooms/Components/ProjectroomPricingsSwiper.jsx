/** @format */

import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { isMobileCustom } from "../../../util/customDeviceDetect";

import { StyledText } from "../../../styles/GlobalStyle";
import BubbleOrange from "../../../images/bubbles/bubble-orange.png";
import BubbleGreen from "../../../images/bubbles/bubble-green.png";
import BubbleBlue from "../../../images/bubbles/bubble-blue.png";

const Wrapper = styled.div`
  width: 100%;
  margin: 0px;

  height: auto;
  margin-top: ${(props) => (props.isMobileCustom ? "70px" : "50px")};
  /* border: 2px solid #fed957;
  border-radius: 18px;
  background-color: #fff7dd; */
`;

const FlexWrapper = styled.div`
  display: flex;
  flex: none;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  margin-left: 10%;

  @media (min-width: 768px) {
    margin-left: calc(-150px);
  }
`;

const HorizontalSwipeCard = styled(animated.div)`
  width: 80%;
  height: 400px;

  flex: none;

  position: relative;
  overflow: visible;
  opacity: ${(props) => (props.$active ? 1 : props.$isMobileCustom ? 0.5 : 1)};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 40px;

  box-shadow: 0px 12px 18px -8px rgba(186, 160, 79, 0.2),
    0px -4px 10px 4px rgba(255, 255, 255, 0.2);
  background-color: ${(props) => (props.active ? "#feecab" : "#fcfbf8")};
  border-radius: 18px;
  border: 2px solid ${(props) => (props.active ? "#e8ba02" : "#ffffff")};

  @media (min-width: 768px) {
    width: 250px;
  }
`;

const ArrowWrapper = styled.div`
  top: 10px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 9;
`;

const Img = styled.img`
  position: absolute;
  top: -30px;
  right: -30px;
  width: 120px;
`;

const Title = styled.h2`
  font-size: 27px;
  font-weight: 900;
  top: 20px;
  left: 20px;
  position: absolute;
`;

const Price = styled.div`
  position: absolute;
  top: -30px;
  right: -30px;
  width: 120px;
  height: 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PriceValue = styled.h2`
  font-size: 25px;
  font-weight: 900;
  color: white;
`;
const PriceSubtitle = styled.h2`
  font-size: 20px;
  font-weight: 200;
  color: white;
`;

const ProjectroomPricingsSwiper = () => {
  const [active, setActive] = useState(0);

  const [props, set] = useSpring(() => ({
    x: 0,
    transform: `translateX(0px)`,
    overflow: "visible",
    touchAction: "pan-y",
  }));

  const handlePrev = () => {
    setActive(Math.max(0, active - 1));
  };

  const handleNext = () => {
    setActive(Math.min(pages.length - 1, active + 1));
  };

  const bind = useDrag(
    ({ event, down, distance, last, direction, movement: [mx] }) => {
      if (last && distance[0] > 50) {
        event.preventDefault();
        if (direction[0] === 1) {
          handlePrev();
        } else {
          handleNext();
        }
      }

      // set({ x: down ? mx : 0 });
    }
  );

  useEffect(() => {
    if (isMobileCustom) {
      if (active === 0) {
        set({
          transform: `translateX(${-active * 100}%)`,
        });
      } else {
        set({
          transform: `translateX(${-(active * 100)}%)`,
        });
      }
    }
  }, [active]);

  const pages = [
    {
      title: "Base",
      price: "15€",
      text: "Zeigt der Community, dass ihr euch aktiv mit Bürgerbeteiligung beschäftigt",
      img: BubbleOrange,
      id: 0,
    },
    {
      title: "Pro",
      price: "45€",
      text: "Als eingetragene Organisation könnt ihr Projekträume für eure Vorhaben erstellen",
      img: BubbleBlue,
      id: 1,
    },
    {
      title: "Individual",
      price: "Anfrage",
      text: "Fügt Beschreibungen, Kontakdaten und FAQs hinzu, um Interessierte zu informieren",
      img: BubbleGreen,
      id: 2,
    },
  ];

  return (
    <Wrapper>
      <FlexWrapper>
        {pages.map(({ title, price, text, id, img }) => (
          <HorizontalSwipeCard
            {...bind()}
            $active={id === active}
            $isMobileCustom={isMobileCustom}
            style={props}
            key={id}
          >
            <Img src={img} alt="" />
            <Price>
              <PriceValue>{price}</PriceValue>
              <PriceSubtitle>pro Monat</PriceSubtitle>
            </Price>

            <Title textAlign="center">{title}</Title>
            <StyledText
              textAlign="left"
              margin="10px 20px 20px 20px"
              marginLeft="20px"
            >
              {text}
            </StyledText>
          </HorizontalSwipeCard>
        ))}
      </FlexWrapper>
    </Wrapper>
  );
};

export default ProjectroomPricingsSwiper;
