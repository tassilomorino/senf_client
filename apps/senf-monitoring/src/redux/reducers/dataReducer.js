import {
  LOADING_DATA,
  STOP_LOADING_DATA,
  SET_IDEAS,
  SET_ERRORS,
} from "../types";

const initialState = {
  dataError: "",
  screams: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_DATA:
      return {
        ...state,
        loading: false,
      };

    case SET_IDEAS:
      return {
        ...state,
        ideas: action.payload,
        loading: false,
      };

    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    default:
      return state;
  }
}
