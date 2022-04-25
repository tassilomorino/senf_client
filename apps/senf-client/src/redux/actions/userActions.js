/** @format */
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { signOut, getAuth, sendPasswordResetEmail } from "firebase/auth";

import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_DATA_ERROR,
  SET_DATA_SUCCESS,
  LOADING_DATA,
  STOP_LOADING_DATA,
} from "../types";
import { closeAccountFunc } from "./accountActions";
import i18n from "i18next";
const auth = getAuth();

export const resetPassword = (email) => (dispatch) => {
  console.log(email);
  dispatch({ type: LOADING_DATA });
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent!", email);
      // Password reset email sent!
      // ..
      dispatch({
        type: SET_DATA_SUCCESS,
        payload: i18n.t("reset_password_success"),
      });
      dispatch({ type: STOP_LOADING_DATA });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch({ type: STOP_LOADING_DATA });
      if (errorCode === "auth/invalid-email") {
        dispatch({
          type: SET_DATA_ERROR,
          payload: i18n.t("email_not_valid"),
        });
      }
      if (errorCode === "auth/user-not-found") {
        dispatch({
          type: SET_DATA_ERROR,
          payload: i18n.t("email_not_found"),
        });
      }
    });
};

export const logoutUser = () => (dispatch) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage, "error during logoutUser");
    });
  dispatch({ type: SET_UNAUTHENTICATED });
  dispatch(closeAccountFunc());
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
    .where("userId", "==", userData.userId)
    .get();

  userLikes.docs.forEach((doc) => userData.likes.push({ ...doc.data() }));

  dispatch({
    type: SET_USER,
    payload: userData,
  });
};
