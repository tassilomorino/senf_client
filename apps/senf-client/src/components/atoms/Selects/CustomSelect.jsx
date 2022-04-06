/** @format */

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

//Images
import Arrow from "../../../images/icons/arrow.png";

//Components
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { StyledH3, StyledLi } from "../../../styles/GlobalStyle";
import CheckBox from "../CheckBox/CheckBox";

const DropDownButton = styled.button`
  color: #353535;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  /* border: 0.5px solid #353535; */
  background-color: transparent;
  pointer-events: all;
`;

const DropDownListContainer = styled.div`
  display: block;
  background-color: white;
  box-shadow: rgb(38, 57, 77, 0.7) 0px 20px 30px -15px;

  border: 1px solid #e5e5e5;

  position: fixed;
  display: flex;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 95%;
  max-width: 400px;
  height: auto;
  max-height: 80vh;
  overflow-y: ${(props) => (props.overflow ? props.overflow : "scroll")};
  box-sizing: border-box;
  z-index: 99999;
  border-radius: 20px;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 99998;
  background-color: rgb(0, 0, 0, 0.6);
`;

const DropDownList = styled.div`
  overflow-y: ${(props) => (props.overflow ? props.overflow : "scroll")};
  border-radius: 10px;
  width: 100%;
  padding-bottom: 30px;
`;

const ListItem = styled.div`
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
    cursor: pointer;
  }
`;

const ColorDot = styled.div`
  width: 16px;
  position: relative;
  height: 16px;
  border-radius: 15px;
  background-color: ${(props) => props.color};
  opacity: 1;

  margin-right: 10px;
`;
const Img = styled.img`
  width: 40px;
  position: relative;
  height: 40px;
  border-radius: 15px;
  margin-right: 10px;
`;

const StyledDivider = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 80%;

  display: flex;
  margin: 0 auto 10px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  padding-top: 10px;
  padding-left: 10%;
`;
const CheckBoxLabel = styled.label`
  font-size: 18px;
  color: #353535;
  font-weight: ${(props) => (props.selected ? "600" : "100")};
  margin-left: 20px;
  cursor: pointer;
`;

const CustomSelect = ({
  overflow,
  value,
  initialValue,
  options,
  sortOptions,
  statusOptions,
  dropdownStatus,
  dropdownStatusNumbers,
  handleDropdown,
  handleDropdownStatus,
}) => {
  const [open, setOpen] = useState(false);
  const DOMElement = document.getElementById("portal-root-modal");
  const [selectedOption, setSelectedOption] = useState(initialValue ?? value);
  const [selectedLabel, setSelectedLabel] = useState(initialValue ?? value);
  const [dropDownButtonAmount, setDropDownButtonAmount] = useState(28);

  useEffect(() => {
    if (document.body.clientWidth < 350) {
      setDropDownButtonAmount(19);
    } else if (document.body.clientWidth < 400) {
      setDropDownButtonAmount(25);
    }
  }, []);

  useEffect(() => {
    if (options) {
      for (const option of options) {
        if (option.name === value) {
          setSelectedLabel(option.label);
        }
      }
    }

    if (sortOptions) {
      for (const option of sortOptions) {
        if (option.name === value) {
          setSelectedLabel(option.label);
        }
      }
    }
  }, [value, options, sortOptions]);

  const outerRef = useRef();
  useOnClickOutside(outerRef, () => setOpen(false));

  const handleToggle = (event) => {
    event.preventDefault();

    setOpen(!open);
  };
  let dontCloseWindow = true;
  const onOptionClicked = (value, label, dontCloseWindow) => () => {
    setSelectedOption(value);
    setSelectedLabel(label);
    handleDropdown(value);
    dontCloseWindow ? setOpen(true) : setOpen(false);
  };

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  return (
    <React.Fragment>
      <DropDownButton onClick={handleToggle} style={{ zIndex: 999 }}>
        <StyledH3 fontWeight={400}>
          {truncateString(selectedLabel, dropDownButtonAmount)}
        </StyledH3>

        <img
          src={Arrow}
          width="13px"
          style={{
            paddingLeft: "10px",
            transition: "0.5s",
            transform: open && "scaleY(-1)",
          }}
          alt="filter selection"
        />
      </DropDownButton>

      {open &&
        DOMElement !== null &&
        ReactDOM.createPortal(
          <React.Fragment>
            <DropDownListContainer id="container">
              <DropDownList overflow={overflow}>
                {options && (
                  <>
                    {options?.map((option) => (
                      <ListItem
                        onClick={onOptionClicked(option.name, option.label)}
                        key={option.name}
                      >
                        <React.Fragment>
                          {option.color && <ColorDot color={option.color} />}
                          {option.img && <Img src={option.img} />}
                          <span
                            style={
                              option.name === selectedOption ||
                              option.label === selectedLabel
                                ? { fontWeight: "900" }
                                : {}
                            }
                          >
                            {option.label}
                          </span>
                        </React.Fragment>
                      </ListItem>
                    ))}
                  </>
                )}
                {sortOptions && (
                  <>
                    <StyledH3 textAlign={"center"} padding={"10px"}>
                      Sort By
                    </StyledH3>
                    <StyledDivider />
                    {sortOptions?.map((sortOption, index) => (
                      <CheckBoxWrapper key={sortOption.name}>
                        <CheckBox
                          type="radio"
                          selected={selectedOption.includes(sortOption.name)}
                          handleInputChange={onOptionClicked(
                            sortOption.name,
                            sortOption.label,
                            dontCloseWindow
                          )}
                        />

                        <CheckBoxLabel
                          onClick={onOptionClicked(
                            sortOption.name,
                            sortOption.label,
                            dontCloseWindow
                          )}
                          htmlFor={sortOption}
                          selected={selectedOption.includes(sortOption.name)}
                        >
                          {sortOption.label}
                        </CheckBoxLabel>
                      </CheckBoxWrapper>
                    ))}
                  </>
                )}
                {/* temporary disabled functionality for dropdown status filter */}
                {/* {statusOptions && (
                  <>
                    <StyledH3
                      textAlign={"center"}
                      padding={"10px"}
                      margin={"25px 0px 0px"}
                    >
                      Filter By
                    </StyledH3>
                    <StyledDivider />
                    {statusOptions?.map((filter, i) => (
                     
                        <CheckBoxWrapper key={filter.name}>
                          <CheckBox
                            type="checkbox"
                            selected={dropdownStatus.includes(filter.name)}
                            handleInputChange={() =>
                              handleDropdownStatus(filter.name)
                            }
                          />
                          <CheckBoxLabel
                            onClick={() => handleDropdownStatus(filter.name)}
                            selected={dropdownStatus.includes(filter.name)}
                          >
                            {filter.label} ({dropdownStatusNumbers[filter.name]}
                            )
                          </CheckBoxLabel>
                        </CheckBoxWrapper>
                      
                    ))}
                  </>
                )} */}
              </DropDownList>
            </DropDownListContainer>

            <Background onClick={() => setOpen(false)} />
          </React.Fragment>,
          document.getElementById("portal-root-modal")
        )}
    </React.Fragment>
  );
};

export default CustomSelect;
