/** @format */

import { CircularProgress, TextField, Typography } from "@material-ui/core";
import React from "react";
import { isAndroid } from "react-device-detect";
import { useTranslation } from "react-i18next";
import ResetPassword from "../../organisms/Auth/ResetPassword";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import GoogleSignInButton from "../../atoms/CustomButtons/GoogleSignInButton";
const LoginFormComponent = ({
  loading,
  classes,
  errorMessage,
  handleToggle,
  handleSubmitLogin,
  formik,
  outsideClick,
  keySubmitRef,
}) => {
  const { t } = useTranslation();
  async function createUserInDatabase(user) {
    try {
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          handle: user.displayName,
          age: "",
          sex: "",
          createdAt: new Date().toISOString(),
          userId: user.uid,
          photoUrl: user.photoURL ?? "",
          providerId: user.providerData[0].providerId ?? "",
        });
        await setDoc(doc(db, "users", user.uid, "Private", user.uid), {
          email: user.providerData[0].email ?? "",
        });
      }
    } catch (error) {
      console.log(error, "error in createUserInDatabase");
    }
  }
  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message, "error in facebook provider");
      });
  };
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("email");

      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists) {
        createUserInDatabase(user);
      } else {
        console.log("user already exists");
      }
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
      // ...
    }
  };

  return (
    <React.Fragment>
      <div className={classes.textfields}>
        <div className={classes.smallText} onClick={() => handleToggle()}>
          {t("notYetMember")} <span className="Terms">{t("register")}</span>
        </div>

        <GoogleSignInButton handleClick={handleGoogleSignIn} />
        <TextField
          id="outlined-name"
          name="email"
          type="email"
          label="E-Mail"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          data-cy="login-email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={outsideClick && Boolean(formik.errors.email)}
          helperText={outsideClick && formik.errors.email}
        />

        <TextField
          id="outlined-password-input"
          name="password"
          label={t("password")}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          data-cy="login-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={outsideClick && Boolean(formik.errors.password)}
          helperText={outsideClick && formik.errors.password}
        />

        <br />

        <ResetPassword />

        {errorMessage && (
          <Typography className={classes.customError}>
            {errorMessage}
          </Typography>
        )}
        {/* {errors?.emailVerified && (
          <Typography className={classes.customError}>
            {errors.emailVerified}
          </Typography>
        )} */}
      </div>
      <div style={loading || !formik.isValid ? { pointerEvents: "none" } : {}}>
        <SubmitButton
          text={t("login")}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          position="relative"
          top={document.body.clientWidth > 768 ? "100px" : "70px"}
          left="0"
          loading={loading}
          handleButtonClick={handleSubmitLogin}
          disabled={loading || !formik.isValid}
          keySubmitRef={keySubmitRef}
        />
      </div>

      {/* <div
        className={
          isAndroid ? classes.smallText_fixed_android : classes.smallText_fixed
        }
        onClick={() => handleToggle()}
      >
        {t('notYetMember')} <span className="Terms">{t('register')}</span>
      </div> */}
    </React.Fragment>
  );
};

export default LoginFormComponent;
