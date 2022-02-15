// Handy CSS animations for micro-interactions
import { css, keyframes } from "styled-components";
import { color } from "./styles";

export const easing = {
  rubber: "cubic-bezier(0.175, 0.885, 0.335, 1.05)",
};

export const plopAnimation = keyframes`
  0% {
      opacity: 0;
      transform: scale(0.7) ;
    }

    80% {
      opacity: 0;
      transform: scale(0.7) ;
    }

    90% {
      opacity: 1;
      transform: scale(1.1);
    }

    100% {
      opacity: 1;
      transform: scale(1) ;
    }
`;
