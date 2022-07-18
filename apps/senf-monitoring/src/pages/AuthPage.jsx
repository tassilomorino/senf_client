import React, { useState } from "react";

import { Auth, Modal } from "senf-atomic-design-system";
import styled from "styled-components";

const Section = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.beige.beige20};
`;

const AuthPage = ({ variant }) => {
  return (
    <Section>
      <Modal openModal={true}>
        <Auth
          handleSubmitLogin={(loginData) => console.log(loginData)}
          handleSubmitRegister={(registerData) => console.log(registerData)}
        />
      </Modal>
    </Section>
  );
};

export default AuthPage;
