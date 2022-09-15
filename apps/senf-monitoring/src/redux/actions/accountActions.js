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
import { SET_MONITORING_BOARDS, SET_CURRENT_MONITORING_BOARD } from "../types";
import { getIdeas } from "./ideaDataActions";

export const getMyMonitoringBoards = (userId) => async (dispatch) => {
  const monitoringBoards = [];
  const monitoringBoardsRef = collection(db, "monitoringBoards");
  const q = query(
    monitoringBoardsRef,
    where("userIds", "array-contains", userId)
  );

  const monitoringBoardsSnapshot = await getDocs(q);

  monitoringBoardsSnapshot.forEach((doc) => {
    monitoringBoards.push({
      ...doc.data(),
      value: doc.id,
      label: doc.data().title,
      monitoringBoardId: doc.id,
    });
  });

  dispatch({
    type: SET_MONITORING_BOARDS,
    payload: monitoringBoards,
  });
};

export const setMonitoringBoard = (monitoringBoardId) => async (dispatch) => {
  store.getState().data.monitoringBoards.forEach((doc) => {
    if (doc.monitoringBoardId === monitoringBoardId) {
      dispatch({
        type: SET_CURRENT_MONITORING_BOARD,
        payload: doc,
      });
      dispatch(getIdeas(doc.municipalities));
    }
  });
};
