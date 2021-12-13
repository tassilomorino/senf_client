/** @format */

import React from "react";
import { useDispatch } from "react-redux";

import SortingSelect from "../../atoms/Selects/SortingSelect";
import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { useTranslation } from "react-i18next";

//Icons
import SearchIcon from "../../../images/icons/search.png";
import { setSwipePositionUp } from "../../../redux/actions/UiActions";
import Searchbar from "../../atoms/Searchbar/Searchbar";
import AddIcon from "../../../images/icons/plus_white.png";
import { stateCreateOrganizationsFunc } from "../../../redux/actions/organizationActions";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90px;
  transition: height 0.5s;
  padding: 10px 2.5% 10px 2.5%;

  animation: ToolbarAnimation 0.7s;
  pointer-events: none;

  @media (min-width: 768px) {
    top: 0px;
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

const ButtonsWrapper = styled.div`
  display: flex;
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
  color: #353535;
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
  margin-right: 5px;
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

  const openCreateOrganization = () => {
    dispatch(stateCreateOrganizationsFunc(true));
  };
  return (
    !loading && (
      <Wrapper type={type} searchOpen={searchOpen}>
        <Title>
          {dataFinalLength}{" "}
          {/* {dataFinalLength === 1 ? t("organization") : t("organizations")} */}
          Bürgerinitiativen
        </Title>

        <ButtonsWrapper>
          <SearchIconButton
            onClick={setSearch}
            searchTerm={searchTerm}
            searchOpen={searchOpen}
          >
            <img src={SearchIcon} width="20px" style={{ marginLeft: "auto" }} />
          </SearchIconButton>
          {/* <SortingSelect handleDropdown={handleDropdown} />{" "} */}
          <AddIconButton onClick={openCreateOrganization}>
            <img src={AddIcon} width="20px" style={{ marginLeft: "auto" }} />
          </AddIconButton>
        </ButtonsWrapper>
        {isMobileCustom && <Background onClick={handleClickSwipe} />}
        {searchOpen && (
          <Searchbar
            placeholder="Durchsuche Titel und Beschreibungen..."
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
        )}
      </Wrapper>
    )
  );
};

export default Toolbar;
