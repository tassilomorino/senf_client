import mapboxgl from "mapbox-gl";

const useModelsLabels = (statefulMap, modelsLabelsContainer, coordinates) => {
  const mapboxMarker = new mapboxgl.Marker({ element: modelsLabelsContainer });
  mapboxMarker.setLngLat(coordinates).addTo(statefulMap);
};

export default useModelsLabels;
