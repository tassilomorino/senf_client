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
import { auth } from "../../../firebase";
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

  const handleFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message, "error in facebook provider");
      });
  };
  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user, "user from google provider");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <React.Fragment>
      <div className={classes.textfields}>
        <div className={classes.smallText} onClick={() => handleToggle()}>
          {t("notYetMember")} <span className="Terms">{t("register")}</span>
        </div>
        <button onClick={handleFacebook}>Facebook signIn</button>
        <button onClick={handleGoogle}>Google signIn</button>
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
