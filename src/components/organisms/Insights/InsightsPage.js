/** @format */

import React, { useState, useEffect } from "react";

//Components
import Keyindicators from "../../molecules/graphs/Keyindicators";
import ThemenDialog from "../../molecules/graphs/themendialog";
import StadttteilDialog from "../../molecules/graphs/stadtteilDialog";
import AltersgruppeDialog from "../../molecules/graphs/altersgruppeDialog";
import WordcloudDialog from "../../molecules/graphs/wordcloudDialog";

//Images
import Themencover from "../../../images/insightsCovers/topic-cover.jpg";
import DistrictsCover from "../../../images/insightsCovers/districts-cover.jpg";
import KeywordsCover from "../../../images/insightsCovers/keywords-cover.jpg";
import AgegroupsCover from "../../../images/insightsCovers/agegroups-cover.jpg";

import firebase from "firebase/app";
import "firebase/firestore";
import MainAnimations from "../../atoms/Animations/MainAnimations";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const CoverWrapper = styled.div`
  margin-left: 2.5%;
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    ". ."
    ". .";
`;
const Covers = styled.div`
  width: 100%;
  height: auto;
  z-index: 9;
  float: left;
  position: relative;
  animation: ${(props) => props.animation};
  overflow: hidden;
  border-radius: 20px;
`;
const CoverImg = styled.img`
  width: 100%;
  height: 100%;
`;
const CoverTitle = styled.span`
  font-size: 18px;
  /* font-family: PlayfairDisplay-Bold; */
  font-family: Futura PT W01-Bold;
  color: #353535;
  text-align: center;
  width: 100%;
  position: absolute;
  top: 30px;
`;

const InsightsPage = ({ order }) => {
  const { t } = useTranslation();
  const db = firebase.firestore();

  const [screams, setScreams] = useState("");
  const [likesLength, setLikesLength] = useState("");
  const [commentsLength, setCommentsLength] = useState("");

  const fetchDataScreams = async () => {
    const ref = await db
      .collection("screams")
      .orderBy("createdAt", "desc")
      .get();

    const screams = [];
    ref.docs.forEach((doc) => {
      const docData = {
        likeCount: doc.data().likeCount,
        Thema: doc.data().Thema,
        Stadtteil: doc.data().Stadtteil,
      };
      screams.push(docData);
    });

    setScreams(screams);
  };

  const fetchDataLikes = async () => {
    const ref = await db.collection("likes").orderBy("createdAt", "desc").get();
    const likesLength = ref.size;
    setLikesLength(likesLength);
  };

  const fetchDataComments = async () => {
    const ref = await db
      .collection("comments")
      .orderBy("createdAt", "desc")
      .get();
    const commentsLength = ref.size;
    setCommentsLength(commentsLength);
  };

  useEffect(() => {
    fetchDataScreams();
    fetchDataLikes();
    fetchDataComments();
  }, []);

  return (
    order === 3 && (
      <React.Fragment>
        <MainAnimations height="100vh" marginTop="90px">
          <Keyindicators
            screams={screams}
            likesLength={likesLength}
            commentslength={commentsLength}
          />
          <CoverWrapper>
            <Covers animation="coverAnimation 0.5s ease-in-out">
              <CoverTitle>{t("topics")}</CoverTitle>
              <CoverImg src={Themencover} alt="insights-topic-cover" />
              <ThemenDialog screams={screams} />
            </Covers>

            <Covers animation="coverAnimation 0.75s ease-in-out">
              <CoverTitle>{t("districts")}</CoverTitle>
              <CoverImg src={DistrictsCover} alt="insights-districts-cover" />
              <StadttteilDialog screams={screams} />
            </Covers>

            <Covers animation="coverAnimation 1.25s ease-in-out">
              <CoverTitle>{t("agegroups")}</CoverTitle>
              <CoverImg src={AgegroupsCover} alt="insights-agegroups-cover" />
              <AltersgruppeDialog />
            </Covers>
            <Covers animation="coverAnimation 1s ease-in-out">
              <CoverTitle>{t("keywords")}</CoverTitle>
              <CoverImg src={KeywordsCover} alt="insights-keywords-cover" />
              <WordcloudDialog />
            </Covers>
          </CoverWrapper>
        </MainAnimations>
      </React.Fragment>
    )
  );
};

export default InsightsPage;
