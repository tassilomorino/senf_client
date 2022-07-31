import { makeTooltipInteractive, tooltipDOM } from "../UI/tooltip";

export const createModel = (id, obj, objFormat, scale, rotation) => {
    window.map.addLayer({
      id: id || "custom_layer",
      type: "custom",
      renderingMode: "3d",
      onAdd (map, _gl) {
        const options = {
          type: objFormat || "fbx",
          obj: obj || "3d-models/cyclestand.fbx",
          scale: scale || 1,
          rotation: rotation || { x: 90, y: 0, z: 0 }, // default rotation,
          anchor: "center",
          bbox: false,
          fixedZoom: 15,
        };
        window.tb.loadObj(options, (model) => {
          model.addLabel(tooltipDOM)
          console.log("created");
          makeTooltipInteractive(model)
          model = model.setCoords([
            map.transform.center.lng,
            map.transform.center.lat,
          ]);
          // model.addEventListener("SelectedChange", onSelectedChange, false);
          window.tb.add(model);
          // setSelectedObj(model);
        });
      },
      render (gl, matrix) {
        window.tb.update(); // update Threebox scene
      },
    });
  };