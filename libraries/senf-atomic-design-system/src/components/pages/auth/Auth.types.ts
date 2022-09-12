/** @format */

import {
  User
} from "firebase/auth";

type Provider = "apple" | "facebook" | "google";
export interface AuthProps {
  handleClose?: (x: boolean) => void;
  handleSubmitRegister?: any;
  registerLoading?: boolean;
  handleSubmitLogin?: any;
  loginLoading?: boolean;
  handleGoogleSignIn?: any;
  googleLoading?: boolean;
  handleFacebookSignIn?: any;
  facebookLoading?: boolean;
  resetLoading?: any;
  handleSubmitResetEmail?: any;
  socialLoginVerified?: boolean;
  emailRegistrationSubmitted?: boolean;
  emailVerified?: boolean;
  authHandler?: {
    signIn: {
      [K in Provider]?: () => Promise<User>;
    },
    loading: {
      [K in Provider]?: boolean;
    },
    signOut: () => Promise<User>;
  };
}
