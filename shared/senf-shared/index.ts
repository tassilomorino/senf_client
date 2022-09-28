export { useSignInWithEmailAndPassword } from "./firebase/useSignInWithEmailAndPassword";
export { useCreateUserWithEmailAndPassword } from "./firebase/useCreateUserWithEmailAndPassword";
export { generateErrorMessage } from "./firebase/generateErrorMessage";
export { createUserInDatabase } from "./firebase/createUserInDatabase";
export { createUserFromProviderInDatabase } from "./firebase/createUserFromProviderInDatabase";
export {
  useSignInWithGoogle,
  useSignInWithFacebook,
} from "./firebase/useSignInWithPopup";
export { useHandleSubmitEditDetails } from "./firebase/useHandleSubmitEditDetails";
export { ifAllUserDetailsAreFilled } from "./utils/ifAllUserDetailsAreFilled";

export { default as AuthProvider, useAuthContext } from "./auth/AuthProvider";
export { AuthModal } from "./auth/AuthModal";
