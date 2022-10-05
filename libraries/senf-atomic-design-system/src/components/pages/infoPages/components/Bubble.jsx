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
  filter: url("#goo");
  overflow: hidden;
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
    border-radius: 50%;
    background-color: #fed957;
    /* box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75); */
    /* opacity: 0.6; */
  }

  div:nth-child(1) {
    width: 60px;
    height: 60px;
  }

  div:nth-child(2) {
    width: 125px;
    height: 125px;
  }

  div:nth-child(3) {
    width: 75px;
    height: 75px;
  }

  div::after {
    content: "";
    position: absolute;
    top: 20px;
    left: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
  }

  div:nth-child(2)::after {
    top: 35px;
    left: 35px;
    width: 35px;
    height: 35px;
  }

  div:nth-child(3)::after {
    top: 25px;
    left: 25px;
    width: 25px;
    height: 25px;
  }
`;

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const Bubble = ({ imgRef }) => {
  const ref = useRef(null);
  const [trail, api] = useTrail(3, (i) => ({
    xy: [window.innerWidth / 2, window.innerHeight],
    config: i === 0 ? fast : slow,
  }));
  //   const [ref, { left, top }] = useMeasure();

  const handleMouseMove = (e) => {
    api.start({ xy: [e.clientX - 0, e.clientY - 0] });
  };

  useEffect(() => {
    setTimeout(() => {
      api.start({ xy: [window.innerWidth / 2, window.innerHeight / 1.1] });

      setInterval(function () {
        api.start({
          xy: [window.innerWidth / 2.1, window.innerHeight / 1.08],
        });
      }, 2500);

      setInterval(function () {
        api.start({
          xy: [window.innerWidth / 1.7, window.innerHeight / 1.09],
        });
      }, 4000);
      setInterval(function () {
        api.start({
          xy: [window.innerWidth / 2.1, window.innerHeight / 1.25],
        });
      }, 7000);
    }, 2000);
  }, []);
  return (
    <Container ref={ref}>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur
            in="SourceGraphic"
            result="blur"
            stdDeviation="30"
          />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
          />
        </filter>
      </svg>

      <HooksMain
        ref={imgRef}
        //   onMouseMove={handleMouseMove}
      >
        {trail.map((props, index) => (
          <animated.div
            key={index}
            style={{ transform: props.xy.to(trans) }}
          ></animated.div>
        ))}
      </HooksMain>
    </Container>
  );
};

export default Bubble;
