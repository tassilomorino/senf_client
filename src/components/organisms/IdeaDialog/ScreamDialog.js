/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMapViewport } from "../../../redux/actions/mapActions";
import withStyles from "@material-ui/core/styles/withStyles";
import Comments from "../../molecules/Cards/Comments";
import CommentForm from "../../atoms/Forms/CommentForm";
// MUI Stuff

//MAPSTUFF
import "mapbox-gl/dist/mapbox-gl.css";

// Redux stuff
import { closeScream } from "../../../redux/actions/screamActions";
import { clearErrors } from "../../../redux/actions/errorsActions";

//COMPONENTS
import ShareModal from "../../molecules/Modals/ShareModal";
import MenuModal from "../../molecules/Modals/MenuModal";

import { isMobileCustom } from "../../../util/customDeviceDetect";

import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import styled from "styled-components";

import ScreamDialogSwipe from "../../../hooks/ScreamDialogSwipe";
import Loader from "../../atoms/Animations/Loader";
import ShareYourOpinionCard from "../../molecules/Cards/ShareYourOpinionCard";
import IdeaCardBig from "../../molecules/Cards/IdeaCardBig";

const portalRoot = document.getElementById("portal-root");

const BackgroundMobile = styled.div`
  position: absolute;
  margin-top: -10px;
  min-height: 100%;
  width: 100vw;
  border-radius: 20px 20px 0 0;
  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 100%
  );
  z-index: 0;
  box-shadow: 0 8px 20px 12px rgba(0, 0, 0, 0.1);
`;

const BackgroundDesktop = styled.div`
  position: fixed;
  margin-top: 0px;
  top: 0;
  height: 100%;
  width: 400px;
  border-radius: 0px 0px 0 0;
  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 100%
  );
  z-index: 0;
`;

const ButtonsContainer = styled.div`
  width: 120px;
  height: 50px;
  margin-left: calc(100% - 120px);
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
`;
const VerticalLine = styled.div`
  width: 4px;
  position: relative;
  background-color: #414345;
  height: 10px;
  margin-left: -2px;
  left: 50%;
  z-index: 0;
`;

const ScreamDialog = () => {
  const { screamId, title, lat, long, userHandle, comments } = useSelector(
    (state) => state.data.scream
  );

  const dispatch = useDispatch();

  const openScream = useSelector((state) => state.UI.openScream);
  const loading = useSelector((state) => state.UI.loading);

  const [path, setPath] = useState("");
  const [clicked, setClicked] = useState(false);

  const [shareOpen, setShareOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (openScream && lat !== undefined) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        const viewport = {
          latitude: isMobileCustom && openScream ? lat - 0.0008 : lat,
          longitude: long,
          zoom: 16.5,
          transitionDuration: 4000,
          pitch: 30,
          bearing: 0,
        };
        dispatch(setMapViewport(viewport));
      }, 400);

      setPath(`https://senf.koeln/${screamId}`);
    }
  }, [dispatch, lat, loading, long, openScream, screamId]);

  const handleClose = () => {
    dispatch(closeScream());
    dispatch(clearErrors());
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Senf.koeln – ${title}`,
          url: path,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      setShareOpen(true);
    }
  };
  const content = (
    <div className="wrapperScreamDialog">
      {!loading ? (
        <React.Fragment>
          <ButtonsContainer>
            <CustomIconButton name="Share" handleButtonClick={handleShare} />
            <CustomIconButton
              name="Menu"
              handleButtonClick={() => setMenuOpen(true)}
            />
          </ButtonsContainer>
          {isMobileCustom ? <BackgroundMobile /> : <BackgroundDesktop />}
          <IdeaCardBig setClicked={setClicked} />
          <VerticalLine />
          <ShareYourOpinionCard />
          <Comments comments={comments} />
          {isMobileCustom ? (
            <div style={{ height: "200px" }} />
          ) : (
            <div style={{ height: "200px" }} />
          )}
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </div>
  );
  return ReactDOM.createPortal(
    <React.Fragment>
      <CommentForm screamId={screamId} clicked={clicked} />

      {shareOpen && (
        <ShareModal
          screamId={screamId}
          title={title}
          path={path}
          setShareOpen={setShareOpen}
        />
      )}
      {menuOpen && (
        <MenuModal
          screamId={screamId}
          userHandle={userHandle}
          setMenuOpen={setMenuOpen}
        />
      )}

      <CustomIconButton
        name="ArrowLeft"
        position="fixed"
        margin="10px"
        marginLeft={document.body.clientWidth > 768 && "210px"}
        top="0px"
        zIndex="9999"
        handleButtonClick={handleClose}
      />

      {isMobileCustom ? (
        <ScreamDialogSwipe loading={loading}> {content}</ScreamDialogSwipe>
      ) : (
        <React.Fragment>{content}</React.Fragment>
      )}
    </React.Fragment>,
    portalRoot
  );
};

export default ScreamDialog;
