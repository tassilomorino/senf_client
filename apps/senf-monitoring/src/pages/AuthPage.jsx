import React, { useState } from "react";

import styled from "styled-components";
import Auth from "../components/Auth";

const Section = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.beige.beige20};
`;

const AuthPage = ({ variant }) => {
  const [authOpen, setAuthOpen] = useState(true);
  return (
    <Section>
      <Auth authOpen={authOpen} setAuthOpen={setAuthOpen} />
    </Section>
  );
};

export default AuthPage;
