/** @format */

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import moment from "moment";
import { clearErrors } from "./errorsActions";
import { loadProjectRoomData } from "./projectActions";
import store from "../store";

import {
  collection,
  where,
  query,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  SET_SCREAMS,
  LOADING_DATA,
  STOP_LOADING_DATA,
  DELETE_SCREAM,
  SET_ERRORS,
  POST_SCREAM,
  EDIT_SCREAM,
  LOADING_UI,
  SET_SCREAM,
  LOADING_IDEA_DATA,
  OPEN_SCREAM,
  CLOSE_SCREAM,
  SET_SCREAM_USER,
} from "../types";
import setColorByTopic from "../../data/setColorByTopic";

// Get all ideas
export const getScreams = (mapViewport) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });
    const screamsRef = collection(db, "screams");
    const q = query(
      screamsRef,

      where("lat", "<", Number(mapViewport.latitude) + 1),
      where("lat", ">", Number(mapViewport.latitude) - 1)
    );

    const querySnapshot = await getDocs(q);
    const screams = [];
    querySnapshot.forEach((doc) => {
      screams.push({
        ...doc.data(),
        screamId: doc.id,
        body: doc.data().body.substr(0, 150),
        color: setColorByTopic(doc.data().Thema),
      });
    });
    dispatch({
      type: SET_SCREAMS,
      payload: screams,
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: { title: "Error occured when loading" },
    });
    dispatch({
      type: STOP_LOADING_DATA,
    });
    console.log("Error getting document:", error);
  }
};

export const reloadScreams = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });

    const screamsRef = collection(db, "screams");
    const q = query(screamsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const screams = [];
    querySnapshot.forEach((doc) => {
      screams.push({
        ...doc.data(),
        screamId: doc.id,
        body: doc.data().body.substr(0, 150),
        color: setColorByTopic(doc.data().Thema),
      });
    });

    dispatch({
      type: SET_SCREAMS,
      payload: screams,
    });
    console.log(screams);
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: { title: "Error occured when loading" },
    });
    dispatch({
      type: STOP_LOADING_DATA,
    });
    console.log("Error getting document:", error);
  }
};

// Open an idea
export const openScreamFunc = (screamId, refreshScream) => async (dispatch) => {
  // When the modal is shown, we want a fixed body
  // document.body.style.position = "fixed";
  // document.body.style.top = `-${window.scrollY}px`;
  try {
    dispatch({ type: LOADING_IDEA_DATA });
    dispatch({ type: OPEN_SCREAM });
    const docRef = doc(db, `screams/${screamId}`);
    const screamDocSnapshot = await getDoc(docRef);

    if (screamDocSnapshot.exists()) {
      // add comments to the scream
      const commentRef = collection(db, "comments");
      const commentquery = query(
        commentRef,
        where("screamId", "==", screamId),
        orderBy("createdAt", "desc")
      );
      const commentquerySnapshot = await getDocs(commentquery);
      const commentsArray = [];
      commentquerySnapshot.forEach((doc) => {
        commentsArray.push({
          ...doc.data(),
          commentId: doc.id,
          body: doc.data().body.substr(0, 150),
        });
      });

      const scream = {
        ...screamDocSnapshot.data(),
        comments: commentsArray,
        screamId: screamDocSnapshot.id,
        color: setColorByTopic(screamDocSnapshot.data().Thema),
      };

      // window.location = "#" + scream.lat + "#" + scream.long;
      const projectroomPath = store.getState().UI.openProjectRoom
        ? "/projectRooms/" + store.getState().data.project.projectRoomId
        : "";
      if (!refreshScream) {
        // if  refreshScream parameter is false or does not exist
        // we want to open the scream in the new url path
        const newPath = `${projectroomPath}/${screamId}`;
        window.history.pushState(null, null, newPath);
      }
      // if refreshScream parameter is true
      // we want to open the scream in the current url path

      dispatch({ type: SET_SCREAM, payload: scream });
    } else {
      console.log("No such document!");
      dispatch({ type: CLOSE_SCREAM });
      dispatch({ type: SET_SCREAM, payload: {} });
      window.history.pushState(null, null, "/");
      throw new Error("Idea not found");
    }
  } catch (error) {
    console.error(error, "error in openScreamFunc");

    window.history.pushState(null, null, "/");
  }
};

export const closeScream = () => (dispatch) => {
  const projectroomPath =
    store.getState().UI.openProjectRoom && store.getState().data.project
      ? "/projectRooms/" + store.getState().data.project.projectRoomId
      : "/";

  dispatch({ type: CLOSE_SCREAM });

  // IF IT BECOMES NECESSARY (IF IN PROJECTROOM, GET PROJECTSCREAMS)
  // setTimeout(() => {
  //   dispatch(reloadScreams());
  // }, 100);

  window.history.pushState(null, null, projectroomPath);
};

// Post an idea
export const postScream = (newScream, user, history) => async (dispatch) => {
  console.log(history, user);
  const db = firebase.firestore();

  dispatch({ type: LOADING_DATA });

  if (newScream.title.trim() === "") {
    dispatch({
      type: SET_ERRORS,
      payload: { title: "" },
    });
  } else if (newScream.body.trim() === "") {
    dispatch({
      type: SET_ERRORS,
      payload: { body: "Beschreibung fehlt" },
    });
  } else {
    const ageCapture =
      user.age !== "" ? moment().diff(moment(user.age, "YYYY"), "years") : "";

    const newScreamData = {
      locationHeader: newScream.locationHeader,
      district: newScream.fulladdress,
      Stadtteil: newScream.neighborhood,
      title: newScream.title,
      lat: newScream.lat,
      long: newScream.long,
      body: newScream.body,
      userHandle: user.handle,
      userId: user.userId,
      sex: user.sex,
      age: ageCapture,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      commentCount: 0,
      status: "None",
      projectRoomId: newScream.projectRoomId,
    };

    if (newScream.Thema === "" || newScream.Thema === undefined) {
      newScreamData.Thema = "Sonstige";
    } else {
      newScreamData.Thema = newScream.Thema;
    }
    if (newScream.weblinkTitle)
      newScreamData.weblinkTitle = newScream.weblinkTitle;
    if (newScream.weblink) newScreamData.weblink = newScream.weblink;
    if (newScream.contactTitle)
      newScreamData.contactTitle = newScream.contactTitle;
    if (newScream.contact) newScreamData.contact = newScream.contact;
    if (newScream.selectedUnix)
      newScreamData.selectedUnix = newScream.selectedUnix;

    await db
      .collection("screams")
      .add(newScreamData)
      .then((doc) => {
        const resScream = newScream;
        resScream.screamId = doc.id;

        dispatch({
          type: POST_SCREAM,
          payload: resScream,
        });
        setTimeout(() => {
          dispatch(reloadScreams());
          if (newScream.projectRoomId) {
            dispatch(loadProjectRoomData(newScream.projectRoomId));
          }

          const screamId = resScream.screamId;
          dispatch(openScreamFunc(screamId));
        }, 100);
      });
  }
};

// Edit your idea
export const editScreamFunc = (editScream) => async (dispatch) => {
  const db = firebase.firestore();
  dispatch({ type: LOADING_UI });
  const screamId = editScream.screamId;

  if (editScream.notes) {
    editScream.notes = editScream.notes;
  } else {
    delete editScream.notes;
  }

  await db
    .collection("screams")
    .doc(screamId)
    .update(editScream)
    .then((doc) => {
      dispatch({
        type: EDIT_SCREAM,
        payload: editScream,
      });
    });
  dispatch(openScreamFunc(screamId));
  dispatch(clearErrors());
};

// Delete your idea
export const deleteScream = (screamId, user) => async (dispatch) => {
  const projectroomPath = store.getState().UI.openProjectRoom
    ? "/projectRooms/" + store.getState().data.project.projectRoomId
    : "/";
  const db = firebase.firestore();
  const ref = db.collection("screams").doc(screamId);
  const doc = await ref.get();

  console.log(doc.data());

  if (!doc.exists) {
    console.log("Scream not found");
  }
  // else if (doc.data().userHandle !== user.handle) {
  //   console.log("Unauthorized", doc.data().handle, user.handle);
  //   // return res.status(403).json({ error: "Unauthorized" });
  // }
  else {
    window.history.pushState(null, null, projectroomPath);

    dispatch({
      type: DELETE_SCREAM,
      payload: screamId,
    });
    ref.delete().then(() => {
      setTimeout(() => {
        window.location.reload(false);
        dispatch(clearErrors());
      }, 100);
    });
  }
};

export const getUserEmail = (userId) => async (dispatch) => {
  const db = firebase.firestore();
  await db
    .collection("users")
    .doc(userId)
    .collection("Private")
    .doc(userId)
    .get()
    .then((doc) => {
      dispatch({
        type: SET_SCREAM_USER,
        payload: doc.data(),
      });
    });
};
