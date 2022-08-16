/** @format */

import React, { useState, Fragment, useRef, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onIdTokenChanged,
  reload,
} from "firebase/auth";

import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  where,
  query,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";

import { useTranslation } from "react-i18next";
import { SwipeModal, Auth as AuthComponent, ModalButton, ModalContext } from "senf-atomic-design-system";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithFacebook,
  useCreateUserWithEmailAndPassword,
  useHandleSubmitEditDetails,
  generateErrorMessage,
  ifAllUserDetailsAreFilled,
} from "senf-shared";

import { getUserData } from "../redux/actions/userActions";

import { auth, db } from "../firebase";
import { SET_AUTHENTICATED } from "../redux/types";

const Auth = ({
  authAddDetails
}) => {
  const { handleModal } = React.useContext(ModalContext) || {};

  const [errorMessage, setErrorMessage] = useState({ code: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [page, setPage] = useState('');


  const user = useSelector((state) => state.user);
  const reduxUser = useSelector((state) => state.user);
  const userIdInFirebase = getAuth().currentUser?.uid;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [
    signInWithEmailAndPassword,
    firebaseEmailPasswordSignInUser,
    firebaseEmailPasswordSignInLoading,
    firebaseEmailPasswordSignInError,
  ] = useSignInWithEmailAndPassword(auth);
  const [
    signInWithGoogle,
    firebaseGoogleUser,
    firebaseGoogleUserLoading,
    firebaseGoogleUserError,
  ] = useSignInWithGoogle(auth, db);
  const [
    signInWithFacebook,
    firebaseFacebookUser,
    firebaseFacebookUserLoading,
    firebaseFacebookUserError,
  ] = useSignInWithFacebook(auth, db);
  const sendVerification = {
    sendEmailVerification: true,
    emailVerificationOptions: {
      url: "https://deploy-preview-544--senf-client-test.netlify.app/verify",
    },
  };
  const [
    createUserWithEmailAndPassword,
    firebaseUserEmailRegistrationInfo,
    firebaseUserEmailRegistrationLoading,
    firebaseUserEmailRegistrationError,
  ] = useCreateUserWithEmailAndPassword(auth, db, sendVerification);

  const [
    handleSubmitEditDetails,
    editedUser,
    editedUserisLoading,
    editedUserError,
  ] = useHandleSubmitEditDetails(userIdInFirebase, user, db);
  // useEffect(() => {
  //   if (authEditOpen) {
  //     setVerifiedUser(true);
  //   } else {
  //     setEmailRegistrationSubmitted(false);
  //     setVerifiedUser(false);
  //   }
  // }, [authEditOpen]);

  useEffect(() => {
    // login with email and password
    if (firebaseEmailPasswordSignInLoading) {
      setLoading(true);
    }
    if (firebaseEmailPasswordSignInUser) {
      setLoading(false);
      setErrorMessage({ code: "", message: "" });
      dispatch({ type: SET_AUTHENTICATED });
      dispatch(getUserData(firebaseEmailPasswordSignInUser.user.uid));
      handleModal("pop")

    }
    if (firebaseEmailPasswordSignInError) {
      setLoading(false);

      setErrorMessage({
        ...errorMessage,
        code: firebaseEmailPasswordSignInError.code,
        message: generateErrorMessage(firebaseEmailPasswordSignInError?.code),
      });

    }
  }, [
    dispatch,
    firebaseEmailPasswordSignInLoading,
    firebaseEmailPasswordSignInUser,
    firebaseEmailPasswordSignInError,
  ]);

  useEffect(() => {
    // registration with email and password
    if (firebaseUserEmailRegistrationLoading) {
      setLoading(true);
    }

    if (firebaseUserEmailRegistrationInfo) {
      setLoading(false);
      setErrorMessage({ code: "", message: "" });
      setPage('authVerifyEmail')
      window.history.pushState(null, null, "/verify");
    }



    if (firebaseUserEmailRegistrationError) {
      setLoading(false);
      setErrorMessage({
        code: firebaseUserEmailRegistrationError.code,
        message: generateErrorMessage(firebaseUserEmailRegistrationError?.code),
      });

    }
  }, [
    firebaseUserEmailRegistrationError,
    firebaseUserEmailRegistrationInfo,
    firebaseUserEmailRegistrationLoading,

  ]);

  const UrlPath = window.location.pathname;
  useEffect(() => {
    // auto login if email has been verified


    if (UrlPath === "/verify") {



      const unsubscribe = onIdTokenChanged(auth, (user) => {
        if (user && user.uid && user.emailVerified && ifAllUserDetailsAreFilled(reduxUser)) {
          // close modal and redirect to home
          dispatch({ type: SET_AUTHENTICATED });
          dispatch(getUserData(user.uid));
          handleModal("pop")
          // setPage('AuthSuccess') ??
          console.log('user is verified,all userdetails are set, redirecting  to homepage')
          window.history.pushState(null, null, "/");

        }
        if (user && user.uid && user.emailVerified && !ifAllUserDetailsAreFilled(reduxUser)) {
          // open modal <AuthAddDetails/>
          dispatch({ type: SET_AUTHENTICATED });
          dispatch(getUserData(user.uid));
          setPage('authAddDetails')
          console.log('user is verified ,but redirecting  to add details because user details are not fully set')
          window.history.pushState(null, null, "/");

        }
        if (user && user.uid && !user.emailVerified) {
          // open modal <AuthVerifyEmail/>
          console.log('user is not yet verified')
          setPage('authVerifyEmail')

        }
        if (!user) {
          // open modal <AuthOptions/> 
          console.log('user is not logged in')
          window.history.pushState(null, null, "/");
          setPage('authOptions')

        }
      });

      const interval = setInterval(async () => {
        try {
          if (auth.currentUser) {
            await reload(auth.currentUser);
          }
        } catch (error) {
          throw new Error(error, "error in main.jsx email verification");
        }
      }, 3000);
      return () => {
        clearInterval(interval)
        unsubscribe()
      }
    }
  }, [UrlPath, reduxUser])





  useEffect(() => {
    // sign in with google
    if (firebaseGoogleUserLoading) {
      setLoading(true);
    }
    if (firebaseGoogleUser) {
      console.log(firebaseGoogleUser, "firebaseGoogleUser in auth.jsx");
      setLoading(false);
      setErrorMessage({ code: "", message: "" });
      dispatch({ type: SET_AUTHENTICATED });
      dispatch(getUserData(firebaseGoogleUser.user.uid));

      handleModal("pop")

    }
    if (firebaseGoogleUserError) {
      setLoading(false);
      setErrorMessage({
        ...errorMessage,
        code: firebaseGoogleUserError.code,
        message: generateErrorMessage(firebaseGoogleUserError.code),
      });
    }
  }, [firebaseGoogleUser, firebaseGoogleUserError, firebaseGoogleUserLoading]);

  useEffect(() => {
    // sign in with facebook
    if (firebaseFacebookUserLoading) {
      setLoading(true);
    }
    if (firebaseFacebookUser) {
      setLoading(false);
      setErrorMessage({ code: "", message: "" });
      dispatch({ type: SET_AUTHENTICATED });
      dispatch(getUserData(firebaseFacebookUser.user.uid));

      handleModal("pop")

    }
    if (firebaseFacebookUserError) {
      setLoading(false);
      setErrorMessage({
        ...errorMessage,
        code: firebaseFacebookUserError.code,
        message: generateErrorMessage(firebaseFacebookUserError.code),
      });
    }
  }, [
    firebaseFacebookUser,
    firebaseFacebookUserError,
    firebaseFacebookUserLoading,
  ]);

  useEffect(() => {
    // edit user details
    if (editedUserisLoading) {
      setLoading(true);
    }
    if (editedUser) {
      setLoading(false);
      setErrorMessage({ code: "", message: "" });
      dispatch(getUserData(user.userId)).then(() => {
        handleModal("pop")

        setErrorMessage({ code: "", message: "" });
      });
    }
    if (editedUserError) {
      setLoading(false);
      setErrorMessage({
        ...errorMessage,
        code: editedUserError.code,
        message: editedUserError,
      });
    }
  }, [editedUser, editedUserError, editedUserisLoading]);

  async function handleImageUpload(event) {
    if (
      userIdInFirebase !== user.userId ||
      user.isAdmin === false ||
      user.isSuperAdmin === false ||
      user.isModerator === false
    ) {
      throw new Error("user not authorized to handleImageUpload");
    }
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
      const photoURL = await getDownloadURL(storageRef);
      // setUploadedImage(photoUrl);
      await updateDoc(userRef, { photoURL }).then(() => {
        dispatch(getUserData(user.userId));
        setUploadingImage(false);
      });
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

  useEffect(() => {
    if (authAddDetails) {
      setPage('authAddDetails')
    }


  }, [authAddDetails])



  return (<AuthComponent
    errorMessage={errorMessage}
    user={user}
    loginLoading={loading}
    handleSubmitLogin={(formikLoginStore) =>
      signInWithEmailAndPassword(
        formikLoginStore.values.email,
        formikLoginStore.values.password
      )
    }
    handleSubmitRegister={(formikRegisterStore) =>
      createUserWithEmailAndPassword(formikRegisterStore)
    }
    handleGoogleSignIn={() => signInWithGoogle(["email"])} // asks google for email
    handleFacebookSignIn={() => signInWithFacebook(["email"])} // asks facebook for email
    handleImageUpload={handleImageUpload}
    uploadingImage={uploadingImage}
    handleSubmitEditDetails={(userDetails) =>
      handleSubmitEditDetails(userDetails)
    }
    setPage={setPage}
    page={page}
    handleClose={() => {
      handleModal("pop")
      setErrorMessage({ code: "", message: "" });
    }}
  />
  );
};

export default (Auth);
