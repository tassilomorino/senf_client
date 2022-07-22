import React, { useState } from "react";
import ComponentsSidebar from "./ComponentsSidebar";
import InfoModal from "./InfoModal";
import MenuSidebar from "./MenuSidebar";
import "./style.css";

export const createModel = (id, obj, objFormat, scale, rotation) => {
  window.map.addLayer({
    id: id || "custom_layer",
    type: "custom",
    renderingMode: "3d",
    onAdd(map, gl) {
      const options = {
        type: objFormat || "fbx",
        obj: obj || "3d-models/cyclestand.fbx",
        scale: scale || 0.3,
        rotation: rotation || { x: 90, y: 0, z: 0 }, // default rotation,
        anchor: "center",
        bbox: false,
        fixedZoom: 15,
      };
      window.tb.loadObj(options, (model) => {
        model = model.setCoords([
          map.transform.center.lng,
          map.transform.center.lat,
        ]);
        // model.addEventListener("SelectedChange", onSelectedChange, false);
        window.tb.add(model);
        // setSelectedObj(model);
      });
    },
    render(gl, matrix) {
      window.tb.update(); // update Threebox scene
    },
  });
};

function UI({ handleSwitchView, pitch }) {
  const [componentsSidebarOpen, setComponentsSidebarOpen] = useState(false);
  const [objSelected, setIsObjSelected] = useState(false);
  const [openContextSidebar, setOpenContextSidebar] = useState(false);
  const [openDrawContext, setOpenDrawContext] = useState(false);

  const [openInfoModal, setOpenInfoModal] = useState(true);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

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

      <InfoModal
        openInfoModal={openInfoModal}
        setOpenInfoModal={setOpenInfoModal}
      />

      <MenuSidebar
        handleSwitchView={handleSwitchView}
        pitch={pitch}
        componentsSidebarOpen={componentsSidebarOpen}
        setComponentsSidebarOpen={setComponentsSidebarOpen}
        setOpenInfoModal={setOpenInfoModal}
        // restart={restart}
        setOpenSaveModal={setOpenSaveModal}
      />
      <ComponentsSidebar
        componentsSidebarOpen={componentsSidebarOpen}
        openInfoModal={openInfoModal}
        openDrawContext={openDrawContext}
        openSaveModal={openSaveModal}
        // startDrawingStreet={startDrawingStreet}
      />
    </div>
  );
}

export default UI;
