import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signOut } from "@firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  Button,
  LayerWhiteSecondDefault,
  Icon,
  Divider,
  Typography,
} from "senf-atomic-design-system";

const myWorkspaces = [
  { title: "Gemüsegarten Neuehrenfeld" },
  { title: "Pilzlinge Liebigstraße" },
  { title: "Gemüsegarten Liebigstraße" },
];
const Wrapper = styled.div`
  margin-top: 0px;
  border-right: 2px solid ${({ theme }) => theme.colors.beige.beige10};
  background-color: ${({ theme }) => theme.colors.primary.primary75};
  position: absolute;
  overflow-y: auto;
  width: 70px;
  height: 100%;
  top: 0;
  overflow: hidden;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 8px;
`;

const TopWrapper = styled.div`
  position: absolute;
  top: 0;
  padding: 8px;
`;

const BottomWrapper = styled.div`
  position: absolute;
  bottom: 0;
  padding: 8px;
`;
const MenuSidebar = ({ currentWorkspace, setCurrentWorkspace }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/login");
  };

  const handleLinkProfile = async () => {
    navigate("/profile");
  };

  return (
    <Wrapper>
      <TopWrapper>
        <ButtonWrapper>
          <Button
            variant={
              "Meine Nachrichten" === currentWorkspace ? "white" : "primary"
            }
            onClick={() => setCurrentWorkspace("Meine Nachrichten")}
            icon="stats"
            transform="roate(90deg)"
          />
        </ButtonWrapper>
        <Divider
          color="white"
          margin="10px 5px 10px 5px"
          width="calc(100%  - 10px)"
        />
        {myWorkspaces.map((items) => (
          <ButtonWrapper>
            <Button
              variant={items.title === currentWorkspace ? "white" : "primary"}
              onClick={() => setCurrentWorkspace(items.title)}
            >
              <Typography variant="h3">{items.title.slice(0, 1)}</Typography>
            </Button>
          </ButtonWrapper>
        ))}

        <ButtonWrapper>
          <Button
            variant="secondary"
            onClick={() => console.log("create new workspace")}
            icon="plus"
          />
        </ButtonWrapper>
      </TopWrapper>

      <BottomWrapper>
        <ButtonWrapper onClick={handleLinkProfile}>
          <Button variant="white" icon="user"></Button>
        </ButtonWrapper>

        <Button icon="arrow" onClick={handleSignOut}></Button>
      </BottomWrapper>
    </Wrapper>
  );
};

export default MenuSidebar;
