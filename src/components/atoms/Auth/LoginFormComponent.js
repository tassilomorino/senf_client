/** @format */

import { CircularProgress, TextField, Typography } from "@material-ui/core";
import React from "react";
import { isAndroid } from "react-device-detect";
import { useTranslation } from "react-i18next";
import ResetPassword from "../../organisms/Auth/ResetPassword";
import { SubmitButton } from "../CustomButtons/SubmitButton";

const LoginFormComponent = ({
  loading,
  classes,
  errorMessage,
  handleToggle,
  handleSubmitLogin,
  formik
}) => {
  const { t } = useTranslation();
  
  return (
    <React.Fragment>
      <div className={classes.textfields}>
        <div className={classes.smallText} onClick={() => handleToggle()}>
          {t('notYetMember')} <span className="Terms">{t('register')}</span>
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
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.values.email !=='' &&Boolean(formik.errors.email)}
          helperText={formik.errors.email}
          
        ></TextField>

        <TextField
          id="outlined-password-input"
          name="password"
          label={t('password')}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          data-cy="login-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.values.password !=='' && Boolean(formik.errors.password)}
          helperText={formik.errors.password}
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
        position="relative"
        top={document.body.clientWidth > 768 ? "100px" : "70px"}
        left="0"
        loading={loading}
        handleButtonClick={handleSubmitLogin}
        disabled={loading || !formik.isValid}
      />

      <div
        className={
          isAndroid ? classes.smallText_fixed_android : classes.smallText_fixed
        }
        onClick={() => handleToggle()}
      >
        {t('notYetMember')} <span className="Terms">{t('register')}</span>
      </div>
    </React.Fragment>
  );
};

export default LoginFormComponent;
