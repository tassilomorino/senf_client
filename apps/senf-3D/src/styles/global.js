import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

*, *::after, *::before {
    margin:0;
    padding: 0;
    box-sizing: border-box; 
}

#map {
    width: 100vw;
    height: 100vh;
}

`;

export { GlobalStyles };
