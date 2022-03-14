/** @format */

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { isMobileCustom } from "../../util/customDeviceDetect";

import { closeScream } from "./screamActions";
import {
  LOADING_ORGANIZATIONS_DATA,
  LOADING_ORGANIZATION_DATA,
  SET_ORGANIZATIONS,
  OPEN_CREATE_ORGANIZATION,
  OPEN_ORGANIZATION,
  SET_ORGANIZATION,
  LOADING_DATA,
  STOP_LOADING_DATA,
} from "../types";
import setIconByOrganizationType from "../../data/setIconByOrganizationType";

// Get all projects
export const getOrganizations = (mapViewport) => async (dispatch) => {
  const db = firebase.firestore();
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
    const docData = {
      ...doc.data(),
      organizationId: doc.id,
    };
    organizations.push(docData);
    if (organizations.length === ref.size) {
      dispatch({
        type: SET_ORGANIZATIONS,
        payload: organizations,
      });
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
      dispatch({ type: LOADING_ORGANIZATION_DATA });

      dispatch({
        type: OPEN_ORGANIZATION,
        payload: true,
      });
      dispatch(loadOrganizationData(organizationId));
      dispatch(closeScream());
      const newPath = `/organizations/${organizationId}`;
      window.history.pushState(null, null, newPath);
    } else if (state === "hide") {
      if (isMobileCustom) {
        dispatch({
          type: OPEN_ORGANIZATION,
          payload: false,
        });
      }
    } else {
      dispatch({
        type: OPEN_ORGANIZATION,
        payload: false,
      });
      dispatch({ type: SET_ORGANIZATION, payload: null });
      window.history.pushState(null, null, "/organizations");
    }
  };

export const loadOrganizationData = (organizationId) => async (dispatch) => {
  const db = firebase.firestore();
  const ref = await db.collection("organizations").doc(organizationId).get();

  if (!ref.exists) {
    window.history.pushState(null, null, "/");
  } else {
    const organization = ref.data();
    organization.organizationId = ref.id;
    organization.projectRooms = [];

    dispatch(loadOrganizationProjectRooms(organizationId, organization));
  }
};

export const loadOrganizationProjectRooms =
  (organizationId, organization) => async (dispatch) => {
    const db = firebase.firestore();

    const projectRoomsRef = await db
      .collection("organizations")
      .doc(organizationId)
      .collection("projectRooms")
      .where("status", "==", "active")
      .orderBy("createdAt", "desc")
      .get();
    if (!projectRoomsRef.exists) {
      console.log("no prs in loadOrganizationProjectRooms");
      dispatch({ type: SET_ORGANIZATION, payload: organization });
    }

    projectRoomsRef.docs.forEach((doc) => {
      organization.projectRooms.push({
        ...doc.data(),
        projectRoomId: doc.id,
        organizationType: doc.data().organizationType,
        icon: setIconByOrganizationType(doc.data().organizationType),
      });
      dispatch({ type: SET_ORGANIZATION, payload: organization });
    });
  };
