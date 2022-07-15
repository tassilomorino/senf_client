import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
  overflow: hidden;
  width: 100%;
}



      body {
  margin: 0;
  font-family: 'Nunito', sans-serif;
    font-weight: 300;
    font-size: 14px;
      /* overflow: scroll; */

      background-color: #e9e9e9;
  background-image: linear-gradient(white 2.6px, transparent 2.6px),
    linear-gradient(90deg, white 2.6px, transparent 2.6px),
    linear-gradient(white 1.3px, transparent 1.3px),
    linear-gradient(90deg, white 1.3px, #f8f8f8 1.3px);
  background-size: 65px 65px, 65px 65px, 13px 13px, 13px 13px;
  background-position: -2.6px -2.6px, -2.6px -2.6px, -1.3px -1.3px,
    -1.3px -1.3px;


  top: 0;
  width: 100%;

  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */

  height: 100%;
  position: fixed;
  /* prevent overscroll bounce*/
  overscroll-behavior-y: contain;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

/* Hide scrollbar for Chrome, Safari and Opera */
body::-webkit-scrollbar {
  display: none;
}

/* hide scrollbar but allow scrolling */
div {
  -ms-overflow-style: none;
  /* for Internet Explorer, Edge */
  scrollbar-width: none;
  /* for Firefox */
}

div::-webkit-scrollbar {
  display: none;
  /* for Chrome, Safari, and Opera */
}

/* a {
  text-decoration: none;
  color: #414345;
  font-size:16px;
} */

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
