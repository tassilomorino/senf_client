import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import styled from "styled-components";

import {
  CommentActive,
  User,
  Arrow,
  Plus,
  Button,
  LayerWhiteSecondDefault,
  Icon,
  Divider,
  Typography,
} from "senf-atomic-design-system";
import { useAuthContext } from "senf-shared";
import { auth, db } from "../../firebase";

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
  const { user } = useAuthContext();

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
              currentWorkspace === "Meine Nachrichten" ? "white" : "primary"
            }
            onClick={() => setCurrentWorkspace("Meine Nachrichten")}
            leadingIcon={<CommentActive />}
            transform="rotate(90)"
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
            leadingIcon={<Plus />}
          />
        </ButtonWrapper>
      </TopWrapper>

      <BottomWrapper>
        <ButtonWrapper onClick={handleLinkProfile}>
          <Button
            variant="white"
            leadingIcon={<User />}
          ></Button>
        </ButtonWrapper>

        <Button
          leadingIcon={<Arrow />}
          onClick={handleSignOut}
        ></Button>
      </BottomWrapper>
    </Wrapper>
  );
};

export default MenuSidebar;
