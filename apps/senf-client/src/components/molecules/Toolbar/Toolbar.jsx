/** @format */

import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import SortingSelect from "../../atoms/Selects/SortingSelect";
import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { useTranslation } from "react-i18next";

//Icons
import SearchIcon from "../../../images/icons/search-black.png";
import AddIcon from "../../../images/icons/plus_white.png";

//Components
import { setSwipePositionUp } from "../../../redux/actions/UiActions";
import Searchbar from "../../atoms/Searchbar/Searchbar";
import { openCreateProjectRoomFunc } from "../../../redux/actions/projectActions";
import CustomSelect from "../../atoms/Selects/CustomSelect";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  transition: height 0.5s;
  padding: 0px 10px 10px 10px;
  padding-bottom: ${(props) => (props.searchOpen ? "70px" : "10px")};
  transition: 0.5s;

  animation: ToolbarAnimation 0.7s;
  pointer-events: none;
  flex-flow: wrap;
  @media (min-width: 768px) {
    position: relative;
    margin-top: ${(props) => (props.marginTop ? props.marginTop : "30px")};
    z-index: 99;
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

const SearchIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  pointer-events: auto;
  margin-left: auto;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${(props) =>
    props.searchTerm !== "" ? "white" : "transparent"}; ;
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
  marginTop,
  handleDropdown,
  handledropdownStatus,
  dropdown,
  dropdownStatus,
  handleClickSwipe,
  dataFinalLength,
  setSearchOpen,
  searchOpen,
  setSearchTerm,
  searchTerm,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const setSearch = () => {
    setSearchOpen(!searchOpen);

    if (isMobileCustom) {
      dispatch(setSwipePositionUp());
    }
  };
  console.log(dropdown, "dropdown");
  return (
    !loading && (
      <Wrapper marginTop={marginTop} searchOpen={searchOpen}>
        {swipeListType === "ideas" ? (
          <CustomSelect
            overflow={"none"}
            initialValue={t("newest_ideas")}
            dropdown={dropdown}
            dropdownStatus={dropdownStatus}
            sortOptions={[
              { name: "newest", label: t("newest_ideas") },
              { name: "hottest", label: t("hottest_ideas") },
            ]}
            statusOptions={[
              { name: "Unprocessed", label: t("unprocessed") },
              { name: "Accepted", label: t("accepted") },
              { name: "Planning", label: t("planning") },
              { name: "Implemented", label: t("implemented") },
              { name: "Rejected", label: t("rejected") },
            ]}
            handleDropdown={handleDropdown}
            handleDropdownStatus={handledropdownStatus}
          />
        ) : // <SortingSelect
        //   label={t("ideas")}
        //   handleDropdown={handleDropdown}
        //   dropdown={dropdown}
        // />

        swipeListType === "projectRoomOverview" ? (
          <CustomSelect
            name={t("newest_projectrooms")}
            value={dropdown}
            initialValue={dropdown}
            sortOptions={[
              { name: "newest", label: t("newest_projectrooms") },
              { name: "aToZ", label: t("aToZ_projectrooms") },
              { name: "zToA", label: t("zToA_projectrooms") },
            ]}
            handleDropdown={handleDropdown}
          />
        ) : (
          swipeListType === "organizationsOverview" && (
            <CustomSelect
              name={t("newest_organizations")}
              value={dropdown}
              initialValue={dropdown}
              sortOptions={[
                { name: "newest", label: t("newest_organizations") },
                { name: "aToZ", label: t("aToZ_organizations") },
                { name: "zToA", label: t("zToA_organizations") },
              ]}
              handleDropdown={handleDropdown}
            />
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

        {isMobileCustom && <Background onClick={handleClickSwipe} />}
        {searchOpen && (
          <Searchbar
            placeholder={
              swipeListType === "organizationsOverview"
                ? t("searchBarOrganizations")
                : t("searchBar")
            }
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
        )}
      </Wrapper>
    )
  );
};

export default memo(Toolbar);
