/** @format */

import React from "react";
import lamploader from "../../../images/lamp.png";
import SortingSelect from "../../atoms/Selects/SortingSelect";
import styled, { keyframes } from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";

const enterAnimation = keyframes`
       0% {
  opacity: 0;
  transform: translateY(10%) ;
}
20% {
  opacity: 0;
  transform: translateY(10%);
}

100% {
  opacity: 1;
  transform: translateY(0%) ; 
}
    `;

const Wrapper = styled.div`
  font-family: PlayfairDisplay-Regular;
  font-size: 24px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 10px 2.5% 20px 2.5%;
  margin-top: ${(props) => props.marginTop && props.marginTop};
  animation: ${enterAnimation} 0.7s;
  pointer-events: none;
`;
const Bar = styled.div`
  position: absolute;
  width: 60px;
  height: 4px;
  border-radius: 10px;
  margin-left: calc(47.5% - 30px);
  background-color: white;
  top: 10px;
`;
const Background = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  z-index: -1;
  pointer-events: auto;
`;
const Toolbar = ({
  loading,
  dataFinal,
  handleDropdown,
  marginTop,
  handleClickSwipe,
}) => {
  return (
    !loading && (
      <Wrapper marginTop={marginTop}>
        {isMobileCustom && <Bar />}
        <div className="idea-header">
          <img
            src={lamploader}
            width="50px"
            style={{
              transform: "translateY(10px) rotate(30deg)",
            }}
            alt="lamploader"
          ></img>{" "}
          {dataFinal.length} Ideen{" "}
        </div>
        <SortingSelect handleDropdown={handleDropdown} />{" "}
        {isMobileCustom && <Background onClick={handleClickSwipe} />}
      </Wrapper>
    )
  );
};

export default Toolbar;
