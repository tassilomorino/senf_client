/** @format */

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

//LOADER ICON

//REDUX
import { connect } from "react-redux";

//ICONS

import Appbarimg from "../../images/appbar.png";

import { isMobileCustom } from "../../util/customDeviceDetect";

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
  icons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "10pt",
    borderRadius: "50%",
  },
  iconsActive: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "10pt",
    borderRadius: "50%",
  },
  iconWrapper: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
};
class Appbar extends React.Component {
  render() {
    const {
      classes,
      user: { authenticated }, // appears as "no-unused-vars", unsure how to modify the code here
      order,
      handleClick,
    } = this.props;
    const { loading } = this.props.data;

    const leftBar = !loading ? (
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
        {/* <div
          className={order !== 1 ? classes.icons : classes.iconsActive}
          onClick={() => handleClick(1)}
        >
          <img
            src={order !== 1 ? LampIcon_grey : LampIcon_white}
            style={{ pointerEvents: "none" }}
            width="25"
            alt="EndImage"
          />
          Ideen
        </div>
        <div className={classes.icons} onClick={() => handleClick(3)}>
          <img
            src={order !== 3 ? Insights_grey : Insights_white}
            style={{ pointerEvents: "none" }}
            width="25"
            alt="EndImage"
          />
          Insights
        </div> */}

        {/* <div className={classes.icons} onClick={() => handleClick(5)}>
          <img
            src={order !== 5 ? map_grey : map_white}
            style={{ pointerEvents: "none" }}
            width="25"
            alt="EndImage"
          />
          Karte
        </div> */}
      </div>
    ) : null;

    const rightBar = !loading ? (
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
        {/* <div className={classes.icons} onClick={() => handleClick(2)}>
          <img
            src={order !== 2 ? List_grey : List_white}
            style={{ pointerEvents: "none" }}
            width="25"
            alt="EndImage"
          />
          Info
        </div>
        {Profile} */}
      </div>
    ) : null;

    return isMobileCustom ? (
      <>
        {" "}
        {leftBar} {rightBar}
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
  }
}
Appbar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapActionsToProps = {};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Appbar));
