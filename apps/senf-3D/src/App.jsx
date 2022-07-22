/** @format */
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "senf-atomic-design-system";
import Map from "./Map/Map";

import UI from "./UI/UI";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UI />
        <Map />
      </ThemeProvider>
    </div>
  );
}

export default App;
