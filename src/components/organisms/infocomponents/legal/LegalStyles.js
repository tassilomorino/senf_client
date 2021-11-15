import React from 'react';
import { CustomIconButton } from "../../../atoms/CustomButtons/CustomButton";
import styled from "styled-components";
import LogoWhite from "../../../../images/logo_white.png";

const Wrapper = styled.div`
  position: relative;
  z-index: 0;
  width: 90vw;
  height: 100%;
  margin: auto;
  max-width: 600px;
  margin-top: 30vh;
`
const Logo = styled.h1`
  position: relative;
  top: 0em;
  left: 0vw;
`

const LegalStyles = ({ children }) => {

    const linkToHome = () => {
        window.location.href = "/";
      }

    return (
        <div>
            <CustomIconButton
                name="Close"
                position="fixed"
                margin={document.body.clientWidth > 768 ? "40px" : "10px"}
                left="0"
                handleButtonClick={() => linkToHome()}
                top="0"
            />

            <Wrapper>
                <Logo onClick={() => linkToHome()}>
                    <img src={LogoWhite} width="100px" alt="logo" />
                </Logo>
                {children}
            </Wrapper>
        </div>
    )
}

export default LegalStyles
