function makeTooltipInteractive(model, setOpenContextPanel, setSwipedUp) {
  function onSelectedChange(e) {
    const { selected } = e.detail; // we get if the object is selected after the event

    // if selected
    if (selected) {
      const selectedObject = e.detail;
      setOpenContextPanel(true);
      setSwipedUp(false);
      window.map.flyTo({
        center: selectedObject.coordinates,
        zoom: 20,
        pitch: 70,
        // center: selectedObject.coordinates,
        // zoom: selectedObject.zoom,
        // pitch: 70,
      });
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
  ele.style.transform = "translateY(-100%)";
  return ele;
};

export const createModel = (
  id,
  obj,
  objFormat,
  setOpenContextPanel,
  setSwipedUp,
  labelText
) => {
  window.map.addLayer({
    id,
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
        labelText: labelText || "",
        id,
      };

      window.tb.loadObj(options, (newModel) => {
        newModel.castShadow = true;
        // newModel.addTooltip("Schoolbuilding", true);
        if (labelText) {
          newModel.addLabel(createLabel(id, labelText), true);
        }

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
        setOpenContextPanel(true);

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
    id: model.id,
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
        labelText: model.labelText || "",
      };

      window.tb.loadObj(options, (newModel) => {
        newModel.castShadow = true;
        if (model.labelText) {
          newModel.addLabel(createLabel(model.id, model.labelText), true);
        }

        makeTooltipInteractive(newModel, setOpenContextPanel, setSwipedUp);
        newModel = newModel.setCoords([
          model.coordinates[0],
          model.coordinates[1],
          0,
        ]);
        window.tb.add(newModel);
      });
    },
    render(gl, matrix) {
      window.tb.update(); // update Threebox scene
    },
  });
};
