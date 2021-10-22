/** @format */

import React from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { likeScream, unlikeScream } from "../../../redux/actions/likeActions";

//Components
import RegistrationAndLogin from "../Auth/RegistrationAndLogin";

//Images
import HandBorder from "../../../images/icons/handsnoclap.png";
import HandFull from "../../../images/icons/handsFull.png";
import MyButtonStyle from "./MyButtonStyle";

const LikeButton = ({ screamId }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const likedScream = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId))
      return true;
    else return false;
  };

  const likeButton = !user.authenticated ? (
    <MyButtonStyle>
      <RegistrationAndLogin />
      <img src={HandBorder} width="100%" alt="LikeIcon" />
    </MyButtonStyle>
  ) : likedScream() ? (
    <MyButtonStyle onClick={() => dispatch(unlikeScream(screamId, user))}>
      <img src={HandFull} width="100%" alt="LikeIcon" />
    </MyButtonStyle>
  ) : (
    <MyButtonStyle onClick={() => dispatch(likeScream(screamId, user))}>
      <img src={HandBorder} width="100%" alt="LikeIcon" />
    </MyButtonStyle>
  );
  return likeButton;
};

export default LikeButton;
