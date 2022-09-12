import React, { useEffect, useMemo, useState, memo } from "react";
import styled from "styled-components";
import { Check, Box, Button, Map, isMobileCustom } from "senf-atomic-design-system"
import { Threebox } from "threebox-plugin";
import { useFormik } from "formik";
import ContextPanel from "../components/ContextPanel";
import ModelsList from "../components/ModelsList";
import Navigation from "../components/Navigation";
import { fetchData } from "../util/fetchData";
import { setDrawnData, setModelsData } from "../util/setData";
import { setImplementedModelsData } from "../util/setModels";
import SavePanel from "../components/SavePanel";


const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
z-index: -1;
`
const Home = ({ setLoadingModel }) => {
  const isMobile = isMobileCustom();


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
    bearing: 50
  };


  function rotateCamera(timestamp) {
    // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
    statefulMap.rotateTo((timestamp / 200) % 360, { duration: 0, center: [initialMapViewport.longitude, initialMapViewport.latitude] });
    // statefulMap.rotateTo(359.0, { duration: 1000 });

    // Request the next frame of the animation.
    requestAnimationFrame(rotateCamera);
  }



  useEffect(() => {
    if (saveDesign) {
      statefulMap.flyTo({
        center: [initialMapViewport.longitude, initialMapViewport.latitude],
        zoom: 18,
        pitch: 70,
        duration: 2000
      })
      setTimeout(() => {
        rotateCamera(statefulMap.getBearing())

      }, 2000);
    } else {

      cancelAnimationFrame(rotateCamera)
    }
  }, [saveDesign])


  useEffect(() => {
    if (statefulMap) {
      window.map = statefulMap;
      window.tb = new Threebox(statefulMap, statefulMap.getCanvas().getContext("webgl"), {
        defaultLights: true,
        enableSelectingObjects: true,
        enableDraggingObjects: true,
        enableRotatingObjects: true,
        // enableHelpTooltips: true,
        // enableTooltips: true,
      });
      window.tb.altitudeStep = 1;

      statefulMap.on("move", () => {
        window?.tb?.map?.selectedObject?.setCoords([
          statefulMap.getCenter().lng,
          statefulMap.getCenter().lat,
          3

        ])
      });



      // Clean up on unmount
      return () => statefulMap.remove();
    }
  }, [statefulMap]); // eslint-disable-line react-hooks/exhaustive-deps



  useEffect(() => {
    const drawnData = localStorage.getItem("drawnData") && localStorage.getItem("drawnData")

    console.log(JSON.parse(drawnData))
    if (drawnData) {
      setDrawn(JSON.parse(drawnData))
    }
    const modelsData = localStorage.getItem("modelsData")
    const newModelsData = JSON.parse(modelsData)

    if (newModelsData && !window?.tb?.map?.world?.children) {
      newModelsData.map(((model) => {
        console.log(model)
        const yeah = {
          coordinates: [6.960400699058027, 50.94267956769937, 3],
          format: "fbx",
          id: "43700431",
          labelText: null,
          obj: "https://firebasestorage.googleapis.com/v0/b/senf-dev.appspot.com/o/threeD_models%2FZqVXPNBpPCM2vf69vHCx%2Fmodel%2Fbar.fbx?alt=media&token=c70d1c05-7473-41b8-a15d-cfee65f26e06"
        }
        setImplementedModelsData(yeah, setOpenContextPanel, setSwipedUp)
      }))
    }

  }, []);

  const handleSaveDrawn = async (polygon) => {
    setMode(null);
    setDrawn(polygon)
    setDrawnData(polygon)
  };

  useEffect(() => {
    if (mode?.mode === "draw") {
      setSwipedUp(false)
    }
  }, [mode])




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
      {!saveDesign && <ModelsList setLoadingModel={setLoadingModel} setSwipedUp={setSwipedUp} swipedUp={swipedUp} setOpenContextPanel={setOpenContextPanel} setMode={setMode} />}
      <ContextPanel openContextPanel={openContextPanel} setOpenContextPanel={setOpenContextPanel} />

      {mode?.mode !== "draw" && !saveDesign && <Navigation setSwipedUp={setSwipedUp} swipedUp={swipedUp} />}
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

      <Box position="fixed" bottom="20px" right="100px">
        <Button onClick={() => setSaveDesign(!saveDesign)} icon={<Check />} text="Speichern" />
      </Box>

      <SavePanel swipedUp={saveDesign} setSwipedUp={setSaveDesign} />
    </Wrapper>
  );
}

export default memo(Home);
