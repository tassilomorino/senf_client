/** @format */

import { db } from "../../firebase";

import { clearErrors } from "./errorsActions";

import { openScreamFunc } from "./screamActions";

import {
  SET_COMMENT,
  DELETE_COMMENT,
  LOADING_UI,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import moment from "moment";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

//get the data for one comment
export const getComment = (commentId) => async (dispatch) => {
  const commentRef = doc(db, `comments/${commentId}`);
  const commentDocSnapshot = await getDoc(commentRef);
  if (!commentDocSnapshot.exists) {
    console.log("Comment not found");
  } else {
    const commentData = commentDocSnapshot.data();
    commentData.id = commentDocSnapshot.id;
    dispatch({
      type: SET_COMMENT,
      payload: commentData,
    });
    dispatch({ type: STOP_LOADING_UI });
  }
};
// Submit a comment to an idea
export const submitComment =
  (screamId, commentData, user) => async (dispatch) => {
    const screamDocRef = doc(db, `screams/${screamId}`);
    const screamDocSnapshot = await getDoc(screamDocRef);
    if (!screamDocSnapshot.exists) {
      console.log("scream not found");
    } else {
      const ageCapture =
        user.age !== "" ? moment().diff(moment(user.age, "YYYY"), "years") : "";
      const newComment = {
        body: commentData.body,
        createdAt: new Date().toISOString(),
        screamId: screamId,
        userHandle: user.handle,
        userId: user.userId,
        sex: user.sex,
        age: ageCapture,
        Thema: screamDocSnapshot.data().Thema,
      };
      dispatch({
        type: SUBMIT_COMMENT,
        payload: newComment,
      });
      await addDoc(collection(db, "comments"), newComment);
      await updateDoc(screamDocRef, {
        commentCount: screamDocSnapshot.data().commentCount + 1,
      });
    }
  };

//delete your comment
export const deleteComment =
  (commentId, user, screamId, isAdmin, isModerator) => async (dispatch) => {
    const commentRef = doc(db, `comments/${commentId}`);
    const commentDocSnapshot = await getDoc(commentRef);
    if (!commentDocSnapshot.exists) {
      console.log("Comment not found");
    } else {
      const screamDocRef = doc(db, `screams/${screamId}`);
      const screamDocSnapshot = await getDoc(screamDocRef);
      if (!screamDocSnapshot.exists) {
        console.log("Scream not found");
      } else {
        if (
          user.userId === commentDocSnapshot.data().userId ||
          isAdmin ||
          isModerator
        ) {
          dispatch({
            type: DELETE_COMMENT,
            payload: commentId,
          });

          await deleteDoc(commentRef);
          await updateDoc(screamDocRef, {
            commentCount: screamDocSnapshot.data().commentCount - 1,
          });
        }
      }
    }
  };
