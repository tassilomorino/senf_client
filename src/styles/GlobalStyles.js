import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
  
    font-family: 'Nunito', sans-serif;
    font-weight: 300;
    font-size: 14px
      }

      h2{
        font-weight: 400;
    font-size: 18px;
    margin:0
      }
      h3{
        font-weight: 400;
    font-size: 18px
      }

      h4{

        font-weight: 400;
        font-size: 14px;
        margin:0;
      }
      button{
        font-family: 'Nunito', sans-serif;

        font-size: 18px;
  color: #353535;
  display: flex;
  align-items: center;
      }
`;

export default GlobalStyles;
