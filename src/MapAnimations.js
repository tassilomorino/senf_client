/** @format */

import React from "react";

/** @format */
import {
  setInitialMapViewport,
  setMapViewport,
} from "./redux/actions/mapActions";
import { isMobileCustom } from "./util/customDeviceDetect";
import store from "./redux/store";

export const setViewport = () => {
  window.store = store;

  const TopViewport = {
    latitude:
      typeof Storage !== "undefined" && localStorage.getItem("latitude")
        ? localStorage.getItem("latitude")
        : 50.93864020643174,
    longitude:
      typeof Storage !== "undefined" && localStorage.getItem("longitude")
        ? localStorage.getItem("longitude")
        : 6.958725744885521,

    zoom: isMobileCustom ? 8 : 9.2,
    duration: 0,
  };
  store.dispatch(setMapViewport(TopViewport));

  const zoomedViewport = {
    latitude:
      typeof Storage !== "undefined" && localStorage.getItem("latitude")
        ? localStorage.getItem("latitude")
        : 50.93864020643174,
    longitude:
      typeof Storage !== "undefined" && localStorage.getItem("longitude")
        ? localStorage.getItem("longitude")
        : 6.958725744885521,

    zoom: isMobileCustom ? 9.3 : 10.5,
    duration: 2700,
    pitch: 30,
  };

  store.dispatch(setInitialMapViewport(zoomedViewport));
};
