import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "@firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "senf-atomic-design-system";

const Nav = styled.nav`
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  width: 100%;
  padding: 0px 10px;
  top: 0;
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.prrimary100};
`;
const Navbar = ({ currentWorkspace }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", user.userId), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/login");
  };
  return (
    <Nav>
      <Typography variant="h3">{currentWorkspace}</Typography>
    </Nav>
  );
};

export default Navbar;
