import mapboxgl from "mapbox-gl";

const popup = new mapboxgl.Popup({
  closeButton: false,
});

export function hoverMunicipalities(map, event) {
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["municipalities-germany-fine"],
  });

  const feature = features[0];

  if (feature?.properties.GEN) {
    popup.trackPointer().setHTML(feature.properties.GEN).addTo(map);
  }

  map.getCanvas().style.cursor = features.length ? "pointer" : "";

  // map.getCanvas().style.cursor = features.length ? "pointer" : "";
  // map.setPaintProperty("municipalities-germany-fine", "fill-color", [
  //   "match",
  //   ["get", "GEN"],
  //   features[0]?.properties.GEN.toString(),
  //   "rgba(255, 221, 106, 0.5)",
  //   "rgba(0, 0, 0,0)",
  // ]);
  map.setPaintProperty("municipalities-germany-fine-line", "line-color", [
    "match",
    ["get", "GEN"],
    features[0]?.properties.GEN.toString(),
    "#FFD96B",
    "rgba(18, 12, 12, 0.2)",
  ]);
  map.setPaintProperty("municipalities-germany-fine-line", "line-width", [
    "match",
    ["get", "GEN"],
    features[0]?.properties.GEN.toString(),
    3,
    0.5,
  ]);

  // if (event.features.length > 0) {
  //   if (hoveredStateId !== null) {
  //     map.setFeatureState(
  //       { source: "municipalities-germany-fine", id: hoveredStateId },
  //       { hover: false }
  //     );
  //   }
  //   hoveredStateId = event.features[0].id;
  //   map.setFeatureState(
  //     { source: "municipalities-germany-fine", id: hoveredStateId },
  //     { hover: true }
  //   );
  // }
}

const selectMunicipalities = (
  map,
  event,
  selectedMunicipalities,
  setSelectedMunicipalities
) => {
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["municipalities-germany-fine"],
  });
  console.log("features", features);
  const value = features[0]?.properties?.GEN.toString();
  const newArr = selectedMunicipalities;
  if (newArr.includes(value)) {
    const index = newArr.indexOf(value);
    if (index > -1) {
      newArr.splice(index, 1);
    }
  } else {
    newArr.push(value);
  }

  if (newArr.length > 0) {
    map?.setPaintProperty("municipalities-germany-fine", "fill-color", [
      "match",
      ["get", "GEN"],
      newArr,
      "rgba(255, 221, 106, 0.5)",
      "rgba(0, 0, 0,0)",
    ]);
  } else {
    map?.setPaintProperty(
      "municipalities-germany-fine",
      "fill-color",
      "rgba(0, 0, 0,0)"
    );
  }

  setSelectedMunicipalities([newArr]);

  // map.getCanvas().style.cursor = features.length ? "pointer" : "";

  // map.setPaintProperty("municipalities-germany-fine", "fill-color", [
  //   "match",
  //   ["get", "GEN"],
  //   ["Köln", "Düsseldorf"],
  //   "rgba(255, 221, 106, 0.5)",
  //   "rgba(0, 0, 0,0)",
  // ]);
  // map.setPaintProperty("municipalities-germany-fine-line", "line-color", [
  //   "in",
  //   ["get", "GEN"],
  //   ["literal", ["Köln", "Düsseldorf"]],
  //   "#FFD96B",
  //   "rgba(18, 12, 12, 0.2)",
  // ]);
  // map.setPaintProperty("municipalities-germany-fine-line", "line-width", [
  //   "in",
  //   ["get", "GEN"],
  //   ["literal", ["Köln", "Düsseldorf"]],
  //   3,
  //   0.5,
  // ]);
};

const activateMunicipalities = (map, event, selectedMunicipalities) => {
  map?.setPaintProperty("municipalities-germany-fine", "fill-color", [
    "match",
    ["get", "GEN"],
    selectedMunicipalities,
    "rgba(255, 221, 106, 0.5)",
    "rgba(0, 0, 0,0)",
  ]);
};

export const hoverAndSelectMunicipalities = (
  statefulMap,
  mapType,
  selectedMunicipalities,
  setSelectedMunicipalities
) => {
  if (statefulMap && mapType === "selectMunicipalities") {
    statefulMap.on("mousemove", (event) => {
      hoverMunicipalities(statefulMap, event);
    });
    statefulMap.on("click", (event) => {
      selectMunicipalities(
        statefulMap,
        event,
        selectedMunicipalities,
        setSelectedMunicipalities
      );
    });

    statefulMap.on("load", (event) => {
      activateMunicipalities(statefulMap, event, selectedMunicipalities);
    });
  }
};
