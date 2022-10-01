import moment from "moment";
import {
  collection,
  where,
  query,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  limit,
} from "firebase/firestore";
import setColorByTopic from "../../data/setColorByTopic";

import {
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  VOTED_TRUE,
  VOTED_FALSE,
  SET_ERRORS,
} from "../types";
import { db } from "../../firebase";

// Like a scream
export const likeScream = (screamId, user) => async (dispatch) => {
  const screamDocRef = doc(db, `screams/${screamId}`);
  const screamDocSnapshot = await getDoc(screamDocRef);

  const likeRef = collection(db, "likes");
  const likeQuery = query(
    likeRef,
    where("screamId", "==", screamId),
    where("userId", "==", user.userId),
    limit(1)
  );
  const likeQuerySnapshot = await getDocs(likeQuery);

  if (!screamDocSnapshot.exists()) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        message: "Scream not found",
      },
    });
  }

  const scream = {
    ...screamDocSnapshot.data(),

    screamId: screamDocSnapshot.id,
  };

  const ageCapture =
    user.age !== "" ? moment().diff(moment(user.age, "YYYY"), "years") : "";
  if (!likeQuerySnapshot.empty) {
    console.log("already liked");
  } else {
    scream.likeCount++;

    dispatch({
      type: LIKE_SCREAM,
      payload: scream,
    });
    dispatch({
      type: VOTED_TRUE,
    });
    setTimeout(() => {
      dispatch({
        type: VOTED_FALSE,
      });
    }, 2000);
    await addDoc(collection(db, "likes"), {
      screamId,
      userHandle: user.handle,
      userId: user.userId,
      createdAt: new Date().toISOString(),
      sex: user.sex,
      age: ageCapture,
      Thema: screamDocSnapshot.data().Thema,
    });

    await updateDoc(screamDocRef, {
      likeCount: scream.likeCount,
    });
  }
};

// Unlike an idea
export const unlikeScream = (screamId, user) => async (dispatch) => {
  const screamDocRef = doc(db, `screams/${screamId}`);
  const screamDocSnapshot = await getDoc(screamDocRef);

  const likeRef = collection(db, "likes");
  const likeQuery = query(
    likeRef,
    where("screamId", "==", screamId),
    where("userId", "==", user.userId),
    limit(1)
  );
  const likeQuerySnapshot = await getDocs(likeQuery);

  if (!screamDocSnapshot.exists()) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        message: "Scream not found",
      },
    });
  }

  const scream = {
    ...screamDocSnapshot.data(),

    screamId: screamDocSnapshot.id,
  };

  if (likeQuerySnapshot.empty) {
    console.log("not liked");
  } else {
    scream.likeCount--;

    dispatch({
      type: UNLIKE_SCREAM,
      payload: scream,
    });
    dispatch({
      type: VOTED_TRUE,
    });
    setTimeout(() => {
      dispatch({
        type: VOTED_FALSE,
      });
    }, 2000);

    await deleteDoc(doc(db, "likes", likeQuerySnapshot.docs[0].id));

    await updateDoc(screamDocRef, {
      likeCount: scream.likeCount,
    });
  }
};
