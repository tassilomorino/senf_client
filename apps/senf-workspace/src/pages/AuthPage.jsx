import React, { useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import {
  doc,
  getDocs,
  getDoc,
  collection,
  onSnapshot,
  where,
  addDoc,
  query,
  orderBy,
  deleteDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  Icon,
  Button,
  Input,
  OrganizationCard,
  Auth,
} from "senf-atomic-design-system";
import styled from "styled-components";

const Section = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.beige.beige20};
`;
const AuthWrapper = styled.div`
  width: 400px;
  margin-left: calc(50% - 200px);
  height: calc(90% - 40px);
  margin-top: calc(5% - 20px);
  position: fixed;
  overflow: scroll;
  border-radius: 18px;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  position: fixed;
  background-color: ${({ theme }) => theme.colors.black.black40tra};
`;

const AuthPage = ({ variant }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { name, email, password, error } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (formikLoginStore) => {
    setLoading(true);
    signInWithEmailAndPassword(
      auth,
      formikLoginStore.values.email,
      formikLoginStore.values.password
    )
      .then((userCredential) => {
        if (userCredential.user.emailVerified) {
          console.log(userCredential.user.userId);
          setLoading(false);
          console.log(window.location);
        } else {
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setLoading(false);
      });

    // dispatch(loginUser(userData, props.history))
  };

  async function createUserInDatabase(userCredential, formikRegisterStore) {
    if (userCredential && userCredential.user) {
      await setDoc(doc(db, "users", userCredential.user.userId), {
        handle: formikRegisterStore.values.username,
        age: formikRegisterStore.values.age,
        sex: formikRegisterStore.values.sex,
        createdAt: new Date().toISOString(),
        userId: userCredential.user.userId,
      });
      await setDoc(
        doc(
          db,
          "users",
          userCredential.user.userId,
          "Private",
          userCredential.user.userId
        ),
        {
          email: formikRegisterStore.values.email,
        }
      );
    }
  }
  const handleSubmitRegister = async (formikRegisterStore) => {
    setLoading(true);
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("handle", "==", formikRegisterStore.values.username)
    );
    const usernameQuerySnapshot = await getDocs(q);

    if (!usernameQuerySnapshot.empty) {
      // username already exists
      setLoading(false);
      return;
    } else {
      // username is available, try to create user and put info to database
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formikRegisterStore.values.email,
          formikRegisterStore.values.password
        );

        await createUserInDatabase(userCredential, formikRegisterStore);

        await sendEmailVerification(auth.currentUser);

        setLoading(false);

        const emailWrapper = {
          email: formikRegisterStore.values.email,
        };
        navigate("/");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        if (errorCode === "auth/email-already-in-use") {
          setLoading(false);
        }
        if (errorCode === "auth/invalid-email") {
          setLoading(false);
        }
        if (errorCode === "auth/weak-password") {
          setLoading(false);
        }
        if (errorCode === "auth/too-many-requests") {
          setLoading(false);
        }
      }
    }
  };

  return (
    <Section>
      <Background />
      <AuthWrapper>
        <Auth
          loading={loading}
          handleSubmitLogin={(loginData) => handleSubmitLogin(loginData)}
          handleSubmitRegister={(registerData) =>
            handleSubmitRegister(registerData)
          }
        />
      </AuthWrapper>
    </Section>
  );
};

export default AuthPage;
