/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
import { closeAccountFunc } from "../../../redux/actions/accountActions";

//Components
import SwipeList from "../SwipeLists/SwipeList";
import Header from "../../molecules/Headers/Header";
import InfoModal from "../../molecules/DialogInlineComponents/InfoModal";

import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import {
  search,
  sort,
  filterByGeodata,
  filterByTagFilter,
} from "../../../util/helpers";
import { AccountTabData } from "../../../data/AccountTabData";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { useTranslation } from "react-i18next";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const Wrapper = styled.div`
  /* @media (min-width: 768px) {
    padding-top: 70px;
  } */
`;
const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;

  @media (min-width: 768px) {
    height: 30px;
  }
`;

const MapHider = styled.div`
  width: calc(100% - 600px);
  height: 100%;
  position: fixed;
  top: 0;
  left: 600px;
  background-color: #000;
  opacity: 0.6;
  z-index: 9;
`;

const Account = ({ dataFinalMap }) => {
  const { t } = useTranslation();
  const loadingMyScreams = useSelector((state) => state.data.loadingMyScreams);
  const [infoOpen, setInfoOpen] = useState(false);

  const mapBounds = useSelector((state) => state.data.mapBounds);
  const selectedTopics = useSelector((state) => state.data.topics);
  const myScreams = useSelector((state) => state.data.myScreams);
  const myOrganizations = useSelector((state) => state.data.myOrganizations);
  const user = useSelector((state) => state.user);
  const organizations = useSelector((state) => state.data.organizations);

  const [foundOrganizations, setFoundOrganizations] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdown, setDropdown] = useState("newest");
  const [order, setOrder] = useState(1);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    window.history.pushState(null, null, `/`);
    dispatch(closeAccountFunc());
    dispatch(handleTopicSelectorRedux("all"));
  }, [dispatch]);

  const handleClick = useCallback((order) => {
    setOrder(order);
  }, []);
  const handleDropdown = useCallback((value) => {
    setDropdown(value);
  }, []);
  // My Ideas
  const screamsSearched = search(myScreams, searchTerm, [
    "title",
    "body",
    "Stadtteil",
    "Stadtbezirk",
    "locationHeader",
  ]);
  const myIdeasfilteredByTagFilter = filterByTagFilter(
    screamsSearched,
    selectedTopics,
    "Thema"
  );
  const sortedScreams = sort(myIdeasfilteredByTagFilter, dropdown);
  //ideasData = filterByStatus(ideasData, dropdownStatus);
  const MyIdeasDataFinal = filterByGeodata(sortedScreams, mapBounds);

  //My Organizations
  const organizationsSearched = search(myOrganizations, searchTerm, ["title"]);
  const sortedOrganizations = sort(organizationsSearched, dropdown);
  const MyDataFinalOrganizations = sortedOrganizations;

  return (
    <React.Fragment>
      <Header
        type="account"
        infoOpen={infoOpen}
        setInfoOpen={setInfoOpen}
        loading={loadingMyScreams}
        order={order}
        handleClose={handleClose}
        handleClick={handleClick}
      />
      {!isMobileCustom && order === 0 && <MapHider />}

      <Wrapper>
        <SwipeList
          swipeListType={order === 1 ? "myIdeas" : "organizationsOverview"}
          type="myIdeas"
          tabLabels={AccountTabData.map((item) => item.text).slice(
            0,
            myOrganizations?.length > 0 ? 3 : 1
          )}
          loading={loadingMyScreams}
          order={order}
          handleClick={handleClick}
          dataFinal={order === 1 ? MyIdeasDataFinal : MyDataFinalOrganizations}
          dataFinalLength={MyIdeasDataFinal.length}
          handleDropdown={handleDropdown}
          dropdown={dropdown}
          dataFinalMap={dataFinalMap}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />

        {myScreams && (
          <InfoModal infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default Account;
