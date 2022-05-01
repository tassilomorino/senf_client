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
  Typography,
} from "senf-atomic-design-system";

const myWorkspaces = [
  { title: "Gemüsegarten Neuehrenfeld" },
  { title: "Pilzlinge Liebigstraße" },
  { title: "Gemüsegarten Liebigstraße" },
];
const Wrapper = styled.div`
  margin-top: 0px;
  border-right: 3px solid ${({ theme }) => theme.colors.beige.beige10};
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  position: absolute;
  overflow-y: auto;
  width: 70px;
  height: 100%;
  top: 0;
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
        {myWorkspaces.map((items) => (
          <ButtonWrapper>
            <Button
              variant={items.title === currentWorkspace ? "primary" : "white"}
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
          >
            <Icon icon="plus" size="big" style={{ color: "grey" }} />
          </Button>
        </ButtonWrapper>
      </TopWrapper>

      <BottomWrapper>
        <ButtonWrapper onClick={handleLinkProfile}>
          <Button variant="white" icon="bulb"></Button>
        </ButtonWrapper>

        <Button icon="bulb" onClick={handleSignOut}></Button>
      </BottomWrapper>
    </Wrapper>
  );
};

export default MenuSidebar;
