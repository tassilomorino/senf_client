import {
  doc,
  collection,
  where,
  query,
  getDocs,
  orderBy,
  limit,
  collectionGroup,
  getDoc,
} from "firebase/firestore";

import { db } from "../../firebase";
import store from "../store";
import { SET_MONITORING_BOARDS, SET_CURRENT_MONITORING_BOARD } from "../types";
import { getIdeas } from "./ideaDataActions";

export const getMyMonitoringBoards = (userId) => async (dispatch) => {
  const monitoringBoards = [];

  //  get all docs of myself being a divisionUser
  const divisionUsersRef = collectionGroup(db, `divisionUsers`);
  const q = query(divisionUsersRef, where("userId", "==", userId));
  const divisionUserSnapshot = await getDocs(q);
  let itemsProcessed = 0;

  //  get all monitoringBoardDocs where i am a divisionUser
  divisionUserSnapshot.forEach(async (divisionUserDoc) => {
    const monitoringBoardRef = doc(
      db,
      "monitoringBoards",
      divisionUserDoc.data().monitoringBoardId
    );
    const monitoringBoardDoc = await getDoc(monitoringBoardRef);
    monitoringBoards.push({
      ...monitoringBoardDoc.data(),
      value: monitoringBoardDoc.id,
      label: monitoringBoardDoc.data().title,
      monitoringBoardId: monitoringBoardDoc.id,
    });

    itemsProcessed++;
    if (itemsProcessed === divisionUserSnapshot.size) {
      dispatch({
        type: SET_MONITORING_BOARDS,
        payload: monitoringBoards,
      });
    }
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
