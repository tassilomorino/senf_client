import {
  LOADING_DATA,
  STOP_LOADING_DATA,
  SET_IDEAS,
  SET_ERRORS,
  SET_MONITORING_BOARDS,
  SET_CURRENT_MONITORING_BOARD,
} from "../types";

const initialState = {
  monitoringBoards: [],
  currentMonitoringBoard: null,
  dataError: "",
  screams: [],
  loading: false,
};

export default (state = initialState, action) => {
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

    case SET_MONITORING_BOARDS:
      return {
        ...state,
        monitoringBoards: action.payload,
      };

    case SET_CURRENT_MONITORING_BOARD:
      return {
        ...state,
        currentMonitoringBoard: action.payload,
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
};
