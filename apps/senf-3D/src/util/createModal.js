export const createModel = (
  id,
  obj,
  objFormat,
  setOpenContextPanel,
  setSwipedUp
) => {
  function makeTooltipInteractive(model) {
    function onSelectedChange(e) {
      const { selected } = e.detail; // we get if the object is selected after the event

      // if selected
      if (selected) {
        const selectedObject = e.detail; //

        window.map.flyTo({
          center: selectedObject.coordinates,
          zoom: 20,
          pitch: 70,
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
      };

      window.tb.loadObj(options, (model) => {
        model.castShadow = true;
        // model.addLabel(tooltipDOM);
        makeTooltipInteractive(model);
        model = model.setCoords([
          map.transform.center.lng,
          map.transform.center.lat,
          0,
        ]);
        // model.addEventListener("SelectedChange", onSelectedChange, false);
        window.tb.add(model);

        window.tb.map.selectedObject = model;
        window.tb.map.selectedObject.selected = true;
        window.map.flyTo({
          center: model.coordinates,
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
