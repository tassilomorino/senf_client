/** @format */

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  theme,
  GlobalStyle,
  ModalProvider,
  useModals,
  Box,
} from "senf-atomic-design-system";
import styled, { ThemeProvider } from "styled-components";
import { AuthProvider } from "senf-shared";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./pages/dashboard/Dashboard";
import "./util/i18n";
import PrivateRoute from "./context/PrivateRoute";
import AuthPage from "./pages/AuthPage";
import InviteMember from "./pages/division/InviteMember";
import { AcceptInvitation } from "./pages/AcceptInvitation";
import PageNotFound from "./pages/PageNotFound";
import { getMyMonitoringBoards } from "./redux/actions/accountActions";
import Nav from "./components/Nav";
import DivisionsBoard from "./pages/division/DivisionsBoard";
import DivisionPage from "./pages/division/DivisionPage";
import CreateMonitoringBoardPage from "./pages/superAdminPages/CreateMonitoringBoardPage";
import SuperAdminBoard from "./pages/superAdminPages/SuperAdminBoard";
import TopBar from "./components/TopBar";

const BodyWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  display: flex;
  background-color: ${(props) => props.theme.colors.greyscale.greyscale10};
`;
const App = () => {
  const dispatch = useDispatch();
  const userId = "EkLheyhRjYSCMyUd4qvMIng0as43";
  const { ideaId } = useParams();

  useEffect(() => {
    dispatch(getMyMonitoringBoards(userId));
  }, []);

  useEffect(() => {
    console.log(ideaId);
  }, [ideaId]);

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

      <BodyWrapper>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Router>
            <AuthProvider>
              <ModalProvider>
                <Nav />
                <Box
                  flexDirection="column"
                  width="100%"
                >
                  <TopBar />
                  <Routes>
                    <Route
                      exact
                      path="/login"
                      element={<AuthPage variant="login" />}
                    />

                    <Route
                      exact
                      path="/"
                      element={<PrivateRoute />}
                    >
                      <Route
                        exact
                        path="/"
                        element={<Dashboard />}
                      />

                      <Route
                        exact
                        path="/superAdminBoard"
                        element={<SuperAdminBoard />}
                      />

                      <Route
                        exact
                        path="/idea/:ideaId"
                        element={<Dashboard />}
                      />

                      {/* <Route exact path="division/:divisionId/members" element={<MemberBoard />} /> */}

                      <Route
                        exact
                        path="/divisions"
                        element={<DivisionsBoard />}
                      />
                      <Route
                        exact
                        path="/divisions/:divisionId"
                        element={<DivisionPage />}
                      />

                      <Route
                        exact
                        path="/superAdminBoard"
                        element={<SuperAdminBoard />}
                      />
                      <Route
                        exact
                        path="/createMonitoringBoard"
                        element={<CreateMonitoringBoardPage />}
                      />

                      <Route
                        exact
                        path="/invite"
                        element={<InviteMember />}
                      />
                      {/* <Route
                  exact
                  path="invitation/:invitationDocId"
                  element={<AcceptInvitation />}
                /> */}
                    </Route>

                    <Route
                      exact
                      path="invitation"
                      element={<AcceptInvitation />}
                    />
                    <Route
                      path="*"
                      element={<PageNotFound />}
                    />
                  </Routes>
                </Box>
              </ModalProvider>
            </AuthProvider>
          </Router>
        </React.Suspense>
      </BodyWrapper>
    </ThemeProvider>
  );
};

export default App;
