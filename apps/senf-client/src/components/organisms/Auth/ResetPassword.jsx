/** @format */

import React, { Fragment, useEffect, useState, memo } from "react";
import Swipe from "react-easy-swipe";
import { isAndroid } from "react-device-detect";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
//Redux
import { compose } from "redux";
import { resetPassword } from "../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

//Images
import pw_reset from "../../../images/headlines/pw_reset.png";

import CircularProgress from "@material-ui/core/CircularProgress";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { CLEAR_DATA_ERROR, CLEAR_DATA_SUCCESS } from "../../../redux/types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const styles = {
  openButton: {
    zIndex: 999,
    backgroundColor: "rgba(155,109,155,0)",
    position: "absolute",
    left: "0%",
    top: "0",

    width: "100%",
    height: "100%",
    borderRadius: "50vh",
  },
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgb(255,255,255,0.1)",
    backgroundImage:
      "linear-gradient(to bottom, rgba(255,209,155,0.9), rgba(255,218,83,0.9), #ffffff)",
    backgroundRepeat: "no-repeat",
    padding: 0,
    top: 0,

    overflow: "hidden",
  },

  paper: {
    width: "100vw",
    height: "100%",
    boxShadow: "none",
    position: "fixed",
    top: 0,
    backgroundColor: "transparent",
    margin: "0",
    paddingBottom: "30vh",
  },

  closeButton: {
    zIndex: 9999,
    position: "fixed",
    left: "2.5vw",
    top: "2.5vw",
    color: "black",
    backgroundColor: "white",
  },

  headline: {
    width: "60%",
    marginTop: "10%",
    marginLeft: "20%",
  },
  SignInButton: {
    position: "fixed",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "49vw",
    left: "25vw",
    top: "48vh",
    borderRadius: "100px",
    color: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
    backgroundColor: "#414345",
    textTransform: "none",
    fontSize: "15pt",
  },
  RegisterButton: {
    position: "fixed",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    top: "56vh",
    borderRadius: "100px",
    color: "#414345",
    textTransform: "none",
    fontSize: "15pt",
  },

  textfields: {
    zIndex: 9999,
    maxWidth: "600px",
    position: "relative",
    top: "5vh",
  },

  textField: {
    zIndex: "999",
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
  },

  checkField: {
    zIndex: "999",
    width: "90vw",
    marginLeft: "10vw",
  },
  button: {
    position: "fixed",
    zIndex: "999",
    paddingTop: "10px",
    paddingBottom: "10px",
    fontSize: "14pt",
    width: "80vw",
    marginLeft: "10vw",
    bottom: "3em",
    borderRadius: "100px",
    color: "black",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    textTransform: "none",
  },
  smallText: {
    marginLeft: "10%",
    width: "80%",
    fontSize: "14pt",
    position: "relative",
    top: "0",
    marginTop: "30px",
    zIndex: "999",
    maxWidth: "600px",
    textAlign: "center",
  },
  customError: {
    zIndex: "999",
    marginTop: "1em",
    textAlign: "center",
    width: "100%",
    fontSize: "12pt",
    color: "red",
  },

  progress: {
    position: "fixed",
    left: "50%",
    marginLeft: "-15px",
    bottom: "4em",
    zIndex: "9999",
  },
  TermsWrapper: {
    whiteSpace: "nowrap",
  },

  data: {
    marginTop: "0.5em",
    marginLeft: "10vw",
    width: "80vw",
    fontSize: "11pt",
    textAlign: "center",
  },

  forgot: {
    position: "relative",
    marginTop: "1em",
    textAlign: "center",
    width: "100%",
    fontSize: "12pt",
  },
};
const StyledErrorMessage = styled.div`
  color: red;
  font-size: 12pt;
  margin-top: 1em;
  text-align: center;
  width: 100%;
`;
const StyledSuccessMessage = styled.div`
  color: green;
  font-size: 12pt;
  margin-top: 1em;
  text-align: center;
  width: 100%;
`;

const ResetPassword = ({ classes }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { dataError, dataSuccess, loading } = useSelector(
    (state) => state.data
  );
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {},
    accept: false,
    open: false,
  });
  const handleOpen = () => {
    setState({ ...state, open: true });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(resetPassword(state.email));

    //setErrorMessage(error.message);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const onSwipeMove = (position) => {
    if (`${position.x}` > 150) {
      handleClose();
    }
    if (`${position.y}` > 200) {
      handleClose();
    }
  };

  return (
    <Fragment>
      <div className={classes.forgot} onClick={() => handleOpen()}>
        <span className="Terms">{t("forgotPassword")}</span>
      </div>
      <Dialog
        open={state.open}
        onClose={handleClose}
        width="md"
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
        TransitionComponent={Transition}
      >
        <CustomIconButton
          name="Close"
          position="fixed"
          left="0px"
          margin={document.body.clientWidth > 768 ? "40px" : "10px"}
          handleButtonClick={handleClose}
        />

        <Swipe onSwipeMove={onSwipeMove.bind(this)}>
          <img
            src={pw_reset}
            className={classes.headline}
            alt="wirke_mit_headline"
          />
          <div className={classes.smallText}>{t("reset_password")}</div>
          <form noValidate>
            <div className={classes.textfields}>
              <TextField
                id="outlined-name"
                name="email"
                type="email"
                label="E-Mail"
                margin="normal"
                variant="outlined"
                className={classes.textField}
                // helperText={errors.email}
                error={state.errors.email ? true : false}
                value={state.email}
                onChange={handleChange}
                onClick={() => {
                  dispatch({
                    type: CLEAR_DATA_SUCCESS,
                  });
                  dispatch({
                    type: CLEAR_DATA_ERROR,
                  });
                }}
              />
            </div>
            <SubmitButton
              text={t("reset")}
              zIndex="9"
              backgroundColor="white"
              textColor="#353535"
              position="relative"
              top={document.body.clientWidth > 768 ? "100px" : "70px"}
              left="0"
              loading={loading}
              handleButtonClick={handleSubmit}
            />

            {dataError && <StyledErrorMessage>{dataError}</StyledErrorMessage>}
            {dataSuccess && (
              <StyledSuccessMessage>{dataSuccess}</StyledSuccessMessage>
            )}
          </form>
        </Swipe>
      </Dialog>
    </Fragment>
  );
};

export default withRouter(compose(withStyles(styles))(ResetPassword));
