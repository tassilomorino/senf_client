/** @format */

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Provider } from "react-redux";
import {
  theme,
  GlobalStyle,
  ModalProvider,
  RotateDevice

} from "senf-atomic-design-system";

import {
  AuthProvider,
} from "senf-shared";

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
import impressum from "./components/legal/impressum";
import datenschutz from "./components/legal/datenschutz";
import agb from "./components/legal/agb";
import cookieConfigurator from "./components/legal/cookieConfigurator";

import blank from "./pages/Blank";

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
  const userState = () => {
    onAuthStateChanged(auth, (user) => {
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
  };
  useEffect(() => {
    // setViewport();
    const { initialMapViewport } = store.getState().data;
    store.dispatch(getScreams(initialMapViewport));
    store.dispatch(getOrganizations(initialMapViewport));
    store.dispatch(getProjects(initialMapViewport));
  }, []);
  useEffect(() => {
    userState();
  }, []);



  return (
    <ThemeProvider theme={theme}>

      <GlobalStyle />

      {import.meta.env.VITE_NO_CRAWL && (
        /* disable google crawling for senf-client-test.netlify.app */
        <Helmet>
          <meta name="robots" content="noindex" />
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
        <AuthProvider>
          <ModalProvider>
            <Router>
              <RotateDevice />
              <Switch>
                <Route exact path="/projectRooms" component={Home} />
                <Route exact path="/organizations" component={Home} />
                <Route exact path="/idea/:screamId" component={Home} />
                <Route
                  exact
                  path="/projectRooms/:projectRoomId/:screamId"
                  component={Home}
                />
                <Route
                  exact
                  path="/projectRooms/:projectRoomId"
                  component={Home}
                />
                <Route
                  exact
                  path="/organizations/:organizationId"
                  component={Home}
                />


                <Route exact path="/verify" component={Home} />
                <Route exact path="/:unknownPathId" component={Home} />
                <Route exact path="/" component={Home} />
                <Route path="*" component={Home} />

                <Route exact path="/datenschutz" component={datenschutz} />
                <Route exact path="/agb" component={agb} />
                <Route
                  exact
                  path="/cookieConfigurator"
                  component={cookieConfigurator}
                />
                <Route exact path="/impressum" component={impressum} />
                <Route exact path="/blank" component={blank} />
              </Switch>
            </Router >
          </ModalProvider>
        </AuthProvider>
      </Provider >

    </ThemeProvider >
  );
};

export default App;
