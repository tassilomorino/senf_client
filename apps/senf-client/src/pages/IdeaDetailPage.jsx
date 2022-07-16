/** @format */

import React, { useState, useEffect, memo } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  Box,
  IdeaDetailPage as IdeaDetailPageComponent,
} from "senf-atomic-design-system";
import { isMobileCustom } from "../util/customDeviceDetect";

// Redux stuff
import { closeScream, deleteScream } from "../redux/actions/screamActions";
import { clearErrors } from "../redux/actions/errorsActions";

import CommentMenuModal from "../components/Modals/CommentMenuModal";
import { openProjectRoomFunc } from "../redux/actions/projectActions";
import EditIdeaPage from "./EditIdeaPage";
import { submitComment } from "../redux/actions/commentActions";
import { openLink } from "../util/helpers";

const portalRoot = document.getElementById("portal-root");

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
  console.log(data);
  const { screamId, title, lat, long, comments, userId } = useSelector(
    (state) => state.data.scream
  );

  const dispatch = useDispatch();

  const openScream = useSelector((state) => state.UI.openScream);
  const loadingIdea = useSelector((state) => state.data.loadingIdea);

  const [path, setPath] = useState("");
  const [editIdeaOpen, setEditIdeaOpen] = useState(false);

  const [commentMenuOpen, setCommentMenuOpen] = useState(false);

  const [commentUserIdSelected, setCommentUserIdSelected] = useState("");
  const [commentIdSelected, setCommentIdSelected] = useState("");
  const [swipePosition, setSwipePosition] = useState("bottom");

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
  }, [lat, loadingIdea, long, openScream, screamId]);

  const handleClose = () => {
    dispatch(closeScream());
    dispatch(clearErrors());
  };

  // const [projectroomCardData, setProjectroomCardData] = useState([]);

  // useEffect(() => {
  //   if (projectroomsData && data?.projectRoomId) {
  //     console.log(projectroomsData, data?.projectRoomId);
  //     projectroomsData.map(({ projectRoomId, title, organizationType }) => {
  //       if (data?.projectRoomId === projectRoomId) {
  //         console.log(data?.projectRoomId, projectRoomId);
  //         setProjectroomCardData([
  //           ...projectroomCardData,
  //           title,
  //           organizationType,

  //         ]);
  //       }
  //     });
  //   }
  // }, [projectroomsData, data?.projectRoomId, loadingIdea]);

  const projectroomCardData = [];

  useEffect(() => {
    if (projectroomsData && data && data.projectRoomId) {
      console.log(projectroomsData, data.projectRoomId);
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
  }, [projectroomsData, data, loadingIdea]);

  // const handleShareIdea = () => {
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
  // };

  const handleSubmitComment = () => {
    setCommentFormLoading(true);
    dispatch(submitComment(screamId, { body: commentFormInput }, user)).then(
      () => {
        setCommentFormInput("");
        setCommentFormLoading(false);
      }
    );
  };
  const handleShareIdeaVia = (medium, path) => {
    if (medium === "Whatsapp") {
      openLink(`whatsapp://send?text=${path}`);
    } else if (medium === "Facebook") {
      openLink(`https://www.facebook.com/sharer/sharer.php?u=${path}`);
    } else if (medium === "Email") {
      openLink(
        `mailto:?subject=Das könnte dich interessieren!&amp;body=Check out this site ${path}`
      );
    }
  };

  const handleOpenProjectroom = (projectRoomId) => {
    dispatch(openProjectRoomFunc(projectRoomId, true));
  };

  const handleDeleteIdea = () => {
    const answer = window.confirm(
      "Bist du sicher, dass du die Idee löschen möchtest?"
    );
    if (answer) {
      dispatch(
        deleteScream(screamId, user?.userId, user?.isAdmin, user?.isModerator)
      );

      // some code
    } else {
      // some code
    }
  };

  const handleReportIdea = () => {
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
  };

  const handleOpenMenuComment = (commentId, commentUserId) => {
    setCommentIdSelected(commentId);
    setCommentUserIdSelected(commentUserId);
    setCommentMenuOpen(true);
  };

  return (
    data &&
    ReactDOM.createPortal(
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
        {commentMenuOpen && (
          <CommentMenuModal
            commentId={commentIdSelected}
            commentMenuOpen={commentMenuOpen}
            setCommentMenuOpen={setCommentMenuOpen}
            screamId={screamId}
            commentUserId={commentUserIdSelected}
          />
        )}

        <IdeaDetailPageComponent
          loadingIdea={loadingIdea}
          data={data}
          projectroomCardData={projectroomCardData}
          projectroomsData={projectroomsData}
          handleButtonCloseCard={handleClose}
          handleButtonLike={handleButtonLike}
          handleButtonComment={handleButtonComment}
          handleOpenProjectroom={handleOpenProjectroom}
          user={user}
          path={path}
          handleEditIdea={() => setEditIdeaOpen(true)}
          handleDeleteIdea={handleDeleteIdea}
          handleReportIdea={handleReportIdea}
          handleShareIdeaVia={handleShareIdeaVia}
          handleOpenMenuComment={handleOpenMenuComment}
          commentFormInput={commentFormInput}
          setCommentFormInput={setCommentFormInput}
          handleSubmitComment={handleSubmitComment}
          commentFormLoading={commentFormLoading}
          setAuthOpen={setAuthOpen}
        />
      </React.Fragment>,
      portalRoot
    )
  );
};

export default IdeaDetailPage;
