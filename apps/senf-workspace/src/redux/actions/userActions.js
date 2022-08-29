/** @format */

import { signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";

import { SET_UNAUTHENTICATED } from "../types";

export const logoutUser = () => (dispatch) => {
  signOut(auth)
    .then(() => {
      dispatch({ type: SET_UNAUTHENTICATED });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage, "error during logoutUser");
    });
};

export const getUserData = (uid) => async (dispatch) => {
  try {
    if (uid) {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userId", "==", uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userData.likes = [];
        userData.comments = [];

        // dispatch(getUserLikesAndComments(userData));
      });
    }
  } catch (error) {
    console.error(error);
  }
};
