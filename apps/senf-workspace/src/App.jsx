import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./util/translations/english.json";
import translationDE from "./util/translations/german.json";
import AuthPage from "./pages/AuthPage";
import {
  theme,
  GlobalStyle,
  LayerWhiteFirstDefault,
} from "senf-atomic-design-system";
import styled, { ThemeProvider } from "styled-components";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: translationEN,
      },
      de: {
        translation: translationDE,
      },
    },
    lng: navigator.language === "de-DE" ? "de" : "de", // if you're using a language detector, do not define the lng option
    fallbackLng: "de",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary.primary100};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerWrapper = styled.div`
  ${(props) => LayerWhiteFirstDefault}
  width: 100%;
  height: 100%;
  max-width: 1550px;
  max-height: 100vh;
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  border: 3px solid ${({ theme }) => theme.colors.beige.beige10};

  @media (min-width: 1550px) {
    max-height: calc(100vh - 40px);
  }
`;
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <InnerWrapper>
          {import.meta.env.VITE_NO_CRAWL && (
            /* only for senf-workspace-test.netlify.app */
            <Helmet>
              <meta name="robots" content="noindex" />
            </Helmet>
          )}
          <GlobalStyle />
          <AuthProvider>
            <Router>
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
                <Route exact path="/" element={<PrivateRoute />}>
                  <Route exact path="/profile" element={<Profile />} />
                  <Route exact path="/" element={<Home />} />
                </Route>
              </Routes>
            </Router>
          </AuthProvider>
        </InnerWrapper>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
