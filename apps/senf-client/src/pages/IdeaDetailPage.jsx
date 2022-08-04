/** @format */

import React, { useState, useEffect, memo } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  Box,
  IdeaDetailPage as IdeaDetailPageComponent,
  ModalContext
} from "senf-atomic-design-system";
import { isMobileCustom } from "../util/customDeviceDetect";

// Redux stuff
import { closeScream, deleteScream } from "../redux/actions/screamActions";
import { clearErrors } from "../redux/actions/errorsActions";

import { openProjectRoomFunc } from "../redux/actions/projectActions";
import { deleteComment, submitComment } from "../redux/actions/commentActions";

import EditIdeaPage from "./EditIdeaPage";
import { openLink } from "../util/helpers";

const Wrapper = styled.div`
  width: 100vw;
  margin-top: 0vh;
  margin-left: 0px;
  z-index: 97;
  top: 30px;
  position: absolute;
  overflow-y: hidden;
  overflow-x: hidden;
  overscroll-behavior: contain;
  min-height: 100%;

  @media (min-width: 768px) {
    margin-left: 200px;
    margin-top: 0px;
    width: 400px;
    overflow-y: scroll !important;
    z-index: 97;
    top: 0;
    height: 100vh;
    position: fixed;
    margin-top: 0vh;

    animation: enterScreamDialogAnimation 0.7s;

    @keyframes enterScreamDialogAnimation {
      0% {
        transform: translateY(50%);
        opacity: 0;
      }
      49% {
        transform: translateY(50%);
        opacity: 0;
      }

      50% {
        transform: translateY(50%);
        opacity: 1;
      }

      100% {
        transform: translateY(0%);
        opacity: 1;
      }
    }
  }
`;
const ButtonsContainer = styled.div`
  width: 120px;
  height: 50px;
  margin-left: calc(100% - 120px);
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  position: relative;
  z-index: 1;
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

const IdeaDetailPage = ({
  handleButtonLike,
  handleButtonComment,
  projectroomsData,
  user,
  setAuthOpen,
}) => {

  const data = useSelector((state) => state.data.scream);
  const { handleModal } = React.useContext(ModalContext) || {};

  const { screamId, lat, long, userId } = useSelector(
    (state) => state.data.scream
  );

  const dispatch = useDispatch();

  const openScream = useSelector((state) => state.UI.openScream);

  const [path, setPath] = useState("");
  const [editIdeaOpen, setEditIdeaOpen] = useState(false);

  const [commentFormInput, setCommentFormInput] = useState("");
  const [commentFormLoading, setCommentFormLoading] = useState(false);

  useEffect(() => {
    if (openScream && lat !== undefined) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      setPath(`https://senf.koeln/${screamId}`);
    }
  }, [lat, long, openScream, screamId]);

  const projectroomCardData = [];

  useEffect(() => {
    if (projectroomsData && data && data.projectRoomId) {
      if (projectroomsData) {
        projectroomsData.forEach(
          ({ projectRoomId, title, organizationType }) => {
            if (data.projectRoomId === projectRoomId) {
              projectroomCardData.push(title, organizationType);
            }
          }
        );
      }
    }
  }, [projectroomsData, data]);




  const handle = {

    buttonLike: handleButtonLike,
    buttonComment: handleButtonComment,


    closeCard: () => {
      dispatch(closeScream());
      dispatch(clearErrors());
    },


    submitComment: () => {
      setCommentFormLoading(true);
      dispatch(submitComment(screamId, { body: commentFormInput }, user)).then(
        () => {
          setCommentFormInput("");
          setCommentFormLoading(false);
        }
      );
    },
    shareIdeaVia: (medium, path) => {
      switch (medium) {
        case "Whatsapp":
          return openLink(`whatsapp://send?text=${path}`);
        case "Facebook":
          return openLink(`https://www.facebook.com/sharer/sharer.php?u=${path}`);
        case "Email":
          return openLink(`mailto:?subject=Das könnte dich interessieren!&amp;body=Check out this site ${path}`)
        default:
          return false
      }
    },

    // handleShareIdea: () => {
    //   if (navigator.share) {
    //     navigator
    //       .share({
    //         title: `Senf.koeln – ${title}`,
    //         url: path,
    //       })
    //       .then(() => {
    //         console.log("Thanks for sharing!");
    //       })
    //       .catch(console.error);
    //   } else {
    //     setShareOpen(true);
    //   }
    // },

    openProjectroom: (projectRoomId) => {
      dispatch(openProjectRoomFunc(projectRoomId, true));
    },

    editIdea: (data) => {
      setEditIdeaOpen(true)
      // return handleModal("push", <EditIdeaPage
      //   scream={data}
      //   isAdmin={user?.isAdmin}
      //   isModerator={user?.isModerator}
      //   isUser={userId === user?.userId}
      //   setEditOpen={handleModal("pop")}
      //   editOpen={true}
      // />)
    },
    deleteIdea: async (screamId) => {
      return dispatch(
        deleteScream(screamId, user?.userId, user?.isAdmin, user?.isModerator)
      );
    },

    deleteComment: ({ commentId, screamId }) => {
      return dispatch(
        deleteComment(commentId, user?.userId, screamId, user?.isAdmin, user?.isModerator)
      )
    },

    reportIdea: () => {
      const thisPath = `/${screamId}`;
      const siteLink = `senf.koeln${thisPath}`;

      const link =
        `mailto:dein@senf.koeln` +
        `?subject=${escape(
          "Meldung: Beitrag beinhaltet unangebrachten Inhalt "
        )}&body=${escape(
          `Dieser Beitrag beinhaltet unangebrachten Inhalt:` +
          `\n` +
          `\n${siteLink}`
        )}`;
      window.location.href = link;
    },
    reportComment: ({ userId, commentId, screamId }) => {
      const thisPath = `/users/${userId}/scream/${screamId}`;
      const siteLink = `senf.koeln${thisPath}`;

      const link =
        `mailto:dein@senf.koeln` +
        `?subject=${escape(
          "Meldung: Beitrag beinhaltet unangebrachten Kommentar "
        )}&body=${escape(
          `Dieser Beitrag beinhaltet einen unangebrachten Kommentar:` +
          `\n` +
          `\n${siteLink}\n` +
          `\n` +
          `Kommentar-ID:` +
          `\n` +
          `\n${commentId}`
        )}`;
      window.location.href = link;
    },
  }

  return (data &&
    <React.Fragment>
      {editIdeaOpen && (
        <EditIdeaPage
          scream={data}
          isAdmin={user?.isAdmin}
          isModerator={user?.isModerator}
          isUser={userId === user?.userId}
          setEditOpen={setEditIdeaOpen}
          editOpen={editIdeaOpen}
        />
      )}

      <IdeaDetailPageComponent
        data={{ ...data, handle }}
        projectroomCardData={projectroomCardData}
        projectroomsData={projectroomsData}
        user={user}
        path={path}
        commentFormInput={commentFormInput}
        setCommentFormInput={setCommentFormInput}
        commentFormLoading={commentFormLoading}
        setAuthOpen={setAuthOpen}
      />
    </React.Fragment>
  );
};

export default IdeaDetailPage;
