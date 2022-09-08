import { useRef } from "react";

const useCoordinates = (centerLongitude, centerLatitude, initialZoom) => {
  const lng = useRef(centerLongitude);
  const lat = useRef(centerLatitude);
  const zoom = useRef(initialZoom);
  const subscribeMap = (map) => {
    map.on("move", () => {
      lng.current = map.getCenter().lng.toFixed(4);
      lat.current = map.getCenter().lat.toFixed(4);
      zoom.current = map.getZoom().toFixed(2);
    });
  };

  return { lng, lat, zoom, subscribeMap };
};

export default useCoordinates;
