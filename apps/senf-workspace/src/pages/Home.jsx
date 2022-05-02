import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Message from "../components/Message";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Navbar from "../components/Navbar";

import MenuSidebar from "../components/layout/MenuSidebar";
import InboxContainer from "../components/layout/InboxContainer";

import ChatBubbles from "../images/illustrations/chatBubbles.png";
import MessagesContainer from "../components/layout/MessagesContainer";

import { FlexWrapper } from "senf-atomic-design-system";

const RightContainer = styled.div`
  position: fixed;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.beige.beige10};

  left: ${({ active }) => (active ? "0" : "100vw")};
  transition: 0.3s;

  @media (min-width: 768px) {
    position: relative;
    left: 400px;
    width: calc(100% - 400px);
    height: 100%;
  }
`;

const Home = () => {
  const [currentWorkspace, setCurrentWorkspace] = useState(
    "Gemüsegarten Liebigstraße"
  );
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState("");
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState("");
  const [newChat, setNewChat] = useState("");

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
    const usersRef = collection(db, "users");
    // querying the entire users collection except the currentUser
    const q = query(usersRef, where("userId", "not-in", [user1]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, [user1]);

  const selectUser = async (user) => {
    if (user) {
      setChat(user);

      const user2 = user.userId;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      const msgsRef = collection(db, "messages", id, "chat");
      const q = query(msgsRef, orderBy("createdAt", "asc"));

      onSnapshot(q, (querySnapshot) => {
        let msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMsgs(msgs);
      });

      // get last msg between logged in user and selected user
      const docSnap = await getDoc(doc(db, "lastMsg", id));
      // if last message exists and msg is from selected user
      if (docSnap.data() && docSnap.data().from !== user1) {
        // update last message doc, set unread to false
        await updateDoc(doc(db, "lastMsg", id), {
          unread: false,
        });
      }
    } else {
      setChat("");
    }
  };

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    const user2 = chat.userId;
    // create id for Document, make sure that it's the same no matter whether user1 or user2 writes
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await updateDoc(doc(db, "users", user1), {
      interactedUsers: arrayUnion(user2),
    });

    await updateDoc(doc(db, "users", user2), {
      interactedUsers: arrayUnion(user1),
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
  };

  const selectFoundUser = async (user) => {
    if (user.interactedUsers) {
      selectUser(user);
    } else {
      setNewChat(user);
      selectUser(newChat);
    }
    setSearchTerm("");
  };

  return (
    <FlexWrapper height="100%" style={{ overflow: "hidden" }}>
      <MenuSidebar
        currentWorkspace={currentWorkspace}
        setCurrentWorkspace={setCurrentWorkspace}
      />

      <InboxContainer
        currentWorkspace={currentWorkspace}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        users={users}
        selectFoundUser={selectFoundUser}
        newChat={newChat}
        selectUser={selectUser}
        user={user}
        user1={user1}
        chat={chat}
      />

      <RightContainer active={chat}>
        {chat ? (
          <MessagesContainer
            chat={chat}
            selectUser={selectUser}
            msgs={msgs}
            user1={user1}
            handleSubmit={handleSubmit}
            text={text}
            setText={setText}
            setImg={setImg}
          />
        ) : (
          <FlexWrapper
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            height="100%"
            width="100%"
          >
            <img src={ChatBubbles} width="300px" />
            <h3 className="no_conv">Select a user to start a conversation</h3>
          </FlexWrapper>
        )}
      </RightContainer>
    </FlexWrapper>
  );
};

export default Home;
