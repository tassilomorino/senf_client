/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { ProfilePage as ProfilePageComponent, ModalContext, Loader } from "senf-atomic-design-system";
import { getAuth } from "firebase/auth";
import { useParams, useHistory } from "react-router-dom";

import { closeAccountFunc, getMyOrganizations, getMyScreams } from "../redux/actions/accountActions";

import { handleTopicSelectorRedux } from "../redux/actions/UiActions";

import {
  search,
  sort,
  filterByGeodata,
  filterByTagFilter,
} from "../util/helpers";

import { deleteUserFromDb, getUserData, logoutUser } from "../redux/actions/userActions";
import Auth from "./Auth";
import { isMobileCustom } from "../util/customDeviceDetect";

const ProfilePage = ({
  handleButtonOpenCard,
  handleOpenProjectroom,
  setAuthEditOpen,
  handleButtonLike,
  handleButtonComment,
}) => {

  const { t } = useTranslation();
  const { handleModal } = React.useContext(ModalContext) || {};

  const loadingMyScreams = useSelector((state) => state.data.loadingMyScreams);

  const mapBounds = useSelector((state) => state.data.mapBounds);
  const selectedTopics = useSelector((state) => state.data.topics);
  const myOrganizations = useSelector((state) => state.user.myOrganizations);
  const myProfileData = useSelector((state) => state.user);

  const profilePageUser = useSelector((state) => state.data.profilePage?.profilePageData?.userData);
  const profilePageScreams = useSelector((state) => state.data.profilePage?.profilePageData?.screams);
  const profilePageOrganizations = useSelector((state) => state.data.profilePage?.profilePageData?.organizations);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const organizations = useSelector((state) => state.data.organizations);
  const organization = useSelector((state) => state.data.organization);


  const [foundOrganizations, setFoundOrganizations] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdown, setDropdown] = useState("newest");
  const [order, setOrder] = useState(1);
  const [accountOwner, setAccountOwner] = useState(false);
  const [elevatedUser, setElevatedUser] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const firebaseUser = auth.currentUser;
  const history = useHistory();
  const handleClose = useCallback(() => {


    dispatch(closeAccountFunc());
    dispatch(handleTopicSelectorRedux("all"));

    history.push("/");
    // history.goBack(); // @Todo: why it goes back to /projectroom ?? it should be /idea/1234

  }, [dispatch, history]);

  const handleClick = useCallback((order) => {
    setOrder(order);
  }, []);
  const handleDropdown = useCallback((value) => {
    setDropdown(value);
  }, []);
  // My Ideas
  const screamsSearched = search(profilePageScreams, searchTerm, [
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
  // ideasData = filterByStatus(ideasData, dropdownStatus);
  const MyIdeasDataFinal = filterByGeodata(sortedScreams, mapBounds);

  // My Organizations
  const organizationsSearched = search(myOrganizations, searchTerm, ["title"]);
  const sortedOrganizations = sort(organizationsSearched, dropdown);
  const MyDataFinalOrganizations = sortedOrganizations;

  const { profileId } = useParams() // /profile/V4JkU7aQ...


  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  const handleDeleteAccount = () => {
    dispatch(deleteUserFromDb(firebaseUser.uid)).then(() => {
      handleModal("pop")
      handleModal("pop")
      history.push('/');
    }).catch(err => {
      throw new Error(err, ' error in deleteUserFromDb in ProfilePage.jsx')
    })
  };

  useEffect(() => {

    if (myProfileData.isAdmin === true || myProfileData.isSuperAdmin === true ||
      myProfileData.isModerator === true) {
      setElevatedUser(true)
    } else {

      setElevatedUser(false)
    }



  }, [myProfileData, profileId])

  useEffect(() => {
    if (myProfileData && myProfileData.authenticated && myProfileData.userId === profileId) {
      setAccountOwner(true)
    } else {
      setAccountOwner(false)
    }

  }, [myProfileData, profileId])






  return (

    <React.Fragment >

      <ProfilePageComponent
        user={profilePageUser}
        myProfileData={myProfileData}
        accountOwner={accountOwner}
        elevatedUser={elevatedUser}
        organization={organization}
        organizations={organizations}
        profilePageOrganizations={profilePageOrganizations}
        profilePageScreams={profilePageScreams}
        handleButtonOpenCard={handleButtonOpenCard}
        handleOpenProjectroom={handleOpenProjectroom}
        handleButtonLike={handleButtonLike}
        handleButtonComment={handleButtonComment}
        handleButtonClose={handleClose}
        handleSetAuthEditOpen={() => handleModal("push", <Auth authAddDetails={true} />, { swipe: !!isMobileCustom, size: "md", height: isMobileCustom && window.innerHeight + 83, padding: 0 })

        }
        handleLogout={handleLogout}
        handleDeleteAccount={handleDeleteAccount}

      // setEditProfileOpen,
      />


    </React.Fragment >

  );
};

export default ProfilePage;
