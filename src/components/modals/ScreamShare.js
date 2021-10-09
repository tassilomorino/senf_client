/** @format */

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

//SHARE
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";

//SHAREICONS
import { EmailIcon, FacebookIcon, WhatsappIcon } from "react-share";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.6);
  position: fixed;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  width: 400px;
  max-width: 95%;
  height: 150px;
  background-color: white;
  border-radius: 20px;
`;
const styles = {
  functions: {
    zIndex: "999",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",

    height: "auto",
    width: "100%",
    top: "0.5em",
  },

  shareButtons: {
    position: "relative",
    width: "13%",
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    zIndex: "990",
  },

  faceButton: {
    zIndex: 9999,
  },
};

const ScreamShare = ({ classes, path, setShareOpen }) => {
  return (
    <Wrapper onClick={() => setShareOpen(false)}>
      <InnerWrapper>
        <p
          style={{
            fontFamily: "Futura PT W01-Bold",
            fontSize: "15pt",
            color: "#414345",
            width: "100%",
            textAlign: "center",
            marginLeft: "0",
            left: 0,
            zIndex: "999",
            position: "relative",
            top: "1em",
            marginBottom: "0.5em",
          }}
        >
          Teile den Link per
        </p>

        <div className={classes.functions}>
          <WhatsappShareButton url={path} className={classes.shareButtons}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>

          <FacebookShareButton url={path} className={classes.shareButtons}>
            <FacebookIcon
              className={classes.faceButton}
              size={32}
              round={true}
            />
          </FacebookShareButton>

          <EmailShareButton url={path} className={classes.shareButtons}>
            <EmailIcon className={classes.faceButton} size={32} round={true} />
          </EmailShareButton>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default withStyles(styles)(ScreamShare);
