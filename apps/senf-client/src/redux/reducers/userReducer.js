/** @format */

import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_MY_SCREAMS,
  SUBMIT_MY_COMMENT,
  DELETE_MY_COMMENT,
  SET_MY_ORGANIZATIONS,
  LOADING_MYORGANIZATIONS_DATA,
  LOADING_MYSCREAMS_DATA,
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
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userId: state.userId,
            userHandle: state.handle,
            screamId: action.payload.screamId,
          },
        ],
        myScreams: state?.myScreams
          ? [
              ...state.myScreams.map((scream) =>
                scream.screamId === action.payload.screamId
                  ? { ...scream, likeCount: scream.likeCount + 1 }
                  : scream
              ),
            ]
          : null,
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload.screamId
        ),
        myScreams: state?.myScreams
          ? [
              ...state.myScreams.map((scream) =>
                scream.screamId === action.payload.screamId
                  ? { ...scream, likeCount: scream.likeCount - 1 }
                  : scream
              ),
            ]
          : null,
      };

    case LOADING_MYSCREAMS_DATA:
      return {
        ...state,
        loadingMyScreams: true,
      };
    case LOADING_MYORGANIZATIONS_DATA:
      return {
        ...state,
        loadingMyOrganizations: true,
      };
    case SET_MY_SCREAMS:
      return {
        ...state,
        myScreams: action.payload,
        loadingMyScreams: false,
      };
    case SET_MY_ORGANIZATIONS:
      return {
        ...state,
        myOrganizations: action.payload,
        loadingMyOrganizations: false,
      };
    case SUBMIT_MY_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments,
          {
            ...action.payload,
          },
        ],
      };
    case DELETE_MY_COMMENT:
      const leftComments = state.comments.filter(
        (comment) => comment.commentId !== action.payload
      );
      return {
        ...state,
        comments: leftComments,
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
