import { SET_DATA_ERROR } from "../types";

const initialState = {
  dataError: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DATA_ERROR:
      return { ...state, dataError: action.payload };

    default:
      return state;
  }
}
