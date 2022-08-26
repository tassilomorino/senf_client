import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { Box, MainLoader, Map, InfoPageMainApp, Cookiebanner, ModalContext } from "senf-atomic-design-system";
import Cookies from "universal-cookie";
import { setMapBounds } from "../redux/actions/mapActions";
import { openProjectRoomFunc } from "../redux/actions/projectActions";
import { closeScream, openScreamFunc } from "../redux/actions/screamActions";
import { isMobileCustom } from "../util/customDeviceDetect";
import {
  filterByStatus,
  filterByTagFilter,
  pick,
  search,
  sort,

} from "../util/helpers";

import { setCookies } from "../redux/actions/cookiesActions";

const cookies = new Cookies();

const Main = React.lazy(() =>
  Promise.all([
    import("./Main"),
    new Promise((resolve) => setTimeout(resolve, 2800)),
  ]).then(([moduleExports]) => moduleExports)
);
const Home = () => {
  const dispatch = useDispatch();

  const { handleModal } = React.useContext(ModalContext) || {};
  const [showUI, setShowUI] = useState(false)
  const [statefulMap, setStatefulMap] = useState(null);
  const [initialMapBounds, setInitialMapBounds] = useState(null);
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const [mapFilterActive, setMapFilterActive] = useState(false);

  const [swipedUp, setSwipedUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState(1);
  const openScream = useSelector((state) => state.UI.openScream);
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);

  const [postIdeaOpen, setPostIdeaOpen] = useState(false);

  const profilePageScreams = useSelector((state) => state.data.guestProfile?.guestData?.screams);
  const screams = useSelector((state) => state.data.screams);
  const scream = useSelector((state) => state.data.scream);
  const projects = useSelector((state) => state.data.projects);
  const project = useSelector((state) => state.data.project);

  const selectedTopics = useSelector((state) => state.data.topics);
  const selectedOrganizationTypes = useSelector(
    (state) => state.data.organizationTypes
  );







  const handleSetMapBounds = (bounds) => {
    const boundsNew = {
      latitude1: bounds[1][1],
      latitude2: bounds[0][1],
      longitude2: bounds[0][0],
      longitude3: bounds[1][0],
    };
    dispatch(setMapBounds(boundsNew));
    dispatch(closeScream());
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setSwipedUp(true);
    setMapFilterActive(true);
  };

  const handleSetInitialMapBoundsAndViewport = () => {
    const boundsNew = {
      latitude1: initialMapBounds[1][1],
      latitude2: initialMapBounds[0][1],
      longitude2: initialMapBounds[0][0],
      longitude3: initialMapBounds[1][0],
    };
    dispatch(setMapBounds(boundsNew));
    setMapFilterActive(false);
  };
  useEffect(() => {
    if (initialMapBounds && initialMapViewport) {
      handleSetInitialMapBoundsAndViewport();
    }
  }, [initialMapBounds, initialMapViewport]);

  const handleClickIdeaMarker = useCallback(
    (id) => {
      dispatch(openScreamFunc(id));
    },
    [dispatch]
  );

  const handleClickProjectroomMarker = useCallback(
    (id) => {
      dispatch(openProjectRoomFunc(id, true));
    },
    [dispatch]
  );

  // MAP
  const dataFinalIdeasMap = useMemo(() => {
    let ideasData = [];

    ideasData = search(screams, searchTerm, [
      "title",
      "body",
      "Stadtteil",
      "Stadtbezirk",
      "locationHeader",
    ]);
    ideasData = filterByTagFilter(ideasData, selectedTopics, "Thema");

    ideasData = filterByStatus(ideasData, "None");
    return ideasData;
  }, [searchTerm, selectedTopics, screams]);

  const dataMap = useMemo(
    () =>
      openProjectRoom
        ? project?.screams?.filter(({ Thema }) =>
          selectedTopics.includes(Thema)
        )
        : profilePageScreams !== null && profilePageScreams !== undefined
          ? profilePageScreams.filter(({ Thema }) => selectedTopics.includes(Thema))
          : dataFinalIdeasMap,
    [
      profilePageScreams,
      openProjectRoom,
      project?.screams,
      dataFinalIdeasMap,
      selectedTopics,
    ]
  );
  const dataFinalMap = useMemo(
    () =>
      dataMap?.map((object) =>
        pick(["title", "lat", "long", "screamId", "color", "likeCount"], object)
      ),
    [dataMap]
  );

  const dataFinalMapProjects = useMemo(
    () =>
      projects.filter(({ organizationType }) =>
        selectedOrganizationTypes.includes(organizationType)
      ),
    [projects, selectedOrganizationTypes]
  );



  const [openCookiebanner, setOpenCookiebanner] = useState(false);
  useEffect(() => {
    if (cookies.get("cookie_settings") === "all") {
      dispatch(setCookies("all"));
      setShowUI(true)
    } else if (cookies.get("cookie_settings") === "minimum") {
      dispatch(setCookies("minimum"));
      setShowUI(true)


    } else {

      setTimeout(() => {
        handleModal("push", <InfoPageMainApp />, { swipe: !!isMobileCustom, size: "xl", height: isMobileCustom && window.innerHeight + 83, padding: 0, onBeforeOpen: () => setShowUI(false), onBeforeClose: () => setShowUI(true) })
        setOpenCookiebanner(true);
      }, 2800);

    }

  }, []);

  const handleOpenCookiePreferences = () => {
    window.open("/cookieConfigurator", "_blank");
  };


  return (
    <div
      style={{
        width: isMobileCustom ? "100vw" : "calc(100vw + 460px)",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >

      {openCookiebanner && (
        <>{ReactDOM.createPortal(<Cookiebanner
          handleCookies={(cookie_settings) => {
            dispatch(setCookies(cookie_settings));
            setOpenCookiebanner(false);
          }}
          handleOpenCookiePreferences={handleOpenCookiePreferences}
        />, document.body)}</>
      )}

      <React.Suspense fallback={ReactDOM.createPortal(<MainLoader />, document.body)}>
        <Main
          statefulMap={statefulMap}
          setStatefulMap={setStatefulMap}
          mapFilterActive={mapFilterActive}
          order={order}
          setOrder={setOrder}
          postIdeaOpen={postIdeaOpen}
          setPostIdeaOpen={setPostIdeaOpen}
          handleSetInitialMapBoundsAndViewport={
            handleSetInitialMapBoundsAndViewport
          }
          swipedUp={swipedUp}
          setSwipedUp={setSwipedUp}
          showUI={showUI}
          setShowUI={setShowUI}
        />
      </React.Suspense>

      <Map
        initialMapViewport={initialMapViewport}
        statefulMap={statefulMap}
        setStatefulMap={setStatefulMap}
        setInitialMapBounds={setInitialMapBounds}
        mapFilterActive={mapFilterActive}
        openIdea={openScream}
        openProjectRoom={openProjectRoom}
        ideasData={
          (order === 1 || openProjectRoom) && !postIdeaOpen && dataFinalMap
        }
        ideaData={openScream && scream}
        projectroomsData={
          order === 2 &&
          !openProjectRoom &&
          !postIdeaOpen &&
          dataFinalMapProjects
        }
        projectroomData={project}
        handleClickIdeaMarker={handleClickIdeaMarker}
        handleClickProjectroomMarker={handleClickProjectroomMarker}
        handleSetMapBounds={handleSetMapBounds}
        handleSetInitialMapBoundsAndViewport={
          handleSetInitialMapBoundsAndViewport
        }
        postIdeaOpen={postIdeaOpen}
      />
    </div>
  );
};

export default Home;
