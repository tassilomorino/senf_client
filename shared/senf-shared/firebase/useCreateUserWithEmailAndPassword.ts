import {
  Auth,
  AuthError,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
} from "firebase/auth";

import {
  collection,
  where,
  query,
  getDocs,
  Firestore,
} from "firebase/firestore";

import { useMemo, useState } from "react";
import { generateErrorMessage } from "./generateErrorMessage";
import { createUserInDatabase } from "./createUserInDatabase";
import { CreateUserOptions, EmailAndPasswordActionHook } from "./types";

export const useCreateUserWithEmailAndPassword = (
  auth: Auth,
  db: Firestore,
  options?: CreateUserOptions
): EmailAndPasswordActionHook => {
  const [error, setError] = useState({ code: "", message: "" });
  const [registeredUser, setRegisteredUser] = useState<UserCredential>();
  const [loading, setLoading] = useState<boolean>(false);

  const createUserWithEmailAndPassword = async (formikRegisterStore) => {
    setLoading(true);
    setError(undefined);
    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("handle", "==", formikRegisterStore.values.handle)
      );
      const usernameQuerySnapshot = await getDocs(q);
      if (!usernameQuerySnapshot.empty) {
        // username already exists

        setLoading(false);
        setError({ ...error, code: "auth/username-exists" });
        return;
      }

      const userCredential = await firebaseCreateUserWithEmailAndPassword(
        auth,
        formikRegisterStore.values.email,
        formikRegisterStore.values.password
      );
      if (userCredential.user) {
        await createUserInDatabase(db, userCredential, formikRegisterStore);
        setRegisteredUser(userCredential);
      }
      if (options && options.sendEmailVerification && userCredential.user) {
        await sendEmailVerification(
          userCredential.user,
          options.emailVerificationOptions
        );
      }
    } catch (error) {
      setError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  const resArray: EmailAndPasswordActionHook = [
    createUserWithEmailAndPassword,
    registeredUser,
    loading,
    error,
  ];
  return useMemo<EmailAndPasswordActionHook>(() => resArray, resArray);
};
