import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Map, isMobileCustom } from "senf-atomic-design-system"
import { Threebox } from "threebox-plugin";
import { createModel } from "../util/createModal";
import ComponentsSidebar from "./sidebar/ComponentsSidebar";
import ContextPanel from "./sidebar/ContextPanel";
import InfoPage from "./sidebar/InfoPage";
import MenuSidebar from "./sidebar/MenuSidebar";
import ModelsList from "./sidebar/ModelsList";
import "./style.css";



function UI({ setLoadingModel }) {
  const isMobile = isMobileCustom()


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
      // Add navigation control (the +/- zoom buttons)
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



  const [componentsSidebarOpen, setComponentsSidebarOpen] = useState(false);
  const [objSelected, setIsObjSelected] = useState(false);
  const [openDrawContext, setOpenDrawContext] = useState(false);

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const [openContextPanel, setOpenContextPanel] = useState(false);

  // const [selectedObj, setSelectedObj] = useState();

  // function onSelectedChange(e) {
  //   setSelectedObj(e.detail);
  // }
  return (
    <React.Fragment>
      {/* <div className="objects">
        <button onClick={createModel}>Box</button>
      </div>
      <div className="placement">
        <button
          onClick={() => {
            selectedObj.setCoords([
              selectedObj.coordinates[0],
              selectedObj.coordinates[1] + 0.001,
            ]);
          }}
        >
          Move Up
        </button>
        <button
          onClick={() => {
            selectedObj.setCoords([
              selectedObj.coordinates[0] + 0.001,
              selectedObj.coordinates[1],
            ]);
          }}
        >
          Move Right
        </button>
        <button
          onClick={() => {
            selectedObj.setCoords([
              selectedObj.coordinates[0],
              selectedObj.coordinates[1] - 0.001,
            ]);
          }}
        >
          Move Bottom
        </button>
        <button
          onClick={() => {
            selectedObj.setCoords([
              selectedObj.coordinates[0] - 0.001,
              selectedObj.coordinates[1],
            ]);
          }}
        >
          Move Left
        </button>
        <button
          onClick={() => {
            selectedObj.fixedZoom += 1;
            selectedObj.setObjectScale(window.map.transform.scale);
            window.tb.map.repaint = true;
          }}
        >
          Scale Up
        </button>
      </div> */}

      {/* <MenuSidebar
        componentsSidebarOpen={componentsSidebarOpen}
        setComponentsSidebarOpen={setComponentsSidebarOpen}
        setOpenInfoModal={setOpenInfoModal}
        openInfoModal={openInfoModal}
        // restart={restart}
        setOpenSaveModal={setOpenSaveModal}
      /> */}
      <ModelsList setLoadingModel={setLoadingModel} setComponentsSidebarOpen={setComponentsSidebarOpen} setOpenContextPanel={setOpenContextPanel} />

      {/* <ComponentsSidebar

        setLoadingModel={setLoadingModel}
        componentsSidebarOpen={componentsSidebarOpen}
        openInfoModal={openInfoModal}
        openDrawContext={openDrawContext}
        openSaveModal={openSaveModal}
        setComponentsSidebarOpen={setComponentsSidebarOpen}
        setOpenContextPanel={setOpenContextPanel}
      // startDrawingStreet={startDrawingStreet}
      /> */}

      <ContextPanel openContextPanel={openContextPanel} setOpenContextPanel={setOpenContextPanel} />


      <Map
        initialMapViewport={initialMapViewport}
        statefulMap={statefulMap}
        setStatefulMap={setStatefulMap}
      // setInitialMapBounds={setInitialMapBounds}
      // mapFilterActive={mapFilterActive}
      // openIdea={openScream}
      // openProjectRoom={openProjectRoom}
      // ideasData={
      //   (order === 1 || openProjectRoom) && !postIdeaOpen && dataFinalMap
      // }
      // ideaData={openScream && scream}
      // projectroomsData={
      //   order === 2 &&
      //   !openProjectRoom &&
      //   !postIdeaOpen &&
      //   dataFinalMapProjects
      // }
      // projectroomData={project}
      // handleClickIdeaMarker={handleClickIdeaMarker}
      // handleClickProjectroomMarker={handleClickProjectroomMarker}
      // handleSetMapBounds={handleSetMapBounds}
      // handleSetInitialMapBoundsAndViewport={
      //   handleSetInitialMapBoundsAndViewport
      // }
      // postIdeaOpen={postIdeaOpen}
      />
    </React.Fragment>
  );
}

export default UI;
