import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Map, isMobileCustom } from "senf-atomic-design-system"
import { Threebox } from "threebox-plugin";
import { useFormik } from "formik";
import ContextPanel from "../components/ContextPanel";
import ModelsList from "../components/ModelsList";
import Navigation from "../components/Navigation";
import { fetchData } from "../util/fetchData";
import { setDrawnData, setModelsData } from "../util/setData";
import { setImplementedModelsData } from "../util/setModels";


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

  const [drawn, setDrawn] = useState(null);

  const initialMapViewport = {
    latitude: isMobile
      ? 50.9729
      : 50.9429,
    longitude: 6.9606,
    zoom: isMobile ? 17 : 17,
    duration: 0,
    pitch: 35,
  };
  const [statefulMap, setStatefulMap] = useState(null);


  useEffect(() => {
    if (statefulMap) {
      window.map = statefulMap;
      window.tb = new Threebox(statefulMap, statefulMap.getCanvas().getContext("webgl"), {
        defaultLights: true,
        enableSelectingObjects: true,
        enableDraggingObjects: true,
        enableRotatingObjects: true,
        enableHelpTooltips: true,
      });
      window.tb.altitudeStep = 1;
      // map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      statefulMap.on("move", () => {

        // setLng(map.getCenter().lng.toFixed(4));
        // setLat(map.getCenter().lat.toFixed(4));
        // setZoom(map.getZoom().toFixed(2));
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


  const formik = useFormik({

  })
  const data = useMemo(() => {
    fetchData().then((data) => {
      if (data.drawnData) {
        setDrawn(JSON.parse(data.drawnData))
      }
      if (data.modelsData) {
        data.modelsData.map(((model) => {
          setImplementedModelsData(model)
        }))
      }
    })


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


      <ModelsList setLoadingModel={setLoadingModel} setSwipedUp={setSwipedUp} swipedUp={swipedUp} setOpenContextPanel={setOpenContextPanel} setMode={setMode} />
      <ContextPanel openContextPanel={openContextPanel} setOpenContextPanel={setOpenContextPanel} />

      {mode?.mode !== "draw" && <Navigation setSwipedUp={setSwipedUp} swipedUp={swipedUp} />}
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
    </Wrapper>
  );
}

export default Home;
