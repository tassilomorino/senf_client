import React, { useRef } from "react";
import useMeasure from "react-use-measure";
import { useTrail, animated } from "@react-spring/web";
import styled from "styled-components";
import { useEffect } from "react";
import Bulb from "../../../../images/lamp.png";
import SecondHeadline from "./SecondHeadline";
import { isMobileCustom } from "../../../../util/customDeviceDetect";
import BulbImg from "../../../../images/lamp.png";
import ShowOthers from "../../../../images/weAreHere_white.png";
import Logo from "../../../../images/logo_white.png";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  will-change: transform, opacity;
  overflow: visible;
  margin-top: ${(props) => props.marginTop};
  z-index: 1;
`;

const HooksMain = styled.div`
  position: absolute;
  width: 100%;
  height: 0;
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
    width: ${(props) => (props.isMobileCustom ? "1600px" : "2700px")};
    height: ${(props) => (props.isMobileCustom ? "1600px" : "2700px")};
    border-radius: 100%;
  }
`;

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const Circle = ({ scrollValue, id, marginTop }) => {
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
    var element = document.getElementById("InfoPage");
    var positionInfo = element.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;

    api.start({ xy: [width / 2, 0] });

    var firstInterval = setInterval(function () {
      api.start({
        xy: [width / 2.45, 0],
      });
    }, 2500);

    var secondInterval = setInterval(function () {
      api.start({
        xy: [width / 2.35, 0],
      });
    }, 4000);
    // setInterval(function () {
    //   api.start({
    //     xy: [width / 2.1, height / 1.25],
    //   });
    // }, 7000);
    if (scrollValue > 30) {
      clearInterval(firstInterval);
      clearInterval(secondInterval);
    }
  }, []);
  return (
    <Container ref={ref} marginTop={marginTop}>
      <HooksMain
        isMobileCustom={isMobileCustom}
        //   onMouseMove={handleMouseMove}
      >
        {trail.map((props, index) => (
          <animated.div
            id={id}
            key={index}
            style={{ transform: props.xy.to(trans) }}
          >
            {id === "Circle" ? (
              <img
                src={BulbImg}
                id="infoPageBulb"
                width="100px"
                style={{
                  marginLeft: "50%",
                  marginTop: "50%",
                  transform: "translateX(-50%)translateY(-50%)",
                  position: "absolute",
                }}
              />
            ) : id === "Circle2" ? (
              <img
                src={ShowOthers}
                id="showOthersImage"
                width="200px"
                style={{
                  marginLeft: "calc(50% - 10px)",
                  marginTop: "calc(50% + 30px)",
                  transform: "translateX(-50%)translateY(-50%)",
                  position: "absolute",
                }}
              />
            ) : (
              <img
                src={Logo}
                width="150px"
                style={{
                  marginLeft: "50%",
                  marginTop: "50%",
                  transform: "translateX(-50%)translateY(-50%)",
                  position: "absolute",
                }}
              />
            )}

            {/* <SecondHeadline
              marginTop="570px"
              visible={true}
              textlines={[
                { text: "infopage_addMustard_1" },
                { text: "infopage_addMustard_2" },
              ]}
            /> */}
          </animated.div>
        ))}
      </HooksMain>
    </Container>
  );
};

export default Circle;
