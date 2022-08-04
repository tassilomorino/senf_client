/** @format */

import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  // MARK_NOTIFICATIONS_READ
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  loadingMyOrganizations: false,
  loadingMyScreams: false,
  myScreams: null,
  myOrganizations: null,
  likes: [],
  comments: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload,
      };

    // case MARK_NOTIFICATIONS_READ:
    //   state.notifications.forEach((not) => (not.read = true));
    //   return {
    //     ...state
    //   };
    default:
      return state;
  }
}
