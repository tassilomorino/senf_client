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

import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import {
  Covers,
  CoverWrapper,
  Wrapper,
  SVGWrapper,
  HeaderWrapper,
  DragWrapper,
  ClickBackground,
  HandleBar,
  SVGWrapperMobile,
} from "./styles/sharedStyles";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { StyledH2 } from "../../../styles/GlobalStyle";
import Tabs from "../../atoms/Tabs/Tabs";
import { MenuData } from "../../../data/MenuData";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
//firebase

import { db } from "../../../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
`;
const CoverTitle = styled.div`
  width: 100%;
  position: absolute;
  top: 30px;
`;

const ListWrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  top: 0;
  pointer-events: all;
  z-index: 999999;
`;

const InsightsPage = ({ setOpenInsightsPage, projectRoomId }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [screams, setScreams] = useState("");
  const [likes, setLikes] = useState(null);
  const [likesLength, setLikesLength] = useState(null);
  const [commentsLength, setCommentsLength] = useState(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${30}px)`,
    overflow: "hidden",
    touchAction: "none",
    userSelect: "none",
  }));

  const bind = useDrag(
    ({ last, down, movement: [, my], offset: [, y] }) => {
      if (last && my > 50) {
        set({
          transform: `translateY(${window.innerHeight}px)`,
          touchAction: "none",
        });

        setTimeout(() => {
          window.history.pushState(null, null, "/projectRooms");
          setOpenInsightsPage(false);
        }, 150);
        setTimeout(() => {
          set({
            transform: `translateY(${30}px)`,
            touchAction: "none",
          });
        }, 300);
      }

      set({ y: down ? my : 0 });
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
      },
    }
  );

  const setClose = () => {
    set({
      transform: `translateY(${window.innerHeight}px)`,
      touchAction: "none",
    });
    setTimeout(() => {
      setOpenInsightsPage(false);
    }, 150);
  };

  //const mapViewport = useSelector((state) => state.data.mapViewport);
  const fetchDataScreams = async () => {
    let querySnapshot;
    let screamsRef = collection(db, "screams");
    if (projectRoomId) {
      const q = query(screamsRef, where("projectRoomId", "==", projectRoomId));
      querySnapshot = await getDocs(q);
    } else {
      querySnapshot = await getDocs(screamsRef);
    }

    const screams = [];
    querySnapshot.forEach((doc) => {
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
    /*  const ref = await db.collection("likes").orderBy("createdAt", "desc").get();
    const likesLength = ref.size; */

    let likesRef = collection(db, "likes");
    const q = query(likesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    setLikesLength(querySnapshot.size);

    const likes = [];
    querySnapshot.forEach((doc) => {
      const docData = {
        age: doc.data().age,
        Thema: doc.data().Thema,
      };
      likes.push(docData);
    });
    setLikes(likes);
  };

  const fetchDataComments = async () => {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    setCommentsLength(querySnapshot.size);
  };

  const fetchDataProjectRoom = async () => {
    const screamIds = [];
    const comments = [];
    const likes = [];
    /*  const screamsRef = await db
      .collection("screams")
      .where("projectRoomId", "==", projectRoomId)
      .get();
 */
    const screamsRef = collection(db, "screams");
    const q = query(screamsRef, where("projectRoomId", "==", projectRoomId));
    const querySnapshot = await getDocs(q);

    const screamsRefSize = querySnapshot.size;
    querySnapshot.forEach(async (doc) => {
      screamIds.push(doc.id);

      const commentsRef = collection(db, "comments");
      const q = query(
        commentsRef,
        where("screamId", "==", doc.id),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const docData = {
          Thema: doc.data().Thema,
        };
        comments.push(docData);
      });

      /* const ref = await db
        .collection("likes")
        .where("screamId", "==", doc.id)
        .orderBy("createdAt", "desc")
        .get(); */
      const likesRef = collection(db, "likes");
      const likesQuery = query(
        likesRef,
        where("screamId", "==", doc.id),
        orderBy("createdAt", "desc")
      );
      const likesSnapshot = await getDocs(likesQuery);

      likesSnapshot.forEach((doc) => {
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

  const content = (
    <ListWrapper>
      {!isMobileCustom && (
        <React.Fragment>
          <CustomIconButton
            name="ArrowLeft"
            position="fixed"
            margin="10px"
            backgroundColor="#FFF0BC"
            handleButtonClick={() => setOpenInsightsPage(false)}
            zIndex={99}
          />

          <SVGWrapper>
            <HeaderWrapper>
              <StyledH2
                fontWeight="900"
                fontSize={document.body.clientWidth > 368 ? "22px" : "19px"}
                textAlign="center"
                margin="20px 0px"
              >
                {MenuData[3].text}
                {/* "Insights" */}
              </StyledH2>
            </HeaderWrapper>
            <svg
              width="100%"
              height="126"
              viewBox="0 0 1100 126"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 125.5V0.5H1130.5V99C1025 143 974.588 95.9476 942.5 83C828.5 37 819 43.5 704 62.5C558 86.6217 307.5 44.5 196 99C128.785 131.854 37.1667 124.667 0 125.5Z"
                fill="#FED957"
              />
            </svg>
          </SVGWrapper>
        </React.Fragment>
      )}
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
    </ListWrapper>
  );
  return isMobileCustom ? (
    <React.Fragment>
      <ClickBackground onClick={setClose} />

      <DragWrapper style={props}>
        <HeaderWrapper {...bind()}>
          <HandleBar />
          <CustomIconButton
            name="ArrowDown"
            position="fixed"
            margin="0px 0px"
            backgroundColor="transparent"
            shadow={false}
            handleButtonClick={setClose}
            zIndex={99}
          />
          <StyledH2
            fontWeight="900"
            fontSize={document.body.clientWidth > 368 ? "22px" : "19px"}
            textAlign="center"
            margin="20px 0px"
          >
            {MenuData.map((item) => item.text).slice(3, 4)}
          </StyledH2>
          <SVGWrapperMobile>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M139 84.5C65 68.9 22 91 0 107.5V0H390.5V54C363.5 45.5 334 47 313.5 63.5C288.5 83.6219 231.5 104 139 84.5Z"
                fill="#FED957"
              />
            </svg>
          </SVGWrapperMobile>
        </HeaderWrapper>
        {content}
      </DragWrapper>
    </React.Fragment>
  ) : (
    <Wrapper $order={open}>{content}</Wrapper>
  );
};

export default memo(InsightsPage);
