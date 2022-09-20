import {
  collection,
  where,
  query,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../../firebase";
import store from "../store";
import {
  LOADING_DATA,
  STOP_LOADING_DATA,
  SET_IDEAS,
  SET_ERRORS,
} from "../types";

export const getIdeas = (municipalities) => async (dispatch) => {
  const ideasRef = collection(db, "screams");
  const q = query(
    ideasRef,
    where("municipality", "in", municipalities),
    orderBy("createdAt", "desc"),
    limit(10)
  );
  const ideasQuerySnapshot = await getDocs(q);

  const ideas = [];

  ideasQuerySnapshot.forEach((doc) => {
    ideas.push({
      ...doc.data(),
      ideaId: doc.id,
    });
  });
  dispatch({
    type: SET_IDEAS,
    payload: ideas,
  });
};
