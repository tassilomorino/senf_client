/** @format */

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

//ICONS

import Appbarimg from "../../images/appbar.png";

import { isMobileOnly } from "react-device-detect";

const styles = {
  appBarLeft: {
    width: "40%",
    height: "48px",
    display: "flex",
    backgroundColor: "transparent",
    position: "fixed",
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: "0",
    zIndex: 999,
  },
  appBarRight: {
    width: "40%",
    height: "48px",
    display: "flex",
    backgroundColor: "transparent",
    right: "0",
    position: "fixed",
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: "0",
    zIndex: 999,
  },
};
const Appbar = ({ classes, order, handleClick }) => {
  return isMobileOnly ? (
    <>
      {" "}
      <div className={classes.appBarLeft}>
        <span
          onClick={() => handleClick(1)}
          className="appbar-links ripple"
          style={
            order === 1 || order === 2
              ? {
                  color: "white",
                }
              : {
                  color: "#353535",
                }
          }
        >
          Ideen
        </span>
      </div>{" "}
      <div className={classes.appBarRight}>
        <span
          onClick={() => handleClick(3)}
          className="appbar-links ripple"
          style={
            order === 3
              ? {
                  color: "white",
                }
              : {
                  color: "#353535",
                }
          }
        >
          Insights
        </span>
      </div>
      <img
        src={Appbarimg}
        style={{
          width: "100vw",
          position: "fixed",
          zIndex: "996",
          bottom: "0",
          pointerEvents: "none",
        }}
        alt=""
      ></img>
    </>
  ) : null;
};

export default withStyles(styles)(Appbar);
