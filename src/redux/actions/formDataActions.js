/** @format */

import { SET_CREATE_PROJECT_FORM_DATA } from "../types";

export const createProjectSaveData = (createProjectFormData) => (dispatch) => {
  dispatch({
    type: SET_CREATE_PROJECT_FORM_DATA,
    payload: createProjectFormData,
  });
};
