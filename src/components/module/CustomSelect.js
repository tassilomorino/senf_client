/** @format */

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

//Images
import Arrow from "../../images/icons/sort.png";

//Components
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const DropDownButton = styled.button`
  font-family: Futura PT W01 Book;
  font-size: 22px;
  color: #353535;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  border: 0.5px solid #353535;
  background-color: transparent;
`;

const DropDownListContainer = styled.div`
  position: absolute;
  right: 0;
  display: block;
  background-color: white;
  box-shadow: rgb(38, 57, 77, 0.7) 0px 20px 30px -15px;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  width: auto;
  height: auto;
  box-sizing: border-box;
`;

const DropDownList = styled.ul`
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-radius: 10px;
`;

const ListItem = styled("li")`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  text-align: left;
  color: #353535;
  font-family: Futura PT W01 Book;
  font-size: 20px;
  height: 30px;
  padding: 10px;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const CustomSelect = ({ initialValue, options, handleDropdown }) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const outerRef = useRef();

  const handleToggle = (event) => {
    event.preventDefault();

    setOpen(!open);
  };

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    handleDropdown(value);
    setOpen(false);
  };

  useOnClickOutside(outerRef, () => setOpen(false));

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  return (
    <div ref={outerRef}>
      <DropDownButton
        onClick={handleToggle}
        class="dropbtn"
        style={{ zIndex: 999 }}
      >
        {truncateString(selectedOption, 12)}

        <img src={Arrow} width="20px" style={{ paddingLeft: "5px" }}></img>
      </DropDownButton>
      {open && (
        <DropDownListContainer>
          <DropDownList>
            {options.map((option) => (
              <ListItem
                onClick={onOptionClicked(option.name)}
                key={Math.random()}
              >
                {option.name === selectedOption ? (
                  <span style={{ fontFamily: "Futura PT W01-Bold" }}>
                    {truncateString(option.label, 12)}
                  </span>
                ) : (
                  <span>{truncateString(option.label, 12)}</span>
                )}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </div>
  );
};

export default CustomSelect;
