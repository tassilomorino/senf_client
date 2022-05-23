import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "@firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Typography, TertiaryButton, Icon } from "senf-atomic-design-system";

const Nav = styled.nav`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  width: calc(100% - 0px);
  padding: 0px 10px;
  top: 0;
  background-color: ${({ theme }) => theme.colors.primary.primary75};
  border-bottom: 2px solid ${({ theme }) => theme.colors.white.white100};
  overflow-x: hidden;
`;
const Navbar = ({ currentWorkspace }) => {
  return (
    <Nav>
      <Typography variant="h3">{currentWorkspace}</Typography>
      <TertiaryButton
        iconLeft="Verwaltung"
        onClick={() => console.log("settings")}
      />
    </Nav>
  );
};

export default Navbar;
