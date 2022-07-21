import React from "react";
import ComponentsSidebar from "./ComponentsSidebar";
import "./style.css";


export const createModel = (id, obj, objFormat, scale, rotation) => {
  window.map.addLayer({
    id: id || "custom_layer",
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map, gl) {
      let options = {
        type: objFormat || "fbx",
        obj: obj || "3d-models/cyclestand.fbx",
        scale: scale || 1,
        rotation: rotation || { x: 90, y: 0, z: 0 }, //default rotation,
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
    render: function (gl, matrix) {
      window.tb.update(); //update Threebox scene
    },
  });
};

function UI() {
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
      <ComponentsSidebar componentsSidebarOpen={false} openInfoModal={false} openDrawContext={false} openSaveModal={false} startDrawingStreet/>
    </div>
  );
}

export default UI;
