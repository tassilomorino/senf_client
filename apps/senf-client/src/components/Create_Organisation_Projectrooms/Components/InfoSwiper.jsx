/** @format */

import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { Box, Button, Arrow } from "senf-atomic-design-system";
import { isMobileCustom } from "../../../util/customDeviceDetect";

import { StyledH3, StyledText } from "../../../styles/GlobalStyle";
import WeAreHere from "../../../images/weAreHere.png";
import WorkTogether from "../../../images/workTogether.png";
import OpenBook from "../../../images/openBook.png";

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
`;

const HorizontalSwipeCard = styled(animated.div)`
  width: 80%;
  height: auto;

  flex: none;

  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.$active ? 1 : props.$isMobileCustom ? 0.5 : 0)};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InfoSwiper = () => {
  const [active, setActive] = useState(0);

  const [props, set] = useSpring(() => ({
    x: 0,
    transform: `translateX(0px)`,
    overflowY: "scroll",
    overflowX: "hidden",
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
    if (active === 0) {
      set({
        transform: `translateX(${-active * 100}%)`,
      });
    } else {
      set({
        transform: `translateX(${-(active * 100)}%)`,
      });
    }
  }, [active]);

  const pages = [
    {
      title: "Werdet sichtbar",
      text: "Zeigt der Community, dass ihr euch aktiv mit Bürgerbeteiligung beschäftigt",
      img: WeAreHere,
      id: 0,
    },
    {
      title: "Erstellt eure Projekträume",
      text: "Als eingetragene Organisation könnt ihr Projekträume für eure Vorhaben erstellen",
      img: WorkTogether,
      id: 1,
    },
    {
      title: "Informiert",
      text: "Fügt Beschreibungen, Kontakdaten und FAQs hinzu, um Interessierte zu informieren",
      img: OpenBook,
      id: 2,
    },
  ];

  return (
    <Wrapper>
      <FlexWrapper>
        {pages.map(({ title, text, id, img }) => (
          <HorizontalSwipeCard
            {...bind()}
            $active={id === active}
            $isMobileCustom={isMobileCustom}
            style={props}
            key={id}
          >
            <img src={img} height="200px" alt="" />

            <StyledH3 textAlign="center">{title}</StyledH3>
            <StyledText
              textAlign="center"
              margin="10px 20px 20px 20px"
              marginLeft="20px"
            >
              {text}
            </StyledText>
          </HorizontalSwipeCard>
        ))}
      </FlexWrapper>

      <Box gap="8px" margin="10px 0px 0px 0px" justifyContent="center">
        <Button
          icon={<Arrow transform="rotate(180deg)" />}
          onClick={handlePrev}
          disabled={active === 0}
        />
        <Button
          icon={<Arrow />}
          onClick={handleNext}
          disabled={active === pages.length - 1}
        />
      </Box>
      {/* <DotWrapper>
        {pages.map(({ id }) => (
          <Dot active={id === active} />
        ))}
      </DotWrapper> */}
    </Wrapper>
  );
};

export default InfoSwiper;
