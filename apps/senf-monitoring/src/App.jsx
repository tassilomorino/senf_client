/** @format */

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme, GlobalStyle, ModalProvider } from "senf-atomic-design-system";
import styled, { ThemeProvider } from "styled-components";
import { AuthProvider } from "senf-shared";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import "./util/i18n";
import PrivateRoute from "./context/PrivateRoute";
import AuthPage from "./pages/AuthPage";
import InviteMember from "./pages/InviteMember";
import MemberBoard from "./pages/MemberBoard";
import { AcceptInvitation } from "./pages/AcceptInvitation";
import PageNotFound from "./pages/PageNotFound";
import { getMyMonitoringBoards } from "./redux/actions/accountActions";
import Nav from "./components/Nav";

const BodyWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
`
const App = () => {
  const dispatch = useDispatch();
  const userId = "EkLheyhRjYSCMyUd4qvMIng0as43"

  useEffect(() => {
    dispatch(getMyMonitoringBoards(userId))

  }, [])
  return (
    <BodyWrapper>
      <ThemeProvider theme={theme}>
        <AuthProvider>
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
                <Nav />
                <Routes>
                  <Route
                    exact
                    path="/register"
                    element={<AuthPage variant="register" />}
                  />

                  <Route
                    exact
                    path="/login"
                    element={<AuthPage variant="login" />}
                  />
                  {/* <Route exact path="/" element={<PrivateRoute />}>
                  <Route exact path="/" component={<Dashboard />} />
                  </Route> */}
                  <Route exact path="/" element={<Dashboard />} />
                  <Route exact path="/members" element={<MemberBoard />} />

                  <Route exact path="/invite" element={<InviteMember />} />
                  {/* <Route
                  exact
                  path="invitation/:invitationDocId"
                  element={<AcceptInvitation />}
                /> */}
                  <Route exact path="invitation" element={<AcceptInvitation />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </React.Suspense>
            </Router>
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </BodyWrapper>
  );
};

export default App;
