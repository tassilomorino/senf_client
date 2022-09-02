import React, { useState } from "react";
import styled from "styled-components";
import { createModel } from "../util/createModal";
import ComponentsSidebar from "./sidebar/ComponentsSidebar";
import ContextPanel from "./sidebar/ContextPanel";
import InfoPage from "./sidebar/InfoPage";
import MenuSidebar from "./sidebar/MenuSidebar";
import "./style.css";



function UI({ setLoadingModel, handleSwitchView, pitch }) {
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
    <div className="container">
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

      <MenuSidebar
        handleSwitchView={handleSwitchView}
        pitch={pitch}
        componentsSidebarOpen={componentsSidebarOpen}
        setComponentsSidebarOpen={setComponentsSidebarOpen}
        setOpenInfoModal={setOpenInfoModal}
        openInfoModal={openInfoModal}
        // restart={restart}
        setOpenSaveModal={setOpenSaveModal}
      />
      <ComponentsSidebar

        setLoadingModel={setLoadingModel}
        componentsSidebarOpen={componentsSidebarOpen}
        openInfoModal={openInfoModal}
        openDrawContext={openDrawContext}
        openSaveModal={openSaveModal}
        setComponentsSidebarOpen={setComponentsSidebarOpen}
        setOpenContextPanel={setOpenContextPanel}
      // startDrawingStreet={startDrawingStreet}
      />

      <ContextPanel openContextPanel={openContextPanel} setOpenContextPanel={setOpenContextPanel} />
    </div>
  );
}

export default UI;
