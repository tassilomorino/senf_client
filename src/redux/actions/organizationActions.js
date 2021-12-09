/** @format */

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { closeScream } from "./screamActions";
import {
  LOADING_ORGANIZATIONS_DATA,
  SET_ORGANIZATIONS,
  OPEN_ORGANIZATIONS,
  CLOSE_ORGANIZATIONS,
  OPEN_CREATE_ORGANIZATION,
} from "../types";

// Get all projects
export const getOrganizations = (mapViewport) => async (dispatch) => {
  dispatch({ type: LOADING_ORGANIZATIONS_DATA });

  const db = firebase.firestore();
  const storageRef = firebase.storage().ref();

  const ref = await db
    .collection("organizations")
    // .where("centerLat", "<", Number(mapViewport.latitude) + 1)
    // .where("centerLat", ">", Number(mapViewport.latitude) - 1)
    // .orderBy("createdAt", "desc")
    .get();
  // : await db.collection("projects").orderBy("createdAt", "desc").get();

  const organizations = [];
  ref.docs.forEach((doc) => {
    const image = storageRef
      .child(`/organizationsData/${doc.id}/logo/logo`)
      .getDownloadURL()
      .then((image) => {
        const docData = {
          organizationId: doc.id,
          title: doc.data().title,
          imgUrl: image,
        };
        organizations.push(docData);
      });
  });

  dispatch({
    type: SET_ORGANIZATIONS,
    payload: organizations,
  });
};

export const openOrganizationsFunc = () => async (dispatch) => {
  dispatch({
    type: OPEN_ORGANIZATIONS,
  });
};

export const closeOrganizationsFunc = () => async (dispatch) => {
  // dispatch({
  //   type: SET_MY_SCREAMS,
  //   payload: null,
  // });

  dispatch({
    type: CLOSE_ORGANIZATIONS,
  });
};

export const stateCreateOrganizationsFunc = (state) => async (dispatch) => {
  console.log(state);
  dispatch({
    type: OPEN_CREATE_ORGANIZATION,
    payload: state,
  });
};
