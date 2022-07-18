/** @format */

import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { theme, GlobalStyle } from "senf-atomic-design-system";
import { ThemeProvider } from "styled-components";
import store from "./redux/store";
import Dashboard from "./pages/Dashboard";
import "./util/i18n";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {import.meta.env.VITE_NO_CRAWL && (
        /* disable google crawling for senf-client-test.netlify.app */
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
      )}

      <Provider store={store}>
        <Router>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </React.Suspense>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
