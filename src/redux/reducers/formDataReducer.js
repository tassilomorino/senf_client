/**
 * /* eslint-disable import/no-anonymous-default-export
 *
 * @format
 */

import { SET_CREATE_PROJECT_FORM_DATA } from "../types";

const initialState = {
  createProjectData: null,
  createOrganizationData: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CREATE_PROJECT_FORM_DATA:
      return {
        ...state,
        createProjectData: action.payload,
      };

    default:
      return state;
  }
}
