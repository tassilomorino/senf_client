/** @format */

import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IdeaDetailPage as IdeaDetailPageComponent,
  ModalContext
} from "senf-atomic-design-system";
import { useNavigate } from "react-router-dom";
import { isMobileCustom } from "../util/customDeviceDetect";
// Redux stuff
import { closeScream, deleteScream, editScreamFunc } from "../redux/actions/screamActions";
import { clearErrors } from "../redux/actions/errorsActions";
import { openProjectRoomFunc } from "../redux/actions/projectActions";
import { deleteComment, submitComment } from "../redux/actions/commentActions";
import { openLink } from "../util/helpers";
import Auth from "./Auth";
import { openAccountFunc } from "../redux/actions/accountActions";
import { handleTopicSelectorRedux } from "../redux/actions/UiActions";




const IdeaDetailPage = ({
  handleButtonLike,
  handleButtonComment,
  projectroomsData,
  user,
}) => {

  const data = useSelector((state) => state.data.scream);
  const { handleModal } = React.useContext(ModalContext) || {};

  const { screamId, lat, long, userId } = useSelector(
    (state) => state.data.scream
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const openScream = useSelector((state) => state.UI.openScream);

  const [path, setPath] = useState("");
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



  const [projectroomCardData, setProjectroomCardData] = useState([]);

  useEffect(() => {
    if (projectroomsData && data && data.projectRoomId) {
      projectroomsData.map(({ projectRoomId, title, organizationType }) => {
        if (data.projectRoomId === projectRoomId) {
          setProjectroomCardData([

            title,
            organizationType,
          ]);
        }
      });
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

    openProjectroom: (projectRoomId) => {
      dispatch(openProjectRoomFunc(projectRoomId, true));
    },



    editIdea: (values) => {
      dispatch(
        editScreamFunc(values)
      ).then(() => { handleModal("pop") })
    },
    deleteIdea: async (screamId) => {
      return dispatch(
        deleteScream(screamId, user?.userId, user?.isAdmin, user?.isModerator)
      );
    },

    deleteComment: ({ commentId, screamId }) => {


      dispatch(
        deleteComment(commentId, user?.userId, screamId, user?.isAdmin, user?.isModerator)
      ).then(() => {
        handleModal("pop")
        handleModal("pop")
      }).catch((err) => {
        handleModal("pop")
        handleModal("pop")
        throw new Error('Error while deleting comment', err)
      })
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
    openProfilePage: (profileId) => {

      /* dispatch(openProjectRoomFunc(null, false));
      
      
      dispatch(handleTopicSelectorRedux("all")); */
      dispatch(closeScream());
      dispatch(openProjectRoomFunc(null, false));
      dispatch(openAccountFunc());
      navigate(`/profile/${profileId}`)




    }
  }

  return (data && <IdeaDetailPageComponent
    data={{ ...data, handle }}
    projectroomCardData={projectroomCardData}
    projectroomsData={projectroomsData}
    user={user}
    path={path}
    commentFormInput={commentFormInput}
    setCommentFormInput={setCommentFormInput}
    commentFormLoading={commentFormLoading}
  />
  );
};

export default IdeaDetailPage;
