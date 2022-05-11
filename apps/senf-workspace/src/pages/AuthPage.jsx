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
  collection,
  where,
  query,
  setDoc,
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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      console.log(userCredential.user);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        handle: formikRegisterStore.values.handle,
        age: formikRegisterStore.values.age,
        sex: formikRegisterStore.values.sex,
        createdAt: new Date().toISOString(),
        userId: userCredential.user.uid,
      });
      await setDoc(
        doc(
          db,
          "users",
          userCredential.user.uid,
          "Private",
          userCredential.user.uid
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
      where("handle", "==", formikRegisterStore.values.handle)
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
        console.log(userCredential);

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
        console.log(errorCode);
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
        setLoading(false);
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
