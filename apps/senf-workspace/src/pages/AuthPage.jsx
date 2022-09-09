import React, { useState, useEffect } from "react";
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
import { SwipeModal, Auth as AuthComponent, ModalButton, useModals, Button, Box, Input, Loader } from "senf-atomic-design-system";

import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithFacebook,
  useCreateUserWithEmailAndPassword,
  useHandleSubmitEditDetails,
  generateErrorMessage,
  ifAllUserDetailsAreFilled,
  useAuthContext,
  AuthModal
} from "senf-shared";

import styled from "styled-components";
// import { getUserData } from "../redux/actions/userActions";

import { auth, db } from "../firebase";
import { getUserData } from "../redux/actions/userActions";
import { SET_AUTHENTICATED } from "../redux/types";
// import { SET_AUTHENTICATED } from "../redux/types";




const Section = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.beige.beige20};
`;

const Test = () => {
  const [input, setInput] = useState("This is an example text, edit me!");
  return <Box padding="20px" flexDirection="column" gap="10px"><Input value={input} onChange={(e) => setInput(e.target.value)} />
    {input}
  </Box>
}


const AuthPage = ({ authAddDetails }) => {

  const [errorMessage, setErrorMessage] = useState({ code: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [page, setPage] = useState('');


  const { user: currentUser, signOut } = useAuthContext();

  const { openModal, setModal, closeModal } = useModals();

  const user = useSelector((state) => state.user);
  const reduxUser = useSelector((state) => state.user);
  const userIdInFirebase = getAuth().currentUser?.uid;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const [
  //   signInWithEmailAndPassword,
  //   firebaseEmailPasswordSignInUser,
  //   firebaseEmailPasswordSignInLoading,
  //   firebaseEmailPasswordSignInError,
  // ] = useSignInWithEmailAndPassword(auth);
  // const [
  //   signInWithGoogle,
  //   firebaseGoogleUser,
  //   firebaseGoogleUserLoading,
  //   firebaseGoogleUserError,
  // ] = useSignInWithGoogle(auth, db);
  // const [
  //   signInWithFacebook,
  //   firebaseFacebookUser,
  //   firebaseFacebookUserLoading,
  //   firebaseFacebookUserError,
  // // ] = useSignInWithFacebook(auth, db);
  // const sendVerification = {
  //   sendEmailVerification: true,
  //   emailVerificationOptions: {
  //     url: "https://senf.koeln/verify",
  //   },
  // };
  // const [
  //   createUserWithEmailAndPassword,
  //   firebaseUserEmailRegistrationInfo,
  //   firebaseUserEmailRegistrationLoading,
  //   firebaseUserEmailRegistrationError,
  // ] = useCreateUserWithEmailAndPassword(auth, db, sendVerification);

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

  // useEffect(() => {
  //   // login with email and password
  //   if (firebaseEmailPasswordSignInLoading) {
  //     setLoading(true);
  //   }
  //   if (firebaseEmailPasswordSignInUser) {
  //     setLoading(false);
  //     setErrorMessage({ code: "", message: "" });
  //     dispatch({ type: SET_AUTHENTICATED });
  //     dispatch(getUserData(firebaseEmailPasswordSignInUser.user.uid));


  //     closeModal()

  //   }
  //   if (firebaseEmailPasswordSignInError) {
  //     setLoading(false);

  //     setErrorMessage({
  //       ...errorMessage,
  //       code: firebaseEmailPasswordSignInError.code,
  //       message: generateErrorMessage(firebaseEmailPasswordSignInError?.code),
  //     });

  //   }
  // }, [
  //   dispatch,
  //   firebaseEmailPasswordSignInLoading,
  //   firebaseEmailPasswordSignInUser,
  //   firebaseEmailPasswordSignInError,
  // ]);

  // useEffect(() => {
  //   // registration with email and password
  //   if (firebaseUserEmailRegistrationLoading) {
  //     setLoading(true);
  //   }

  //   if (firebaseUserEmailRegistrationInfo) {
  //     setLoading(false);
  //     setErrorMessage({ code: "", message: "" });
  //     setPage('authVerifyEmail')
  //     window.history.pushState(null, null, "/verify");
  //   }



  //   if (firebaseUserEmailRegistrationError) {
  //     setLoading(false);
  //     setErrorMessage({
  //       code: firebaseUserEmailRegistrationError.code,
  //       message: generateErrorMessage(firebaseUserEmailRegistrationError?.code),
  //     });

  //   }
  // }, [
  //   firebaseUserEmailRegistrationError,
  //   firebaseUserEmailRegistrationInfo,
  //   firebaseUserEmailRegistrationLoading,

  // ]);

  const UrlPath = window.location.pathname;
  useEffect(() => {
    // auto login if email has been verified


    if (UrlPath === "/verify") {



      const unsubscribe = onIdTokenChanged(auth, (user) => {
        if (user && user.uid && user.emailVerified && ifAllUserDetailsAreFilled(reduxUser)) {
          // close modal and redirect to home
          dispatch({ type: SET_AUTHENTICATED });
          dispatch(getUserData(user.uid));
          closeModal()
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
    // edit user details
    if (editedUserisLoading) {
      setLoading(true);
    }
    if (editedUser) {
      setLoading(false);
      setErrorMessage({ code: "", message: "" });
      dispatch(getUserData(user.userId)).then(() => {
        closeModal()

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



  const Modal = <AuthModal
    success={() => closeModal()}
    error={(err) => console.error(err)}
    handleClose={() => closeModal()}
  />

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (!currentUser) setModal(Modal, {
        swipe: true,
        beforeOpen: () => new Promise((resolve, reject) => { console.log('before, and wait a sec'); setTimeout(resolve, 1000) }),
        afterOpen: () => console.log('after open'),
        beforeClose: () => console.log('before close'),
        afterClose: () => console.log('after close'),
      })
    }, 800);
    return () => clearTimeout(timeoutID);
  }, [currentUser])

  return (
    <Section>
      <Box margin="20px">
        {!currentUser && <Button onClick={() => setModal(Modal, { swipe: true })}>Login</Button>}
        {currentUser && <Button onClick={signOut}>Logout</Button>}
      </Box>
      <Box padding="20px">
        <ModalButton text="open 1" options={{
          // swipe: true,
          cancelText: "Cancel",
          submitText: "Submit",
          onSubmit: () => { console.log("submitted") },
          title: "Modal Title",
          description: "The description of the modal",
          swipe: true,
          beforeOpen: () => new Promise((resolve, reject) => { console.log('before, and wait a sec'); setTimeout(resolve, 1000) }),
          afterOpen: () => console.log('after open'),
          beforeClose: () => console.log('before close'),
          afterClose: () => console.log('after close'),

        }}>
          <>
            <Box paddingInline="20px">
              <div>
                <p>Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken. Wenn das liebe Tal um mich dampft, und die hohe Sonne an der Oberfläche der undurchdringlichen Finsternis meines Waldes ruht, und nur einzelne Strahlen sich in das innere Heiligtum stehlen, ich dann im hohen Grase am fallenden Bache liege, und näher an der Erde tausend mannigfaltige Gräschen mir merkwürdig werden; wenn ich das Wimmeln der kleinen Welt zwischen Halmen, die unzähligen, unergründlichen Gestalten der Würmchen, der Mückchen näher an meinem Herzen fühle, und fühle die Gegenwart des Allmächtigen, der uns nach seinem Bilde schuf, das Wehen des Alliebenden, der uns in ewiger Wonne schwebend trägt und erhält; mein Freund! Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken. Wenn das liebe Tal um mich dampft, und die hohe Sonne an der Oberfläche der undurchdringlichen Finsternis meines Waldes ruht, und nur einzelne Strahlen sich in das innere Heiligtum stehlen, ich dann im hohen Grase am fallenden Bache liege, und näher an der Erde tausend mannigfaltige Gräschen mir merkwürdig werden; wenn ich das Wimmeln der kleinen Welt zwischen Halmen, die unzähligen, unergründlichen Gestalten der Würmchen, der Mückchen näher an meinem Herzen fühle, und fühle die Gegenwart des Allmächtigen, der uns nach seinem Bilde schuf, das Wehen des Alliebenden, der uns in ewiger Wonne schwebend trägt und erhält; mein Freund! Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken. Wenn das liebe Tal um mich dampft, und die hohe Sonne an der Oberfläche der undurchdringlichen Finsternis meines Waldes ruht, und nur einzelne Strahlen sich in das innere Heiligtum stehlen, ich dann im hohen Grase am fallenden Bache liege, und näher an der Erde tausend mannigfaltige Gräschen mir merkwürdig werden; wenn ich das Wimmeln der kleinen Welt zwischen Halmen, die unzähligen, unergründlichen Gestalten der Würmchen, der Mückchen näher an meinem Herzen fühle, und fühle die Gegenwart des Allmächtigen, der uns nach seinem Bilde schuf, das Wehen des Alliebenden, der uns in ewiger Wonne schwebend trägt und erhält; mein Freund! </p>
              </div>
            </Box>
            <Box padding="20px">
              <ModalButton text="open 2" options={{
                size: "sm",
                title: "This is another title, and this time a little longer", cancelText: "cancel", submitText: "Open Modal", onSubmit: () => openModal(<Test />)
              }}>
                <Box padding="20px" flexDirection="column" gap="10px">

                  <ModalButton text="open 4">
                    <Box padding="20px">
                      <Button onClick={() => openModal(Modal, { swipe: true })}>Login</Button>
                    </Box>
                  </ModalButton>
                </Box>
              </ModalButton>
            </Box>
          </>
        </ModalButton>
      </Box>

      {
        currentUser &&
        <Box margin="20px">
          User: {JSON.stringify(currentUser)}
        </Box>
      }
    </Section >
  );
};

export default AuthPage;
