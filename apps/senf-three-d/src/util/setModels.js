function makeTooltipInteractive(model, setOpenContextPanel, setSwipedUp) {
  function onSelectedChange(e) {
    const { selected } = e.detail; // we get if the object is selected after the event

    // if selected
    if (selected) {
      const selectedObject = e.detail; //
      console.log(selectedObject);
      window.map.flyTo({
        center: selectedObject.coordinates,
        zoom: 20,
        pitch: 70,
        // center: selectedObject.coordinates,
        // zoom: selectedObject.zoom,
        // pitch: 70,
      });
      setOpenContextPanel(true);
      setSwipedUp(false);
    } else {
      model.setCoords([
        window.map.transform.center.lng,
        window.map.transform.center.lat,
        0,
      ]);
      setOpenContextPanel(false);
    }
    window.tb.update();
    window.map.repaint = true;
  }
  model.addEventListener("SelectedChange", onSelectedChange, false);
}

const createLabel = (id, content) => {
  const ele = document.createElement("div");
  ele.setAttribute("id", id);
  ele.innerText = content;
  ele.style.padding = "0.5rem";
  ele.style.backgroundColor = "white";
  ele.style.borderRadius = "8px";
  return ele;
};

export const createModel = (
  id,
  obj,
  objFormat,
  setOpenContextPanel,
  setSwipedUp
) => {
  window.map.addLayer({
    id: id || "custom_layer",
    type: "custom",
    renderingMode: "3d",
    onAdd(map, _gl) {
      const options = {
        type: objFormat || "fbx",
        obj,
        scale: 1,
        units: "meters",

        rotation: { x: 90, y: 0, z: 0 }, // default rotation,
        anchor: "center",
        zoom: 16,
        tooltip: true,
        title: "Schoolbuilding",
      };

      window.tb.loadObj(options, (newModel) => {
        newModel.castShadow = true;
        // newModel.addTooltip("Schoolbuilding", true);

        newModel.addLabel(
          createLabel("Schoolbuilding", "Schoolbuilding"),
          true
        );
        makeTooltipInteractive(newModel, setOpenContextPanel, setSwipedUp);
        newModel = newModel.setCoords([
          map.transform.center.lng,
          map.transform.center.lat,
          0,
        ]);
        // newModel.addEventListener("SelectedChange", onSelectedChange, false);
        window.tb.add(newModel);

        window.tb.map.selectedObject = newModel;
        window.tb.map.selectedObject.selected = true;
        window.map.flyTo({
          center: newModel.coordinates,
          zoom: 20,
          pitch: 70,
        });

        // setSelectedObj(model);
      });
    },
    render(gl, matrix) {
      window.tb.update(); // update Threebox scene
    },
  });
};

export const setImplementedModelsData = (
  model,
  setOpenContextPanel,
  setSwipedUp
) => {
  window.map.addLayer({
    id: model.id || "custom_layer",
    type: "custom",
    renderingMode: "3d",
    onAdd(map, _gl) {
      const options = {
        type: model.objFormat || "fbx",
        obj: model.obj,
        scale: 1,
        units: "meters",
        rotation: { x: 90, y: 0, z: 0 }, // default rotation,
        anchor: "center",
      };

      window.tb.loadObj(options, (newModel) => {
        newModel.castShadow = true;
        makeTooltipInteractive(newModel, setOpenContextPanel, setSwipedUp);
        newModel = newModel.setCoords([model.center.lng, model.center.lat, 0]);
        window.tb.add(newModel);
      });
    },
    render(gl, matrix) {
      window.tb.update(); // update Threebox scene
    },
  });
};
