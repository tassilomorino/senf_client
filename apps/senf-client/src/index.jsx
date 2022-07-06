/** @format */

import React, { Suspense } from "react";

import ReactDOM from "react-dom";
import App from "./App";
// import { registerSW } from "virtual:pwa-register";
//
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="">
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

/* registerSW({
  onOfflineReady() {
    console.log("ready for offline use");
  },
});
 */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.unregister();

    if (caches) {
      console.log("deleting old caches");
      caches.keys().then(async (names) => {
        await Promise.all(names.map((name) => caches.delete(name)));
      });
    }
  });
}
