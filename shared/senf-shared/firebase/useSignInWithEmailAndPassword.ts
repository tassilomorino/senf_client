import {
  Auth,
  UserCredential,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  AuthError,
} from "firebase/auth";
import { useState, useMemo } from "react";
import { EmailAndPasswordActionHook } from "./types";
import { generateErrorMessage } from "./generateErrorMessage";

/* export const useSignInWithEmailAndPassword = (
  auth: Auth
): EmailAndPasswordActionHook => {
  const [error, setError] = useState({ code: "", message: "" });
  const [loggedInUser, setLoggedInUser] = useState<UserCredential>();
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError({ code: "", message: "" });
    try {
      const user = await firebaseSignInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (user.user.emailVerified) {
        setLoggedInUser(user);
      } else {
        setError({
          code: "auth/user-not-verified",
          message: "User is not verified",
        });
      }
    } catch (err) {
      console.log(
        err.code,
        err.message,
        "error code and message in useSignInWithEmailAndPassword"
      );
      setError({
        ...err,
        code: err.code,
        message: generateErrorMessage(err.code),
      });
    } finally {
      setLoading(false);
    }
  };

  const resArray: EmailAndPasswordActionHook = [
    signInWithEmailAndPassword,
    loggedInUser,
    loading,
    error,
  ];
  return useMemo<EmailAndPasswordActionHook>(() => resArray, resArray);
}; */

/* export const handleSubmitLogin = async (formikLoginStore) => {
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
}; */

export const useSignInWithEmailAndPassword = (
  auth: Auth
): EmailAndPasswordActionHook => {
  const [error, setError] = useState<AuthError>();
  const [loggedInUser, setLoggedInUser] = useState<UserCredential>();
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(undefined);
    try {
      const user = await firebaseSignInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoggedInUser(user);
    } catch (err) {
      setError(err as AuthError);
    } finally {
      setLoading(false);
    }
  };

  const resArray: EmailAndPasswordActionHook = [
    signInWithEmailAndPassword,
    loggedInUser,
    loading,
    error,
  ];
  return useMemo<EmailAndPasswordActionHook>(() => resArray, resArray);
};
