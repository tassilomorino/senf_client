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

const RightContainer = styled.div`
  position: relative;
  left: 400px;
  width: calc(100% - 400px);
  height: 100%;
  background-color: ${({ theme }) => theme.colors.beige.beige10};
`;

const MessagesUserHeader = styled.div`
  padding: 10px;
  height: 70px;
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.white.white100};
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.beige.beige20};
`;
const CurrentMessageContainer = styled.div`
  position: sticky;
  top: 70px;
  width: 100%;
  height: calc(100% - 130px);
  background-color: ${({ theme }) => theme.colors.brown.brown7};
  overflow: scroll;
`;

const Messages = styled.div`
  padding: 70px 5px 70px 50px;
  display: flex;
  flex-direction: column;
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
    const q = query(usersRef, where("uid", "not-in", [user1]));
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
    setChat(user);

    const user2 = user.uid;
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;
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
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
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

      <RightContainer>
        {chat ? (
          <>
            <MessagesUserHeader>
              <h3>{chat.name}</h3>
            </MessagesUserHeader>
            <CurrentMessageContainer>
              <Messages>
                {msgs.length
                  ? msgs.map((msg, i) => (
                      <Message key={i} msg={msg} user1={user1} />
                    ))
                  : null}
              </Messages>
            </CurrentMessageContainer>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation</h3>
        )}
      </RightContainer>
    </div>
  );
};

export default Home;
