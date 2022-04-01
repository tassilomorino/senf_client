/** @format */

import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  z-index: 99;
  cursor: pointer;
`;
const CheckIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;
const RadioIcon = styled.div`
  align-self: center;
  margin: 0 auto;
  width: 10px;
  position: relative;
  height: 10px;
  border-radius: 8px;

  flex-grow: 0;
  background-color: white;
`;

const StyledCheckbox = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 20px;
  height: 20px;
  background: ${(props) => (props.checked ? "#f2c71c" : "white")};
  border-radius: 6px;
  transition: all 150ms;
  border: 2px solid #f2c71c;
  ${CheckIcon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
  ${RadioIcon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const CheckBox = ({ type, selected, handleInputChange }) => {
  return (
    <CheckboxContainer onClick={handleInputChange}>
      {type === "checkbox" && (
        <StyledCheckbox checked={selected}>
          <CheckIcon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </CheckIcon>

          {/* <RadioIcon /> */}
        </StyledCheckbox>
      )}
      {type === "radio" && (
        <StyledCheckbox checked={selected}>
          <RadioIcon />
        </StyledCheckbox>
      )}
    </CheckboxContainer>
  );
};

export default CheckBox;
