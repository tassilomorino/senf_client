/** @format */

import React, { useState, useCallback, useRef, useEffect } from "react";
import { isMobileCustom } from "../../../../util/customDeviceDetect";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import { StyledH2, StyledH3, StyledText } from "../../../../styles/GlobalStyle";
import { CustomIconButton } from "../../../atoms/CustomButtons/CustomButton";
import WeAreHere from "../../../../images/weAreHere.png";
import WorkTogether from "../../../../images/workTogether.png";
import OpenBook from "../../../../images/openBook.png";

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
  opacity: ${(props) => (props.active ? 1 : props.isMobileCustom ? 0.5 : 0)};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ArrowWrapper = styled.div`
  top: 10px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 9;
`;

const ArrowLeft = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  pointer-events: all;
  opacity: 1;
  transition: 0.5s;
  background-color: #fed957;
`;

const ArrowRight = styled(ArrowLeft)`
  transform: rotate(180deg);
`;

const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  top: 10px;
`;
const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: #fed957;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  margin: 10px 10px 10px 10px;
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
            active={id === active}
            isMobileCustom={isMobileCustom}
            style={props}
          >
            <img src={img} height="200px" />

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

      <ArrowWrapper>
        <div
          style={active !== 0 ? {} : { pointerEvents: "none", opacity: 0.5 }}
        >
          <CustomIconButton
            name="ArrowLeft"
            backgroundColor={active !== 0 ? "#fed957" : "#F4EACA"}
            shadow={false}
            handleButtonClick={handlePrev}
            small={true}
          />
        </div>

        <div
          style={
            active !== pages.length - 1
              ? {}
              : { pointerEvents: "none", opacity: 0.5 }
          }
        >
          <CustomIconButton
            name="ArrowRight"
            backgroundColor={
              active !== pages.length - 1 ? "#fed957" : "#F4EACA"
            }
            marginLeft="10px"
            handleButtonClick={handleNext}
            small={true}
          />
        </div>
      </ArrowWrapper>
      {/* <DotWrapper>
        {pages.map(({ id }) => (
          <Dot active={id === active} />
        ))}
      </DotWrapper> */}
    </Wrapper>
  );
};

export default InfoSwiper;
