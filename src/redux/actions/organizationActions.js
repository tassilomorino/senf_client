/** @format */

import firebase from "firebase/app";
import "firebase/firestore";

import { closeScream } from "./screamActions";
import { LOADING_ORGANIZATIONS_DATA, SET_ORGANIZATIONS } from "../types";

// Get all projects
export const getOrganizations = (mapViewport) => async (dispatch) => {
  dispatch({ type: LOADING_ORGANIZATIONS_DATA });

  const db = firebase.firestore();
  const ref = await db
    .collection("organizations")
    // .where("centerLat", "<", Number(mapViewport.latitude) + 1)
    // .where("centerLat", ">", Number(mapViewport.latitude) - 1)
    // .orderBy("createdAt", "desc")
    .get();
  // : await db.collection("projects").orderBy("createdAt", "desc").get();

  const organizations = [];
  ref.docs.forEach((doc) => {
    const docData = {
      id: doc.id,
      title: doc.data().title,
    };

    organizations.push(docData);
  });

  dispatch({
    type: SET_ORGANIZATIONS,
    payload: organizations,
  });
};

// // Open a project
// export const openProjectFunc = (project) => async (dispatch) => {
//   dispatch({ type: LOADING_UI });

//   const db = firebase.firestore();
//   const ref = await db.collection("projects").doc(project).get();

//   const screamsRef = await db
//     .collection("screams")
//     .where("project", "==", project)
//     .orderBy("createdAt", "desc")
//     .get();

//   if (!ref.exists) {
//     console.log("No such document!");
//   } else {
//     const project = ref.data();

//     project.id = ref.id;
//     project.screams = [];

//     screamsRef.docs.forEach((doc) =>
//       project.screams.push({
//         ...doc.data(),
//         screamId: doc.id,
//         color: setColorByTopic(doc.data().Thema),
//         body: doc.data().body.substr(0, 120),
//       })
//     );
//     dispatch(closeScream());
//     const newPath = `/${project.id}`;
//     window.history.pushState(null, null, newPath);
//     dispatch({ type: SET_PROJECT, payload: project });
//     dispatch({ type: OPEN_PROJECT });

//     dispatch({ type: STOP_LOADING_UI });
//   }
// };

// export const closeProject = () => (dispatch) => {
//   dispatch({ type: SET_PROJECT, payload: null });
//   dispatch({ type: CLOSE_PROJECT });

//   window.history.pushState(null, null, "/");

//   setTimeout(() => {
//     document.body.style.overflow = "scroll";
//   }, 1000);
// };
