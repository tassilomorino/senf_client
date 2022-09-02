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
  const [lng, setLng] = useState(6.9606);
  const [lat, setLat] = useState(50.9429);
  const [zoom, setZoom] = useState(18.5);
  const [pitch, setPitch] = useState(65);

  const [loadingModel, setLoadingModel] = useState(false);

  const handleSwitchView = (view) => {
    setPitch(view);
  };

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
          <UI setLoadingModel={setLoadingModel} handleSwitchView={handleSwitchView} pitch={pitch} />
          <Map
            lng={lng}
            lat={lat}
            zoom={zoom}
            pitch={pitch}
            setLng={setLng}
            setLat={setLat}
            setZoom={setZoom}
            setPitch={setPitch}
          />
        </ModalProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
