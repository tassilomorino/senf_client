/** @format */

import styled from "styled-components";

export const EngagementWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  top: 0;
  right: 18px;
  width: 250px;
`;

export const ColorDot = styled.div`
  width: 15px;
  position: relative;
  height: 15px;
  border-radius: 100%;
  border: 0.5px solid white;
  background-color: ${(props) => props.color};
  opacity: 1;
  float: left;
`;

export const DistrictHeader = styled.div`
  float: left;
  height: 25px;
  margin-left: 10px;
  color: ${(props) => props.color};
`;

export const CardTitle = styled.div`
  clear: both;
  color: rgb(87, 87, 87);
  width: 100%;
  position: relative;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const ProjectOpenButton = styled.button`
  background-color: #f8f8f8;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  left: 0;
  height: 50px;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  bottom: 0;
  border-radius: 0%;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 10;
  color: #353535;
  font-size: 12pt;

  box-shadow: rgb(38, 57, 77, 0) 0px 20px 30px -15px;
`;
