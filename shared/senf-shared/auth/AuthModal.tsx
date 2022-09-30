import React, { FC, useState, useEffect } from "react";

import { Auth, useModals } from "senf-atomic-design-system";
import { FormikValues } from "formik";
import { useAuthContext } from "./AuthProvider";

const providerId = {
  google: Math.random().toString(36).substring(2, 15),
  facebook: Math.random().toString(36).substring(2, 15),
  email: Math.random().toString(36).substring(2, 15),
};

const AuthModal: FC<{
  success: () => void;
  error: () => void;
  handleClose: () => void;
  authAddDetails?: boolean;
}> = (data) => {
  const [page, setPage] = useState("");
  const authContext = useAuthContext();
  const {
    user,
    signIn,
    signOut,
    userExists,
    createUser,
    loading,
    errorMessage,
    sendPasswordResetEmail,
    submitEditDetails,
    handleImageUpload,
  } = authContext || {};
  const { closeModal } = useModals();

  const {
    success = () => closeModal(),
    error = () => closeModal(),
    handleClose,
    authAddDetails,
  } = data;

  useEffect(() => {
    if (authAddDetails) {
      setPage("authAddDetails");
    }
  }, [authAddDetails]);

  // const UrlPath = window.location.pathname;
  // useEffect(() => {
  //   // auto login if email has been verified

  //   if (UrlPath !== "/verify") return

  //   const unsubscribe = onIdTokenChanged(auth, (user) => {
  //     if (user && user.uid && user.emailVerified && ifAllUserDetailsAreFilled(reduxUser)) {
  //       // close modal and redirect to home
  //       dispatch({ type: SET_AUTHENTICATED });
  //       dispatch(getUserData(user.uid));
  //       closeModal()
  //       // setPage('AuthSuccess') ??
  //       console.log('user is verified,all userdetails are set, redirecting  to homepage')
  //       navigate("/");

  //     }
  //     if (user && user.uid && user.emailVerified && !ifAllUserDetailsAreFilled(reduxUser)) {
  //       // open modal <AuthAddDetails/>
  //       dispatch({ type: SET_AUTHENTICATED });
  //       dispatch(getUserData(user.uid));
  //       setPage('authAddDetails')
  //       console.log('user is verified ,but redirecting  to add details because user details are not fully set')
  //       navigate("/");

  //     }
  //     if (user && user.uid && !user.emailVerified) {
  //       // open modal <AuthVerifyEmail/>
  //       console.log('user is not yet verified')
  //       setPage('authVerifyEmail')

  //     }
  //     if (!user) {
  //       // open modal <AuthOptions/>
  //       console.log('user is not logged in')
  //       navigate("/");
  //       setPage('authOptions')

  //     }
  //   });

  //   const interval = setInterval(async () => {
  //     try {
  //       if (auth.currentUser) {
  //         await reload(auth.currentUser);
  //       }
  //     } catch (error) {
  //       throw new Error(error, "error in main.jsx email verification");
  //     }
  //   }, 3000);
  //   return () => {
  //     clearInterval(interval)
  //     unsubscribe()
  //   }
  // }, [UrlPath, reduxUser])

  const [facebookLoading, setFacebookLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    setPage("authOptions");
  }, []);

  useEffect(() => {
    const loadingProvider =
      Object.keys(providerId).find((key) => providerId[key] === loading) ||
      loading;
    setFacebookLoading(loadingProvider === "facebook");
    setGoogleLoading(loadingProvider === "google");
    setEmailLoading(loadingProvider === "email");
    setEditLoading(loadingProvider === "edit");
  }, [loading]);

  const authHandler = {
    ...authContext,
    signIn: {
      facebook: () =>
        signIn({ provider: "facebook", id: providerId.facebook })
          .then(success)
          .catch(error),
      google: () =>
        signIn({ provider: "google", id: providerId.google })
          .then(success)
          .catch(error),
      email: (formikStore: FormikValues) =>
        signIn({ formikStore, id: providerId.email })
          .then(() => authContext.ifAllUserDetailsAreFilled(user) && success())
          .catch(error),
      // email: (formikStore: FormikValues) => signIn({ formikStore, id: providerId.email }).then(success).catch(error),
    },
    loadingAuth: loading,
    loading: {
      facebook: facebookLoading,
      google: googleLoading,
      email: emailLoading,
    },
    submitEditDetails: (formikStore: FormikValues) =>
      submitEditDetails({ formikStore }).then(success).catch(error),
    createUser: (formikStore: FormikValues) =>
      createUser(formikStore).then(success).catch(error),
  };

  return (
    <Auth
      errorMessage={errorMessage}
      user={user}
      authHandler={authHandler}
      setPage={setPage}
      page={page}
      handleClose={handleClose}
    />
  );
};

export { AuthModal };
