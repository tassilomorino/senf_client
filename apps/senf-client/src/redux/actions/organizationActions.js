/** @format */

import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
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
import { db } from "../../firebase";

import setIconByOrganizationType from "../../data/setIconByOrganizationType";

export const getOrganizations = (mapViewport) => async (dispatch) => {
  const organizations = [];
  const organizationsRef = collection(db, "organizations");
  const q = query(organizationsRef, where("status", "==", "active"));
  // .where("centerLat", "<", Number(mapViewport.latitude) + 1)
  // .where("centerLat", ">", Number(mapViewport.latitude) - 1)

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    dispatch({ type: SET_ORGANIZATIONS, payload: [] });
  } else {
    querySnapshot.forEach((doc) => {
      const organization = {
        ...doc.data(),
        organizationId: doc.id,
      };
      organizations.push(organization);
    });
    dispatch({ type: SET_ORGANIZATIONS, payload: organizations });
  }
};

export const stateCreateOrganizationsFunc = (state) => async (dispatch) => {
  console.log(state);
  dispatch({
    type: OPEN_CREATE_ORGANIZATION,
    payload: state,
  });
};

export const openOrganizationFunc =
  (organizationId, state) => async (dispatch) => {
    if (state === true) {
      console.log("open organization");
      dispatch({ type: SET_ORGANIZATION, payload: null });
      dispatch({
        type: OPEN_ORGANIZATION,
        payload: true,
      });

      dispatch({ type: LOADING_ORGANIZATION_DATA });

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
  const docRef = doc(db, `organizations/${organizationId}`);
  const organizationsDocSnapshot = await getDoc(docRef);
  if (!organizationsDocSnapshot.exists()) {
    window.history.pushState(null, null, "/");
  } else {
    const organization = organizationsDocSnapshot.data();
    organization.organizationId = organizationsDocSnapshot.id;
    organization.projectRooms = [];
    dispatch(loadOrganizationProjectRooms(organizationId, organization));
  }
};

export const loadOrganizationProjectRooms =
  (organizationId, organization) => async (dispatch) => {
    const docRef = collection(
      db,
      `organizations/${organizationId}/projectRooms`
    );
    const q = query(docRef, where("status", "==", "active"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      dispatch({ type: SET_ORGANIZATION, payload: organization });
    } else {
      querySnapshot.forEach((doc) => {
        organization.projectRooms.push({
          ...doc.data(),
          projectRoomId: doc.id,
          organizationType: doc.data().organizationType,
          icon: setIconByOrganizationType(doc.data().organizationType),
        });
      });
      dispatch({ type: SET_ORGANIZATION, payload: organization });
    }
  };
