/** @format */

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { closeScream } from "./screamActions";
import {
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_PROJECTS_DATA,
  SET_PROJECTS,
  SET_PROJECT,
  OPEN_PROJECTROOM,
  CLOSE_PROJECT,
  OPEN_CREATE_PROJECTROOM,
  LOADING_DATA,
  STOP_LOADING_DATA,
  LOADING_PROJECTROOM_DATA,
} from "../types";
import setColorByTopic from "../../data/setColorByTopic";
import { setSwipePositionDown } from "./UiActions";
import setIconByOrganizationType from "../../data/setIconByOrganizationType";
import store from "../store";
import { setMapBounds } from "./mapActions";

// Get all projects
export const getProjects = (mapViewport) => async (dispatch) => {
  dispatch({ type: LOADING_PROJECTS_DATA });

  const db = firebase.firestore();

  const ref = await db
    .collectionGroup("projectRooms")
    // .where("centerLat", "<", Number(mapViewport?.latitude) + 1)
    // .where("centerLat", ">", Number(mapViewport?.latitude) - 1)
    .where("status", "==", "active")
    .orderBy("createdAt", "desc")
    .get();
  // : await db.collection("projects").orderBy("createdAt", "desc").get();

  if (ref.size < 1 || !ref) {
    dispatch({ type: SET_PROJECTS, payload: [] });
  }
  const projects = [];
  ref.docs.forEach(async (doc) => {
    const docData = {
      projectRoomId: doc.data().projectRoomId,

      title: doc.data().title,
      brief: doc.data().brief,
      // owner: doc.data().owner,
      createdAt: doc.data().createdAt,
      // startDate: doc.data().startDate,
      // endDate: doc.data().endDate,
      status: doc.data().status,
      geoData: doc.data().geoData,
      centerLat: doc.data().centerLat,
      centerLong: doc.data().centerLong,
      zoom: doc.data().zoom,

      calendar: doc.data().calendar,
      organizationId: doc.data().organizationId,
      // weblink: doc.data().weblink,
      Thema: doc.data().Thema,
      organizationType: doc.data().organizationType,
      icon: setIconByOrganizationType(doc.data().organizationType),
      // ideasSize: newOne.length,
    };
    projects.push(docData);
    if (projects.length === ref.size) {
      dispatch({
        type: SET_PROJECTS,
        payload: projects,
      });
    }
  });
};

// Open a project

export const openProjectRoomFunc =
  (projectRoomId, state) => async (dispatch) => {
    if (state === true) {
      dispatch(setMapBounds(store.getState().data.initialMapBounds));

      dispatch({ type: LOADING_PROJECTROOM_DATA });
      dispatch({ type: OPEN_PROJECTROOM });
      dispatch(setSwipePositionDown());
      dispatch(loadProjectRoomData(projectRoomId));
      dispatch(closeScream());
      const newPath = `/projectRooms/${projectRoomId}`;
      window.history.pushState(null, null, newPath);
    } else {
      dispatch({ type: SET_PROJECT, payload: null });
      dispatch({ type: CLOSE_PROJECT });

      window.history.pushState(null, null, "/projectRooms");
    }
  };
export const loadProjectRoomData = (projectRoomId) => async (dispatch) => {
  const db = firebase.firestore();
  const ref = await db
    .collectionGroup("projectRooms")
    .where("projectRoomId", "==", projectRoomId)
    .get();

  const screamsRef = await db
    .collection("screams")
    .where("projectRoomId", "==", projectRoomId)
    .orderBy("createdAt", "desc")
    .get();

  ref.docs.forEach((doc) => {
    const projectRoom = doc.data();
    projectRoom.screams = [];

    screamsRef.docs.forEach((doc) =>
      projectRoom.screams.push({
        ...doc.data(),
        screamId: doc.id,
        color: setColorByTopic(doc.data().Thema),
        body: doc.data().body.substr(0, 120),
      })
    );

    dispatch({
      type: SET_PROJECT,
      payload: projectRoom,
    });
  });
};

export const openCreateProjectRoomFunc = (state) => async (dispatch) => {
  dispatch({
    type: OPEN_CREATE_PROJECTROOM,
    payload: state,
  });
};
