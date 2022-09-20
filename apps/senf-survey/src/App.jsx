/** @format */

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme, GlobalStyle, ModalProvider } from "senf-atomic-design-system";
import { AuthProvider } from "senf-shared";
import styled, { ThemeProvider } from "styled-components";
import Dashboard from "./pages/DashBoard";
import "./util/i18n";
import TakeSurvey from "./pages/TakeSurvey";
import PageNotFound from "./pages/PageNotFound";
import EditSurvey from "./pages/EditSurvey/EditSurvey";
import Survey from "./pages/Survey";

const BodyWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
`
const App = () => {
  const [squestion, setSquestion] = useState([]);

  return (
    <BodyWrapper>
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <ModalProvider>
              <GlobalStyle />

              {import.meta.env.VITE_NO_CRAWL && (
                /* disable google crawling for senf-client-test.netlify.app */
                <Helmet>
                  <meta name="robots" content="noindex" />
                </Helmet>
              )}

              <React.Suspense fallback={<div>Loading...</div>}>
                <Routes>

                  <Route exact path="/" element={<Dashboard />} />
                  {/* <Route
                  exact
                  path="invitation/:invitationDocId"
                  element={<AcceptInvitation />}
                /> */}
                  <Route exact path="invitation" element={<TakeSurvey />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </React.Suspense>
            </ModalProvider>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </BodyWrapper >
  );
};

export default App;
