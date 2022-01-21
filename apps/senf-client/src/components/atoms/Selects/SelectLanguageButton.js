/** @format */

import React, { useEffect, memo, useState, useRef } from "react";
import i18n from "i18next";
import styled from "styled-components";
import Cookies from "universal-cookie";

//Images
import Arrow from "../../../images/icons/arrow.png";
import Circle from "../../../images/icons/circle_yellow.png";

//Components
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { setSwipePositionUp } from "../../../redux/actions/UiActions";
import { StyledH2 } from "../../../styles/GlobalStyle";
import { useTranslation } from "react-i18next";

const DropDownContainer = styled("div")`
  position: relative;
`;

const DropDownButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: transparent;
  pointer-events: auto;
  color: #353535;
  background-color: transparent;
  padding: 6px;
  border-radius: 15px;
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

  min-width: 50px;
  width: 50px;
  height: auto;
  transform: translateY(-100%) translateX(-15%);
  margin-top: -40px;
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

function SelectLanguageButtons() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(t("De"));

  const outerRef = useRef();

  const cookies = new Cookies();
  const langFromCookie = cookies.get("language");
  const [language, setLanguage] = React.useState("");

  useEffect(() => {
    setLanguage(langFromCookie);

    const selectedObj = basicSortingOptions.find(
      (x) => x.name === langFromCookie
    );

    setSelectedLabel(selectedObj.label);
  }, [langFromCookie]);

  const handleChange = (value, label) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    cookies.set("language", value);
    setSelectedLabel(label);
  };

  const basicSortingOptions = [
    { name: "de", label: t("DE") },
    { name: "en", label: t("EN") },
  ];

  // useEffect(() => {
  //   if (dropdown === "newest") {
  //     setSelectedLabel(t("newest"));
  //   }
  // }, [dropdown]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const onOptionClicked = (value, label) => () => {
    handleChange(value, label);

    setOpen(false);
  };

  useOnClickOutside(outerRef, () => setOpen(false));

  return (
    <div ref={outerRef}>
      <DropDownContainer>
        <DropDownButton onClick={handleToggle} style={{ zIndex: 999 }}>
          {selectedLabel || ""}
          <img
            src={Circle}
            width="40px"
            style={{
              position: "absolute",
              transition: "0.5s",
            }}
          />
          {/* <img src={Arrow} width="20px" style={{ paddingLeft: "5px" }}></img> */}
        </DropDownButton>
        {open && (
          <DropDownListContainer>
            <DropDownList>
              {basicSortingOptions.map((option) => (
                <ListItem
                  onClick={onOptionClicked(option.name, option.label)}
                  key={Math.random()}
                >
                  {option.name === language ? (
                    <StyledH2 fontWeight="900">{option.label}</StyledH2>
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
}

export default memo(SelectLanguageButtons);
