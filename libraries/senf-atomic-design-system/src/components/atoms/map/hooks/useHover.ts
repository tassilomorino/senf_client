import mapboxgl from "mapbox-gl";

const useHover = () => {
  const popupOffsets = {
    bottom: [0, 16],
  };

  const projectroomsPopup = new mapboxgl.Popup({
    offset: popupOffsets,
    closeButton: false,
  });

  const ideasPopup = new mapboxgl.Popup({
    closeButton: false,
  });

  return (map) => {
    // Add zoom and rotation controls to the map.
    map.on("mousemove", (event) => {
      const features = map.queryRenderedFeatures(event.point, {
        layers: ["ideas", "projectrooms", ""],
      });

      if (!features.length) {
        ideasPopup.remove();
        projectroomsPopup.remove();

        return;
      }

      const feature = features[0];

      if (feature.properties.screamId) {
        ideasPopup
          .setLngLat(feature.geometry.coordinates)
          .setHTML(feature.properties.title)
          .addTo(map);
      } else {
        projectroomsPopup
          .setLngLat(feature.geometry.coordinates)
          .setHTML(feature.properties.title)
          .addTo(map);
      }

      map.getCanvas().style.cursor = features.length ? "pointer" : "";
    });
  };
};

export default useHover;
