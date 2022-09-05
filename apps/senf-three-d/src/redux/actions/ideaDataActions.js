import {
  collection,
  where,
  query,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../../firebase";
import {
  LOADING_DATA,
  STOP_LOADING_DATA,
  SET_IDEAS,
  SET_ERRORS,
} from "../types";

export const getIdeas = (parameter) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });
    const ideasRef = collection(db, "screams");
    const q = query(
      ideasRef,
      // where("variable", ">", parameter),
      orderBy("likeCount", "desc"),
      limit(parameter)
    );

    const ideasQuerySnapshot = await getDocs(q);
    const ideas = [];

    ideasQuerySnapshot.forEach((doc) => {
      ideas.push({
        ...doc.data(),
        screamId: doc.id,
        body: doc.data().body.substr(0, 180),
        //   color: setColorByTopic(doc.data().Thema),
        comments: [],
      });
    });

    dispatch({
      type: SET_IDEAS,
      payload: ideas,
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: { title: "Error occured when loading" },
    });
  }
};
