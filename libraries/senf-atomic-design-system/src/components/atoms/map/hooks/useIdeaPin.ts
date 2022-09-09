import mapboxgl from "mapbox-gl";

const useIdeaPin = (statefulMap, container, ideaData, setIdeaMarkerColor) => {
  const mapboxMarker = new mapboxgl.Marker({ element: container });
  mapboxMarker.setLngLat([ideaData.long, ideaData.lat]).addTo(statefulMap);

  setIdeaMarkerColor(ideaData.color);

  if (statefulMap?.getLayer("ideas")) {
    statefulMap?.setFilter("ideas", ["!=", "screamId", ideaData.screamId]);
  }
  // setPinData([{ ideaData }]);
  setTimeout(() => {
    statefulMap.flyTo({
      center: [ideaData.long, ideaData.lat],
      zoom: 16.5,
      duration: 2700,
      pitch: 30,
    });

    // statefulMap.fitBounds([
    //   [ideaData.long - 0.001, ideaData.lat - 0.0015], // southwestern corner of the bounds
    //   [ideaData.long + 0.0003, ideaData.lat + 0.0015], // northeastern corner of the bounds
    // ]);
  }, 300);
};

export default useIdeaPin;
