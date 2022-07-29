import mapboxgl from "mapbox-gl";

const useClickMarkers = () => {
  return (map, handleClickIdeaMarker, handleClickProjectroomMarker) => {
    // Add zoom and rotation controls to the map.
    map.on("click", (event) => {
      const features = map.queryRenderedFeatures(event.point, {
        layers: ["ideas", "projectrooms"],
      });

      const feature = features[0];
      console.log(feature);

      if (feature.properties.screamId) {
        handleClickIdeaMarker(feature.properties.screamId);
      } else if (feature.properties.projectRoomId) {
        handleClickProjectroomMarker(feature.properties.projectRoomId);
      }
    });
  };
};

export default useClickMarkers;
