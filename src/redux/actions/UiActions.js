/** @format */

import { SET_INFOPAGE_OPEN } from "../types";
import { SET_INFOPAGE_CLOSED } from "../types";

export const setInfoPageOpen = () => (dispatch) => {
  dispatch({
    type: SET_INFOPAGE_OPEN,
  });
};
export const setInfoPageClosed = () => (dispatch) => {
  dispatch({
    type: SET_INFOPAGE_CLOSED,
  });
};
