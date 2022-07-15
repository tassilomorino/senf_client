/** @format */

import React, { useState, useEffect, useLayoutEffect, Suspense } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { isTablet } from "react-device-detect";
import Cookies from "universal-cookie";
import { I18nextProvider, useTranslation } from "react-i18next";
import {
  theme,
  GlobalStyle,
  LayerWhiteFirstDefault,
  // i18n,
  MainLoader,
} from "senf-atomic-design-system";
import { auth } from "./firebase";

import "./styles/mapbox-gl.css";
import "./styles/App.css";
import "./styles/AppDesktop.css";
import "./styles/AppIpad.css";
import "./styles/mapbox.css";
import "./styles/Animations.css";

import themeFile from "./util/theme";
// Redux
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import { setCookies } from "./redux/actions/cookiesActions";
import { setInfoPageOpen } from "./redux/actions/UiActions";

import { getOrganizations } from "./redux/actions/organizationActions";
import { getProjects } from "./redux/actions/projectActions";
import { getScreams } from "./redux/actions/screamActions";

// Pages
import impressum from "./components/organisms/infocomponents/legal/impressum";
import datenschutz from "./components/organisms/infocomponents/legal/datenschutz";
import agb from "./components/organisms/infocomponents/legal/agb";
import cookieConfigurator from "./components/organisms/infocomponents/legal/cookieConfigurator";

import blank from "./pages/Blank";

import { isMobileCustom } from "./util/customDeviceDetect";

import packageJson from "../package.json";
import { getBuildDate } from "./util/helpers";
import withClearCache from "./ClearCache";
import Cookiebanner from "./components/organisms/Cookiebanner/Cookiebanner";
import { setViewport } from "./util/helpers-map-animations";
import detectLocation from "./util/detectLocation";
import GlobalStyles from "./styles/GlobalStyles";

import { ThemeProvider } from "styled-components";

import "./util/i18n";

// import Main from "./pages/Main";

const Main = React.lazy(() =>
  Promise.all([
    import("./pages/main"),
    new Promise((resolve) => setTimeout(resolve, 2000)),
  ]).then(([moduleExports]) => moduleExports)
); // i18n configuration

// detectLocation(); // detect location and set i18n language
const cookies = new Cookies();
// require("intersection-observer");

const muiTheme = createTheme(themeFile);

window.store = store;

if (cookies.get("cookie_settings") === "all") {
  store.dispatch(setCookies("all"));
} else if (cookies.get("cookie_settings") === "minimum") {
  store.dispatch(setCookies("minimum"));
} else {
  store.dispatch(setInfoPageOpen());
}
const vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

const App = () => {
  const { t } = useTranslation();

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
    setViewport();
    const { initialMapViewport } = store.getState().data;
    store.dispatch(getScreams(initialMapViewport));
    store.dispatch(getOrganizations(initialMapViewport));
    store.dispatch(getProjects(initialMapViewport));
  }, []);
  useEffect(() => {
    userState();
  }, []);

  const tabletNote = isTablet ? (
    <div className="tabletLandscapeNote">{t("rotate_tablet")} </div>
  ) : null;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {import.meta.env.VITE_NO_CRAWL && (
        /* disable google crawling for senf-client-test.netlify.app */
        <Helmet>
          <meta name="robots" content="noindex" />
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

      <MuiThemeProvider theme={muiTheme}>
        <Provider store={store}>
          <GlobalStyles />
          <Router>
            <Cookiebanner />
            {tabletNote}

            {isMobileCustom && (
              <div className="landscapeNote">{t("rotate_phone")}</div>
            )}

            <div className="container">
              <React.Suspense fallback={<MainLoader />}>
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route exact path="/projectRooms" component={Main} />
                  <Route exact path="/organizations" component={Main} />

                  <Route exact path="/datenschutz" component={datenschutz} />
                  <Route exact path="/agb" component={agb} />

                  <Route
                    exact
                    path="/cookieConfigurator"
                    component={cookieConfigurator}
                  />

                  <Route exact path="/impressum" component={impressum} />

                  <Route exact path="/blank" component={blank} />

                  <Route exact path="/:screamId" component={Main} />

                  <Route
                    exact
                    path="/projectRooms/:projectRoomId/:screamId"
                    component={Main}
                  />

                  <Route
                    exact
                    path="/projectRooms/:projectRoomId"
                    component={Main}
                  />

                  <Route
                    exact
                    path="/organizations/:organizationId"
                    component={Main}
                  />

                  <Route path="*" component={Main} />
                </Switch>
              </React.Suspense>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
};
console.log(getBuildDate(packageJson.buildDate));

export default App;
