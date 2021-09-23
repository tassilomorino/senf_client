/** @format */

import React from "react";
import lamploader from "../../../images/lamp.png";
import SortingSelect from "../Selects/SortingSelect";
import styled, { keyframes } from "styled-components";

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
`;

const ListHeader = ({ loading, dataFinal, handleDropdown, marginTop }) => {
  return (
    !loading && (
      <Wrapper marginTop={marginTop}>
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
      </Wrapper>
    )
  );
};

export default ListHeader;
