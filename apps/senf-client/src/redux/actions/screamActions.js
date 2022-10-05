/** @format */

import moment from "moment";
import {
  collection,
  where,
  query,
  getDocs,
  orderBy,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { clearErrors } from "./errorsActions";
import { loadProjectRoomData } from "./projectActions";
import store from "../store";

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
  OPEN_PROJECTROOM,
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

    const screamsQuerySnapshot = await getDocs(q);
    const screams = [];

    screamsQuerySnapshot.forEach((doc) => {
      screams.push({
        ...doc.data(),
        screamId: doc.id,
        body: doc.data().body.substr(0, 180),
        color: setColorByTopic(doc.data().Thema),
        comments: [],
      });
    });
    const commentsRef = collection(db, "comments");

    const commentsQuerySnapshot = await getDocs(commentsRef);
    commentsQuerySnapshot.forEach((doc) => {
      // add comment for each scream
      const screamIndex = screams.findIndex(
        (scream) => scream.screamId === doc.data().screamId
      );
      if (screamIndex >= 0) {
        screams[screamIndex].comments.push({
          ...doc.data(),
          commentId: doc.id,
          body: doc.data().body.substr(0, 250),
        });
      }
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

// Open an idea
export const openScreamFunc = (screamId, reloadScream) => async (dispatch) => {
  dispatch({ type: SET_SCREAM, payload: {} });

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
          title: doc.data().body,
        });
      });

      const scream = {
        ...screamDocSnapshot.data(),
        comments: commentsArray,
        screamId: screamDocSnapshot.id,
        color: setColorByTopic(screamDocSnapshot.data().Thema),
      };

      const projectroomPath = store.getState().UI.openProjectRoom
        ? `/projectRooms/${store.getState().data.project.projectRoomId}`
        : `/idea`;

      const newPath = `${projectroomPath}/${screamId}`;
      window.history.pushState(null, null, newPath);

      dispatch({ type: SET_SCREAM, payload: scream });
    } else {
      window.history.pushState(null, null, "/");
      console.log("No such document!");
      dispatch({ type: CLOSE_SCREAM });
      dispatch({ type: SET_SCREAM, payload: {} });

      throw new Error("Idea not found");
    }
  } catch (error) {
    window.history.pushState(null, null, "/");
    throw new Error(error, "error in openScreamFunc");
  }
};

export const closeScream = () => (dispatch) => {
  const projectroomPath =
    store.getState().UI.openProjectRoom && store.getState().data.project
      ? `/projectRooms/${store.getState().data.project.projectRoomId}`
      : "/";

  dispatch({ type: CLOSE_SCREAM });

  // IF IT BECOMES NECESSARY (IF IN PROJECTROOM, GET PROJECTSCREAMS)
  // setTimeout(() => {
  //   dispatch(getScreams(store.getState().data.mapViewport));
  // }, 100);

  window.history.pushState(null, null, projectroomPath);
};

// Post an idea
export const postScream = (newScream, user) => async (dispatch) => {
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
    try {
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
        sex: user.sex ? user.sex : "",
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

      const docRef = await addDoc(collection(db, "screams"), newScreamData);

      const resScream = {
        ...newScreamData,
        screamId: docRef.id,
        color: setColorByTopic(newScreamData.Thema),
      };

      dispatch({
        type: POST_SCREAM,
        payload: resScream,
      });

      if (resScream.projectRoomId) {
        // @TODO: handle opening idea in projectroom context
        /*      '/projectRooms/:projectRoomId/:screamId'
          dispatch({ type: OPEN_PROJECTROOM });
        dispatch(loadProjectRoomData(resScream.projectRoomId));
        dispatch(openScreamFunc(resScream.screamId));  */
        return resScream;
      }
      // open scream in the main context
      // '/:screamId'
      // dispatch(openScreamFunc(resScream.screamId));
      return resScream;
    } catch (error) {
      throw new Error(error, "error in postScreamFunc");
    }
  }
};

// Edit your idea
export const editScreamFunc = (editScream) => async (dispatch) => {
  console.log(editScream);
  try {
    dispatch({ type: LOADING_UI });
    const { screamId } = editScream;

    const docRef = doc(db, `screams/${screamId}`);
    await updateDoc(docRef, editScream);
    dispatch({
      type: EDIT_SCREAM,
      payload: editScream,
    });

    // dispatch(openScreamFunc(screamId));
    // no need to download scream data, redux state is already up to date
    dispatch(clearErrors());
  } catch (error) {
    console.error(error, "error in editScreamFunc");
  }
};

// Delete your idea
export const deleteScream =
  (screamId, userId, isAdmin, isModerator) => async (dispatch) => {
    try {
      const returnToPath = store.getState().UI.openProjectRoom
        ? "/projectRooms/"
        : "/";
      const docRef = doc(db, `screams/${screamId}`);
      const scream = await getDoc(docRef);

      if (!scream.exists()) {
        console.log("Scream not found");
      }
      // else if (doc.data().userId !== user.userId) {
      //   console.log("Unauthorized", doc.data().handle, user.handle);
      //   // return res.status(403).json({ error: "Unauthorized" });
      // }
      else if (scream.data().userId === userId || isAdmin || isModerator) {
        await deleteDoc(docRef);

        dispatch({
          type: DELETE_SCREAM,
          payload: screamId,
        });
        dispatch({ type: CLOSE_SCREAM });
        dispatch({ type: SET_SCREAM, payload: {} });

        window.history.pushState(null, null, returnToPath);
      } else {
        throw new Error(
          `cant delete this users${doc.data().userHandle} scream`
        );
      }
    } catch (error) {
      throw new Error(error, "error in deleteScreamFunc");
    }
  };

export const getUserEmail = (userId) => async (dispatch) => {
  try {
    const docRef = doc(db, "users", userId, "Private", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data(), "userEmail");
    } else {
      throw new Error("User email not found");
    }
  } catch (error) {
    throw new Error(error, "error in getUserEmailFunc");
  }
};
