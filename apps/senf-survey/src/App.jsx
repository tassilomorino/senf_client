/** @format */

import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme, GlobalStyle, ModalProvider } from "senf-atomic-design-system";
import styled, { ThemeProvider } from "styled-components";
import Dashboard from "./pages/DashBoard";
import "./util/i18n";
import TakeSurvey from "./pages/TakeSurvey";
import PageNotFound from "./pages/PageNotFound";
import EditSurvey from "./pages/EditSurvey/EditSurvey";
import Survey from "./pages/Survey";

const BodyWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  width: 100vw;
  height: 100vh;
`
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BodyWrapper>
        <ModalProvider>
          <GlobalStyle />

          {import.meta.env.VITE_NO_CRAWL && (
            /* disable google crawling for senf-client-test.netlify.app */
            <Helmet>
              <meta name="robots" content="noindex" />
            </Helmet>
          )}

          <Router>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route path="edit/:surveyId" element={<EditSurvey />} />
                  <Route path="survey/:surveyId" element={<Survey />} />
                  <Route exact path="invitation" element={<TakeSurvey />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
            </React.Suspense>
          </Router>
        </ModalProvider>
      </BodyWrapper>
    </ThemeProvider>
  );
};

export default App;
