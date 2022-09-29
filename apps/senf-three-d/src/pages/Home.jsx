import React, { useEffect, useState, memo } from "react";
import styled from "styled-components";
import {
  Check,
  Box,
  Button,
  Map,
  isMobileCustom,
  AllOrganizationTypes,
  useModals,
} from "senf-atomic-design-system";
import { Threebox } from "threebox-plugin";
import { useAuthContext, AuthModal } from "senf-shared";
import { useNavigate } from "react-router-dom";
import ContextPanel from "../components/ContextPanel";
import ModelsList from "../components/ModelsList";
import Navigation from "../components/Navigation";
import { setImplementedModelsData } from "../util/setModels";
import SavePanel from "../components/SavePanel";
import useInterval from "../util/useInterval";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: -1;
  position: fixed;
`;
const Home = ({ setLoadingModel }) => {
  const isMobile = isMobileCustom();
  const { openModal } = useModals();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [mode, setMode] = useState(null);
  const [swipedUp, setSwipedUp] = useState(false);
  const [openContextPanel, setOpenContextPanel] = useState(false);
  // const [showLabels, setShowLabels] = useState(false);
  const [drawn, setDrawn] = useState(null);
  const [saveDesign, setSaveDesign] = useState(false);

  const [statefulMap, setStatefulMap] = useState(null);

  const initialMapViewport = {
    latitude: 50.9429,
    longitude: 6.9606,
    zoom: isMobile ? 17 : 17,
    duration: 0,
    pitch: 35,
    bearing: 50,
  };

  useEffect(() => {
    if (statefulMap) {
      window.map = statefulMap;
      window.tb = new Threebox(
        statefulMap,
        statefulMap.getCanvas().getContext("webgl"),
        {
          defaultLights: true,
          enableSelectingObjects: true,
          enableDraggingObjects: true,
          enableRotatingObjects: true,
          // enableHelpTooltips: true,
          // enableTooltips: false,
        }
      );
      window.tb.altitudeStep = 1;

      statefulMap.on("move", () => {
        window?.tb?.map?.selectedObject?.setCoords([
          statefulMap.getCenter().lng,
          statefulMap.getCenter().lat,
          3,
        ]);
      });
      statefulMap.on("touchstart", () => {
        console.log(statefulMap.tb.map);
        // window?.tb?.map?.selectedObject?.setCoords([
        //   statefulMap.getCenter().lng,
        //   statefulMap.getCenter().lat,
        //   3

        // ])
      });

      // Clean up on unmount
      return () => statefulMap.remove();
    }
  }, [statefulMap]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const drawnData =
      localStorage.getItem("drawnData") && localStorage.getItem("drawnData");
    if (drawnData) {
      setDrawn(JSON.parse(drawnData));
    }
  }, []);

  const [modelsData, setModelsData] = useState(null);
  useEffect(() => {
    const modelsDataRaw = localStorage.getItem("modelsData");
    setModelsData(JSON.parse(modelsDataRaw));
  }, []);

  useEffect(() => {
    if (modelsData && statefulMap) {
      console.log(modelsData);
      modelsData.map((model) => {
        setTimeout(() => {
          setImplementedModelsData(model, setOpenContextPanel, setSwipedUp);
        }, 1500);
      });
    }
  }, [modelsData, statefulMap]);

  const handleSaveDrawn = async (polygon) => {
    setMode(null);
    setDrawn(polygon);
    localStorage.setItem("drawnData", JSON.stringify(polygon));
  };

  useEffect(() => {
    if (mode?.mode === "draw") {
      setSwipedUp(false);
    }
  }, [mode]);

  const [isRotating, setIsRotating] = useState(false);
  let counter = 0;

  useInterval(
    () => {
      counter += isMobile ? 0.01 : 0.1;
      statefulMap.flyTo({
        center: [initialMapViewport.longitude, initialMapViewport.latitude],
        zoom: 18,
        pitch: 70,
        duration: 5,
        bearing: counter,
      });
    },
    isRotating ? 5 : null
  );

  const handleSaveModalOpen = () => {
    statefulMap.flyTo({
      center: [initialMapViewport.longitude, initialMapViewport.latitude],
      zoom: 18,
      pitch: 70,
      duration: 2000,
      bearing: 0,
    });
    setTimeout(() => {
      setIsRotating(true);
    }, 1500);
    setSaveDesign(true);
  };
  const handleSaveModalClose = () => {
    setIsRotating(false);
    setSaveDesign(false);
  };

  useEffect(() => {
    if (!user) openModal(<AuthModal success={() => navigate("/home")} />);
  }, [user]);

  return (
    <Wrapper>
      {/* <MenuSidebar
        componentsSidebarOpen={componentsSidebarOpen}
        setComponentsSidebarOpen={setComponentsSidebarOpen}
        setOpenInfoModal={setOpenInfoModal}
        openInfoModal={openInfoModal}
        // restart={restart}
        setOpenSaveModal={setOpenSaveModal}
      /> */}
      {!saveDesign && (
        <ModelsList
          setLoadingModel={setLoadingModel}
          setSwipedUp={setSwipedUp}
          swipedUp={swipedUp}
          setOpenContextPanel={setOpenContextPanel}
          setMode={setMode}
        />
      )}
      <ContextPanel
        openContextPanel={openContextPanel}
        setOpenContextPanel={setOpenContextPanel}
      />

      {mode?.mode !== "draw" && !saveDesign && (
        <Navigation
          setSwipedUp={setSwipedUp}
          swipedUp={swipedUp}
        />
      )}
      <Map
        initialMapViewport={initialMapViewport}
        statefulMap={statefulMap}
        setStatefulMap={setStatefulMap}
        mapType={mode}
        drawn={drawn}
        handleSaveDrawn={handleSaveDrawn}
        setSwipedUp={setSwipedUp}
        setMode={setMode}
      />

      {/* <Box position="fixed" bottom="20px" right="100px">
        <Button onClick={() => setShowLabels(true)} text={showLabels ? "Show labels" : "Hide Labels"} />
      </Box> */}

      <Box
        position="fixed"
        bottom="20px"
        right={isMobile ? "20px" : "100px"}
      >
        <Button
          onClick={() => handleSaveModalOpen(true)}
          icon={<Check />}
          text={!isMobile ? "Speichern" : ""}
        />
      </Box>
      {isMobile && (
        <Box
          position="fixed"
          bottom="20px"
          left={"20px"}
        >
          <Button
            icon={<AllOrganizationTypes />}
            onClick={() => console.log("")}
          />
        </Box>
      )}

      <SavePanel
        swipedUp={saveDesign}
        setSwipedUp={() => handleSaveModalClose()}
      />
    </Wrapper>
  );
};

export default memo(Home);
