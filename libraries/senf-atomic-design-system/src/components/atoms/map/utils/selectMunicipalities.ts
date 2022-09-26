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

  setSelectedMunicipalities(
    ...selectedMunicipalities,
    features[0].properties.GEN.toString()
  );

  alert(selectedMunicipalities);
  // map.getCanvas().style.cursor = features.length ? "pointer" : "";

  map.setPaintProperty("municipalities-germany-fine", "fill-color", [
    ["in", "GEN", "Köln", "Düsseldorf"],
    "rgba(255, 221, 106, 0.5)",
    "rgba(0, 0, 0,0)",
  ]);
  map.setPaintProperty("municipalities-germany-fine-line", "line-color", [
    "in",
    ["get", "GEN"],
    ["literal", ["Köln", "Düsseldorf"]],
    "#FFD96B",
    "rgba(18, 12, 12, 0.2)",
  ]);
  map.setPaintProperty("municipalities-germany-fine-line", "line-width", [
    "in",
    ["get", "GEN"],
    ["literal", ["Köln", "Düsseldorf"]],
    3,
    0.5,
  ]);
}
