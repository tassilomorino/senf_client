/** @format */

import React, { useState, Fragment, useRef, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_AUTHENTICATED } from "../redux/types";

import { auth, db } from "../firebase";

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
  getDoc,
  getDocs,
  collection,
  where,
  query,
  setDoc,
} from "firebase/firestore";

import { useTranslation } from "react-i18next";
import { getUserData } from "../redux/actions/userActions";

import { Modal, Auth as AuthComponent } from "senf-atomic-design-system";

const Auth = ({ setAuthOpen, authOpen, authEditOpen }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [emailRegistrationSubmitted, setEmailRegistrationSubmitted] =
    useState(false);

  const [verifiedUser, setVerifiedUser] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (authEditOpen) {
      setVerifiedUser(true);
    } else {
      setEmailRegistrationSubmitted(false);
      setVerifiedUser(false);
    }
  }, [authOpen, authEditOpen]);

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

          setAuthOpen(false);
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

        setEmailRegistrationSubmitted(true);
        // history.push("/verify", emailWrapper);
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

  const handleProviderSignin = async (providerName) => {
    try {
      let provider;
      let result;
      let credential;

      if (providerName === "google") {
        provider = new GoogleAuthProvider();
        provider.addScope("email");
        result = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        credential = GoogleAuthProvider.credentialFromResult(result);
      }
      if (providerName === "facebook") {
        provider = new FacebookAuthProvider();
        provider.addScope("email");
        result = await signInWithPopup(auth, provider);
        credential = FacebookAuthProvider.credentialFromResult(result);
      }
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists() && user) {
        await createUserInDatabase(user);
        dispatch({ type: SET_AUTHENTICATED });
        dispatch(getUserData(user.uid));
        setVerifiedUser(true);
      } else if (user) {
        console.log("user already exists");
        dispatch({ type: SET_AUTHENTICATED });
        dispatch(getUserData(user.uid));
        if (
          user.description &&
          user.zipcode &&
          user.photoUrl &&
          user.age &&
          user.sex
        ) {
          setAuthOpen(false);
        } else {
          setVerifiedUser(true);
        }
      }
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      let credential;
      if (providerName === "google") {
        credential = GoogleAuthProvider.credentialFromError(error);
      }
      if (providerName === "facebook") {
        credential = FacebookAuthProvider.credentialFromError(error);
      }

      throw new Error(errorCode, errorMessage, email, credential);
    }
  };

  const handleSubmitEditDetails = async (data) => {
    await updateDoc(doc(db, "users", user.userId), {
      handle: formikRegisterStore.values.username,
      description: formikRegisterStore.values.description,
      zipcode: formikRegisterStore.values.zipcode,
      age: formikRegisterStore.values.age,
      sex: formikRegisterStore.values.sex,
    });
  };

  async function handleImageUpload(event) {
    if (!user?.userId) return;
    const imageFile = event.target.files[0];
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.03,
      maxWidthOrHeight: 700,
      useWebWorker: true,
    };
    try {
      setUploadingImage(true);
      const compressedFile = await imageCompression(imageFile, options);

      const storage = getStorage();
      const storageRef = ref(storage, `profileimages/thumbnail`);
      const userRef = doc(db, `users/${user.userId}`);

      await uploadBytes(storageRef, compressedFile).then((snapshot) => {
        console.log("Uploaded a file!");
      });
      const photoUrl = await getDownloadURL(storageRef);
      // setUploadedImage(photoUrl);
      await updateDoc(userRef, { photoUrl: photoUrl });
      setUploadingImage(false);
    } catch (error) {
      console.log(error);
    }
  }

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
    <Fragment>
      <Modal openModal={authOpen} setOpenModal={() => setAuthOpen(false)}>
        <AuthComponent
          user={user}
          loginLoading={loading}
          handleSubmitLogin={(loginData) => handleSubmitLogin(loginData)}
          handleSubmitRegister={(registerData) =>
            handleSubmitRegister(registerData)
          }
          handleGoogleSignIn={() => handleProviderSignin("google")}
          handleFacebookSignIn={() => handleProviderSignin("facebook")}
          handleImageUpload={handleImageUpload}
          uploadingImage={uploadingImage}
          handleSubmitEditDetails={handleSubmitEditDetails}
          emailRegistrationSubmitted={emailRegistrationSubmitted}
          verifiedUser={verifiedUser}
          handleClose={() => setAuthOpen(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default memo(Auth);
