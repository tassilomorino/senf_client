import styled from "styled-components";
import { animated } from "@react-spring/web";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  margin-top: 0vh;
  z-index: 99;
  top: 0;
  position: fixed;
  pointer-events: all;
  overflow: scroll;
  background: rgb(254, 217, 87);
  background: rgb(249, 241, 215);
  /* animation: OrganizationPageAnimation 0.2s; */

  @media (min-width: 768px) {
    margin-left: 200px;
    width: ${(props) => (props.order ? "calc(100vw - 605px)" : "400px")};
    height: 100vh;
    overflow-y: scroll;
    z-index: 90;
    top: 0;
    position: fixed;
    transition: 0.3s;
    box-shadow: 40px 8px 30px -12px rgba(0, 0, 0, 0.2);
  }

  /* @keyframes OrganizationPageAnimation {
  0% {
    left: 50vw;
    opacity: 0;
  }
  100% {
    left: 0vw;
    opacity: 1;
  }
} */
`;

export const DragWrapper = styled(animated.div)`
  overscroll-behavior: contain;
  overflow-x: hidden;

  width: 100%;
  height: 100%;
  /* background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(255, 218, 83, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  ); */
  background-color: rgb(249, 241, 215);
  border-radius: 24px;
  position: absolute;
  z-index: 995;
  animation: organizationOverviewEnterAnimation 0.5s;

  @media (min-width: 768px) {
    width: 400px;
    animation: none;
    border-radius: 0px;
  }
`;

export const ClickBackground = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  position: fixed;
  z-index: 994;
  pointer-events: auto;
  top: 0;
`;

export const CoverWrapper = styled.div`
  margin-left: 50%;
  padding-bottom: 300px;
  transform: translateX(-50%);
  width: calc(100% - 20px);
  max-width: 800px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    ". ."
    ". .";
  @media (min-width: 768px) {
    margin-top: 50px;
  }

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }

  @media (min-width: 1468px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

export const Covers = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9;
  float: left;
  position: relative;
  animation: ${(props) => props.animation};
  overflow: hidden;
  border-radius: 25px;
  background-color: white;
  margin: 0;
  padding: 0;
`;

export const SVGWrapper = styled.div`
  background-color: rgb(249, 241, 215);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 2;
  height: ${(props) => (props.searchOpen ? "210px" : "150px")};
`;

export const SVGWrapperMobile = styled.div`
  background-color: rgb(249, 241, 215);
  width: 100%;
  height: 110px;
  position: absolute;
  top: 0;
  z-index: -2;
`;

export const HeaderWrapper = styled(animated.div)`
  position: sticky;
  width: 100%;
  padding-top: 10px;
  /* background-color: #fed957; */
  z-index: 25;
  height: 100px;
  @media (min-width: 768px) {
    position: absolute;

    width: 600px;
    height: 120px;
    margin-left: 50%;
    top: 0;
    transform: translateX(-50%);
    background-color: transparent;
  }
`;

export const HandleBar = styled.div`
  width: 50px;
  height: 2px;
  background-color: #f2c71c;
  overflow: visible;
  border-radius: 1px;
  margin-top: 0px;
  margin-left: 50%;
  transform: translateX(-50%);
  position: absolute;
`;
