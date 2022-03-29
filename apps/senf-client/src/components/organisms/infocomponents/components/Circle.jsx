import React, { useRef } from "react";
import useMeasure from "react-use-measure";
import { useTrail, animated } from "@react-spring/web";
import styled from "styled-components";
import { useEffect } from "react";
import Bulb from "../../../../images/lamp.png";
const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform, opacity;
  overflow: visible;
  top: 0;
`;

const HooksMain = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
  background: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;

  div {
    position: absolute;
    will-change: transform;
    background-color: #fed957;
    /* box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75); */
    /* opacity: 0.6; */
  }

  div:nth-child(1) {
    width: 1500px;
    height: 1500px;
    border-radius: 100%;
  }
`;

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const Circle = ({ scrollValue }) => {
  const ref = useRef(null);
  const [trail, api] = useTrail(1, (i) => ({
    xy: [window.innerWidth / 2, window.innerHeight + 200],
    config: slow,
  }));
  //   const [ref, { left, top }] = useMeasure();

  const handleMouseMove = (e) => {
    api.start({ xy: [e.clientX - 0, e.clientY - 0] });
  };

  useEffect(() => {
    setTimeout(() => {
      api.start({ xy: [window.innerWidth / 2, window.innerHeight / 1.1] });

      var firstInterval = setInterval(function () {
        api.start({
          xy: [window.innerWidth / 2.1, window.innerHeight / 1.08],
        });
      }, 2500);

      var secondInterval = setInterval(function () {
        api.start({
          xy: [window.innerWidth / 1.7, window.innerHeight / 1.09],
        });
      }, 4000);
      // setInterval(function () {
      //   api.start({
      //     xy: [window.innerWidth / 2.1, window.innerHeight / 1.25],
      //   });
      // }, 7000);
      if (scrollValue > 30) {
        clearInterval(firstInterval);
        clearInterval(secondInterval);
      }
    }, 2000);
  }, []);
  return (
    <Container ref={ref}>
      <HooksMain

      //   onMouseMove={handleMouseMove}
      >
        {trail.map((props, index) => (
          <animated.div
            id="Circle"
            key={index}
            style={{ transform: props.xy.to(trans) }}
          ></animated.div>
        ))}
      </HooksMain>
    </Container>
  );
};

export default Circle;
