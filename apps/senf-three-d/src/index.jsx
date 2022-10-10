/** @format */

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import App from "./App";

window.THREE = THREE;
const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="">
      <App />
    </Suspense>
  </React.StrictMode>,
  rootElement
);
