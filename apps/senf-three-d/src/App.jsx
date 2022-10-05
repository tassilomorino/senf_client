/** @format */
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  theme,
  GlobalStyle,
  ModalProvider,
  Typography,
  Loader,
} from "senf-atomic-design-system";
import { AuthProvider } from "senf-shared";
import { BrowserRouter as Router } from "react-router-dom";

import Home from "./pages/Home";

const BodyWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  width: 200px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const [loadingModel, setLoadingModel] = useState(false);

  return (
    <BodyWrapper>
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <ModalProvider>
              <GlobalStyle />
              {loadingModel && (
                <LoaderWrapper>
                  <Loader
                    width="100px"
                    height="100px"
                  />
                  <Typography
                    variant="h3"
                    textAlign="center"
                  >
                    Loading Model...
                  </Typography>
                </LoaderWrapper>
              )}
              <Home setLoadingModel={setLoadingModel} />
            </ModalProvider>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </BodyWrapper>
  );
};

export default App;
