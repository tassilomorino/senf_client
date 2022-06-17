/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeAccountFunc } from "../redux/actions/accountActions";

import { handleTopicSelectorRedux } from "../redux/actions/UiActions";

import {
  search,
  sort,
  filterByGeodata,
  filterByTagFilter,
} from "../util/helpers";
import { useTranslation } from "react-i18next";

import { ProfilePage as ProfilePageComponent } from "senf-atomic-design-system";
import { logoutUser } from "../redux/actions/userActions";

const ProfilePage = ({
  dataFinalMap,
  setDeleteMenuOpen,
  handleButtonOpenCard,
  handleOpenProjectroom,
  setAuthEditOpen,
}) => {
  const { t } = useTranslation();
  const loadingMyScreams = useSelector((state) => state.data.loadingMyScreams);

  const mapBounds = useSelector((state) => state.data.mapBounds);
  const selectedTopics = useSelector((state) => state.data.topics);
  const myScreams = useSelector((state) => state.data.myScreams);
  const myOrganizations = useSelector((state) => state.data.myOrganizations);
  const user = useSelector((state) => state.user);
  const organizations = useSelector((state) => state.data.organizations);
  const organization = useSelector((state) => state.data.organization);

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

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <ProfilePageComponent
      user={user}
      organization={organization}
      organizations={organizations}
      myOrganizations={MyDataFinalOrganizations}
      handleButtonOpenCard={handleButtonOpenCard}
      handleOpenProjectroom={handleOpenProjectroom}
      handleButtonClose={handleClose}
      setAuthEditOpen={setAuthEditOpen}
      handleLogout={handleLogout}
      handleDeleteAccount={() => setDeleteMenuOpen(true)}

      // setEditProfileOpen,
    />
  );
};

export default ProfilePage;
