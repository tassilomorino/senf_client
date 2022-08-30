/** @format */

import { createGlobalStyle } from "styled-components";
import { normalize } from "./normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
  overflow: hidden;
  width: 100%;
}


  body {
  margin: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* box-sizing: content-box; */


  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */

  /* prevent overscroll bounce*/
  overscroll-behavior-y: contain;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  color:black;
 
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


input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 0px solid transparent;
    /* -webkit-text-fill-color: inherit; */
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }


*,
*::after,
*::before {
  box-sizing: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
}

a{
  color:black;
}

button, input[type="submit"], input[type="reset"] {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}



//ANIMATIONS

@keyframes opacityTranslateYFrom50Animation {
    0% {
      opacity: 0;
      transform: translateY(50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }


  @keyframes translateYFrom100toMinus200pxAnimation {
  0% {
    /* transform: translateY(100%); */
    margin-top:100%;
  }

  100% {
    /* transform: translateY(calc((var(--vh, 1vh) * 100) - 200px)); */
    margin-top:0%;
  }
}

@keyframes translateYFrom100to70pxAnimation {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(70px);
  }
}

@keyframes translateYFrom100to16pxAnimation {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(16px);
  }
}




  @keyframes opacityTranslateYFrom100Animation {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  50% {
    opacity: 0.1;
    transform: translateY(50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}


@keyframes opacityAfter50PercentAnimation {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}



@keyframes opacityAndPointerEventsAnimation {
  0% {
    pointer-events: none;
    opacity: 0;
  }
 
  100% {
    opacity: 1;
    pointer-events: all;
  }
}


.item-enter {
  opacity: 0;
  transform: scale(1.01);
}
.item-exit,
.item-enter-active {
  opacity: 1;
  transform: scale(1);
}
.item-enter-active {
  transition: 200ms ease-in;
}

.item-exit-active {
  opacity: 0;
  transform: scale(1.01);
  transition: 200ms ease-in;
}

`;

export default GlobalStyle;
