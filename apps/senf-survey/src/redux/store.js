/** @format */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import dataReducer from "./reducers/dataReducer";
import userReducer from "./reducers/userReducer";

const middleware = [thunk];

const reducers = combineReducers({
  data: dataReducer,
  user: userReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const initialState = {};
const store = createStore(reducers, initialState, enhancer);

export default store;
