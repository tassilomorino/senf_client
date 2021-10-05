import React from 'react'
import styled from "styled-components"

const ButtonExpandRippleAfter = styled.button`
    & { 
      background-color: transparent;
      position: absolute;
      left: 0%;
      top: 0%;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      z-index: 9;
    }

    &::after{
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      padding: 50%;
      width: 32px;
      height: 32px;
      background-color: currentColor;
      opacity: 0;
      transform: translate(-50%, -50%) scale(1);
      transition: opacity 1s, transform 0.5s;
    }
  `

const ExpandButton = ({ handleButtonClick, dataCy }) => {

    return (
        <ButtonExpandRippleAfter
            onClick={ handleButtonClick }
            data-cy={ dataCy }
        ></ButtonExpandRippleAfter>
    )
}

export default ExpandButton