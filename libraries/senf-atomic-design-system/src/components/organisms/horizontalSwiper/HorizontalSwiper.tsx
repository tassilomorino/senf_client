
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import Button from "../../atoms/buttons/Button";
import Typography from "../../atoms/typography/Typography";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import Box from "../../atoms/box/Box";
import { Arrow } from "../../../assets/icons";
import ObjectCard from "../../molecules/cards/ObjectCard";

const Wrapper = styled.div`
  width: 100%;
  margin: 0px;
  height: auto;
  /* margin-top: ${(props) => (props.isMobile ? "70px" : "50px")}; */
`;

const FlexWrapper = styled.div`
  display: flex;
  flex: none;
  justify-content: flex-start;
  width: max-content;
  height: 100%;
  margin-left: 0%;
  overflow:hidden;
`;

const HorizontalSwipeCard = styled(animated.div)`
  width: auto;
  height: auto;
  /* flex: none; */
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.$active ? 1 : props.$isMobile ? 0.5 : 0.5)};
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select:none; */
`;




const HorizontalSwiper: FC = ({ data, handleButtonOpenCard }) => {
  const isMobile = isMobileCustom()
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
    setActive(Math.min(data.length - 1, active + 1));
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



  return <Wrapper>

    <Box alignItems="center" justifyContent="space-between" height="36px">
      <Box marginLeft="10px">
        <Typography variant="h3">Wähle Bodenbeläge</Typography>
      </Box>

      <Box gap="8px" justifyContent="center">
        <Button
          size="small"
          icon={<Arrow transform="rotate(180deg)" />}
          onClick={handlePrev}
          disabled={active === 0}
        />
        <Button
          size="small"

          icon={<Arrow />}
          onClick={handleNext}
          disabled={active === data.length - 1}
        />
      </Box>
    </Box>
    <FlexWrapper>
      {data?.map((item, index) => (
        <HorizontalSwipeCard
          {...bind()}
          $active={index === active}
          $isMobile={isMobile}
          style={props}
          key={index}
        >
          <ObjectCard data={item} handleButtonOpenCard={handleButtonOpenCard} />



        </HorizontalSwipeCard>
      ))}
    </FlexWrapper>


  </Wrapper>;
};

export default HorizontalSwiper;
