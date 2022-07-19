import {
  Auth,
  UserCredential,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  AuthError,
  getAuth,
} from "firebase/auth";
import { useState, useMemo } from "react";
import { EmailAndPasswordActionHook } from "./types";
import { generateErrorMessage } from "./generateErrorMessage";

const auth = getAuth();
export const useSignInWithEmailAndPassword = (): EmailAndPasswordActionHook => {
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
};
