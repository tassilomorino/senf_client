/** @format */

import moment from "moment";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

import { clearErrors } from "./errorsActions";

import {
  DELETE_COMMENT,
  LOADING_UI,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  SUBMIT_MY_COMMENT,
  DELETE_MY_COMMENT,
} from "../types";

// get the data for one comment
/* export const getComment = (commentId) => async (dispatch) => {
  const commentRef = doc(db, `comments/${commentId}`);
  const commentDocSnapshot = await getDoc(commentRef);
  if (!commentDocSnapshot.exists()) {
    console.log("Comment not found");
  } else {
    const commentData = commentDocSnapshot.data();
    commentData.id = commentDocSnapshot.id;
    commentData.title = commentDocSnapshot.body;

    dispatch({
      type: SET_COMMENT,
      payload: commentData,
    });
    dispatch({ type: STOP_LOADING_UI });
  }
}; */
// Submit a comment to an idea
export const submitComment =
  (screamId, commentData, user) => async (dispatch) => {
    const screamDocRef = doc(db, `screams/${screamId}`);
    const screamDocSnapshot = await getDoc(screamDocRef);
    if (!screamDocSnapshot.exists()) {
      throw new Error("scream not found in submitComment");
    }
    if (!user.userId) {
      throw new Error("User not authenticated in submitComment");
    }

    const ageCapture =
      user.age !== "" ? moment().diff(moment(user.age, "YYYY"), "years") : "";
    const newComment = {
      body: commentData.body,
      createdAt: new Date().toISOString(),
      screamId,
      userHandle: user.handle,
      userId: user.userId,
      sex: user.sex,
      age: ageCapture,
      Thema: screamDocSnapshot.data().Thema,
    };

    // The List compoonent needs a title, not a body – rewrite db and convert body to title
    const newCommentConverted = newComment;
    newCommentConverted.title = newComment.body;

    const addedCommentToDb = await addDoc(
      collection(db, "comments"),
      newComment
    );
    await updateDoc(screamDocRef, {
      commentCount: screamDocSnapshot.data().commentCount + 1,
    });
    newCommentConverted.commentId = addedCommentToDb.id;

    dispatch({
      type: SUBMIT_COMMENT,
      payload: newCommentConverted,
    });
    dispatch({ type: SUBMIT_MY_COMMENT, payload: newCommentConverted });
  };

// delete your comment
export const deleteComment =
  (commentId, user, screamId, isAdmin, isModerator) => async (dispatch) => {
    const commentRef = doc(db, `comments/${commentId}`);
    const commentDocSnapshot = await getDoc(commentRef);
    if (!commentDocSnapshot.exists()) {
      throw new Error("Comment not found in deleteComment");
    } else {
      const screamDocRef = doc(db, `screams/${screamId}`);
      const screamDocSnapshot = await getDoc(screamDocRef);
      if (!screamDocSnapshot.exists()) {
        throw new Error("Scream not found in deleteComment");
      } else if (
        user.userId === commentDocSnapshot.data().userId ||
        isAdmin ||
        isModerator
      ) {
        dispatch({
          type: DELETE_COMMENT,
          payload: commentId,
        });
        dispatch({
          type: DELETE_MY_COMMENT,
          payload: commentId,
        });

        await deleteDoc(commentRef);
        await updateDoc(screamDocRef, {
          commentCount: screamDocSnapshot.data().commentCount - 1,
        });
      } else {
        throw new Error("User not authorized to delete comment");
      }
    }
  };
