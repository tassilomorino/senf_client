import React from "react";

import { onAuthStateChanged } from "@firebase/auth";
import {
  signOut,
  // sendPasswordResetEmail,
  // deleteUser
} from "firebase/auth";

import { collection, query, where, getDocs } from "firebase/firestore";
// import { Loader, Box } from "senf-atomic-design-system";
import { db, auth } from "./firebase";
import { useSignIn } from '../firebase/useSignInWithPopup'
import { useCreateUserWithEmailAndPassword } from '../firebase/useCreateUserWithEmailAndPassword'

const AuthContext = React.createContext();

const AuthProvider: FC = ({ children }) => {

  const [user, setUser] = React.useState(null);
  const blankError = { code: "", message: "" };
  const [errorMessage, setErrorMessage] = React.useState(blankError)
  const [loading, setLoading] = React.useState(true);

  // Methods

  const getUserData = async (user) => {
    if (!user?.uid) throw Error("User is not logged in");
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userId", "==", user.uid));
    const snapshot = await getDocs(q)
    const userData = snapshot?.docs[0]?.data();
    userData.likes = [];
    userData.comments = [];
    return userData
  }

  const sendVerification = {
    sendEmailVerification: true,
    emailVerificationOptions: {
      url: "https://senf.koeln/verify",
    },
  };
  const signInWith = useSignIn(auth, db);
  const createUserWithEmailAndPassword = useCreateUserWithEmailAndPassword(auth, db, sendVerification);


  // Handler
  const handler = {
    signIn(data: { provider?: string, email?: string, password?: string, id?: string }): Promise {
      setErrorMessage(blankError)
      const { provider, email, password, id } = data;
      return new Promise((resolve, reject) => {
        switch (provider) {
          case "apple":
          case 'facebook':
          case 'google':
            setLoading(id || provider)
            signInWith.provider(provider, ["email"])
              .then(getUserData)
              .then(resolve)
              .catch(err => { setErrorMessage(err); reject(err) })
              .finally(() => setLoading(false));
            break;
          case 'email':
          default:
            signInWith.email(email, password)
              .then(getUserData)
              .then(resolve)
              .catch(err => { setErrorMessage(err); reject(err) })
              .finally(() => setLoading(false));
            break;
        }
      })
    },
    async signOut(): Promise {
      return signOut(auth)
    },
    async deleteUserFromDb(userId): Promise {
      const currentuser = auth.currentUser;
      if (userId) {
        try {
          const cantDeleteSuperAdmins = ["dein@senf.koeln"];
          if (cantDeleteSuperAdmins.includes(currentuser.email)) {
            throw new Error("Can't delete SuperAdmin");
          }
          if (currentuser.uid === userId) {
            const userRef = doc(db, "users", userId);
            const emailRef = doc(db, "users", userId, "Private", userId);

            await deleteDoc(emailRef);
            await deleteDoc(userRef);
            await deleteUser(currentuser);
          }
        } catch (error) {
          throw new Error(error, "error during deleteUserFromDb with userId");
        }
        // if no userId is provided, delete the current user from the only firebase auth
      } else {
        try {
          deleteUser(currentuser);
        } catch (error) {
          throw new Error(error, " error during deleteUserFromDb without userId");
        }
      }

    },
    async createUser(formikRegisterStore) {
      return new Promise((resolve, reject) => {
        setLoading('email')
        createUserWithEmailAndPassword(formikRegisterStore)
          .then(resolve)
          .catch(err => { setErrorMessage(err); reject(err) })
          .finally(() => setLoading(false));
      })
    },
    // resetPassword

  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        setUser(null);
        setLoading(false);
        return
      }
      getUserData(authUser)
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoading(false))
    });
  }, []);

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
    <AuthContext.Provider value={{ user, loading, errorMessage, ...handler }
    }>
      {children}
    </AuthContext.Provider >
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
export default AuthProvider;