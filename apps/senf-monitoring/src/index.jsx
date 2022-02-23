/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { registerSW } from "virtual:pwa-register";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

//serviceWorkerRegistration.register(); old SW

registerSW({
  onOfflineReady() {
    console.log("ready for offline use");
  },
});
