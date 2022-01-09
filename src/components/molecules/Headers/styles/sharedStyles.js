/** @format */

import styled from "styled-components";

export const FixedWrapper = styled.div`
  z-index: 91;
  position: fixed;
  width: 100%;
  overflow: visible;
  height: 50px;
  top: ${(props) => (props.moveUp ? "-120px" : "0px")};
  padding-top: 10px;

  transition: 0.4s;
  left: 0%;
  border-radius: 0px 0px;
  animation: downAnimation 1.7s ease-in-out;
  pointer-events: all;

  @media (min-width: 768px) {
    left: 200px;
    width: 400px;
  }

  @keyframes downAnimation {
    0% {
      transform: translateY(-100%);
    }
    50% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
`;

export const FlexWrapper = styled.div`
  position: relative;
  width: 95%;
  height: 50px;
  top: 0px;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.8);
  z-index: 3;
`;
export const StyledImg = styled.img`
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;

export const SVGWrapper = styled.div`
  position: absolute;
  top: -55px;
  left: 0;
  pointer-events: none;
  z-index: -1;
  width: 100%;
  height: 300px;
  overflow-x: hidden;

  @media (min-width: 768px) {
    width: 400px;
    animation: none;
  }
`;

export const StyledIcon = styled.img`
  width: 30px;
  top: 80px;
  left: calc(50% - 30px);
  position: absolute;
  z-index: 2;
  pointer-events: all;
`;

export const TitleWrapper = styled.div`
  font-size: 18px;
  font-family: PlayfairDisplay-Bold;
  color: #353535;
  text-align: center;
  width: 73%;
  margin-top: 15px;
  margin-bottom: 20px;
  max-width: 290px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 3;
`;
