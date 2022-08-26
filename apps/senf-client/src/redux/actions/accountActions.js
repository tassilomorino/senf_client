/** @format */

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import setColorByTopic from "../../data/setColorByTopic";
import { db } from "../../firebase";
import {
  SET_MY_SCREAMS,
  SET_MY_ORGANIZATIONS,
  OPEN_ACCOUNT,
  CLOSE_ACCOUNT,
  LOADING_MYSCREAMS_DATA,
  LOADING_MYORGANIZATIONS_DATA,
  SET_PROFILE_PAGE,
  RESET_PROFILE_PAGE,
} from "../types";

export const openAccountFunc = () => async (dispatch) => {
  dispatch({
    type: OPEN_ACCOUNT,
  });
};

export const getMyScreams = (userId, profilePage) => async (dispatch) => {
  // dispatch({ type: LOADING_MYSCREAMS_DATA });
  const screams = [];
  const screamsRef = collection(db, "screams");
  const q = query(
    screamsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const screamsSnapshot = await getDocs(q);
  if (screamsSnapshot.empty) {
    if (profilePage) {
      dispatch({
        type: SET_PROFILE_PAGE,
        payload: { screams },
      });
    } else {
      dispatch({
        type: SET_MY_SCREAMS,
        payload: screams,
      });
    }
  } else {
    screamsSnapshot.forEach((doc) => {
      screams.push({
        ...doc.data(),
        screamId: doc.id,
        body: `${doc.data().body.substring(0, 170)}...`,
        color: setColorByTopic(doc.data().topic),
      });
    });

    if (profilePage) {
      dispatch({
        type: SET_PROFILE_PAGE,
        payload: { screams },
      });
    } else {
      dispatch({
        type: SET_MY_SCREAMS,
        payload: screams,
      });
    }
  }
};
export const getMyOrganizations = (userId, profilePage) => async (dispatch) => {
  // dispatch({ type: LOADING_MYORGANIZATIONS_DATA });
  const organizations = [];
  const organizationsRef = collection(db, "organizations");
  const q = query(organizationsRef, where("userIds", "array-contains", userId));
  const organizationsSnapshot = await getDocs(q);
  if (organizationsSnapshot.empty) {
    if (profilePage) {
      dispatch({
        type: SET_PROFILE_PAGE,
        payload: { organizations },
      });
    } else {
      dispatch({
        type: SET_MY_ORGANIZATIONS,
        payload: organizations,
      });
    }
  } else {
    organizationsSnapshot.forEach((doc) => {
      organizations.push({
        ...doc.data(),
        organizationId: doc.id,
      });
    });
    if (profilePage) {
      dispatch({
        type: SET_PROFILE_PAGE,
        payload: { organizations },
      });
    } else {
      dispatch({
        type: SET_MY_ORGANIZATIONS,
        payload: organizations,
      });
    }
  }
};

export const closeAccountFunc = () => async (dispatch) => {
  dispatch({
    type: SET_MY_SCREAMS,
    payload: null,
  });
  dispatch({
    type: SET_MY_ORGANIZATIONS,
    payload: null,
  });

  dispatch({
    type: RESET_PROFILE_PAGE,
    payload: { guestData: {} },
  });

  dispatch({
    type: CLOSE_ACCOUNT,
  });
};
