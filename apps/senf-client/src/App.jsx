/** @format */

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Provider } from "react-redux";
import {
  theme,
  GlobalStyle,
  ModalProvider,
  RotateDevice,
} from "senf-atomic-design-system";

import { AuthProvider } from "senf-shared";

import { ThemeProvider } from "styled-components";
import { auth } from "./firebase";

// import "./styles/mapbox-gl.css";
// import "./styles/App.css";
// import "./styles/AppDesktop.css";
// import "./styles/AppIpad.css";
// import "./styles/mapbox.css";

// Redux
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";

import { getOrganizations } from "./redux/actions/organizationActions";
import { getProjects } from "./redux/actions/projectActions";
import { getScreams } from "./redux/actions/screamActions";

// Pages
import Imprint from "./components/legal/Imprint";
import DataPrivacy from "./components/legal/DataPrivacy";
import TermsAndCondition from "./components/legal/TermsAndCondition";
import CookiesConfigurator from "./components/legal/CookiesConfigurator";

import Blank from "./pages/Blank";

// import { setViewport } from "./util/helpers-map-animations";

import "./util/i18n";

import Home from "./pages/Home";

// const Main = React.lazy(() =>
//   Promise.all([
//     import("./pages/Main"),
//     new Promise((resolve) => setTimeout(resolve, 3300)),
//   ]).then(([moduleExports]) => moduleExports)
// );

// detectLocation(); // detect location and set i18n language
// require("intersection-observer");

window.store = store;

const vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

const App = () => {
  useEffect(() => {
    // setViewport();
    const { initialMapViewport } = store.getState().data;
    store.dispatch(getScreams(initialMapViewport));
    store.dispatch(getOrganizations(initialMapViewport));
    store.dispatch(getProjects(initialMapViewport));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid && user.emailVerified) {
        store.dispatch({ type: SET_AUTHENTICATED });
        store.dispatch(getUserData(user.uid));
      } else if (
        (user &&
          user.uid &&
          user.providerData[0].providerId === "google.com") ||
        (user && user.uid && user.providerData[0].providerId === "facebook.com")
      ) {
        store.dispatch({ type: SET_AUTHENTICATED });
        store.dispatch(getUserData(user.uid));
      } else if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
      } else {
        // User is signed out
        // ...
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {import.meta.env.VITE_NO_CRAWL && (
        /* disable google crawling for senf-client-test.netlify.app */
        <Helmet>
          <meta
            name="robots"
            content="noindex"
          />
        </Helmet>
      )}
      {import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE && (
        <Helmet>
          <meta
            name="google-site-verification"
            content="u0WUtD1BF5Kr__nOsq-jAnnCgXixSJO-0mpsW2W3uGg"
          />
        </Helmet>
      )}

      {import.meta.env.VITE_STATS && (
        <Helmet>
          <script
            async
            defer
            data-website-id="17c8a5a3-76cb-43c6-971a-04dbd6a7a325"
            src="https://umami-xi-nine.vercel.app/senf-stat.js"
          ></script>
        </Helmet>
      )}

      <Provider store={store}>
        <Router>
          <AuthProvider>
            <ModalProvider>
              <RotateDevice />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Navigate
                      to="/cologne"
                      replace
                    />
                  }
                />
                <Route
                  exact
                  path="/projectRooms"
                  element={<Home />}
                />
                <Route
                  exact
                  path="/organizations"
                  element={<Home />}
                />
                <Route
                  exact
                  path="/:city/idea/:ideaId"
                  element={<Home />}
                />
                <Route
                  exact
                  path="/profile/:profileId"
                  element={<Home />}
                />
                <Route
                  exact
                  path="/projectRooms/:projectRoomId/:screamId"
                  element={<Home />}
                />
                <Route
                  exact
                  path="/projectRooms/:projectRoomId"
                  element={<Home />}
                />

                <Route
                  exact
                  path="/organizations/:organizationId"
                  element={<Home />}
                />

                <Route
                  exact
                  path="/verify"
                  element={<Home />}
                />
                <Route
                  exact
                  path="/:city"
                  element={<Home />}
                />

                <Route
                  exact
                  path="/datenschutz"
                  element={<DataPrivacy />}
                />
                <Route
                  exact
                  path="/agb"
                  element={<TermsAndCondition />}
                />
                <Route
                  exact
                  path="/cookieConfigurator"
                  element={<CookiesConfigurator />}
                />
                <Route
                  exact
                  path="/impressum"
                  element={<Imprint />}
                />
                <Route
                  exact
                  path="/blank"
                  element={<Blank />}
                />
              </Routes>
            </ModalProvider>
          </AuthProvider>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
