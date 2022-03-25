import React, { useState, useEffect } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import styled from "styled-components";
import Img from "../../../../images/infoPage/howItWorks/decideLocation.jpg";
import FormulateIdea from "../../../../images/infoPage/howItWorks/formulateIdea.jpg";

import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";

const StyledDeck = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 200px;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;

  div {
    margin-top: 200px;
    transform: translatex(-50%);
    background-color: white;
    background-size: 80% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    width: 70vw;
    max-width: 400px;
    height: 100vw;
    max-height: 600px;
    will-change: transform;
    border-radius: 10px;
    box-shadow: 0px 4px 6px -2px rgba(186, 160, 79, 0.4),
      0px -2px 5px 2px rgba(255, 255, 255, 0.4);

    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
`;

const cards = [
  { img: Img, title: "Intuitiv" },
  { img: FormulateIdea, title: "Transparent" },
  { img: Img, title: "Divers" },
];

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 200,
});
const from = (_i) => ({ x: -1000, rot: 0, scale: 1.5, y: 0 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

const Cards = ({ visibleCards }) => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity[1] > 0.02 || velocity[1] === 0; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 400);
    }
  );
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <StyledDeck key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i].img})`,
            }}
          >
            {/* <StyledH3 textAlign="center">{cards[i].title}</StyledH3> */}
          </animated.div>
        </StyledDeck>
      ))}
    </>
  );
};

export default Cards;
