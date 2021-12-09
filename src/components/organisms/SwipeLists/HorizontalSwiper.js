/** @format */

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import { openOrganizationsFunc } from "../../../redux/actions/organizationActions";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

import Arrow from "../../../images/icons/arrow.png";
import { truncateString } from "../../../hooks/truncateString";

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex: none;
  white-space: nowrap;
  width: max-content;
`;

const HorizontalSwipeCard = styled(animated.div)`
  width: 200px;
  height: 30px;
  border-radius: 20px;
  background-color: #fcf6e3;
  margin: 0px 0 10px 10px;
  padding: 5px;
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.active ? 1 : 0.5)};

  &:hover {
    text-decoration: ${(props) => (props.active ? "underline" : "none")};
  }
`;

const Title = styled.h3`
  font-size: 18px;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 3px;
  text-align: left;
  font-family: Futura PT W01-Bold;
  font-weight: 100;
  color: #353535;
  /* text-decoration: ${(props) => (props.active ? "underline" : "none")}; */

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;
const SubTitle = styled.h4`
  font-size: 18px;
  margin-top: 0px;
  margin-left: 10px;
  margin-bottom: 0;
  text-align: left;
  font-family: Futura PT W01 Book;
  color: #5a5a5a;
  position: relative;
  animation: SubTitleAnimation 1s;

  @keyframes SubTitleAnimation {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

const ArrowLeft = styled.div`
  position: absolute;
  width: 25px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  pointer-events: none;
  opacity: 0.8;
`;

const ArrowRight = styled(ArrowLeft)`
  right: 0;
  transform: rotate(180deg);
`;

const items = [
  { title: "Alle Organizationen", buttonText: "Alle anzeigen", id: 0 },
  { title: "Bürgerinitiativen", buttonText: "Alle anzeigen", id: 1 },
  { title: "Planungsbüros", buttonText: "Alle anzeigen", id: 2 },
  { title: "Vereine", buttonText: "Alle anzeigen", id: 3 },
];
const HorizontalSwiper = () => {
  const dispatch = useDispatch();

  const handleOpenOrganizations = () => {
    dispatch(openOrganizationsFunc());
  };
  const [props, set] = useSpring(() => ({
    x: 0,
    transform: `translateX(0px)`,
    overflow: "scroll",
    touchAction: "none",
  }));

  const [active, setActive] = useState(0);

  const handlePrev = () => {
    setActive(Math.max(0, active - 1));
  };

  const handleNext = () => {
    setActive(Math.min(items.length - 1, active + 1));
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
        transform: `translateX(${-active * 200}px)`,
      });
    } else {
      set({
        transform: `translateX(${-(active * 220) + 26}px)`,
      });
    }
  }, [active]);

  return (
    <Wrapper>
      <FlexWrapper>
        {active !== 0 && (
          <ArrowLeft>
            <img
              src={Arrow}
              width="18px"
              style={{ transform: "rotate(90deg)" }}
            />
          </ArrowLeft>
        )}
        {active !== 3 && (
          <ArrowRight>
            <img
              src={Arrow}
              width="18px"
              style={{ transform: "rotate(90deg)" }}
            />
          </ArrowRight>
        )}
        {items.map(({ title, buttonText, id }) => (
          <HorizontalSwipeCard {...bind()} active={id === active} style={props}>
            <Title active={id === active}>
              {id === active
                ? title
                : active === 0
                ? truncateString(title, 14)
                : truncateString(title, 9)}
            </Title>
            {/* {id === active && (
              <SubTitle onClick={handleOpenOrganizations}>
                {buttonText}{" "}
            
              </SubTitle>
            )} */}

            {id === active - 1 && (
              <ExpandButton handleButtonClick={handlePrev} />
            )}
            {id === active + 1 && (
              <ExpandButton handleButtonClick={handleNext} />
            )}
          </HorizontalSwipeCard>
        ))}
      </FlexWrapper>
    </Wrapper>
  );
};

export default HorizontalSwiper;
