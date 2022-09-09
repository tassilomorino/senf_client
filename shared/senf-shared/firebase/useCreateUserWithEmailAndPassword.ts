import {
  Auth,
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

  return async (formikRegisterStore) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("handle", "==", formikRegisterStore.values.handle)
      );
      const usernameQuerySnapshot = await getDocs(q);
      // username already exists
      if (!usernameQuerySnapshot.empty) throw new Error({ code: "auth/username-exists" })

      const userCredential = await firebaseCreateUserWithEmailAndPassword(
        auth,
        formikRegisterStore.values.email,
        formikRegisterStore.values.password
      );
      if (!userCredential.user) throw new Error('no user')

      await createUserInDatabase(db, userCredential, formikRegisterStore);

      if (options?.sendEmailVerification) {
        await sendEmailVerification(userCredential.user, options.emailVerificationOptions);
      }
      console.log(userCredential)
      return userCredential
    } catch (err) {
      throw new Error(err)
    }
  };
};
