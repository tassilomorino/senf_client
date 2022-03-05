/** @format */

import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
//Components
import Keyindicators from "../../molecules/graphs/Keyindicators";
import ThemenDialog from "../../molecules/graphs/themendialog";
import DistrictsDialog from "../../molecules/graphs/DistrictsDialog";
import AgegroupDialog from "../../molecules/graphs/AgegroupDialog";

//Images
import Themencover from "../../../images/insightsCovers/topic-cover.jpg";
import DistrictsCover from "../../../images/insightsCovers/districts-cover.jpg";
import KeywordsCover from "../../../images/insightsCovers/keywords-cover.jpg";
import AgegroupsCover from "../../../images/insightsCovers/agegroups-cover.jpg";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { Covers, CoverWrapper, Wrapper } from "./styles/sharedStyles";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { StyledH2 } from "../../../styles/GlobalStyle";
import Tabs from "../../atoms/Tabs/Tabs";
import { MenuData } from "../../../data/MenuData";

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
`;
const CoverTitle = styled.div`
  width: 100%;
  position: absolute;
  top: 30px;
`;

const InsightsPage = ({ setOpenInsightsPage, projectRoomId }) => {
  const { t } = useTranslation();
  const db = firebase.firestore();
  const [open, setOpen] = useState(false);

  const [screams, setScreams] = useState("");
  const [likes, setLikes] = useState(null);
  const [likesLength, setLikesLength] = useState(null);
  const [commentsLength, setCommentsLength] = useState(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  //const mapViewport = useSelector((state) => state.data.mapViewport);
  const fetchDataScreams = async () => {
    const ref = projectRoomId
      ? await db
          .collection("screams")
          .where("projectRoomId", "==", projectRoomId)
          .get()
      : await db
          .collection("screams")
          /*   .where("lat", "<", Number(mapViewport.latitude) + 1)
      .where("lat", ">", Number(mapViewport.latitude) - 1) */

          .get();

    const screams = [];
    ref.docs.forEach((doc) => {
      const docData = {
        likeCount: doc.data().likeCount,
        Thema: doc.data().Thema,
        Stadtteil: doc.data().Stadtteil,
        age: doc.data().age,
      };
      screams.push(docData);
    });

    setScreams(screams);
  };

  const fetchDataLikes = async () => {
    const ref = await db.collection("likes").orderBy("createdAt", "desc").get();
    const likesLength = ref.size;
    setLikesLength(likesLength);

    const likes = [];
    ref.docs.forEach((doc) => {
      const docData = {
        age: doc.data().age,
        Thema: doc.data().Thema,
      };
      likes.push(docData);
    });
    setLikes(likes);
  };

  const fetchDataComments = async () => {
    const ref = await db
      .collection("comments")
      .orderBy("createdAt", "desc")
      .get();
    const commentsLength = ref.size;
    setCommentsLength(commentsLength);
  };

  const fetchDataProjectRoom = async () => {
    const screamIds = [];
    const comments = [];
    const likes = [];
    const screamsRef = await db
      .collection("screams")
      .where("projectRoomId", "==", projectRoomId)
      .get();

    const screamsRefSize = screamsRef.size;
    screamsRef.docs.forEach(async (doc) => {
      screamIds.push(doc.id);

      const commentsRef = await db
        .collection("comments")
        .where("screamId", "==", doc.id)
        .orderBy("createdAt", "desc")
        .get();

      commentsRef.forEach((doc) => {
        const docData = {
          Thema: doc.data().Thema,
        };
        comments.push(docData);
      });

      const ref = await db
        .collection("likes")
        .where("screamId", "==", doc.id)
        .orderBy("createdAt", "desc")
        .get();

      ref.forEach((doc) => {
        const docData = {
          age: doc.data().age,
          Thema: doc.data().Thema,
        };
        likes.push(docData);
      });

      if (screamIds.length === screamsRefSize) {
        setLikes(likes);
        setCommentsLength(comments.length);
        setLikesLength(likes.length);
      }
    });
  };

  useEffect(() => {
    fetchDataScreams();

    if (projectRoomId) {
      fetchDataProjectRoom();
    } else {
      fetchDataLikes();
      fetchDataComments();
    }
  }, []);

  const handleLink = () => {
    window.open("https://wiki.agorakoeln.de/", "_blank");
  };
  return (
    <Wrapper order={open}>
      <CustomIconButton
        name="ArrowLeft"
        position="fixed"
        margin="10px"
        backgroundColor="#FFF0BC"
        handleButtonClick={() => setOpenInsightsPage(false)}
        zIndex={99}
      />

      <Tabs
        loading={false}
        order={1}
        tabLabels={MenuData.map((item) => item.text).slice(3, 4)}
        marginTop={"20px"}
        marginBottom={"20px"}
      />
      <Keyindicators
        screams={screams}
        likesLength={likesLength}
        commentslength={commentsLength}
      />
      <CoverWrapper>
        <Covers animation="enteranimation 0.5s ease-in-out">
          <CoverTitle>
            <StyledH2 fontWeight="900" textAlign="center">
              {t("topics")}
            </StyledH2>
          </CoverTitle>
          <CoverImg src={Themencover} alt="insights-topic-cover" />
          <ThemenDialog screams={screams} />
        </Covers>

        <Covers animation="enteranimation 0.75s ease-in-out">
          <CoverTitle>
            <StyledH2 fontWeight="900" textAlign="center">
              {t("districts")}
            </StyledH2>
          </CoverTitle>
          <CoverImg src={DistrictsCover} alt="insights-districts-cover" />
          <DistrictsDialog screams={screams} />
        </Covers>

        <Covers animation="enteranimation 1.25s ease-in-out">
          <CoverTitle>
            <StyledH2 fontWeight="900" textAlign="center">
              {t("agegroups")}
            </StyledH2>
          </CoverTitle>
          <CoverImg src={AgegroupsCover} alt="insights-agegroups-cover" />
          <AgegroupDialog screams={screams} likes={likes} />
        </Covers>
        <Covers animation="enteranimation 1s ease-in-out">
          <CoverTitle>
            <StyledH2 fontWeight="900" textAlign="center">
              {t("toolbox")}
            </StyledH2>
          </CoverTitle>
          <CoverImg src={KeywordsCover} alt="insights-keywords-cover" />
          <ExpandButton handleButtonClick={() => handleLink()} />
          {/* <WordcloudDialog /> */}
        </Covers>
      </CoverWrapper>
    </Wrapper>
  );
};

export default memo(InsightsPage);
