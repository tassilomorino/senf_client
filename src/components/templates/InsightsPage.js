/** @format */

import React, { useState, useEffect } from "react";

//Components
import Keyindicators from "../graphs/Keyindicators";
import ThemenDialog from "../graphs/themendialog";
import StadttteilDialog from "../graphs/stadtteilDialog";
import AltersgruppeDialog from "../graphs/altersgruppeDialog";
import WordcloudDialog from "../graphs/wordcloudDialog";

//Images
import Themencover from "../../images/themencover.png";
import Stadtteilcover from "../../images/stadtteilcover.png";
import Keywordscover from "../../images/keywordscover.png";
import Altersgruppencover from "../../images/altersgruppencover.png";

import firebase from "firebase/app";
import "firebase/firestore";
import MainAnimations from "../module/Animations/MainAnimations";
import styled from "styled-components";

const Covers = styled.div`
  margin-top: 2.5%;
  margin-left: 2.5%;
  width: 46.25%;
  height: auto;
  z-index: 9;
  float: left;
  position: relative;
  animation: ${(props) => props.animation}
`
const CoverImg = styled.img`
  width: 100%;
  alt: "Themencover";
  src: ${(props) => props.src};
  //border-radius: 25px;
`

const InsightsPage = ({ order }) => {
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

  return order === 3 ? (
    <>
      <MainAnimations
        height="100vh"
        marginTop="90px"
      >
        <Keyindicators
          screams={screams}
          likesLength={likesLength}
          commentslength={commentsLength}
        />
        <Covers animation="coverAnimation 0.5s ease-in-out">
          <CoverImg src={Themencover} />
          <ThemenDialog screams={screams} />
        </Covers>
        <Covers animation="coverAnimation 0.75s ease-in-out">
          <CoverImg src={Stadtteilcover} />
          <StadttteilDialog screams={screams} />
        </Covers>

        <Covers animation="coverAnimation 1.25s ease-in-out">
          <AltersgruppeDialog />
          <CoverImg src={Altersgruppencover} />
        </Covers>
        <Covers animation="coverAnimation 1s ease-in-out">
          <CoverImg src={Keywordscover} />{" "}
          <WordcloudDialog />
        </Covers>
      </MainAnimations>
    </>
  ) : null;
};

export default InsightsPage;
