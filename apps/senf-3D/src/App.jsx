/** @format */
import React from 'react'
import { ThemeProvider } from "styled-components";
import Map from "./Map/Map";
import { GlobalStyles } from "./styles/global";
import { theme } from "senf-atomic-design-system";

import UI from "./UI/UI";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <UI />
        <Map />
      </ThemeProvider>
    </div>
  );
}

export default App;
