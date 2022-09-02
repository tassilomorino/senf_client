/** @format */
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  theme, GlobalStyle, ModalProvider, Typography, Loader, Box
} from "senf-atomic-design-system";
import Map from "./Map/Map";
import { auth } from "./firebase";

import UI from "./UI/UI";

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
  
`

function App() {


  const [loadingModel, setLoadingModel] = useState(false);



  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <GlobalStyle />
          {loadingModel &&
            <LoaderWrapper>
              <Loader width="100px" height="100px" /><Typography variant="h3" textAlign="center">
                Loading Model...</Typography>
            </LoaderWrapper>}
          <UI setLoadingModel={setLoadingModel} />

        </ModalProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
