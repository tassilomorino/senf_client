/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
// will need to add vite PWA plugin
/* serviceWorkerRegistration.register(); */
