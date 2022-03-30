import React, { useRef } from "react";
import useMeasure from "react-use-measure";
import { useTrail, animated } from "@react-spring/web";
import styled from "styled-components";
import { useEffect } from "react";
import BulbImg from "../../../../images/lamp.png";
const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform, opacity;
  overflow: visible;
  top: 0;
  z-index: 1;
`;

const HooksMain = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
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
    /* box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75); */
    /* opacity: 0.6; */
  }
`;

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const Bulb = ({ imgRef }) => {
  const ref = useRef(null);
  const [trail, api] = useTrail(1, (i) => ({
    xy: [window.innerWidth / 2, window.innerHeight + 200],
    config: slow,
  }));

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
      // setInterval(function () {
      //   api.start({
      //     xy: [window.innerWidth / 2.1, window.innerHeight / 1.25],
      //   });
      // }, 7000);
    }, 2000);
  }, []);
  return (
    <Container ref={ref}>
      <HooksMain
        ref={imgRef}
        //   onMouseMove={handleMouseMove}
      >
        {trail.map((props, index) => (
          <animated.div key={index} style={{ transform: props.xy.to(trans) }}>
            <img src={BulbImg} width="100px" style={{ marginLeft: "-10px" }} />
          </animated.div>
        ))}
      </HooksMain>
    </Container>
  );
};

export default Bulb;
