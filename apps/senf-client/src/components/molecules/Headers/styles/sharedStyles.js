/** @format */

import styled from "styled-components";

export const FixedWrapper = styled.div`
  z-index: 91;
  position: fixed;
  overflow: hidden;
  height: 50px;
  width: 100%;
  margin: 10px 10px 0px 10px;
  top: 0px;
  transform: ${(props) => (props.moveUp ? "scale(0.8)" : "scale(1)")};
  opacity: ${(props) => (props.moveUp ? "0" : "1")};

  transition: 0.4s;
  left: 0%;
  border-radius: 0px 0px;
  pointer-events: none;

  @media (min-width: 768px) {
    left: 0px;
    width: 400px;
    position: relative;
  }
`;

export const InnerWrapper = styled.div`
  position: ${(props) => (props.isMobileCustom ? "fixed" : "absolute")};
  width: calc(100% - 20px);
  height: 50px;
  top: 0px;
  transition: 0.4s;
  pointer-events: all;
  background-color: rgb(255, 255, 255, 0.6);

  border-radius: ${(props) => (props.infoOpen ? "18px 18px 0px 0px" : "18px")};
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transition: 0.5;
`;

export const FlexWrapper = styled.div`
  position: relative;
  width: 78.5%;
  height: 50px;
  top: 0px;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: ${(props) => (props.order === 0 ? "60px" : "0px")};
  height: ${(props) => (props.order === 0 ? "60px" : "0px")};
  top: 15px;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.8);
  z-index: 3;
  margin-left: auto;
  transition: 0.5s;
`;
export const StyledImg = styled.img`
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;

export const SVGWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  pointer-events: none;
  z-index: -1;
  width: 100%;
  height: 300px;
`;

export const StyledIcon = styled.img`
  width: 30px;
  top: 10px;
  left: calc(100% - 53px);
  position: absolute;
  z-index: 2;
  pointer-events: all;
`;

export const TitleWrapper = styled.div`
  width: 73%;
  margin-top: 15px;
  margin-bottom: 20px;
  max-width: 290px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 3;
`;
