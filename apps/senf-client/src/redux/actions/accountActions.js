/** @format */

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import setColorByTopic from "../../data/setColorByTopic";

import {
  SET_MY_SCREAMS,
  SET_MY_ORGANIZATIONS,
  OPEN_ACCOUNT,
  CLOSE_ACCOUNT,
  LOADING_MYSCREAMS_DATA,
  LOADING_MYORGANIZATIONS_DATA,
} from "../types";

export const openAccountFunc = () => async (dispatch) => {
  dispatch({
    type: OPEN_ACCOUNT,
  });
};

export const getMyScreams = (userId) => async (dispatch) => {
  dispatch({ type: LOADING_MYSCREAMS_DATA });
  const db = firebase.firestore();
  const ref = await db
    .collection("screams")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  const screams = [];

  ref.docs?.forEach((doc) => {
    const docData = {
      screamId: doc.id,
      lat: doc.data().lat,
      long: doc.data().long,
      title: doc.data().title,
      body: doc.data().body.substr(0, 170),
      createdAt: doc.data().createdAt,
      commentCount: doc.data().commentCount,
      likeCount: doc.data().likeCount,
      status: doc.data().status,
      Thema: doc.data().Thema,
      Stadtteil: doc.data().Stadtteil,
      project: doc.data().project,
      projectId: doc.data().project,
      color: setColorByTopic(doc.data().Thema),
    };

    screams.push(docData);
  });

  dispatch({
    type: SET_MY_SCREAMS,
    payload: screams,
  });
};
export const getMyOrganizations = (userId) => async (dispatch) => {
  dispatch({ type: LOADING_MYORGANIZATIONS_DATA });
  const db = firebase.firestore();
  const ref = await db
    .collection("organizations")
    // .where("centerLat", "<", Number(mapViewport.latitude) + 1)
    // .where("centerLat", ">", Number(mapViewport.latitude) - 1)
    .orderBy("createdAt", "desc")
    .where("userIds", "array-contains", userId)
    .get();

  const organizations = [];

  ref.docs.forEach((doc) => {
    const docData = {
      ...doc.data(),
      organizationId: doc.id,
    };
    organizations.push(docData);

    if (organizations.length === ref.size) {
      dispatch({
        type: SET_MY_ORGANIZATIONS,
        payload: organizations,
      });
    }
  });
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
    type: CLOSE_ACCOUNT,
  });
};
