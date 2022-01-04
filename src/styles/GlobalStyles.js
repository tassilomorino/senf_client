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
    margin:0;
   
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

      li{
        font-weight: 400;
    font-size: 18px;
    margin:0;
   
      }
      button{
        font-family: 'Nunito', sans-serif;
        font-size: 18px;
        color: #353535;
        display: flex;
        align-items: center;
        border: none;
      }
      button:focus {
        outline: 0;
}
    button:disabled {
  opacity: 0.6;
}

      input{
        font-family: 'Nunito', sans-serif;

        font-weight: 300;
    font-size: 14px

      }
`;

export default GlobalStyles;
