/** @format */

import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import {
  StatisticsOverview,
  Tabs,
  Loader,
  LayerWhiteFirstDefault,
  Box,
} from "senf-atomic-design-system";
import Keyindicators from "../components/graphs/Keyindicators";

// Images
import Themencover from "../images/insightsCovers/topic-cover.jpg";
import DistrictsCover from "../images/insightsCovers/districts-cover.jpg";
import KeywordsCover from "../images/insightsCovers/keywords-cover.jpg";
import AgegroupsCover from "../images/insightsCovers/agegroups-cover.jpg";

import ExpandButton from "../components/atoms/CustomButtons/ExpandButton";
import { StyledH2 } from "../styles/GlobalStyle";

// firebase

import { db } from "../firebase";

const AgegroupGraph = React.lazy(() =>
  import("../components/graphs/AgegroupGraph")
);
const DistrictsGraph = React.lazy(() =>
  import("../components/graphs/DistrictsGraph")
);

const TopicsGraph = React.lazy(() =>
  import("../components/graphs/TopicsGraph")
);

const CoverWrapper = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 20px);
  max-width: 800px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  grid-template-areas:
    ". ."
    ". .";
  @media (min-width: 768px) {
    margin-top: 50px;
  }

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

const Covers = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9;
  float: left;
  position: relative;
  animation: ${(props) => props.animation};
  overflow: hidden;
  border-radius: 25px;
  background-color: white;
  margin: 0;
  padding: 0;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
`;
const CoverTitle = styled.div`
  width: 100%;
  position: absolute;
  top: 30px;
`;

// const Wrapper = styled.div`
//   height: 100vh;
//   overflow-y: scroll;
//   overflow-x: hidden;
//   position: relative;
//   width: 100%;
//   top: 0;
//   pointer-events: all;
//   z-index: 999999;
// `;
const GraphsWrapper = styled.div`
  height: auto;
  width: auto;
  margin: 10px;
  position: relative;
  border-radius: 18px;

  ${(props) => LayerWhiteFirstDefault};
`;

const StatisticsOverviewPage = ({
  openStatisticsOverview,
  setOpenStatisticsOverview,
  projectRoomId,
}) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [screams, setScreams] = useState("");
  const [likes, setLikes] = useState(null);
  const [likesLength, setLikesLength] = useState(null);
  const [commentsLength, setCommentsLength] = useState(null);

  const [order, setOrder] = useState(1);

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

        setClose();
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
      setOpenStatisticsOverview(false);
    }, 150);
  };

  // const mapViewport = useSelector((state) => state.data.mapViewport);
  const fetchDataScreams = async () => {
    let querySnapshot;
    const screamsRef = collection(db, "screams");
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

    const likesRef = collection(db, "likes");
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

  return (
    <React.Fragment>
      <StatisticsOverview
        openStatisticsOverview={openStatisticsOverview}
        setOpenStatisticsOverview={setOpenStatisticsOverview}
      >
        <Keyindicators
          screams={screams}
          likesLength={likesLength}
          commentslength={commentsLength}
        />

        <GraphsWrapper>
          <Box margin="20px 0px">
            <Tabs
              fontSize="buttonSm"
              order={order}
              setOrder={setOrder}
              tabs={[
                {
                  // icon: <Room />,
                  text: t("topics"),
                },
                { text: t("districts") },
                { text: t("agegroups") },

                // { icon: <Info />, text: "Interaktionen" },
              ]}
            />
          </Box>
          <React.Suspense
            fallback={
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "50px" }}>
                  <Loader />
                </div>
              </div>
            }
          >
            {order === 1 ? (
              <TopicsGraph screams={screams} />
            ) : order === 2 ? (
              <DistrictsGraph screams={screams} />
            ) : (
              <AgegroupGraph screams={screams} likes={likes} />
            )}
          </React.Suspense>
        </GraphsWrapper>
      </StatisticsOverview>
    </React.Fragment>
  );
};

export default memo(StatisticsOverviewPage);
