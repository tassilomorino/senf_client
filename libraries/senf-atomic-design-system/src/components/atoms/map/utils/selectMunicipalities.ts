export function hoverMunicipalities(map, event) {
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["municipalities-germany-fine"],
  });

  // map.getCanvas().style.cursor = features.length ? "pointer" : "";
  console.log(features[0].properties.GEN);
  map.setPaintProperty("municipalities-germany-fine", "fill-color", [
    "match",
    ["get", "GEN"],
    features[0].properties.GEN.toString(),
    "rgba(255, 221, 106, 0.5)",
    "rgba(0, 0, 0,0)",
  ]);
  map.setPaintProperty("municipalities-germany-fine-line", "line-color", [
    "match",
    ["get", "GEN"],
    features[0].properties.GEN.toString(),
    "#FFD96B",
    "rgba(18, 12, 12, 0.2)",
  ]);
  map.setPaintProperty("municipalities-germany-fine-line", "line-width", [
    "match",
    ["get", "GEN"],
    features[0].properties.GEN.toString(),
    3,
    0.5,
  ]);
}

export function selectMunicipalities(
  map,
  event,
  selectedMunicipalities,
  setSelectedMunicipalities
) {
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["municipalities-germany-fine"],
  });
  console.log(features);

  setSelectedMunicipalities([
    ...selectedMunicipalities,
    features[0].properties.GEN,
  ]);

  // map.getCanvas().style.cursor = features.length ? "pointer" : "";

  map.setPaintProperty("municipalities-germany-fine", "fill-color", [
    "match",
    ["get", "GEN"],
    selectedMunicipalities,
    "rgba(255, 221, 106, 0.5)",
    "rgba(0, 0, 0,0)",
  ]);
  map.setPaintProperty("municipalities-germany-fine-line", "line-color", [
    "match",
    ["get", "GEN"],
    selectedMunicipalities,
    "#FFD96B",
    "rgba(18, 12, 12, 0.2)",
  ]);
  map.setPaintProperty("municipalities-germany-fine-line", "line-width", [
    "match",
    ["get", "GEN"],
    selectedMunicipalities,
    3,
    0.5,
  ]);
}
