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
  LOADING_DATA,
  STOP_LOADING_DATA,
} from "../types";

// Get all projects
export const getOrganizations = (mapViewport) => async (dispatch) => {
  const db = firebase.firestore();
  const storageRef = firebase.storage().ref();

  const ref = await db
    .collection("organizations")
    // .where("centerLat", "<", Number(mapViewport.latitude) + 1)
    // .where("centerLat", ">", Number(mapViewport.latitude) - 1)
    // .orderBy("createdAt", "desc")
    .where("status", "==", "active")
    .get();

  if (ref.size < 1) {
    dispatch({
      type: SET_ORGANIZATIONS,
      payload: [],
    });
  }
  // : await db.collection("projects").orderBy("createdAt", "desc").get();

  const organizations = [];
  ref.docs.forEach((doc) => {
    storageRef
      .child(`/organizationsData/${doc.id}/logo/logo`)
      .getDownloadURL()
      .then(onResolve, onReject);

    function onResolve(image) {
      const docData = {
        ...doc.data(),
        organizationId: doc.id,
        imgUrl: image,
      };
      organizations.push(docData);
      if (organizations.length === ref.size) {
        dispatch({
          type: SET_ORGANIZATIONS,
          payload: organizations,
        });
      }
    }

    function onReject() {
      console.log("error loading organizations");
    }
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
      dispatch({ type: LOADING_DATA });
      dispatch({
        type: OPEN_ORGANIZATION,
        payload: null,
      });
      dispatch({
        type: OPEN_ORGANIZATION,
        payload: state,
      });
      dispatch(loadOrganizationData(organizationId));
      dispatch(closeScream());
      const newPath = `/organizations/${organizationId}`;
      window.history.pushState(null, null, newPath);
    } else {
      dispatch({ type: SET_ORGANIZATION, payload: null });

      dispatch({
        type: OPEN_ORGANIZATION,
        payload: null,
      });
      window.history.pushState(null, null, "/organizations");
    }
  };

export const loadOrganizationData = (organizationId) => async (dispatch) => {
  const db = firebase.firestore();
  const storageRef = firebase.storage().ref();
  const ref = await db.collection("organizations").doc(organizationId).get();

  if (!ref.exists) {
    console.log("No such document!");
  } else {
    storageRef
      .child(`/organizationsData/${organizationId}/logo/logo`)
      .getDownloadURL()
      .then((organizationImage) => {
        const organization = ref.data();
        organization.imgUrl = organizationImage;
        organization.organizationId = ref.id;
        organization.projectRooms = [];

        dispatch({ type: SET_ORGANIZATION, payload: organization });

        dispatch(loadOrganizationProjectRooms(organizationId, organization));
      });
  }
};

export const loadOrganizationProjectRooms =
  (organizationId, organization) => async (dispatch) => {
    const db = firebase.firestore();
    const storageRef = firebase.storage().ref();

    const projectRoomsRef = await db
      .collection("organizations")
      .doc(organizationId)
      .collection("projectRooms")
      .where("status", "==", "active")
      .orderBy("createdAt", "desc")
      .get();
    if (!projectRoomsRef.exists) {
      console.log("no prs in loadOrganizationProjectRooms");
    }

    projectRoomsRef.docs.forEach((doc) => {
      storageRef
        .child(
          `/organizationsData/${organization.organizationId}/${doc.id}/thumbnail`
        )
        .getDownloadURL()
        .then(onResolvePr, onRejectPr);

      function onResolvePr(projectRoomImage) {
        organization.projectRooms.push({
          ...doc.data(),
          projectRoomId: doc.id,
          imgUrl: projectRoomImage,
          organizationType: doc.data().organizationType,
        });
        dispatch({ type: SET_ORGANIZATION, payload: organization });
        // dispatch({ type: STOP_LOADING_DATA });
      }
      function onRejectPr(error) {
        console.log("error Pr");
      }
    });
  };

/*   export const loadOrganizationProjectRoomsArchived =
  (organizationId, organization) => async (dispatch) => {


     archivedProjectRoomsRef.docs.forEach((doc) => {
        storageRef
          .child(
            `/organizationsData/${organization.organizationId}/${doc.id}/thumbnail`
          )
          .getDownloadURL()
          .then(onResolvePr, onRejectPr);

        function onResolvePr(projectRoomImage) {
          organization.projectRooms.push({
            ...doc.data(),
            projectRoomId: doc.id,
            imgUrl: projectRoomImage,
          });
          dispatch({ type: SET_ORGANIZATION, payload: organization });
          dispatch({ type: STOP_LOADING_DATA });
        }
        function onRejectPr(error) {
          console.log("error Pr");
        }
      });
  }
 */
