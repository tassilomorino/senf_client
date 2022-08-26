/** @format */

import {
  signOut,
  sendPasswordResetEmail,
  deleteUser,
  getAuth,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import i18n from "i18next";
import { db, auth } from "../../firebase";

import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_DATA_ERROR,
  SET_DATA_SUCCESS,
  LOADING_DATA,
  STOP_LOADING_DATA,
  SET_GUEST_DATA,
} from "../types";
import { closeAccountFunc } from "./accountActions";

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
      dispatch({ type: SET_UNAUTHENTICATED });
      dispatch(closeAccountFunc());
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage, "error during logoutUser");
    });
};
export const deleteUserFromDb = (userId) => async (dispatch) => {
  const currentuser = auth.currentUser;
  if (userId) {
    try {
      const cantDeleteSuperAdmins = ["dein@senf.koeln"];
      if (cantDeleteSuperAdmins.includes(currentuser.email)) {
        alert("cant delete SuperAdmin");
        return;
      }
      if (currentuser.uid === userId) {
        const userRef = doc(db, "users", userId);
        const emailRef = doc(db, "users", userId, "Private", userId);

        await deleteDoc(emailRef);
        await deleteDoc(userRef);

        await deleteUser(currentuser);
        dispatch({ type: SET_UNAUTHENTICATED });
        dispatch(closeAccountFunc());
      }
    } catch (error) {
      throw new Error(error, "error during deleteUserFromDb with userId");
    }
  }
  // if no userId is provided, delete the current user only from  firebase auth
  if (!userId) {
    try {
      deleteUser(currentuser);
    } catch (error) {
      throw new Error(error, " error during deleteUserFromDb without userId");
    }
  }
};

export const getUserLikesAndComments =
  (userData, profilePage) => async (dispatch) => {
    try {
      if (userData) {
        const likesRef = collection(db, "likes");
        const commentsRef = collection(db, "comments");
        const q1 = query(likesRef, where("userId", "==", userData.userId));
        const q2 = query(commentsRef, where("userId", "==", userData.userId));
        const likesQuerySnapshot = await getDocs(q1);
        const commentsQuerySnapshot = await getDocs(q2);

        likesQuerySnapshot.forEach((doc) =>
          userData.likes.push({ ...doc.data(), likeId: doc.id })
        );
        commentsQuerySnapshot.forEach((doc) =>
          userData.comments.push({ ...doc.data(), commentId: doc.id })
        );
        if (profilePage) {
          dispatch({
            type: SET_GUEST_DATA,
            payload: { userData },
          });
        } else {
          dispatch({
            type: SET_USER,
            payload: userData,
          });
        }
      }
    } catch (error) {
      throw new Error(error, "error during getUserLikesAndComments");
    }
  };

export const getUserData = (uid, profilePage) => async (dispatch) => {
  try {
    if (uid) {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userId", "==", uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userData.likes = [];
        userData.comments = [];
        if (profilePage) {
          delete userData.isAdmin;
          delete userData.isSuperAdmin;
          delete userData.isOrgModerator;
        }
        dispatch(getUserLikesAndComments(userData, profilePage));
      });
    }
  } catch (error) {
    throw new Error(error, "error during getUserData");
  }
};
