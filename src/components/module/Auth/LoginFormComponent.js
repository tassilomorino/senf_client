/** @format */

import { CircularProgress, TextField, Typography } from "@material-ui/core";
import React from "react";
import { isAndroid } from "react-device-detect";
import { useTranslation } from "react-i18next";
import ResetPassword from "../../profile/ResetPassword";
import { SubmitButton } from "../CustomButtons/SubmitButton";

const LoginFormComponent = ({
  loading,
  classes,
  email,
  password,

  errors,
  errorMessage,
  handleToggle,
  handleSubmitLogin,
  setEmail,
  setPassword,
}) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className={classes.textfields}>
        <div className={classes.smallText} onClick={() => handleToggle()}>
          Noch kein Mitglied? <span className="Terms">Registrieren</span>
        </div>
        <TextField
          id="outlined-name"
          name="email"
          type="email"
          label="E-Mail"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          data-cy="login-email"
          // helperText={errors.email}
          error={errors?.email ? true : false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>

        <TextField
          id="outlined-password-input"
          name="password"
          label="Passwort"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          data-cy="login-password"
          // helperText={errors.password}
          error={errors?.password ? true : false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>

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

      <SubmitButton
        text={t("login")}
        zIndex="9"
        backgroundColor="white"
        textColor="#353535"
        position={isAndroid ? "relative" : "fixed"}
        top={isAndroid && "80px"}
        bottom={!isAndroid && "3em"}
        loading={loading}
        handleButtonClick={handleSubmitLogin}
        disabled={loading}
      />

      <div
        className={
          isAndroid ? classes.smallText_fixed_android : classes.smallText_fixed
        }
        onClick={() => handleToggle()}
      >
        Noch kein Mitglied? <span className="Terms">Registrieren</span>
      </div>
    </React.Fragment>
  );
};

export default LoginFormComponent;
