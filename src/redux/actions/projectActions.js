/** @format */

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { closeScream } from "./screamActions";
import {
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_PROJECTS_DATA,
  SET_PROJECTS,
  SET_PROJECT,
  OPEN_PROJECT,
  CLOSE_PROJECT,
  OPEN_CREATE_PROJECTROOM,
} from "../types";
import setColorByTopic from "../../data/setColorByTopic";

// Get all projects
export const getProjects = (mapViewport) => async (dispatch) => {
  dispatch({ type: LOADING_PROJECTS_DATA });

  const db = firebase.firestore();
  const storageRef = firebase.storage().ref();

  const ref = await db
    .collectionGroup("projectRooms")
    // .where("centerLat", "<", Number(mapViewport.latitude) + 1)
    // .where("centerLat", ">", Number(mapViewport.latitude) - 1)
    // .orderBy("createdAt", "desc")
    .get();
  // : await db.collection("projects").orderBy("createdAt", "desc").get();

  const projects = [];
  ref.docs.forEach((doc) => {
    const image = storageRef
      .child(
        `/organizationsData/${doc.data().organizationId}/${doc.id}/thumbnail`
      )
      .getDownloadURL()
      .then((image) => {
        const docData = {
          project: doc.id,
          projectId: doc.id,
          title: doc.data().title,
          // description: doc.data().description,
          owner: doc.data().owner,
          createdAt: doc.data().createdAt,
          imgUrl: doc.data().imgUrl,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
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
          imgUrl: image,
        };
        projects.push(docData);
      });
  });

  dispatch({
    type: SET_PROJECTS,
    payload: projects,
  });
};

// Open a project
export const openProjectFunc = (projectRoomId) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  const db = firebase.firestore();
  const ref = await db
    .collectionGroup("projectRooms")
    .where("projectRoomId", "==", projectRoomId)
    .get();

  const screamsRef = await db
    .collection("screams")
    .where("project", "==", projectRoomId)
    .orderBy("createdAt", "desc")
    .get();

  ref.docs.forEach((doc) => {
    const project = doc.data();

    project.id = ref.id;
    project.screams = [];

    screamsRef.docs.forEach((doc) =>
      project.screams.push({
        ...doc.data(),
        screamId: doc.id,
        color: setColorByTopic(doc.data().Thema),
        body: doc.data().body.substr(0, 120),
      })
    );
    dispatch(closeScream());
    const newPath = `/projectRooms/${project.id}`;
    window.history.pushState(null, null, newPath);
    dispatch({ type: SET_PROJECT, payload: project });
    dispatch({ type: OPEN_PROJECT });

    dispatch({ type: STOP_LOADING_UI });
  });
};

export const closeProject = () => (dispatch) => {
  dispatch({ type: SET_PROJECT, payload: null });
  dispatch({ type: CLOSE_PROJECT });

  window.history.pushState(null, null, "/projectRooms");

  setTimeout(() => {
    document.body.style.overflow = "scroll";
  }, 1000);
};

export const openCreateProjectRoomFunc = (state) => async (dispatch) => {
  dispatch({
    type: OPEN_CREATE_PROJECTROOM,
    payload: state,
  });
};
