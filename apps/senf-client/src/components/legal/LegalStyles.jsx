import React from "react";
import styled from "styled-components";
import { Box, Plus, LogoText, Button } from "senf-atomic-design-system";

const OuterWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  position: fixed;
  overflow: scroll;
  background-color: #f9f1d7;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 0;
  width: 90vw;
  height: 100%;
  margin: auto;
  max-width: 600px;
  margin-top: 30vh;

  li {
    font-size: 12px;
  }
`;
const Logo = styled.h1`
  position: relative;
  top: 0em;
  left: 35px;
`;

export const LegalStyles = ({ children }) => {
  const linkToHome = () => {
    window.location.href = "/";
  };

  return (
    <OuterWrapper>
      <Box
        position="fixed"
        margin={document.body.clientWidth > 768 ? "40px" : "10px"}
        zIndex={2}
      >
        <Button
          size="medium"
          leadingIcon="Close"
          onClick={() => linkToHome()}
        />
      </Box>

      <Wrapper>
        <Logo onClick={() => linkToHome()}>
          <LogoText transform="scale(2.5)" />
        </Logo>
        {children}
      </Wrapper>
    </OuterWrapper>
  );
};

const TermsWrapper = styled.a`
  text-decoration: underline;
  color: #414345;
  cursor: pointer;
`;

export const Terms = ({ children, href, target, rel }) => (
  <TermsWrapper
    prefetch
    href={href}
    passHref
    target={target}
    rel={rel}
  >
    {children}
  </TermsWrapper>
);
