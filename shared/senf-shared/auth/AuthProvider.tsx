import React from "react";

import imageCompression from "browser-image-compression";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "@firebase/auth";
import {
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  deleteUser,
  User,
  fetchSignInMethodsForEmail,
  ActionCodeSettings,
} from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  DocumentData,
} from "firebase/firestore";
// import { Loader, Box } from "senf-atomic-design-system";
import { FormikValues } from "formik";
import { db, auth } from "./firebase";
import { useSignIn } from "../firebase/useSignInWithPopup";
import { useCreateUserWithEmailAndPassword } from "../firebase/useCreateUserWithEmailAndPassword";
import { useHandleSubmitEditDetails } from "../firebase/useHandleSubmitEditDetails";
import { ifAllUserDetailsAreFilled } from "../utils/ifAllUserDetailsAreFilled";

export interface AuthState {
  user: DocumentData | null;
  loading: boolean | string;
  errorMessage: { code: string; message: string };
}
export interface AuthMethods {
  signIn: (data: {
    provider?: string;
    formikStore?: FormikValues;
    id?: string;
  }) => Promise<User | DocumentData>;
  signOut: () => Promise<void>;
  deleteUserFromDb: (userId: string) => Promise<void>;
  createUser: (formikStore: FormikValues) => Promise<User | DocumentData>;
  sendPasswordResetEmail: (
    email: string,
    actionCodeSettings?: ActionCodeSettings | undefined
  ) => Promise<void>;
  sendEmailVerification: typeof sendEmailVerification;
  userExists: (
    formikStore: FormikValues
  ) => Promise<boolean | string[] | User | DocumentData>;
  submitEditDetails: (
    formikStore: FormikValues
  ) => Promise<User | DocumentData>;
  handleImageUpload: (event: Event, user?: DocumentData) => Promise<string>;
  ifAllUserDetailsAreFilled: (user?: DocumentData) => boolean;
}
export interface AuthContext extends AuthState, AuthMethods {}

const AuthContext = React.createContext({} as AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState<DocumentData | boolean | null>(null);
  const blankError = { code: "", message: "" };
  const [errorMessage, setErrorMessage] = React.useState(blankError);
  const [loading, setLoading] = React.useState<boolean | string>(true);

  // Methods

  const getUserData = async (user: User) => {
    if (!user) throw Error("User is not logged in");
    if (!user?.uid) return user;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    const userData = snapshot?.docs[0]?.data();
    userData.likes = [];
    userData.comments = [];
    return userData;
  };

  const sendVerification = {
    sendEmailVerification: true,
    emailVerificationOptions: {
      url: "https://senf.koeln/verify",
    },
  };
  const signInWith = useSignIn(auth, db);
  const createUserWithEmailAndPassword = useCreateUserWithEmailAndPassword(
    auth,
    db,
    sendVerification
  );
  const submitEditDetails = useHandleSubmitEditDetails(user, db);

  // Handler
  const handler: AuthMethods = {
    signIn({ provider, formikStore, id }) {
      setErrorMessage(blankError);
      return new Promise((resolve, reject) => {
        switch (provider) {
          case "apple":
          case "facebook":
          case "google":
            setLoading(id || provider);
            signInWith
              .provider(provider, ["email"])
              .then(getUserData)
              .then(resolve)
              .catch((err) => {
                setErrorMessage(err);
                reject(err);
              })
              .finally(() => setLoading(false));
            break;
          case "email":
          default:
            signInWith
              .email(formikStore)
              .then(resolve)
              .catch((err) => {
                setErrorMessage(err);
                reject(err);
              })
              .finally(() => setLoading(false));
            break;
        }
      });
    },
    signOut: async () => signOut(auth),
    deleteUserFromDb: async (userId) => {
      const currentuser = auth.currentUser;
      if (!currentuser) throw Error("User is not logged in");
      if (!userId) {
        // if no userId is provided, delete the current user from the only firebase auth
        try {
          await deleteUser(currentuser);
          return;
        } catch (error) {
          throw new Error(
            error,
            "error during deleteUserFromDb without userId"
          );
        }
      }
      try {
        const cantDeleteSuperAdmins = "dein@senf.koeln";
        if (cantDeleteSuperAdmins === currentuser.email) {
          throw new Error("Can't delete SuperAdmin");
        }
        if (currentuser.uid !== userId) {
          throw new Error("You're not allowed to delete this user");
        }

        const userRef = doc(db, "users", userId);
        const emailRef = doc(db, "users", userId, "Private", userId);

        await deleteDoc(emailRef);
        await deleteDoc(userRef);
        await deleteUser(currentuser);
      } catch (error) {
        throw new Error(error, "error during deleteUserFromDb with userId");
      }
    },
    async createUser(formikRegisterStore) {
      return new Promise((resolve, reject) => {
        setLoading("email");
        createUserWithEmailAndPassword(formikRegisterStore)
          .then(resolve)
          .catch((err) => {
            setErrorMessage(err);
            reject(err);
          })
          .finally(() => setLoading(false));
      });
    },

    async sendPasswordResetEmail(email, actionCodeSettings) {
      return new Promise((resolve, reject) => {
        setLoading("reset");
        sendPasswordResetEmail(auth, email, actionCodeSettings)
          .then(resolve)
          .catch((err) => {
            setErrorMessage(err);
            reject(err);
          })
          .finally(() => setLoading(false));
      });
    },
    sendEmailVerification,
    ifAllUserDetailsAreFilled: (u = user) => ifAllUserDetailsAreFilled(u),
    async userExists(formikStore) {
      setLoading("email");
      try {
        const { email } = formikStore.values;
        const signInMethod = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethod?.includes("google.com"))
          return handler.signIn({ provider: "google" });
        if (signInMethod?.includes("facebook.com"))
          this.signIn({ provider: "facebook" });
        return signInMethod;
      } catch (err) {
        setErrorMessage(err);
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    },
    submitEditDetails: async ({ formikStore, id }) => {
      return new Promise((resolve, reject) => {
        setLoading(id || "edit");
        submitEditDetails(formikStore)
          .then((user) => {
            setUser(user);
            resolve(user);
          })
          .catch((err) => {
            setErrorMessage(err);
            reject(err);
          })
          .finally(() => setLoading(false));
      });
    },
    handleImageUpload: async (event, targetUser) => {
      const currentUser =
        !targetUser && auth.currentUser ? auth.currentUser : targetUser;
      if (!currentUser) throw Error("User is not logged in");
      if (
        auth.currentUser?.uid !== currentUser.uid &&
        currentUser.isAdmin === false &&
        currentUser.isSuperAdmin === false &&
        currentUser.isModerator === false
      ) {
        throw new Error("user not authorized to handleImageUpload");
      }
      const target = event?.target as HTMLInputElement;
      if (!target?.files?.length) {
        throw new Error("no file selected");
      }
      const imageFile = target.files[0];
      // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 0.03,
        maxWidthOrHeight: 700,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        const storageRef = ref(getStorage(), `profileimages/thumbnail`);
        const userRef = doc(db, `users/${currentUser.uid}`);

        await uploadBytes(storageRef, compressedFile);
        const photoURL = await getDownloadURL(storageRef);
        await updateDoc(userRef, { photoURL });
        return photoURL;
      } catch (error) {
        throw new Error(error);
      }
    },
    // ifAllUserDetailsAreFilled(reduxUser)
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        setUser(false);
        setLoading(false);
        return;
      }
      getUserData(authUser)
        .then(setUser)
        .catch(() => setUser(false))
        .finally(() => setLoading(false));
    });
  }, []);

  React.useEffect(() => {
    const timout = setTimeout(() => setErrorMessage(blankError), 20000);
    return () => clearTimeout(timout);
  }, [errorMessage]);

  // if (loading) {
  //   return (
  //     <Box
  //       justifyContent="center"
  //       alignItems="center"
  //       flexDirection="column"
  //       height="100%"
  //       width="100%"
  //     >
  //       <div style={{ width: "200px" }}>
  //         <Loader />
  //       </div>
  //     </Box>
  //   );
  // }

  return (
    <AuthContext.Provider value={{ user, loading, errorMessage, ...handler }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
export default AuthProvider;
