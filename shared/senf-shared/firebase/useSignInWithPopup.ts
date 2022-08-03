import {
  Auth,
  AuthError,
  AuthProvider,
  CustomParameters,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { useMemo, useState } from "react";
import { createUserFromProviderInDatabase } from "./createUserFromProviderInDatabase";
import { SignInWithPopupHook } from "./types";

const useSignInWithPopup = (
  auth: Auth,
  db: Firestore,
  createProvider: (
    scopes?: string[],
    customOAuthParameters?: CustomParameters
  ) => AuthProvider
): SignInWithPopupHook => {
  const [error, setError] = useState<AuthError>();
  const [loggedInUser, setLoggedInUser] = useState<UserCredential>();
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithGoogle = async (
    scopes?: string[],
    customOAuthParameters?: CustomParameters
  ) => {
    setLoading(true);
    setError(undefined);
    try {
      const provider = createProvider(scopes, customOAuthParameters);
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists() && user) {
        await createUserFromProviderInDatabase(db, user);
        console.log("created user in database");
      }
      setLoggedInUser(result);
    } catch (err) {
      setError(err as AuthError);
    } finally {
      setLoading(false);
    }
  };

  const resArray: SignInWithPopupHook = [
    signInWithGoogle,
    loggedInUser,
    loading,
    error,
  ];
  return useMemo<SignInWithPopupHook>(() => resArray, resArray);
};

export const useSignInWithFacebook = (
  auth: Auth,
  db: Firestore
): SignInWithPopupHook => {
  const createFacebookAuthProvider = (
    scopes?: string[],
    customOAuthParameters?: CustomParameters
  ) => {
    const provider = new FacebookAuthProvider();
    if (scopes) {
      scopes.forEach((scope) => provider.addScope(scope));
    }
    if (customOAuthParameters) {
      provider.setCustomParameters(customOAuthParameters);
    }
    return provider;
  };
  return useSignInWithPopup(auth, db, createFacebookAuthProvider);
};

export const useSignInWithGoogle = (
  auth: Auth,
  db: Firestore
): SignInWithPopupHook => {
  const createGoogleAuthProvider = (
    scopes?: string[],
    customOAuthParameters?: CustomParameters
  ) => {
    const provider = new GoogleAuthProvider();
    if (scopes) {
      scopes.forEach((scope) => provider.addScope(scope));
    }
    if (customOAuthParameters) {
      provider.setCustomParameters(customOAuthParameters);
    }
    return provider;
  };
  return useSignInWithPopup(auth, db, createGoogleAuthProvider);
};
