/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { handleOrganizationTypesSelectorRedux } from "../../../redux/actions/UiActions";
import organizationTypes from "../../../data/organizationTypes";
import { useTranslation } from "react-i18next";

import styled, { keyframes } from "styled-components";
import { setSwipePositionDown } from "../../../redux/actions/UiActions";
import MapClickContainer from "./MapClickContainer";

const enterAnimation = keyframes`
       0% {
        margin-left: 100%;
}
80% {
        margin-left: 100%;
}


100% {
  margin-left: calc(100% - 120px);
}
    `;
const FilterWrapperMobile = styled.div`
  z-index: 15;
  position: fixed;

  top: ${(props) => (props.openScream ? "10px" : "90px")};
  width: 100%;

  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  transition: 1s;
  padding-bottom: 20px;
  padding-top: 20px;
  margin-top: -20px;
`;

const OpenButtonMobile = styled.div`
  position: absolute;
  width: 110px;

  height: 30px;
  z-index: 10;
  margin-left: -20px;
  margin-top: 0px;
  border-radius: 15px;
  display: ${(props) => (props.hide ? "block" : "none")};
`;

const FilterInnerWrapperMobile = styled.div`
  border-radius: 20px 0 0 20px;
  backdrop-filter: blur(5px);
  background-color: rgb(255, 255, 255, 0.5);
  box-shadow: 0 -18px 40px 12px rgba(0, 0, 0, 0.2);
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 5px;
  margin-left: calc(100% - 120px);
  animation: ${enterAnimation} 3.5s ease-out;
  z-index: 15;
  display: flex;
  flex-direction: row;
  width: max-content;
`;

const FilterWrapperDesktop = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  background-color: transparent;
  padding: 10px;
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  flex-wrap: wrap;
`;

export function OrganizationTypeFilter({ loading, column }) {
  const openScream = useSelector((state) => state.UI.openScream);
  const selectedOrganizationTypes = useSelector(
    (state) => state.data.organizationTypes
  );
  const [moveLeft, setMoveLeft] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (openScream) {
      setMoveLeft(false);
    }
  }, [openScream]);

  useEffect(() => {
    if (isMobileCustom && document.getElementById("Wrapper") !== null) {
      const el = document.getElementById("Wrapper");
      if (moveLeft) {
        el.scroll({
          top: 0,
          left: window.innerWidth - 125,
          behavior: "smooth",
        });
      } else {
        el.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [moveLeft]);

  // Handler at index 0 is for the "all" checkbox
  const organizationTypesFilters = organizationTypes.map(
    (organizationTypes, i) => {
      return (
        <Checkbox
          color="default"
          icon={<FiberManualRecordIcon />}
          checkedIcon={<FiberManualRecordIcon className="activelegenditem" />}
          onChange={() =>
            dispatch(
              handleOrganizationTypesSelectorRedux(organizationTypes.name)
            )
          }
          data-cy={organizationTypes.name}
          checked={
            selectedOrganizationTypes.includes(organizationTypes.name) &&
            selectedOrganizationTypes.length !== 7
          }
          style={{ color: organizationTypes.color }}
        />
      );
    }
  );

  return isMobileCustom && !loading ? (
    <FilterWrapperMobile openScream={openScream} id="Wrapper">
      <MapClickContainer />
      <FilterInnerWrapperMobile>
        <OpenButtonMobile
          onClick={() => setMoveLeft(!moveLeft)}
          hide={selectedOrganizationTypes.length === 7}
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<FiberManualRecordIcon />}
              checkedIcon={
                <FiberManualRecordIcon className="activelegenditem" />
              }
              data-cy="organizationTypes-all"
              onChange={() =>
                dispatch(handleOrganizationTypesSelectorRedux("all"))
              }
              checked={selectedOrganizationTypes.length === 7}
              style={{ color: "#000000" }}
            />
          }
          label={t("organizationTypes_all")}
        />
        {organizationTypes.map((organizationTypes, i) => (
          <FormControlLabel
            key={`${organizationTypes.name}-${i}`}
            control={organizationTypesFilters[i]}
            label={organizationTypes.label}
          />
        ))}
      </FilterInnerWrapperMobile>
    </FilterWrapperMobile>
  ) : (
    <FilterWrapperDesktop column={column}>
      <FormControlLabel
        control={
          <Checkbox
            icon={<FiberManualRecordIcon />}
            checkedIcon={<FiberManualRecordIcon className="activelegenditem" />}
            data-cy="organizationTypes-all"
            onChange={() =>
              dispatch(handleOrganizationTypesSelectorRedux("all"))
            }
            checked={selectedOrganizationTypes.length === 7}
            style={{ color: "#000000" }}
          />
        }
        label={t("organizationTypes_all")}
      />
      {organizationTypes.map((organizationTypes, i) => (
        <FormControlLabel
          key={`${organizationTypes.name}-${i}`}
          control={organizationTypesFilters[i]}
          label={organizationTypes.label}
        />
      ))}
    </FilterWrapperDesktop>
  );
}

export default React.memo(OrganizationTypeFilter);
