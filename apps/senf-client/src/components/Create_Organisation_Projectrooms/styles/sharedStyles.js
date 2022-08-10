/** @format */

import styled from "styled-components";
import { animated } from "@react-spring/web";

export const PageWrapper = styled(animated.div)`
  padding-top: 70px;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: scroll;
  background-color: rgb(249, 241, 215);
`;
export const ComponentWrapper = styled.div`
  height: auto;
  width: 100%;
  top: 70px;
  padding-bottom: 300px;
  overflow: hidden;
  @media (min-width: 768px) {
    max-width: 600px;
    margin-left: 50%;
    transform: translateX(-50%);
    overflow: visible;
  }
`;

export const ComponentInnerWrapper = styled.div`
  height: 100%;

  width: 80%;
  margin-left: 10%;
  margin-top: 60px;
`;

export const SubTitle = styled.h3`
  width: 80%;
  margin: auto;

  align-self: center;
  margin-bottom: 30px;
  margin-top: 10px;
`;

export const Title = styled.h2`
  font-size: 22px;
  align-self: center;
  margin-top: 10px;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

export const ButtonsWrapper = styled.div`
  margin-top: 30px;
`;
