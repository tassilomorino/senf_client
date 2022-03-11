/** @format */

import React from "react";
import styled from "styled-components";

const Input = styled.input`
  /* -webkit-appearance: none;
  display: block;

  width: calc(100% - 28px);
  padding: 14px 14px 12px;
  height: 26px;

  font-weight: 400;
  line-height: 1.5;
  color: #353535;
  border: 1px solid white;

  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "white"};

  border-radius: 20px;
  margin-top: 0px;
  transition: all 0.15s ease;
  pointer-events: all;

  &:hover {
    border-color: black;
    background-color: white;
  }

  &:focus {
    outline: none;
    border-color: black;
    background-color: white;
  } */
  transition: all 0.15s ease;
  display: block;
  pointer-events: all;
  width: calc(100% - 28px);
  font-family: "Nunito", serif;
  background-color: rgba(255, 255, 255, 0.5);
  outline: none;
  padding: 14px;
  padding-left: ${(props) => (props.type === "search" ? "40px" : "14px")};
  border: solid ${(props) => (props.error ? "3px" : "2px")}
    ${(props) => (props.success ? "#067d68" : "rgba(255, 255, 255, 0)")};
  border-radius: 10px;
  font-size: 16px;
  text-align: left;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.7);
  }
  :-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.7);
  }
  &:focus {
    border: 3px solid rgb(254, 217, 87);
  }
`;

const Searchbar = ({
  placeholder,
  searchTerm,
  setSearchTerm,
  handleSearch,
  backgroundColor,
}) => {
  return (
    <Input
      type="text"
      value={searchTerm}
      placeholder={placeholder}
      onChange={(event) => setSearchTerm(event.target.value)}
      onKeyPress={handleSearch}
      backgroundColor={backgroundColor}
    />
  );
};

export default Searchbar;
