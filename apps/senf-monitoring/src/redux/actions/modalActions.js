import {
  SET_ERRORS,
  SET_MODAL,
} from "../types";

export const setModal = (modal) => async (dispatch) => {
  // is it even possible for an error to occur here?
  try {
    dispatch({
      type: SET_MODAL,
      payload: modal,
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: { title: "Error occured when loading" },
    });
  }
};
