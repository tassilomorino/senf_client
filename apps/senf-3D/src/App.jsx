/** @format */
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  theme, GlobalStyle, ModalProvider
} from "senf-atomic-design-system";
import Map from "./Map/Map";

import UI from "./UI/UI";

function App() {
  const [lng, setLng] = useState(6.9606);
  const [lat, setLat] = useState(50.9429);
  const [zoom, setZoom] = useState(18.5);
  const [pitch, setPitch] = useState(65);

  const handleSwitchView = (view) => {
    setPitch(view);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <GlobalStyle />
          <UI handleSwitchView={handleSwitchView} pitch={pitch} />
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
