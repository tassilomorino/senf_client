/** @format */

import React, { useState, Fragment, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_AUTHENTICATED } from "../../../redux/types";

import { auth, db } from "../../../firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  doc,
  getDocs,
  collection,
  where,
  query,
  setDoc,
} from "firebase/firestore";

import { useHistory } from "react-router";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

import { useTranslation } from "react-i18next";
import { getUserData } from "../../../redux/actions/userActions";

import { Modal, Auth } from "senf-atomic-design-system";

const LoginRegistration = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const authenticated = user.authenticated;

  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmitLogin = async (formikLoginStore) => {
    // event.preventDefault();

    setLoading(true);
    signInWithEmailAndPassword(
      auth,
      formikLoginStore.values.email,
      formikLoginStore.values.password
    )
      .then((userCredential) => {
        if (userCredential.user.emailVerified) {
          console.log(userCredential.user.uid);
          setLoading(false);
          dispatch({ type: SET_AUTHENTICATED });
          dispatch(getUserData(userCredential.user.uid));
          console.log(window.location);
          if (window.location.pathname === "/verify") {
            history.push("/");
          }

          setOpen(false);
        } else {
          setLoading(false);
          setErrorMessage(t("email_not_verified"));
        }
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err.message);
      });

    // dispatch(loginUser(userData, props.history))
  };
  async function createUserInDatabase(userCredential, formikRegisterStore) {
    if (userCredential && userCredential.user) {
      await setDoc(doc(db, "users", userCredential.user.uid), {
        handle: formikRegisterStore.values.username,
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
          userId: userCredential.user.uid,
        }
      );
    }
  }
  const handleSubmitRegister = async (formikRegisterStore) => {
    // event.preventDefault();

    setLoading(true);
    setErrorMessage("");
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("handle", "==", formikRegisterStore.values.username)
    );
    const usernameQuerySnapshot = await getDocs(q);

    if (!usernameQuerySnapshot.empty) {
      // username already exists
      setLoading(false);
      setErrorMessage(t("username_taken"));
      return;
    } else {
      // username is available, try to create user and put info to database
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formikRegisterStore.values.email,
          formikRegisterStore.values.password
        );

        const actionCodeSettings = {
          //change to senf.koeln on production
          url: "https://senf.koeln/verify",
        };

        await sendEmailVerification(auth.currentUser, actionCodeSettings);
        await createUserInDatabase(userCredential, formikRegisterStore);

        setLoading(false);

        const emailWrapper = {
          email: formikRegisterStore.values.email,
        };
        history.push("/verify", emailWrapper);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        setErrorMessage(errorMessage);
        if (errorCode === "auth/email-already-in-use") {
          setLoading(false);
          setErrorMessage(t("email_taken"));
        }
        if (errorCode === "auth/invalid-email") {
          setLoading(false);
          setErrorMessage(t("enter_valid_email"));
        }
        if (errorCode === "auth/weak-password") {
          setLoading(false);
          setErrorMessage(t("password_6characters"));
        }
        if (errorCode === "auth/too-many-requests") {
          setLoading(false);
          setErrorMessage(t("too_many_requests"));
        }
      }
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message, "error in facebook provider");
      });
  };
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("email");

      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists() && user) {
        await createUserInDatabase(user);
        dispatch({ type: SET_AUTHENTICATED });
        dispatch(getUserData(user.uid));
      } else if (user) {
        console.log("user already exists");
        dispatch({ type: SET_AUTHENTICATED });
        dispatch(getUserData(user.uid));
      }
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      throw new Error(errorCode, errorMessage, email, credential);

      // ...
    }
  };

  // const keySubmitRef = useRef(null);

  // useEffect(() => {
  //   const listener = (event) => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       console.log("Enter key was pressed. Run your function.");
  //       // callMyFunction();
  //       keySubmitRef.current?.click();
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);

  return (
    !authenticated && (
      <Fragment>
        <ExpandButton
          handleButtonClick={() => setOpen(true)}
          data-cy="open-RegistrationAndLogin"
        ></ExpandButton>

        <Modal openModal={open}>
          <Auth
            loginLoading={loading}
            handleSubmitLogin={(loginData) => handleSubmitLogin(loginData)}
            handleSubmitRegister={(registerData) =>
              handleSubmitRegister(registerData)
            }
            handleGoogleSignIn={handleGoogleSignIn}
            handleFacebookSignIn={handleFacebookSignIn}
            handleClose={() => setOpen(false)}
          />
        </Modal>
      </Fragment>
    )
  );
};

export default memo(LoginRegistration);
