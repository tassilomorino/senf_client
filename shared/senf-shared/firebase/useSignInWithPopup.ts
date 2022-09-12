import {
  Auth,
  AuthError,
  AuthProvider,
  CustomParameters,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  UserCredential,
  User
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
      return user
    } catch (err) {
      setError(err as AuthError);
      return 'error'
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








// 

type Provider = "apple" | "facebook" | "google";

const signInWithEmailAndPassword = async (
  email: string,
  password: string,
  auth: Auth,
) => {
  try {
    const user = await firebaseSignInWithEmailAndPassword(auth, email, password);
    if (user.user.emailVerified) return user;
    throw new Error("auth/user-not-verified" as AuthError["code"]);
  } catch (err) {
    throw new Error(err);
  }
};

const signIn = async (
  providerName: Provider,
  auth: Auth,
  db: Firestore,
  scopes?: string[],
  customOAuthParameters?: CustomParameters,
): Promise<User> => {
  let provider: AuthProvider;
  switch (providerName) {
    case "apple": provider = new OAuthProvider('apple.com'); break;
    case "facebook": provider = new FacebookAuthProvider(); break;
    case "google": provider = new GoogleAuthProvider(); break;
    default: throw Error("provider not found");
  }
  if (scopes) scopes.forEach((scope) => provider.addScope(scope));
  if (customOAuthParameters) provider.setCustomParameters(customOAuthParameters);
  try {
    const result = await signInWithPopup(auth, provider);
    const { user } = result;
    const docRef = doc(db, "users", user.uid);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists() && user) {
      await createUserFromProviderInDatabase(db, user);
      console.log("created user in database");
    } else {
      console.log("user existed");
    }
    return user
  } catch (err) {
    throw new Error(err);
  }
}


export const useSignIn = (
  auth: Auth,
  db: Firestore,
): {
  provider: (provider: Provider,
    scopes?: string[],
    customOAuthParameters?: CustomParameters) => Promise<UserCredential>, email: (email: string, password: string) => Promise<UserCredential>
} => {
  return {
    provider: (
      provider,
      scopes,
      customOAuthParameters,
    ) => signIn(provider, auth, db, scopes, customOAuthParameters),
    email: (email, password) => signInWithEmailAndPassword(email, password, auth)
  }
};