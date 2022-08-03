import {
  Auth,
  UserCredential,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  AuthError,
} from "firebase/auth";
import { useState, useMemo } from "react";
import { EmailAndPasswordActionHook } from "./types";

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
      if (user.user.emailVerified) {
        setLoggedInUser(user);
      } else {
        /* throw new Error("auth/user-not-verified" as AuthError["code"]); */
        setLoading(false);
        setError({ ...error, code: "auth/user-not-verified" });
        return;
      }
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
