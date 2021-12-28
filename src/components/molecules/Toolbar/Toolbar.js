/** @format */

import React from "react";
import { useDispatch } from "react-redux";

import SortingSelect from "../../atoms/Selects/SortingSelect";
import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { useTranslation } from "react-i18next";

//Icons
import SearchIcon from "../../../images/icons/search.png";
import AddIcon from "../../../images/icons/plus_white.png";

//Components
import { setSwipePositionUp } from "../../../redux/actions/UiActions";
import Searchbar from "../../atoms/Searchbar/Searchbar";
import { openCreateProjectRoomFunc } from "../../../redux/actions/projectActions";
import { stateCreateOrganizationsFunc } from "../../../redux/actions/organizationActions";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  transition: height 0.5s;
  padding: 0px 2.5% 10px 2.5%;

  animation: ToolbarAnimation 0.7s;
  pointer-events: none;
  flex-flow: wrap;
  @media (min-width: 768px) {
    position: fixed;
    top: ${(props) => (props.type === "standalone" ? "30px" : "100px")};
    z-index: 99;
    width: 380px;
    padding: 10px 10px 20px 10px;
  }

  @keyframes ToolbarAnimation {
    0% {
      opacity: 0;
      transform: translateY(10%);
    }
    20% {
      opacity: 0;
      transform: translateY(10%);
    }

    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  z-index: -1;
  pointer-events: auto;
`;

const Title = styled.h2`
  font-family: PlayfairDisplay-Bold;
  font-size: 22px;
  font-weight: 100;
  margin-left: 2.5%;
  color: white;
  align-self: center;
`;

const SearchIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f6cb2f;
  pointer-events: auto;
  margin-left: auto;
  margin-right: 10px;
  border: ${(props) =>
    props.searchTerm !== "" && !props.searchOpen
      ? "1px solid white"
      : "none"}; ;
`;

const AddIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f6cb2f;
  pointer-events: auto;
  margin-left: 5px;
  margin-right: 0px;
`;

const Toolbar = ({
  swipeListType,
  loading,
  type,
  handleDropdown,
  handleClickSwipe,
  dataFinalLength,
  setSearchOpen,
  searchOpen,
  setSearchTerm,
  searchTerm,
  order,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const setSearch = () => {
    setSearchOpen(!searchOpen);

    if (isMobileCustom) {
      dispatch(setSwipePositionUp());
    }
  };

  const openCreateProjectRoom = () => {
    dispatch(openCreateProjectRoomFunc(true));
  };

  const openCreateOrganization = () => {
    dispatch(stateCreateOrganizationsFunc(true));
  };
  return (
    !loading && (
      <Wrapper type={type} searchOpen={searchOpen}>
        {swipeListType === "ideas" ? (
          <Title>
            {dataFinalLength} {dataFinalLength === 1 ? t("idea") : t("ideas")}
          </Title>
        ) : swipeListType === "projectRoomOverview" ? (
          <Title>
            {dataFinalLength}{" "}
            {dataFinalLength === 1 ? t("projectRoom") : t("projectRooms")}
          </Title>
        ) : (
          swipeListType === "organizationOverview" && (
            <Title>
              {dataFinalLength}{" "}
              {dataFinalLength === 1 ? t("organization") : t("organizations")}
            </Title>
          )
        )}

        <SearchIconButton
          onClick={setSearch}
          searchTerm={searchTerm}
          searchOpen={searchOpen}
        >
          <img
            src={SearchIcon}
            width="20px"
            style={{ marginLeft: "auto" }}
            alt=""
          />
        </SearchIconButton>
        {swipeListType === "ideas" ? (
          <SortingSelect handleDropdown={handleDropdown} />
        ) : swipeListType === "projectRoomOverview" ? (
          <AddIconButton onClick={openCreateProjectRoom}>
            <img src={AddIcon} width="20px" style={{ marginLeft: "auto" }} />
          </AddIconButton>
        ) : (
          swipeListType === "organizationOverview" && (
            <AddIconButton onClick={openCreateOrganization}>
              <img src={AddIcon} width="20px" style={{ marginLeft: "auto" }} />
            </AddIconButton>
          )
        )}

        {isMobileCustom && <Background onClick={handleClickSwipe} />}
        {searchOpen && (
          <Searchbar
            placeholder={t("searchBar")}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
        )}
      </Wrapper>
    )
  );
};

export default Toolbar;
