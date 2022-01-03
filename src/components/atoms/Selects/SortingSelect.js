/** @format */

import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

//Images
import Arrow from "../../../images/icons/arrow.png";

//Components
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { setSwipePositionUp } from "../../../redux/actions/UiActions";
import { FatH2 } from "../../../styles/GlobalStyle";

const DropDownContainer = styled("div")`
  position: relative;
`;

const DropDownButton = styled.button`
  justify-content: flex-end;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  /* border: 0.5px solid #353535; */
  background-color: transparent;
  pointer-events: auto;
`;

const DropDownListContainer = styled.div`
  position: absolute;
  left: 0;
  display: block;
  background-color: white;
  box-shadow: rgb(38, 57, 77, 0.7) 0px 20px 30px -15px;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  width: auto;

  min-width: 160px;
  height: auto;
  box-sizing: border-box;
  z-index: 99;
  pointer-events: auto;
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
  height: 30px;
  padding: 10px;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const SortingSelect = ({ handleDropdown }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("newest");
  const [selectedLabel, setSelectedLabel] = useState(t("newest"));

  const outerRef = useRef();

  const options = [
    { name: "newest", label: t("newest") },
    { name: "hottest", label: t("hottest") },
  ];

  const handleToggle = () => {
    setOpen(!open);
    if (isMobileCustom) {
      dispatch(setSwipePositionUp());
    }
  };

  const onOptionClicked = (value, label) => () => {
    setSelectedOption(value);
    setSelectedLabel(label);
    handleDropdown(value);
    setOpen(false);
  };

  // useOnClickOutside(outerRef, () => setOpen(false));

  return (
    <div ref={outerRef}>
      <DropDownContainer>
        <DropDownButton onClick={handleToggle} style={{ zIndex: 999 }}>
          {selectedLabel} {t("ideas")}
          <img
            src={Arrow}
            width="20px"
            style={{
              paddingLeft: "10px",
              transition: "0.5s",
              transform: open && "scaleY(-1)",
            }}
          />
          {/* <img src={Arrow} width="20px" style={{ paddingLeft: "5px" }}></img> */}
        </DropDownButton>
        {open && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option) => (
                <ListItem
                  onClick={onOptionClicked(option.name, option.label)}
                  key={Math.random()}
                >
                  {option.name === selectedOption ? (
                    <FatH2>{option.label}</FatH2>
                  ) : (
                    <h2>{option.label}</h2>
                  )}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </div>
  );
};

export default SortingSelect;
