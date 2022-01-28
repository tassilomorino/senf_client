/** @format */

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

import Arrow from "../../../images/icons/arrow.png";
import { truncateString } from "../../../hooks/truncateString";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { StyledH2, StyledText } from "apps/senf-client/src/styles/GlobalStyle";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";

const Wrapper = styled.div`
  width: 100%;
  height: 350px;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex: none;
  width: 100%;
  height: 100%;
`;

const HorizontalSwipeCard = styled(animated.div)`
  width: 100%;
  height: 330px;

  flex: none;

  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ArrowWrapper = styled.div`
  top: 300px;
  width: 100%;
  position: absolute;
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
  position: absolute;
  width: 100%;
  top: 0;
`;
const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: #fed957;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  margin: 10px 10px 10px 10px;
`;

const ProjectInfoSwiper = ({ setInfoOpen, pages }) => {
  const [active, setActive] = useState(0);

  const [props, set] = useSpring(() => ({
    x: 0,
    transform: `translateX(0px)`,
    overflow: "scroll",
    touchAction: "none",
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
      set({ x: down ? mx : 0 });
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

  return (
    <Wrapper>
      <FlexWrapper>
        <ArrowWrapper>
          <div
            style={active !== 0 ? {} : { pointerEvents: "none", opacity: 0.5 }}
          >
            <CustomIconButton
              name="ArrowLeft"
              backgroundColor="#fed957"
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
              backgroundColor="#fed957"
              marginLeft="10px"
              handleButtonClick={handleNext}
              small={true}
            />
          </div>
        </ArrowWrapper>
        <DotWrapper>
          {pages.map(({ id }) => (
            <Dot active={id === active} />
          ))}
        </DotWrapper>
        {pages.map(({ title, text, id }) => (
          <HorizontalSwipeCard {...bind()} active={id === active} style={props}>
            <StyledH2
              fontWeight="900"
              textAlign="center"
              active={id === active}
            >
              {id === active || isMobileCustom
                ? title
                : active === 0
                ? truncateString(title, 14)
                : truncateString(title, 9)}
            </StyledH2>
            <StyledText textAlign="center" margin="20px" marginLeft="20px">
              {text}
            </StyledText>

            {/* {id === active && (
              <StyledText textAlign="center">{text}</StyledText>
            )} */}

            {/* {id === active && (
              <ExpandButton handleButtonClick={handleOpenOrganizations} />
            )}

            {id === active - 1 && (
              <ExpandButton handleButtonClick={handlePrev} />
            )}
            {id === active + 1 && (
              <ExpandButton handleButtonClick={handleNext} />
            )} */}
          </HorizontalSwipeCard>
        ))}
      </FlexWrapper>
    </Wrapper>
  );
};

export default ProjectInfoSwiper;
