/** @format */
import firebase from "firebase/app";
import "firebase/firestore";

import { SET_USER, SET_UNAUTHENTICATED } from "../types";
import axios from "axios";

export const resetPassword = (email, history) => (dispatch) => {
  axios
    .post("/resetPassword", email)
    .then((res) => {
      // history.push("/");
    })
    .catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
  firebase.auth().signOut();
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = (uid) => async (dispatch) => {
  const db = firebase.firestore();
  const userDocument = await db
    .collection("users")
    .where("userId", "==", uid)
    .get();

  userDocument.docs.forEach((doc) => {
    const userData = doc.data();
    userData.likes = [];
    dispatch(getUserLikes(userData));
  });
};

export const getUserLikes = (userData) => async (dispatch) => {
  const db = firebase.firestore();

  const userLikes = await db
    .collection("likes")
    .where("userHandle", "==", userData.handle)
    .get();

  userLikes.docs.forEach((doc) => userData.likes.push({ ...doc.data() }));

  dispatch({
    type: SET_USER,
    payload: userData,
  });
};
