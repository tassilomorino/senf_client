/** @format */

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { closeScream } from "./screamActions";
import {
  LOADING_ORGANIZATIONS_DATA,
  SET_ORGANIZATIONS,
  OPEN_CREATE_ORGANIZATION,
  OPEN_ORGANIZATION,
  SET_ORGANIZATION,
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

export const stateCreateOrganizationsFunc = (state) => async (dispatch) => {
  console.log(state);
  dispatch({
    type: OPEN_CREATE_ORGANIZATION,
    payload: state,
  });
};

export const openOrganizationFunc =
  (state, organizationId) => async (dispatch) => {
    if (state === true) {
      // dispatch({ type: LOADING_UI });

      const db = firebase.firestore();
      const storageRef = firebase.storage().ref();

      const ref = await db
        .collection("organizations")
        .doc(organizationId)
        .get();

      const projectRoomsRef = await db
        .collection("organizations")
        .doc(organizationId)
        .collection("projectRooms")
        .orderBy("createdAt", "desc")
        .get();

      if (!ref.exists) {
        console.log("No such document!");
      } else {
        const organization = ref.data();

        const image = storageRef
          .child(`/organizationsData/${ref.id}/logo/logo`)
          .getDownloadURL()
          .then((organizationImage) => {
            organization.imgUrl = organizationImage;
            organization.organizationId = ref.id;
            organization.projectRooms = [];

            const newPath = `/organizations/${organization.organizationId}`;
            window.history.pushState(null, null, newPath);

            dispatch({ type: SET_ORGANIZATION, payload: organization });

            dispatch({
              type: OPEN_ORGANIZATION,
              payload: state,
            });

            projectRoomsRef.docs.forEach((doc) => {
              console.log(organization.organizationId);
              storageRef
                .child(
                  `/organizationsData/${organization.organizationId}/${doc.id}/thumbnail`
                )
                .getDownloadURL()
                .then((prjectRoomImage) => {
                  organization.projectRooms.push({
                    ...doc.data(),
                    projectRoomId: doc.id,
                    imgUrl: prjectRoomImage,
                  });
                })
                .then(() => {
                  dispatch({ type: SET_ORGANIZATION, payload: organization });
                });
            });
          });
      }
    } else {
      dispatch({
        type: OPEN_ORGANIZATION,
        payload: state,
      });
      dispatch({ type: SET_ORGANIZATION, payload: null });
    }
  };
