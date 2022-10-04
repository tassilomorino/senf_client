/** @format */

import {
  collection,
  collectionGroup,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

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

  const projectRoomsRef = collectionGroup(db, "projectRooms");
  const q = query(
    projectRoomsRef,
    // .where("centerLat", "<", Number(mapViewport?.latitude) + 1)
    // .where("centerLat", ">", Number(mapViewport?.latitude) - 1)
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  const projectRooms = [];
  if (querySnapshot.empty) {
    dispatch({
      type: SET_PROJECTS,
      payload: [],
    });
  } else {
    querySnapshot.forEach((doc) => {
      const project = {
        ...doc.data(),
        icon: setIconByOrganizationType(doc.data().organizationType),
      };
      projectRooms.push(project);
    });
    if (querySnapshot.size === projectRooms.length) {
      dispatch({
        type: SET_PROJECTS,
        payload: projectRooms,
      });
    }
  }
};

// Open a project

export const openProjectRoomFunc =
  (projectRoomId, state, navigate) => async (dispatch) => {
    if (state === true) {
      dispatch(setMapBounds(store.getState().data.initialMapBounds));

      dispatch({ type: LOADING_PROJECTROOM_DATA });
      // dispatch({ type: OPEN_PROJECTROOM });
      dispatch(setSwipePositionDown());
      dispatch(loadProjectRoomData(projectRoomId));
      dispatch(closeScream());
      const projectRoomURL = `/projectRoom/${projectRoomId}`;
      navigate(projectRoomURL);
    } else {
      dispatch({ type: SET_PROJECT, payload: null });
      dispatch({ type: CLOSE_PROJECT });
      navigate("/");
    }
  };
export const loadProjectRoomData = (projectRoomId) => async (dispatch) => {
  const projectRoomsRef = collectionGroup(db, "projectRooms");
  const q = query(projectRoomsRef, where("projectRoomId", "==", projectRoomId));
  const projectRoomsQuerySnapshot = await getDocs(q);

  const screamRef = collection(db, "screams");
  const q2 = query(
    screamRef,
    where("projectRoomId", "==", projectRoomId),
    orderBy("createdAt", "desc")
  );

  let projectRoom = { screams: [] };
  if (projectRoomsQuerySnapshot.empty) {
    dispatch({ type: SET_PROJECT, payload: {} });
  } else {
    projectRoom = {
      ...projectRoom,
      ...projectRoomsQuerySnapshot.docs[0].data(),
    };
    const screamQuerySnapshot = await getDocs(q2);
    if (screamQuerySnapshot.empty) {
      dispatch({ type: SET_PROJECT, payload: projectRoom });
    } else {
      screamQuerySnapshot.forEach((doc) => {
        projectRoom.screams.push({
          ...doc.data(),
          screamId: doc.id,
          color: setColorByTopic(doc.data().Thema),
          body: doc.data().body.substr(0, 120),
        });
      });
      dispatch({ type: SET_PROJECT, payload: projectRoom });
    }
  }
};

export const openCreateProjectRoomFunc = (state) => async (dispatch) => {
  dispatch({
    type: OPEN_CREATE_PROJECTROOM,
    payload: state,
  });
};
